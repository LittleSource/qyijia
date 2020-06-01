<?php
/**
 * Pay.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/10 20:18
 */

namespace app\wepay\controller;

use app\wepay\model\Order;
use think\Db;
use think\Exception;

class Pay extends BasePay
{
    /**
     * 创建订单
     * @return array
     * @throws \WxPayException
     * @throws Exception\DbException
     */
    public function createOrder(){
        $addressId = $this->request->post('address_id/d');
        $shopId = $this->request->post('shop_id/d');
        $shoppingCart = $this->request->post('shopping_cart');
        $remark = $this->request->post('remark');
        $shop = Db::table('shop')->get($shopId);
        if(!$shop){
            return ymJson(201,'商家信息有误!',[]);
        }
        $Order = new Order();
        $Order = $Order->addOrder($this->userId,$shopId,$shop['title'],$addressId,$shoppingCart,$remark);
        if($Order){
            try{
                //调用统一支付接口
                $result = $this->uniCreateOrder($Order->id,$Order->shop_title,$Order->real_sum,$shopId);
                $result ['order_id'] = $Order->id;
                return ymJson(200,'ok',$result);
            }catch (Exception $e){
                return ymJson(201,$e->getMessage(),[]);
            }
        }else{
            return ymJson(201,'订单创建失败',[]);
        }
    }
    //继续付款
    public function secondPay(){
        $orderId = $this->request->post('order_id');
        $order = Order::get($orderId);
        if($order && $order->status == 1){
            $result = $this->uniCreateOrder($order->id,$order->shop_title,$order->real_sum);
            return ymJson(200,'ok',$result);
        }else{
            return ymJson(201,'该订单不存在!',[]);
        }
    }
}