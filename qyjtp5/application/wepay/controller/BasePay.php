<?php
/**
 * BasePay.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/10 21:59
 */

namespace app\wepay\controller;


use app\common\controller\BaseController;
use think\Db;
use WxPayApi;
use WxPayConfig;
use WxPayException;
use WxPayJsApiPay;
use WxPayRefund;
use WxPayUnifiedOrder;
require_once '../extend/WxPay.Api.php';
require_once '../extend/WxPay.Config.php';
require_once '../extend/WxPay.Exception.php';
require_once '../extend/WxPay.Data.php';
require_once '../extend/WxPay.JsApiPay.php';

class BasePay extends BaseController
{
    /**
     * @param $out_trade_no
     * @param $shopTitle
     * @param $price
     * @return array
     * @throws WxPayException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    protected function uniCreateOrder($out_trade_no,$shopTitle,$price,$attach){
        $user = Db::table('user')->where('id',$this->userId)->find();
        $input = new WxPayUnifiedOrder();
        $input->SetBody(config('app_name').'-'.$shopTitle);
        $input->SetAttach($attach);//附加商家id 为了发短信
        $input->SetOut_trade_no($out_trade_no);
        $input->SetTotal_fee(1);//$price*100
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 1200));//订单失效时间20分钟
        $input->SetNotify_url(config('app_host').config('notify_url'));
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($user['openid']);
        $wxConfig = new WxPayConfig();
        try{
            $result = WxPayApi::unifiedOrder($wxConfig,$input);
            return $this->GetJsApiParameters($result);
        }catch (WxPayException $e){
            throw new WxPayException($e->getMessage());
        }
    }

    /**
     * 退款  未做完
     * @param $out_trade_no
     * @param $total_fee
     * @param $refund_fee
     * @return bool
     * @throws WxPayException
     */
    public static function WxRefund($out_trade_no,$total_fee,$refund_fee){
        if($out_trade_no){
            $input = new WxPayRefund();
            $input->SetOut_trade_no($out_trade_no);
            $input->SetTotal_fee($total_fee*100);
            $input->SetRefund_fee($refund_fee*100);
            $input->SetOut_refund_no('T'.date("YmdHis").mt_rand(1000,9999));
            $input->SetOp_user_id(\WxPayConfig::MCHID);
            $param = WxPayApi::refund($input);
            if($param['return_code'] == 'SUCCESS'){
                return true;
            }else{
                throw new WxPayException($param['return_msg']);
            }
        }
        return true;
    }


    /**
     * @param $UnifiedOrderResult
     * @return array
     * @throws WxPayException
     */
    private function GetJsApiParameters($UnifiedOrderResult){
        if(!array_key_exists("appid", $UnifiedOrderResult)
            || !array_key_exists("prepay_id", $UnifiedOrderResult)
            || $UnifiedOrderResult['prepay_id'] == "")
        {
            throw new WxPayException("参数错误");
        }
        $jsapi = new WxPayJsApiPay();
        $jsapi->SetAppid($UnifiedOrderResult["appid"]);
        $timeStamp = time();
        $jsapi->SetTimeStamp("$timeStamp");
        $jsapi->SetNonceStr(WxPayApi::getNonceStr());
        $jsapi->SetPackage("prepay_id=" . $UnifiedOrderResult['prepay_id']);
        $config = new WxPayConfig();
        $jsapi->SetPaySign($jsapi->MakeSign($config));
        return $jsapi->GetValues();
    }
}