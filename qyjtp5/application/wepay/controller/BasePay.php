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
    protected function uniCreateOrder($out_trade_no,$shopTitle,$price){
        $user = Db::table('user')->where('id',$this->userId)->find();
        $input = new WxPayUnifiedOrder();
        $input->SetBody(config('app_name').'-'.$shopTitle);
        //$input->SetAttach("test");
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