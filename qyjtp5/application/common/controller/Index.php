<?php
/**
 * Index.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/6/1 12:26
 */

namespace app\common\controller;
use app\common\model\Product;
use app\common\model\Shop;
use think\Controller;


class Index extends Controller
{
    public function getBanner(){
        $data = [
            ['img'=>'https://cdn.ymkj8.com/qyj/banner/1.jpg','url'=>'/pages/shop/shop?id=1'],
            ['img'=>'https://cdn.ymkj8.com/qyj/banner/2.jpg','url'=>'/pages/shop/shop?id=2']
        ];
        return ymJson(200,'ok',['banner'=>$data,'dev'=>1]);
    }

    public function getShopList(){
        $city = $this->request->post('city');
        $page = $this->request->post('page/d');
        $shopList = Shop::where(['city'=>$city,'open_status'=>1,'status'=>1])->paginate(5,false,['page'=>$page]);
        for($i = 0;$i < count($shopList); $i++){
            $shopList[$i]['productList'] = Product::where('shop_id',$shopList[$i]->id)->select();
        }
        return ymJson(200,'ok',$shopList);
    }

    public function search(){
        $key = $this->request->post('key');
        $city = $this->request->post('city');
        $shopList = Shop::where([['title','like','%'.$key.'%'],['city','=',$city]])->select();
        $nearShopList = Shop::where('city',$city)->select();
        $productList = [];
        if(count($nearShopList) > 0){
            for($i = 0;$i<count($nearShopList);$i++){
                $productList_ = Product::where([['shop_id','=',$nearShopList[$i]['id']],['title','like','%'.$key.'%']])->select();
                for($j = 0;$j<count($productList_);$j++){
                    array_push($productList,$productList_[$j]);
                }
            }
        }
        return ymJson(200,'ok',['shopList'=>$shopList,'productList'=>$productList]);
    }
}