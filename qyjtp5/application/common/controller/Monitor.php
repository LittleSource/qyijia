<?php
/**
 * Monitor.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/6/10 15:32
 */

namespace app\common\controller;


use app\common\model\Order;
use think\Controller;

/**
 * 订单监控类
 * Class Monitor
 * @package app\common\controller
 */
class Monitor extends Controller
{
    /**
     * 定时清理超时未付款的订单
     */
    public function deleteNoPay(){
        $orderList = Order::where('status',1)->select();
        $now = strtotime (date("Y-m-d H:i:s")); //当前时间
        foreach ($orderList as $order){
            if($now - strtotime($order->create_time) > 1200){//20分钟
                Order::where('id',$order->id)->delete();
            }
        }
        return ymJson(200,'ok',[]);
    }

    /**
     * 自动确认收货机制
     */
    public function AutoConfirmReceipt(){
        $orderList = Order::where('status',3)->select();
        $now = strtotime (date("Y-m-d H:i:s")); //当前时间
        foreach ($orderList as $order){
            if($now - strtotime($order->create_time) > 172800){//2天
                Order::where('id',$order->id)->update(['status'=>0]);
            }
        }
        return ymJson(200,'ok',[]);
    }
}