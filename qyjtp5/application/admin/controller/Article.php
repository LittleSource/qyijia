<?php
/**
 * Article.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2021/3/2 15:22
 */

namespace app\admin\controller;


class Article extends BaseController
{
    public function delete(){
        $id = $this->request->post('id/d');
        if (\app\admin\model\Article::destroy($id)) {
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'删除失败',[]);
        }
    }

    public function push(){
        $title = $this->request->post('title');
        $text = $this->request->post('text');
        if((new \app\admin\model\Article)->save(['title'=>$title,'text'=>$text,'create_time'=>date('Y-m-d h:i:s')])){
            return ymJson(200,'ok',[]);
        }else{
            return ymJson(201,'发布失败',[]);
        }
    }
}