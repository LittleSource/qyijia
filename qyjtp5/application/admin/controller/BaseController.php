<?php
/**
 * BaseController.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/6/8 14:55
 */

namespace app\admin\controller;

use app\admin\model\User;
use Firebase\JWT\JWT;
use think\Controller;
use think\exception\HttpResponseException;
use think\Response;
use UnexpectedValueException;

class BaseController extends Controller
{
    protected $userId;
    protected $beforeActionList = ['checkToken'];
    public function checkToken()
    {
        $token = $this->request->header('token');
        if(!$token){
            throw new HttpResponseException(Response::create(json_encode(ymJson(201,'缺少token参数',[]))));
        }
        try{
            $info = JWT::decode($token, config('jwt.salt'),['HS256']);
            $user = User::get($info->uid);
            if(!$user || $user->type != 3){
                throw new HttpResponseException(Response::create(json_encode(ymJson(201,'非法请求，权限不足',[]))));
            }
        }catch (UnexpectedValueException $e){
            throw new HttpResponseException(Response::create(json_encode(ymJson(401,$e->getMessage(),[]))));
        }
    }
}