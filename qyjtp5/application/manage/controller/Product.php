<?php
/**
 * Product.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/21 22:35
 */

namespace app\manage\controller;


use app\manage\model\ProductClassify;

class Product extends ManageBaseController
{
    public function getList(){
        $classifyList = ProductClassify::where('shop_id',$this->shopId)->order('ord','asc')->select();
        for($i=0;$i<count($classifyList);$i++){
            $classifyList[$i]['product'] = \app\manage\model\Product::where(['shop_id'=>$this->shopId,'classify_id'=>$classifyList[$i]['id']])->select();
        }
        return ymJson(200,'ok',$classifyList);
    }

    public function delete(){
        $id = $this->request->post('id/d');
        if(\app\manage\model\Product::where(['shop_id'=>$this->shopId,'id'=>$id])->delete()){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'删除失败，请稍后再试~',[]);
        }
    }

    public function addOrEdit(){
        $data = json_decode($this->request->post('data'),true);
        $Product = new \app\manage\model\Product();
        $data['shop_id'] = $this->shopId;
        if(isset($data['id'])){//存在id则为修改
            $Product = $Product->where(['id'=>$data['id'],'shop_id'=>$this->shopId])->find();
        }else{
            $data['add_time'] = date('Y-m-d H:i:s');
        }
        if($Product->save($data)){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'数据更新失败!',[]);
        }
    }
}