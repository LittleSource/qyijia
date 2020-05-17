<?php
/**
 * ManageBaseController.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/17 22:14
 */

namespace app\manage\controller;

use app\manage\model\Shop;
use Firebase\JWT\JWT;
use think\Controller;
use think\exception\HttpResponseException;
use think\Response;
use UnexpectedValueException;

class ManageBaseController extends Controller
{
    protected $userId;
    protected $shopId;
    protected $beforeActionList = ['checkToken'];
    public function checkToken()
    {
        $token = $this->request->header('token');
        if(!$token){
            throw new HttpResponseException(Response::create(json_encode(ymJson(201,'缺少token参数',[]))));
        }
        try{
            $info = JWT::decode($token, config('jwt.salt'),['HS256']);
            $this->userId = $info->uid;
            $shop = Shop::where('user_id',$this->userId)->find();
            if($shop){
                if($shop->status != 1){
                    throw new HttpResponseException(Response::create(json_encode(ymJson(201,'店铺已冻结，请联系客服',[]))));
                }
                $this->shopId = $shop->id;
            }else{
                throw new HttpResponseException(Response::create(json_encode(ymJson(201,'您还不是商家',[]))));
            }
        }catch (UnexpectedValueException $e){
            throw new HttpResponseException(Response::create(json_encode(ymJson(401,$e->getMessage(),[]))));
        }
    }
}