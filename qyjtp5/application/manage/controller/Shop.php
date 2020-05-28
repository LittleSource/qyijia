<?php
/**
 * Shop.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/28 20:41
 */

namespace app\manage\controller;

class Shop extends ManageBaseController
{
    public function getInfo(){
        $shop = \app\manage\model\Shop::get($this->shopId);
        return ymJson(200,'ok',$shop);
    }

    public function update(){
        //此接口仅允许下列字段更新
        $field = ['title','notice','shop_img','address','latitude','longitude','city','district','minimum','open_status'];
        $data = json_decode($this->request->post('data'),true);
        $shop = \app\manage\model\Shop::get($this->shopId);
        if($shop->allowField($field)->save($data)){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'更新数据失败，请稍后再试~',[]);
        }
    }
}