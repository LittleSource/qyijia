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
    public function getShopList(){
        $city = $this->request->post('city');
        $page = $this->request->post('page/d');
        $shopList = Shop::where(['city'=>$city,'open_status'=>1,'status'=>1])->paginate(5,false,['page'=>$page]);
        for($i = 0;$i < count($shopList); $i++){
            $shopList[$i]['productList'] = Product::where('shop_id',$shopList[$i]->id)->select();
        }
        return ymJson(200,'ok',$shopList);
    }
}