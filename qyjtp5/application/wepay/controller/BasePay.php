<?php
/**
 * BasePay.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/10 21:59
 */

namespace app\wepay\controller;


use app\common\controller\BaseController;
use WxPayApi;
use WxPayConfig;
use WxPayUnifiedOrder;
require_once '../extend/WxPay.Api.php';
require_once '../extend/WxPay.Config.php';
require_once '../extend/WxPay.Exception.php';
require_once '../extend/WxPay.Data.php';

class BasePay extends BaseController
{
    protected function uniCreateOrder($openId,$out_trade_no,$price){
        $input = new WxPayUnifiedOrder();
        $input->SetBody("test");
        //$input->SetAttach("test");
        $input->SetOut_trade_no($out_trade_no);
        $input->SetTotal_fee($price*100);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 1200));//订单失效时间20分钟
        $input->SetNotify_url(config('app_host').config('notify_url'));
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openId);
        $wxConfig = new WxPayConfig();
        try{
            $result = WxPayApi::unifiedOrder($wxConfig,$input);
        }catch (WxPayException $e){
            $result = $e->errorMessage();
        }
        return $result;
    }
}