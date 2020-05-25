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

    public function uploadImg(){
        $img = $this->request->file('img');
        $url = "http://v0.api.upyun.com/qyj-image/path";
        $headerData = [
            "Authorization: Basic ".base64_encode(config('up_operator').':'.config('up_password')),
            "Date: ".gmdate('D, d M Y H:i:s T'),
        ];
        $ch = curl_init(); //初始化CURL句柄
        curl_setopt($ch, CURLOPT_URL, $url); //设置请求的URL
        curl_setopt ($ch, CURLOPT_HTTPHEADER, $headerData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); //设为TRUE把curl_exec()结果转化为字串，而不是直接输出
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"PUT"); //设置请求方式
        curl_setopt($ch, CURLOPT_INFILE, fopen($img,'rb')); //设置资源句柄
        curl_setopt($ch, CURLOPT_INFILESIZE, $img->getSize());
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }
}