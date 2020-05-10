<?php
/**
 * Pay.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/10 20:18
 */

namespace app\wepay\controller;

use app\wepay\model\Order;

class Pay extends BasePay
{
    public function createOrder(){
        $addressId = $this->request->post('address_id/d');
        $shopId = $this->request->post('shop_id/d');
        $shoppingCart = $this->request->post('shopping_cart');
        $Order = new Order();
        $Order = $Order->addOrder($this->userId,$shopId,$addressId,$shoppingCart);
        if($Order){
            //调用统一支付接口
            $result = $this->uniCreateOrder($this->userId,$Order->id,$Order->real_sum);
            return ymJson(200,'ok',$result);
        }else{
            return ymJson(201,'订单创建失败',[]);
        }
    }
}