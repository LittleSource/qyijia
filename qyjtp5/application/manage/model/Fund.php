<?php
/**
 * Fund.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/29 22:52
 */

namespace app\manage\model;
use think\Db;
use think\Model;

class Fund extends Model
{
    public function add($userId,$isAdd,$price,$content,$class){
        $user = Db::table('user')->get($userId);
        $balance = floatval($user['balance']);
        if($isAdd){
            $type = 1;
            $balance += $price;
        }else{
            $type = 0;
            $balance -= $price;
        }
        Db::table('user')->where('id',$userId)->data(['balance'=>$balance])->update();
        $data = [
            'user_id'=>$userId,
            'type'=>$type,
            'price'=>$price,
            'content'=>$content,
            'classification'=>$class,
            'add_time'=>date('Y-m-d H:i:s')
        ];
        if($this->save($data)){
            return true;
        }else{
            return false;
        }
    }
}