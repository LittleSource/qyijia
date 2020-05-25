<?php
/**
 * UpYun.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/25 20:25
 */

namespace app\common\controller;


use think\Controller;

class UpYun extends Controller
{
    public function getSignature(){
        $data = $this->request->get('data');
        return ['signature'=>base64_encode(hash_hmac('sha1',$data,md5(config('up_password')),true))];
    }
}