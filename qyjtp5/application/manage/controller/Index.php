<?php
/**
 * Index.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/17 22:20
 */

namespace app\manage\controller;

use app\manage\model\Order;

class Index extends ManageBaseController
{
    public function getData(){
        //今日收入  只有这个是根据资金明细表获取
        $OrderList = \app\manage\model\Fund::where([['add_time','>',date('Y-m-d').' 00:00:00'],['type','=',1]])->column('price');
        $todayPriceSum = 0;
        foreach ($OrderList as $priceStr){
            $todayPriceSum += floatval($priceStr);
        }
        //今日订单
        $where[0] =  ['shop_id','=',$this->shopId];
        $where[1] =  ['status','in','0,2,3'];
        $where[2] =  ['create_time','>',date('Y-m-d').' 00:00:00'];
        $OrderList = Order::where($where)->column('price_sum');
        $todayOrderCount = count($OrderList);
        //本月订单
        $where[2] = ['create_time','>',date('Y-m').'-1 00:00:00'];
        $OrderList = Order::where($where)->column('price_sum');
        $thisMonthCount = count($OrderList);
        //昨日订单
        $where[2] = ['create_time','>',date("Y-m-d",strtotime("-1 day")).' 00:00:00'];
        $where[3] = ['create_time','<',date("Y-m-d").' 00:00:00'];
        $OrderList = Order::where($where)->column('price_sum');
        $yesterdayCount = count($OrderList);
        return ymJson(200,'ok',[
            'todayPriceSum'=>$todayPriceSum,
            'todayOrderCount'=>$todayOrderCount,
            'yesterdayCount'=>$yesterdayCount,
            'thisMonthCount'=>$thisMonthCount
        ]);
    }
}