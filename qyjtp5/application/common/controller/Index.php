<?php
/**
 * Index.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/6/1 12:26
 */

namespace app\common\controller;
use think\facade\Env;
require_once Env::get('root_path') . 'vendor/autoload.php';
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;
use TencentCloud\Common\Exception\TencentCloudSDKException;
use TencentCloud\Sms\V20190711\SmsClient;
use TencentCloud\Sms\V20190711\Models\SendSmsRequest;
use think\Controller;


class Index extends Controller
{
    public function index(){
        /* 必要步骤：
    * 实例化一个认证对象，入参需要传入腾讯云账户密钥对 secretId 和 secretKey
    * 本示例采用从环境变量读取的方式，需要预先在环境变量中设置这两个值
    * 您也可以直接在代码中写入密钥对，但需谨防泄露，不要将代码复制、上传或者分享给他人
    * CAM 密钥查询：https://console.cloud.tencent.com/cam/capi */

        $cred = new Credential("AKID5iHacNz75oKlvoNqzxe7VcT4PVKtJUTB", "ZsvmNgZCafT1II5nEOHvJQGtMZU9cokP");
        // 实例化一个 http 选项，可选，无特殊需求时可以跳过
        $httpProfile = new HttpProfile();
        $httpProfile->setReqMethod("GET");  // POST 请求（默认为 POST 请求）
        $httpProfile->setReqTimeout(30);    // 请求超时时间，单位为秒（默认60秒）
        $httpProfile->setEndpoint("sms.tencentcloudapi.com");  // 指定接入地域域名（默认就近接入）
        // 实例化一个 client 选项，可选，无特殊需求时可以跳过
        $clientProfile = new ClientProfile();
        $clientProfile->setSignMethod("TC3-HMAC-SHA256");  // 指定签名算法（默认为 HmacSHA256）
        $clientProfile->setHttpProfile($httpProfile);

        // 实例化 SMS 的 client 对象，clientProfile 是可选的
        $client = new SmsClient($cred, "", $clientProfile);
        // 实例化一个 sms 发送短信请求对象，每个接口都会对应一个 request 对象。
        $req = new SendSmsRequest();
        /* 短信应用 ID: 在 [短信控制台] 添加应用后生成的实际 SDKAppID，例如1400006666 */
        $req->SmsSdkAppid = "1400378997";
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，可登录 [短信控制台] 查看签名信息 */
        $req->Sign = "源梦科技";
        /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
        $req->ExtendCode = "0";
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
           * 例如+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        $req->PhoneNumberSet = array("+8615609319042");
        /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
        $req->SenderId = "";
        /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
        $req->SessionContext = "";
        /* 模板 ID: 必须填写已审核通过的模板 ID。可登录 [短信控制台] 查看模板 ID */
        $req->TemplateID = "621662";
        /* 模板参数: 若无模板参数，则设置为空*/
        $req->TemplateParamSet = array("666");
        // 通过 client 对象调用 SendSms 方法发起请求。注意请求方法名与请求对象是对应的
        $resp = $client->SendSms($req);
        return $resp;
    }

}