<?php
// 应用公共文件
function ymJson($code, $msg, $data){
    return ['code'=>$code,'msg'=>$msg,'data'=>$data];
}

function curlGet($url){
    $ch=curl_init();
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt($ch,CURLOPT_NOBODY,0);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch,CURLOPT_URL,$url);
    $output= curl_exec($ch);
    curl_close($ch);
    return $output;
}