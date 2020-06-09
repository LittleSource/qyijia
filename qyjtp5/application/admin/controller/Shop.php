<?php
/**
 * Shop.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/6/8 14:54
 */

namespace app\admin\controller;


use app\admin\model\Fund;
use app\admin\model\User;
use think\exception\DbException;

class Shop extends BaseController
{
    /**
     * 获取商家列表  分页查询
     * @return array
     * @throws DbException
     */
    public function getList(){
        $page = $this->request->post('page');
        $dataList = \app\admin\model\Shop::order('add_time','desc')->paginate(10,false,['page'=>$page]);
        return ymJson(200,'ok',$dataList);
    }

    /**
     * 获取商家的信息和个人信息
     */
    public function getInfo(){
        $id = $this->request->post('id/d');
        $shop = \app\admin\model\Shop::get($id);
        if($shop){
            $user = User::get($shop->user_id);
            return ymJson(200,'ok',['userInfo'=>$user,'shopInfo'=>$shop]);
        }else{
            return ymJson(201,'该商家不存在',[]);
        }
    }

    /**
     * 修改商家余额
     * @return array
     */
    public function updateBalance(){
        $id = $this->request->post('id/d');
        $type = $this->request->post('type/d');
        $content = $this->request->post('content');
        $price = floatval($this->request->post('price'));
        $shop = \app\admin\model\Shop::get($id);
        if($shop){
            $user = User::get($shop->user_id);
            $balance = floatval($user->balance);
            if($type){//增加金额
                $balance += $price;
            }else{
                $balance -= $price;
            }
            $Fund = new Fund();
            $data = ['user_id'=>$user->id,
                'type'=>$type,
                'price'=>$price,
                'content'=>$content,
                'classification'=>'平台系统',
                'add_time'=>date('Y-m-d H:i:s')
            ];
            if($user->save(['balance'=>$balance]) && $Fund->save($data)){
                return ymJson(200,'ok',[]);
            }else{
                return ymJson(201,'数据更新失败,请稍后再试',[]);
            }
        }else{
            return ymJson(201,'该商家不存在',[]);
        }
    }

    /**
     * 冻结店铺和解冻店铺
     * @return array
     */
    public function frozenOrThaw(){
        $id = $this->request->post('id/d');
        $willStatus = $this->request->post('status/d');
        $shop = \app\admin\model\Shop::get($id);
        if($shop){
            if($shop->save(['status'=>$willStatus])){
                return ymJson(200,'ok',[]);
            }else{
                return ymJson(201,'数据更新失败,请稍后再试',[]);
            }
        }else{
            return ymJson(201,'该商家不存在',[]);
        }
    }

    /**
     * 查询用户信息
     */
    public function getUserInfo(){
        $id = $this->request->post('id/d');
        $user = User::get($id);
        if($user){
            return ymJson(200,'ok',$user);
        }else{
            return ymJson(201,'该用户不存在',[]);
        }
    }

    /**
     * 添加店铺 为用户开通
     */
    public function add(){
        $id = $this->request->post('id/d');
        $user = User::get($id);
        if($user){
            //开始
            $data = [
                'user_id'=>$user->id,
                'title'=>$user->nickname,
                'notice'=>'小店新开张，欢迎光临!',
                'shop_img'=>$user->avatar,
                'minimum'=>0,
                'city'=>'深圳市',
                'district'=>'罗湖区',
                'address'=>'人民北路东门町购物广场',
                'longitude'=>22.544024,
                'latitude'=>114.118547,
                'status'=>1,
                'open_status'=>0,
                'add_time'=>date('Y-m-d H:i:s')
            ];
            $shop = new \app\admin\model\Shop();
            if($shop->save($data) && $user->save(['type'=>2])){
                return ymJson(200,'ok',[]);
            }else{
                return ymJson(201,'更新数据失败',[]);
            }
        }else{
            return ymJson(201,'该用户不存在',[]);
        }
    }
}