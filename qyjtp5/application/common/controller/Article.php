<?php
/**
 * Article.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2021/2/28 11:18
 */

namespace app\common\controller;


use think\Controller;
use think\exception\DbException;

class Article extends Controller
{
    public function getArticleList(){
        $page = $this->request->post('page/d');
        try {
            $articleList = (new \app\common\model\Article)
                ->field('id,title,create_time')
                ->order('create_time','desc')
                ->paginate(6, false, ['page' => $page]);
            return ymJson(200,'ok',$articleList);
        } catch (DbException $e) {
            return ymJson(201,'查询失败',[]);
        }
    }

    public function getArticle(){
        $id = $this->request->post('id/d');
        $article = \app\common\model\Article::get($id);
        if ($article) {
            return ymJson(200,'ok',$article);
        }else{
            return ymJson(201,'查询失败',[]);
        }
    }
}