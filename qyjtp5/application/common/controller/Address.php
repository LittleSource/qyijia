<?php
/**
 * Address.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/8 14:26
 */

namespace app\common\controller;

class Address extends BaseController
{
    public function getDefault(){
        $default = \app\common\model\Address::where(['user_id'=>$this->userId,'is_default'=>1,'is_delete'=>0])->find();//查询不到返回null
        return ymJson(200,'ok',['defaultAddress'=>$default]);
    }

    public function getAddressList(){
        $addressList = \app\common\model\Address::where(['user_id'=>$this->userId,'is_delete'=>0])->order(['is_default'=>'desc','update_time'=>'asc'])->select();
        return ymJson(200,'ok',['addressList'=>$addressList]);
    }

    public function addOrEdit(){
        $data = $this->request->post();
        $data['id'] = intval($data['id']);
        $address = null;
        if(intval($data['is_default'])){//如果要设置当前地址为默认
            $default = \app\common\model\Address::where(['user_id'=>$this->userId,'is_default'=>1,'is_delete'=>0])->find();
            if($default && $default->id != $data['id']){//解除之前设置的默认地址
                $default->is_default = 0;
                $default->save();
            }
        }
        if(intval($data['is_add'])){//新增
            unset($data['id']);
            $data['user_id'] = $this->userId;
            $address = new \app\common\model\Address();
        }else{
            $address = \app\common\model\Address::get($data['id']);
        }
        unset($data['is_add']);
        $data['update_time'] = date('Y-m-d H:i:s');
        if($address->save($data)){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'数据存储失败!',[]);
        }
    }

    public function delete(){
        $id = $this->request->post('id/d');
        if(!$id){
            return ymJson(201,'缺少参数id',[]);
        }else{
            if(1){//这个地方判断此地址是否下过订单 软删除
                $address = \app\common\model\Address::where(['id'=>$id,'user_id'=>$this->userId])->find();
                if($address->save(['is_delete'=>1])){
                    return ymJson(200,'ok',[]);
                }else{
                    return ymJson(201,'删除失败!',[]);
                }
            }else{//没下过订单直接删除
                if(\app\common\model\Address::where(['id'=>$id,'user_id'=>$this->userId])->delete()){
                    return ymJson(200,'ok',[]);
                }else{
                    return ymJson(201,'删除失败!',[]);
                }
            }
        }
    }
}