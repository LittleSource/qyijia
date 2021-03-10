<?php
/**
 * Article.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2021/2/28 11:18
 */

namespace app\common\controller;


use app\admin\model\User;
use Firebase\JWT\JWT;
use think\Controller;
use think\exception\DbException;
use UnexpectedValueException;

class Article extends Controller
{
    public function getArticleList(){
        $page = $this->request->post('page/d');
        try {
            $articleList = (new \app\common\model\Article)
                ->field('id,title,create_time')
                ->order('create_time','desc')
                ->paginate(10, false, ['page' => $page]);
            return ymJson(200,'ok',$articleList);
        } catch (DbException $e) {
            return ymJson(201,'查询失败',[]);
        }
    }

    public function getArticle(){
        $token = $this->request->header('token');
        if(!$token){
            return ymJson(201,'缺少token参数',[]);
        }
        try{
            $info = JWT::decode($token, config('jwt.salt'),['HS256']);
        }catch (UnexpectedValueException $e){
            return ymJson(401,'非法请求，权限不足',[]);
        }
        $user = User::get($info->uid);
        if($user->type == 1){
            return ymJson(201,'暂无权限查看',[]);
        }else{
            $id = $this->request->post('id/d');
            $article = \app\common\model\Article::get($id);
            if ($article) {
                return ymJson(200,'ok',$article);
            }else{
                return ymJson(201,'查询失败',[]);
            }
        }
    }
}