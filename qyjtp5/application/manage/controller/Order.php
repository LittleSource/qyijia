<?php
/**
 * Order.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/19 22:06
 */

namespace app\manage\controller;


class Order extends ManageBaseController
{
    //商家查询订单 参数0待接单  1待送达 3已完成
    public function getList(){
        $status = $this->request->post('status_index/d');
        $page = $this->request->post('page/d');
        $realStatus = [2,3,0];
        $orderList = \app\manage\model\Order::where(['shop_id'=>$this->shopId,'status'=>$realStatus[$status]])->order('create_time','desc')->paginate(10,false,['page'=>$page]);
        return ymJson(200,'ok',$orderList);
    }

    //商家确认接单
    public function acceptOrder(){
        $orderId = $this->request->post('id');
        $Order = new \app\manage\model\Order();
        $Order = $Order->where(['id'=>$orderId,'shop_id'=>$this->shopId,'status'=>2])->find();
        if($Order){
            $Order->status = 3;
            if($Order->save()){
                $fund = new \app\manage\model\Fund();//增加一条接单资金记录
                $fund->add($this->userId,true,$Order->price_sum,$Order->id,'接单收入');
                return ymJson(200,'ok',[]);
            }else{
                return ymJson(201,'更新数据失败,请稍后再试',[]);
            }
        }else{
            return ymJson(201,'您的店铺没有此订单',[]);
        }

    }
}