<?php
/**
 * Notify.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/30 20:32
 */

namespace app\wepay\controller;

require_once '../extend/WxPay.Config.php';

use app\wepay\model\Order;
use think\Controller;
use think\facade\Log;
use WxPayConfig;

class Notify extends Controller
{
    //统一回调
    public function notify(){
        header('Access-Control-Allow-Origin: *');
        $xmlData = file_get_contents("php://input");
        $jsonData = json_encode(simplexml_load_string($xmlData, 'SimpleXMLElement', LIBXML_NOCDATA));
        $result = json_decode($jsonData, true);
        $response = ['return_code'=>'FAIL','return_msg'=>''];
        if($result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS'){
            if($this->checkSign($result)){//校验签名
                //执行业务逻辑
                $order = Order::get($result['out_trade_no']);
                if($order->save(['status'=>2,'real_pay'=>$result['cash_fee'] / 100,'pay_time'=>date("Y-m-d H:i:s")])){
                    $response = ['return_code'=>'SUCCESS','return_msg'=>'OK'];
                }else{
                    $response = ['return_code'=>'FAIL','return_msg'=>'更新订单失败'];
                    Log::write('支付成功，更新订单失败！','error');
                }
            }else{
                Log::write($xmlData,'error');//签名失败记录非法请求
                $response = ['return_code'=>'FAIL','return_msg'=>'签名失败'];
            }
        }
        return xml($response,200,[],['root_node'=>'xml']);
    }

    private function checkSign($result){
        $wxConfig = new WxPayConfig();
        $notifySign = $result['sign'];
        unset($result['sign']);
        //签名步骤一：按字典序排序参数
        ksort($result);
        $string = $this->ToUrlParams($result);
        //签名步骤二：在string后加入KEY
        $string = $string . "&key=".$wxConfig->GetKey();
        //签名步骤三：//是用sha256校验
        $string = hash_hmac("sha256",$string ,$wxConfig->GetKey());
        //签名步骤四：所有字符转为大写
        $result = strtoupper($string);
        if($notifySign == $result){
            return true;
        }else{
            return false;
        }
    }

    private function ToUrlParams($array){
        $buff = "";
        foreach ($array as $k => $v)
        {
            if($k != "sign" && $v != "" && !is_array($v)){
                $buff .= $k . "=" . $v . "&";
            }
        }
        $buff = trim($buff, "&");
        return $buff;
    }
}