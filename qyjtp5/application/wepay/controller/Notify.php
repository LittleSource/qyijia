<?php
/**
 * Notify.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/30 20:32
 */

namespace app\wepay\controller;
use app\manage\model\Shop;
use app\wepay\model\User;
use think\facade\Env;
require_once Env::get('root_path') . 'vendor/autoload.php';
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;
use TencentCloud\Common\Exception\TencentCloudSDKException;
use TencentCloud\Sms\V20190711\SmsClient;
use TencentCloud\Sms\V20190711\Models\SendSmsRequest;
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
                //开始执行业务逻辑
                //更新订单信息
                $order = Order::get($result['out_trade_no']);
                if($order->save(['status'=>2,'real_pay'=>$result['cash_fee'] / 100,'pay_time'=>date("Y-m-d H:i:s")])){
                    //给商家发送短信
                    $Shop = Shop::get($result['attach']);
                    $User = User::get($Shop->user_id);
                    $this->sendSms($User->phone,$Shop->title);
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

    private function sendSms($phone,$content){
        try{
            $cred = new Credential(config('tencent_cloud_secret'), config('tencent_cloud_key'));
            // 实例化一个 http 选项，可选，无特殊需求时可以跳过
            $httpProfile = new HttpProfile();
            $httpProfile->setReqMethod("GET");  // POST 请求（默认为 POST 请求）
            $httpProfile->setReqTimeout(30);    // 请求超时时间，单位为秒（默认60秒）
            $httpProfile->setEndpoint("sms.tencentcloudapi.com");  // 指定接入地域域名（默认就近接入）
            // 实例化一个 client 选项，可选，无特殊需求时可以跳过
            $clientProfile = new ClientProfile();
            $clientProfile->setSignMethod("TC3-HMAC-SHA256");  // 指定签名算法（默认为 HmacSHA256）
            $clientProfile->setHttpProfile($httpProfile);

            // 实例化 SMS 的 client 对象，clientProfile 是可选的
            $client = new SmsClient($cred, "", $clientProfile);
            // 实例化一个 sms 发送短信请求对象，每个接口都会对应一个 request 对象。
            $req = new SendSmsRequest();
            /* 短信应用 ID: 在 [短信控制台] 添加应用后生成的实际 SDKAppID，例如1400006666 */
            $req->SmsSdkAppid = "1400378997";
            /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，可登录 [短信控制台] 查看签名信息 */
            $req->Sign = "源梦科技";
            /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
            $req->ExtendCode = "0";
            /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
               * 例如+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
            $req->PhoneNumberSet = array("+86".$phone);
            /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
            $req->SenderId = "";
            /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
            $req->SessionContext = "";
            /* 模板 ID: 必须填写已审核通过的模板 ID。可登录 [短信控制台] 查看模板 ID */
            $req->TemplateID = "621662";
            /* 模板参数: 若无模板参数，则设置为空*/
            $req->TemplateParamSet = array($content);
            // 通过 client 对象调用 SendSms 方法发起请求。注意请求方法名与请求对象是对应的
            $resp = $client->SendSms($req);
            return $resp;
        }catch (TencentCloudSDKException $e){
            return $e->getMessage();
        }
    }
}