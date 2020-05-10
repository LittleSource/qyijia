<?php
/**
 * BaseController.php
 * 作者:LittleSource
 * 网址:ym-top.com
 * 创建时间:2020/5/117:09
 */

namespace app\common\controller;


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
            $this->userId = $info->uid;
        }catch (UnexpectedValueException $e){
            throw new HttpResponseException(Response::create(json_encode(ymJson(401,$e->getMessage(),[]))));
        }
    }
}