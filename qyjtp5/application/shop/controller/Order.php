<?php
/**
 * Order.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/12 13:03
 */

namespace app\shop\controller;

use app\common\controller\BaseController;
use think\exception\DbException;

class Order extends BaseController
{
    /**
     * 获取订单列表
     * @return array
     * @throws DbException
     */
    public function getList(){
        $statusIndex = $this->request->post('status_index/d');
        $page = $this->request->post('page/d');
        if($statusIndex == 0){
            $statusIndex = [0,1,2,3,4];
        }
        $order = \app\shop\model\Order::where(['user_id'=>$this->userId,'status'=>$statusIndex])->order('create_time','desc')->paginate(10,false,['page'=>$page]);
        return ymJson(200,'ok',$order);
    }

    public function getOrder(){
        $orderId = $this->request->post('id');
        $field = ['o.id'=>'oid','shopping_cart','shop_id','shop_title','price_sum','real_sum','delivery_price','real_pay','remark','pay_time','create_time','status','name','phone','address','address_detail','house_num'];
        $order = \app\shop\model\Order::alias('o')->join('address a','a.id = o.address_id')->field($field)->where(['o.id'=>$orderId,'o.user_id'=>$this->userId])->find();
        if($order){
            return ymJson(200,'ok',$order);
        }else{
            return ymJson(201,'该订单不存在2',[]);
        }
    }

    public function deleteOne(){
        $orderId = $this->request->post('id');
        if(\app\shop\model\Order::where(['id'=>$orderId,'user_id'=>$this->userId,'status'=>1])->delete()){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'该订单不存在',[]);
        }
    }
}