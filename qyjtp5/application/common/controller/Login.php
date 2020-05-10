<?php
/**
 * Login.php
 * 作者:LittleSource
 * 网址:ym-top.com
 * 创建时间:2020/4/2321:08
 */

namespace app\common\controller;


use app\common\model\User;
use Firebase\JWT\JWT;
use think\Controller;

class Login extends Controller
{
    public function login(){
        $code = input('code');
        $iv = input('iv');
        $encryptedData = input('encryptedData');
        $rawData = input('rawData');
        $signature = input('signature');
        //获取sessionKey
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid=" . config('wx_app_id') . "&secret=" . config('wx_app_secret') . "&js_code=" . $code . "&grant_type=authorization_code";
        $curlRes = json_decode(curlGet($url), true);
        //校验数据的完整性
        $signature2 = sha1($rawData.$curlRes['session_key']);
        if($signature2 !== $signature){
            return ymJson(201,'用户数据不完整,请重试',['signature'=>$signature,'signature2',$signature2]);
        }
        $result = $this->decryptData($encryptedData,$iv,$curlRes['session_key']);
        if(!$result){
            return ymJson(201,'encryptedData解密失败',[]);
        }
        //判断是否在数据库中存在
        $user = User::where('openid', $result['openId'])->find();
        if(!$user){
            $user = new User();//没有的话上面的user变量为null，so这里要new一下
            $user->addtime = date('Y-m-d H:i:s');
        }
        $user->openid = $result['openId'];
        $user->avatar = $result['avatarUrl'];
        $user->nickname = $result['nickName'];
        if($user->save()){
            cache($result['openId'],$curlRes['session_key'],600);//session_key缓存10分钟
            return ymJson(200,'ok',['openid'=>$user->openid]);
        }else{
            return ymJson(201,'用户数据保存或更新失败',[]);
        }
    }

    public function getPhone(){
        $openid = input('openid/s');
        $encryptedData = input('encryptedData/s');
        $iv = input('iv/s');
        $result = $this->decryptData($encryptedData,$iv,cache($openid));//进行解密
        if($result){
            $user = User::where('openid', $openid)->find();
            $user->phone = $result['purePhoneNumber'];
            if($user->save()){//判断是否存成功
                $tokenConfig = config('jwt.jwt_config');
                $tokenConfig['uid'] = $user->id;
                $token = JWT::encode($tokenConfig,config('jwt.salt'),"HS256");
                return ymJson(200,'ok',['userInfo'=>$user,'token'=>$token]);
            }else{
                return ymJson(201,'更新数据失败,，请稍后再试~',[]);
            }
        }else{
            return ymJson(201,'encryptedData解密失败',[]);
        }
    }

    //encryptedData进行对称解密
    private function decryptData($encryptedData,$iv,$sessionKey)
    {
        if (strlen($sessionKey) != 24) {
            return false;
        }
        $aesKey=base64_decode($sessionKey);
        if (strlen($iv) != 24) {
            return false;
        }
        $aesIV = base64_decode($iv);
        $aesCipher = base64_decode($encryptedData);
        $result = openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);
        $dataObj = json_decode($result);
        if($dataObj == NULL )
        {
            return false;
        }
        if($dataObj->watermark->appid != config('wx_app_id'))
        {
            return false;
        }
        return json_decode($result,true);
    }
}