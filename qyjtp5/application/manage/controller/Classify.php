<?php
/**
 * Classify.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/18 19:01
 */

namespace app\manage\controller;


use app\manage\model\Product;
use app\manage\model\ProductClassify;

class Classify extends ManageBaseController
{
    public function getList(){
        $classifyList = ProductClassify::where('shop_id',$this->shopId)->order('ord','asc')->select();
        return ymJson(200,'ok',$classifyList);
    }

    public function updateData(){
        $data = json_decode($this->request->post('data'),true);
        $sum = count($data);
        $successCount = 0;
        foreach ($data as $item) {
            $Classify = new ProductClassify();
            if($item['isNew']){//新增
                $item['shop_id'] = $this->shopId;
                if($Classify->allowField(true)->save($item)){
                    $successCount++;
                }
            }else{
                $Classify = ProductClassify::get($item['id']);
                if($Classify->allowField(true)->save($item)){
                    $successCount++;
                }
            }
        }
        if($successCount == $sum){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'成功'.$successCount.'个',$sum);
        }
    }

    public function delete(){
        $id = $this->request->post('id/d');
        $productList = Product::where(['classify_id'=>$id,'shop_id'=>$this->shopId])->select();
        if(count($productList) > 0){
            return ymJson(201,'该分类下存在商品,无法删除',[]);
        }else{
            if(ProductClassify::where(['id'=>$id,'shop_id'=>$this->shopId])->delete()){
                return ymJson(200,'ok',[]);
            }else{
                return ymJson(201,'服务器错误,删除失败！',[]);
            }
        }
    }
}