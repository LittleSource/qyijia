<?php
/**
 * Order.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/6/9 16:02
 */

namespace app\admin\controller;

class Order extends BaseController
{
    public function getList(){
        $shopId = $this->request->post('shop_id/d');
        $status = $this->request->post('status_index/d');
        $page = $this->request->post('page/d');
        $realStatus = [2,3,0];
        $where = ['status'=>$realStatus[$status]];
        if($shopId !== 0){
            $where = ['shop_id'=>$shopId,'status'=>$realStatus[$status]];
        }
        $orderList = \app\manage\model\Order::where($where)->order('create_time','desc')->paginate(10,false,['page'=>$page]);
        return ymJson(200,'ok',$orderList);
    }
}