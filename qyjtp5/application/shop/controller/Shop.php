<?php
/**
 * Shop.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/1 19:20
 */

namespace app\shop\controller;

use app\shop\model\Product;
use app\shop\model\ProductClassify;
use app\shop\model\User;
use think\Controller;

class Shop extends Controller
{
    /**
     * 获取商品信息、店铺信息、分类信息
     * @param int id 商家id
     * @return array
     */
    public function getAllInfo(){
        $id = input('id/d');
        if(!$id){
            return ymJson(201,'参数不全',[]);
        }
        $shop = \app\shop\model\Shop::get($id);
        $classify = ProductClassify::where('shop_id',$id)->order('ord','asc')->select();
        foreach ($classify as $class){
            $p = Product::where(['shop_id'=>$id,'classify_id'=>$class['id']])->select();
            $product['classify'.$class['id']] = $p;
        }
        return ymJson(200,'ok',['shopInfo'=>$shop,'classify'=>$classify,'product'=>$product]);
    }

    /**
     * 获取商家联系方式（手机号）
     * @param int id 商家id
     * @return array
     */
    public function getShopPhone(){
        $id = input('id/d');
        if(!$id){
            return ymJson(201,'参数不全',[]);
        }
        if(cache('getPhone'.$id)){
            return ymJson(200,'ok',['phone'=>cache('getPhone'.$id)]);
        }
        $shop = \app\shop\model\Shop::get($id);
        if($shop){
            $user = User::get($shop['user_id']);
            cache('getPhone'.$id,$user['phone'],600);
            return ymJson(200,'ok',['phone'=>$user['phone']]);
        }else{
            return ymJson(201,'无此商家',[]);
        }
    }

    /**
     * 前端获取配送费
     * @return array
     */
    public function getDeliveryPrice(){
        return ymJson(200,'ok',['deliveryPrice'=>config('delivery_price')]);
    }
}