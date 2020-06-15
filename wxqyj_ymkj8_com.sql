-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-06-15 12:31:03
-- 服务器版本： 5.7.30-log
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wxqyj_ymkj8_com`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL COMMENT 'id',
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户id',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `phone` varchar(12) NOT NULL COMMENT '联系电话',
  `gender` tinyint(2) NOT NULL COMMENT '性别0女；1男',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `address_detail` varchar(255) DEFAULT '' COMMENT '地址详情',
  `house_num` varchar(30) NOT NULL COMMENT '门牌号',
  `longitude` float(255,6) NOT NULL COMMENT '经度',
  `latitude` float(255,6) NOT NULL COMMENT '维度',
  `tag` tinyint(255) NOT NULL COMMENT '标签0其他 1家 2公司 3学校',
  `is_default` tinyint(255) NOT NULL COMMENT '0不是 1是',
  `is_delete` tinyint(255) DEFAULT '0' COMMENT '软删除',
  `update_time` datetime NOT NULL COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`id`, `user_id`, `name`, `phone`, `gender`, `address`, `address_detail`, `house_num`, `longitude`, `latitude`, `tag`, `is_default`, `is_delete`, `update_time`) VALUES
(10, 10000, '俞旭源', '15609319042', 1, '吾悦华府', '天津市津南区咸水沽二道桥月牙河公园附近', '掉三级', 117.376030, 38.977283, 1, 1, 0, '2020-06-14 20:13:38');

-- --------------------------------------------------------

--
-- 表的结构 `fund`
--

CREATE TABLE `fund` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `type` tinyint(2) NOT NULL COMMENT '0支出 ；1收入',
  `price` decimal(10,2) NOT NULL COMMENT '账变金额',
  `content` varchar(100) NOT NULL COMMENT '支出或收入说明',
  `classification` varchar(100) NOT NULL COMMENT '分类',
  `add_time` datetime NOT NULL COMMENT '时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `fund`
--

INSERT INTO `fund` (`id`, `user_id`, `type`, `price`, `content`, `classification`, `add_time`) VALUES
(1, 6, 1, '16.00', '订单213213', '接单收入', '2020-05-15 23:05:48'),
(2, 6, 0, '2.00', '订单3', '提现', '2020-05-13 23:05:48'),
(3, 6, 1, '4.00', '订单4', '接单收入', '2020-04-13 23:05:48'),
(4, 6, 1, '5.00', '订单4', '接单收入', '2020-04-15 23:05:48'),
(5, 6, 1, '88.00', '订单0', '接单收入', '2020-03-15 23:05:48'),
(6, 6, 1, '75.78', '2020053019060850575', '接单收入', '2020-05-30 19:20:21'),
(7, 6, 0, '1.70', '提现', '平台系统更改', '2020-06-08 20:21:35'),
(10, 6, 0, '50.00', '提现', '平台系统更改', '2020-06-08 20:30:53');

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE `order` (
  `id` varchar(25) NOT NULL COMMENT '订单号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `shop_id` int(11) NOT NULL COMMENT '商铺id',
  `address_id` int(11) NOT NULL COMMENT '地址id',
  `shop_title` varchar(255) NOT NULL COMMENT '商铺名称',
  `shopping_cart` json NOT NULL COMMENT '购买的商品',
  `price_sum` decimal(10,2) NOT NULL COMMENT '商铺总价',
  `real_sum` decimal(10,2) NOT NULL COMMENT '真实总价',
  `delivery_price` tinyint(10) NOT NULL COMMENT '配送费',
  `remark` varchar(255) DEFAULT NULL COMMENT '订单备注',
  `real_pay` decimal(10,2) DEFAULT NULL COMMENT '实际付款',
  `create_time` datetime NOT NULL COMMENT '创建订单时间',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '订单状态 0完成 1待付 2待接单 3待送达 4退款中 5已退款'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) UNSIGNED NOT NULL COMMENT '商品id',
  `shop_id` int(11) UNSIGNED NOT NULL COMMENT '店铺id',
  `classify_id` int(11) UNSIGNED NOT NULL COMMENT '分类id',
  `title` varchar(20) NOT NULL COMMENT '商品名称',
  `img` varchar(255) DEFAULT NULL COMMENT '商品主图',
  `labels` varchar(30) DEFAULT '' COMMENT '商品标签；多个以$隔开  api传出以数组形式',
  `price` decimal(10,2) NOT NULL COMMENT '商品售价',
  `introduce` text COMMENT '商品介绍，例如如何制作、配料等',
  `add_time` datetime NOT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表' ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `shop_id`, `classify_id`, `title`, `img`, `labels`, `price`, `introduce`, `add_time`) VALUES
(1, 1, 3, '红烧狮子头', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403314216&di=301f13421be3254ace5641c6c788b4da&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180826%2F68bfdaed20474657b3a7b7ad29d9778e.jpeg', '丸子$红烧$酱油', '26.60', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 12:21:16'),
(2, 1, 1, '炸酱面', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403405411&di=7e90903d6b1cab70fece6210bc046270&imgtype=0&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F6%2F3%2Ff%2Fyuan_6326eeac1b40db77ee0f37edccd5177f.jpg', '卤味$不辣$北方', '15.00', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 12:22:56'),
(3, 1, 1, '刀削面', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403484716&di=e36bd62e3a512004a05540f0355a81ca&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fm6%2FM09%2FE5%2F05%2FwKhQoVcLD6OEAbsfAAAAAO6rXbs588.jpg', '山西风味$美食', '13.00', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 12:23:45'),
(4, 1, 2, '凉拌猪耳朵', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg', '猪耳$麻辣', '19.88', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 13:32:57'),
(5, 1, 1, '金银馒头', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407749723&di=b4a29c1db9083733c3061b340c4a2c87&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2016%2F01%2F13%2FFkZTGhRXDuroKZrRPGxuhwARbeI6.jpg%2521730x0.jpg', '面食$奶油', '9.99', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 13:35:18'),
(6, 1, 2, '麻辣海带丝', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg', '麻辣$海带', '12.00', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 13:38:55'),
(7, 1, 5, '麻辣小龙虾', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg', '小龙虾$麻辣', '38.88', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:25:51'),
(8, 1, 6, '青椒土豆丝盖饭', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg', '土豆丝$辣椒', '18.88', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:26:59'),
(9, 1, 11, ' 牛腩炒河粉', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414564430&di=8b2d7d8c18943a3b05be4cb7756b5881&imgtype=0&src=http%3A%2F%2Fpic.pingguolv.com%2Fuploads%2Fallimg%2F180920%2F77-1P920150129.jpg', '牛腩$炒粉', '22.00', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:28:28'),
(10, 1, 7, '花盛料理', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414632303&di=6c757d593820543e654be5a27c547353&imgtype=0&src=http%3A%2F%2Fimg.91jm.com%2F2018%2F01%2Fn61H8zm27e56.jpg', '日韩$料理', '58.88', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:29:37'),
(11, 1, 8, '肯德基*汉堡', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2319893647,136711391&fm=26&gp=0.jpg', '汉堡$鸡肉$快餐', '18.88', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:33:00'),
(12, 1, 9, '凉皮', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4034137002,1291263122&fm=26&gp=0.jpg', '麻辣$特色', '9.99', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:33:51'),
(14, 1, 4, '王老吉', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588415012839&di=ce4ff003c680f0ae67f51afea87c399f&imgtype=0&src=http%3A%2F%2Fimages.3158.cn%2Fdata%2Fattachment%2Ftougao%2Farticle%2F2017%2F08%2F10%2F5349de20a93388d3ce0a0703f9f44691.jpg', '罐装$饮料', '3.00', '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:36:20'),
(17, 1, 3, '源梦哒', 'http://ym-file.test.upcdn.net/qyj/product/VQ2zHTkYn38uS9OK.jpeg!qyj.product', '美丽$很美', '18.99', '但萨简单爱静定骄傲看定价', '2020-05-27 15:38:32'),
(20, 1, 5, 'QQ', 'http://ym-file.test.upcdn.net/qyj/product/Cnxp4AoCQtgQcqi2.png!qyj.product', '爱三单', '18.90', '朵拉快递领啦矿大框', '2020-05-27 15:49:27'),
(24, 1, 5, '炒面片', 'http://ym-file.test.upcdn.net/qyj/product/P0VM5kxepbGoEqy7.jpeg!qyj.product', '香辣$美味', '18.00', '自己搞的非常棒', '2020-05-27 16:15:15'),
(25, 2, 12, '情人玫瑰', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592123378586&di=d480017ddb08da4e0a06b70f8d97dbeb&imgtype=0&src=http%3A%2F%2Ftgi12.jia.com%2F119%2F750%2F19750005.jpg', '魅力$爱情', '18.80', '玫瑰花', '2020-06-14 13:40:55'),
(26, 2, 12, '白玫瑰', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592123413925&di=95a41c2a9bfb5448a1e97aaee9431e88&imgtype=0&src=http%3A%2F%2Fpic25.photophoto.cn%2F20121217%2F0035035745784851_b.jpg', '魅力$爱情', '28.80', '玫瑰花', '2020-06-14 13:40:55'),
(27, 2, 13, '手捧花', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592123459897&di=b070c21ff8938453cd6f54ddce630fc0&imgtype=0&src=http%3A%2F%2Fimg2.manshijian.com%2Fupload%2Fmember%2Fimage%2F31911%2Fbae6d5e7c903421b15d2452f463f90c9.jpg', '魅力$爱情', '23.80', '玫瑰花', '2020-06-14 13:40:55'),
(28, 2, 13, '仙人掌', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1496213138,1076103693&fm=26&gp=0.jpg', '魅力$有刺', '23.80', '仙人掌', '2020-06-14 13:40:55');

-- --------------------------------------------------------

--
-- 表的结构 `product_classify`
--

CREATE TABLE `product_classify` (
  `id` int(11) NOT NULL COMMENT '商品id',
  `shop_id` int(11) NOT NULL COMMENT '商铺id',
  `title` varchar(10) NOT NULL COMMENT '分类名称',
  `ord` int(11) NOT NULL COMMENT '排序'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分类表' ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `product_classify`
--

INSERT INTO `product_classify` (`id`, `shop_id`, `title`, `ord`) VALUES
(1, 1, '主食', 4),
(2, 1, '凉菜', 2),
(3, 1, '荤菜', 5),
(4, 1, '美味饮品', 10),
(5, 1, '热销菜肴', 1),
(6, 1, '盖饭', 3),
(7, 1, '日韩料理', 8),
(8, 1, '西式快餐', 9),
(9, 1, '特色小吃', 7),
(10, 1, '配料', 12),
(11, 1, '炒粉', 6),
(12, 2, '送礼', 1),
(13, 2, '盆栽', 2);

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE `shop` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'id',
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '关联user表id',
  `title` varchar(20) NOT NULL COMMENT '店铺名',
  `notice` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '' COMMENT '公告',
  `shop_img` varchar(255) NOT NULL COMMENT '店铺图标',
  `minimum` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '起送价',
  `qrcode` varchar(255) DEFAULT NULL COMMENT '小程序码url',
  `city` varchar(20) NOT NULL COMMENT '城市',
  `district` varchar(30) NOT NULL COMMENT '区',
  `address` varchar(20) NOT NULL COMMENT '位置',
  `longitude` float(30,6) NOT NULL COMMENT '经度 gcj02坐标系',
  `latitude` float(30,6) NOT NULL COMMENT '维度 gcj02坐标系',
  `status` tinyint(2) UNSIGNED NOT NULL DEFAULT '2' COMMENT '状态 0关闭 1正常',
  `open_status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '营业状态 1为营业 0为休息 ',
  `add_time` datetime NOT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `shop`
--

INSERT INTO `shop` (`id`, `user_id`, `title`, `notice`, `shop_img`, `minimum`, `qrcode`, `city`, `district`, `address`, `longitude`, `latitude`, `status`, `open_status`, `add_time`) VALUES
(1, 10000, '阿尔法餐厅2', '美食与我同行，我们一起创建美食新风尚买卖送得快', 'http://ym-file.test.upcdn.net/qyj/shop/oE4qJyqaA3x2Bnxe.jpeg!qyj.shop.avatar', 9, NULL, '天津市', '津南区', '天津津南吾悦广场', 117.375755, 38.977566, 1, 1, '2020-05-01 19:42:08'),
(2, 10001, '清鲜花店', '小店新开张，欢迎光临!', 'https://wx.qlogo.cn/mmopen/vi_32/Ng8hB2SGJTmshhu7tdz7CUhatic3swFO7XNKLyg1NdAO75rRWD75JiayOaEL8SXibfZseXVgSW40RcA7gtSibVGuBQ/132', 0, NULL, '深圳市', '福田区', '深圳会展中心', 114.059891, 22.530800, 1, 1, '2020-06-09 13:31:02');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL COMMENT '主键',
  `openid` varchar(255) NOT NULL DEFAULT '' COMMENT '用户openid',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像',
  `phone` varchar(12) DEFAULT NULL COMMENT '用户电话',
  `nickname` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '用户昵称',
  `type` tinyint(4) UNSIGNED NOT NULL DEFAULT '1' COMMENT '用户类型 :1|买家 2|卖家 ',
  `balance` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT '余额',
  `status` tinyint(4) UNSIGNED NOT NULL DEFAULT '1' COMMENT '1|正常 0|禁用',
  `addtime` datetime DEFAULT NULL COMMENT '添加时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `openid`, `avatar`, `phone`, `nickname`, `type`, `balance`, `status`, `addtime`) VALUES
(10000, 'omL5t5atV8kyM8ewvQdKJXHjE5cM', 'https://wx.qlogo.cn/mmopen/vi_32/ThDSia5wXgD8GT84qn43U40D0AwWl1mCgddEGfFHDQA7PyWxBjeZhgVPfk37b7IHHXrBnXatCp6icWgYXSeXibNxw/132', '15609319042', '源°🍃', 3, '27.08', 1, '2020-05-29 22:41:09'),
(10001, 'omL5t5TAwfq9vL9woVZKEn4yexJo', 'https://wx.qlogo.cn/mmopen/vi_32/Ng8hB2SGJTmshhu7tdz7CUhatic3swFO7XNKLyg1NdAO75rRWD75JiayOaEL8SXibfZseXVgSW40RcA7gtSibVGuBQ/132', '17320285191', '爱源梦，爱生活', 2, '0.00', 1, '2020-06-09 13:30:13'),
(10003, 'omL5t5ZK2vh4zZyQvicwpwLP67KA', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJsX1Nx8icxHXYiaTNdEgBscaPn5N0kAB5UydjFMldBQmj3CGOAAPE3ibiazL69micIE4Kl25HG5ORictiaQ/132', '13342920033', 'CHEN🇨🇳', 3, '0.00', 1, '2020-06-14 15:24:47'),
(10004, 'omL5t5fMUC4Hpq0i7hdLpmxcrUoc', 'https://wx.qlogo.cn/mmopen/vi_32/bhjrSibaDWCjxY2mwdyB0Y8IlXKE0odphfmaQ0mrdATZPZ60qfvoHfaC2qxKg8B8UM5mpTkPhRmz65bZavPAgicA/132', '13823563300', '龘荇忝芐（刘柏铭）', 1, '0.00', 1, '2020-06-14 17:30:14'),
(10005, 'omL5t5Tps7xkpP0GzNR_5W4pmuBM', 'https://wx.qlogo.cn/mmhead/F2e8RTbP02YibrwNk4NUPS3D1rqgUKIU1CZ4vMazSDkw/132', NULL, '赖秉竹', 1, '0.00', 1, '2020-06-15 10:23:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `fund`
--
ALTER TABLE `fund`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `product_classify`
--
ALTER TABLE `product_classify`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `user_openid` (`openid`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `fund`
--
ALTER TABLE `fund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=29;

--
-- 使用表AUTO_INCREMENT `product_classify`
--
ALTER TABLE `product_classify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=14;

--
-- 使用表AUTO_INCREMENT `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=10006;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
