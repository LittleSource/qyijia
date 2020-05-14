<?php
/**
 * Order.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/10 21:28
 */

namespace app\wepay\model;

use think\Db;
use think\Model;

class Order extends Model
{
    /**
     * 计算总价and创建订单记录
     * @param $userId
     * @param $shopId
     * @param $shopTitle
     * @param $addressId
     * @param $shoppingCart
     * @param $remark
     * @return $this|bool
     */
    public function addOrder($userId,$shopId,$shopTitle,$addressId,$shoppingCart,$remark){
        $shoppingCartList = json_decode($shoppingCart,true);
        $this->remark = $remark;
        $this->price_sum = 0.00;
        $this->delivery_price = config('delivery_price');
        for ($i = 0; $i < count($shoppingCartList); $i++){//计算总价
            $price = Db::table('product')->where('id',$shoppingCartList[$i]['id'])->column('price')[0];
            $this->price_sum += floatval($price);
        }
        $this->real_sum = $this->price_sum + $this->delivery_price;
        $this->id = date('YmdHis').mt_rand(10000,99999);
        $this->user_id = $userId;
        $this->shop_id = $shopId;
        $this->address_id = $addressId;
        $this->shop_title = $shopTitle;
        $this->shopping_cart = $shoppingCart;
        $this->create_time = date('Y-m-d H:i:s');
        $this->status = 1;
        if($this->save()){
            return $this;
        }else{
            return false;
        }
    }
}