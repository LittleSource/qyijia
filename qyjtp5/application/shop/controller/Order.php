<?php
/**
 * Order.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/12 13:03
 */

namespace app\shop\controller;

use app\common\controller\BaseController;

class Order extends BaseController
{
    public function getList(){
        $statusIndex = $this->request->post('status_index/d');
        $page = $this->request->post('page/d');
        if($statusIndex == 0){
            $statusIndex = [0,1,2,3,4];
        }
        $order = \app\shop\model\Order::where(['user_id'=>$this->userId,'status'=>$statusIndex])->order('create_time','desc')->paginate(10,false,['page'=>$page]);
//        $order = \app\shop\model\Order::alias('o')->join('shop s','s.id = o.shop_id')
//            ->where(['o.user_id'=>$this->userId,'o.status'=>$statusIndex])->order('create_time','desc')->limit($page,10)->select();
        return ymJson(200,'ok',$order);
    }
}