<?php
/**
 * jwt.php
 * 作者:LittleSource
 * 网址:ymkj8.com
 * 创建时间:2020/5/117:17
 */
return [
    'salt'            =>        '74f37b9176d71af9',
    'jwt_config'      =>[
        "iss"             =>        "ymkj",  //签发者 可以为空
        "aud"             =>        "", //面象的用户，可以为空
        "iat"             =>        time(), //签发时间
        "nbf"             =>        time(), //在什么时候jwt开始生效
        "exp"             =>        time() + 259200, //token 过期时间 3天
    ]
];
