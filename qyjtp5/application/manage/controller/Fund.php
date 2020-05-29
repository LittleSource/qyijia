<?php
/**
 * Fund.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/29 22:53
 */

namespace app\manage\controller;


use think\Db;

class Fund extends ManageBaseController
{
    //此接口返回用户余额和一个按月排列的资金明细数组   近3个月
    public function getList(){
        $balance = Db::table('user')->get($this->userId)['balance'];
        $where = [['user_id','=',$this->userId]];
        $where[1] = ['add_time','>',date('Y-m-01').' 00:00:00'];
        $thisMonth = \app\manage\model\Fund::where($where)->select();
        $where[1] = ['add_time','>',date('Y-m-01',strtotime('-1 month')).' 00:00:00'];
        $where[2] = ['add_time','<',date('Y-m-t', strtotime('-1 month')).' 00:00:00'];
        $lastMonth = \app\manage\model\Fund::where($where)->select();
        $where[1] = ['add_time','>',date('Y-m-01',strtotime('-2 month')).' 00:00:00'];
        $where[2] = ['add_time','<',date('Y-m-t', strtotime('-2 month')).' 00:00:00'];
        $lastLastMonth = \app\manage\model\Fund::where($where)->select();
        return ymJson(200,'ok',['balance'=>$balance,'thisMonth'=>$thisMonth,'lastMonth'=>$lastMonth,'lastLastMonth'=>$lastLastMonth]);
    }
}