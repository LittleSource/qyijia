/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : ym_qyj

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 09/06/2020 21:20:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `phone` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系电话',
  `gender` tinyint(2) NOT NULL COMMENT '性别0女；1男',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '地址',
  `address_detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '地址详情',
  `house_num` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '门牌号',
  `longitude` float(255, 6) NOT NULL COMMENT '经度',
  `latitude` float(255, 6) NOT NULL COMMENT '维度',
  `tag` tinyint(255) NOT NULL COMMENT '标签0其他 1家 2公司 3学校',
  `is_default` tinyint(255) NOT NULL COMMENT '0不是 1是',
  `is_delete` tinyint(255) NULL DEFAULT 0 COMMENT '软删除',
  `update_time` datetime(0) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (6, 10000, '源哥', '17320285191', 1, '中国银行监督管理委员会甘肃监管局', '甘肃省兰州市城关区瞿永刚民航', '8层185', 103.834999, 36.061108, 2, 0, 1, '2020-05-10 15:41:00');
INSERT INTO `address` VALUES (7, 10000, '小源呀', '15609319043', 1, '兰州新区火家湾保障房小区', '甘肃省兰州市皋兰县JK13号路与纬三十路交叉口西北方向140米', '49号楼2001', 103.721069, 36.560783, 1, 0, 0, '2020-05-10 15:53:29');
INSERT INTO `address` VALUES (8, 10000, '源哥', '17320258693', 1, '甘肃税务大厦', '甘肃省兰州市城关区金昌北路244号', '8层181', 103.839478, 36.060490, 2, 0, 0, '2020-05-10 20:42:32');
INSERT INTO `address` VALUES (9, 10000, '源哥', '13669337881', 1, '吾悦华府', '天津市津南区咸水沽二道桥月牙河公园附近', '15号楼1702', 117.376030, 38.977283, 1, 1, 0, '2020-06-09 21:10:10');

-- ----------------------------
-- Table structure for fund
-- ----------------------------
DROP TABLE IF EXISTS `fund`;
CREATE TABLE `fund`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `type` tinyint(2) NOT NULL COMMENT '0支出 ；1收入',
  `price` decimal(10, 2) NOT NULL COMMENT '账变金额',
  `content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '支出或收入说明',
  `classification` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类',
  `add_time` datetime(0) NOT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fund
-- ----------------------------
INSERT INTO `fund` VALUES (1, 6, 1, 16.00, '订单213213', '接单收入', '2020-05-15 23:05:48');
INSERT INTO `fund` VALUES (2, 6, 0, 2.00, '订单3', '提现', '2020-05-13 23:05:48');
INSERT INTO `fund` VALUES (3, 6, 1, 4.00, '订单4', '接单收入', '2020-04-13 23:05:48');
INSERT INTO `fund` VALUES (4, 6, 1, 5.00, '订单4', '接单收入', '2020-04-15 23:05:48');
INSERT INTO `fund` VALUES (5, 6, 1, 88.00, '订单0', '接单收入', '2020-03-15 23:05:48');
INSERT INTO `fund` VALUES (6, 6, 1, 75.78, '2020053019060850575', '接单收入', '2020-05-30 19:20:21');
INSERT INTO `fund` VALUES (7, 6, 0, 1.70, '提现', '平台系统更改', '2020-06-08 20:21:35');
INSERT INTO `fund` VALUES (10, 6, 0, 50.00, '提现', '平台系统更改', '2020-06-08 20:30:53');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `shop_id` int(11) NOT NULL COMMENT '商铺id',
  `address_id` int(11) NOT NULL COMMENT '地址id',
  `shop_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商铺名称',
  `shopping_cart` json NOT NULL COMMENT '购买的商品',
  `price_sum` decimal(10, 2) NOT NULL COMMENT '商铺总价',
  `real_sum` decimal(10, 2) NOT NULL COMMENT '真实总价',
  `delivery_price` tinyint(10) NOT NULL COMMENT '配送费',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '订单备注',
  `real_pay` decimal(10, 2) NULL DEFAULT NULL COMMENT '实际付款',
  `create_time` datetime(0) NOT NULL COMMENT '创建订单时间',
  `pay_time` datetime(0) NULL DEFAULT NULL COMMENT '支付时间',
  `status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '订单状态 0完成 1待付 2待接单 3待送达 4退款中 5已退款',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('2020051021492415468', 6, 1, 8, '欢乐大家族', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"addtime\": \"2020-05-02 15:25:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}]', 70.76, 73.76, 3, '', 73.76, '2020-05-10 21:49:24', NULL, 3);
INSERT INTO `order` VALUES ('2020051022372631743', 6, 1, 8, '欢乐大家族', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"addtime\": \"2020-05-02 15:25:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}]', 70.76, 73.76, 3, '', 73.76, '2020-05-10 22:37:26', NULL, 3);
INSERT INTO `order` VALUES ('2020051115002212168', 6, 1, 8, '欢乐大家族', '[{\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 8, \"img\": \"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"青椒土豆丝盖饭\", \"labels\": [\"土豆丝\", \"辣椒\"], \"addtime\": \"2020-05-02 15:26:59\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 2, \"classify_id\": 6}, {\"id\": 2, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403405411&di=7e90903d6b1cab70fece6210bc046270&imgtype=0&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F6%2F3%2Ff%2Fyuan_6326eeac1b40db77ee0f37edccd5177f.jpg\", \"count\": 1, \"price\": \"15.00\", \"title\": \"炸酱面\", \"labels\": [\"卤味\", \"不辣\", \"北方\"], \"addtime\": \"2020-05-02 12:22:56\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 3, \"classify_id\": 1}, {\"id\": 3, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403484716&di=e36bd62e3a512004a05540f0355a81ca&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fm6%2FM09%2FE5%2F05%2FwKhQoVcLD6OEAbsfAAAAAO6rXbs588.jpg\", \"count\": 1, \"price\": \"13.00\", \"title\": \"刀削面\", \"labels\": [\"山西风味\", \"美食\"], \"addtime\": \"2020-05-02 12:23:45\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 3, \"classify_id\": 1}]', 58.88, 61.88, 3, '', 61.88, '2020-05-11 15:00:22', NULL, 3);
INSERT INTO `order` VALUES ('2020051119120160511', 6, 1, 8, '欢乐大家族', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"addtime\": \"2020-05-02 15:25:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 8, \"img\": \"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"青椒土豆丝盖饭\", \"labels\": [\"土豆丝\", \"辣椒\"], \"addtime\": \"2020-05-02 15:26:59\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 2, \"classify_id\": 6}]', 89.64, 92.64, 3, '', 92.64, '2020-05-11 19:12:01', NULL, 0);
INSERT INTO `order` VALUES ('2020051119140386315', 6, 1, 8, '欢乐大家族', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"addtime\": \"2020-05-02 15:25:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 8, \"img\": \"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"青椒土豆丝盖饭\", \"labels\": [\"土豆丝\", \"辣椒\"], \"addtime\": \"2020-05-02 15:26:59\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 2, \"classify_id\": 6}]', 89.64, 92.64, 3, '', 92.64, '2020-05-11 19:14:03', NULL, 4);
INSERT INTO `order` VALUES ('2020051215165595367', 6, 1, 8, '欢乐大家族', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"addtime\": \"2020-05-02 15:25:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 8, \"img\": \"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"青椒土豆丝盖饭\", \"labels\": [\"土豆丝\", \"辣椒\"], \"addtime\": \"2020-05-02 15:26:59\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 2, \"classify_id\": 6}, {\"id\": 2, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403405411&di=7e90903d6b1cab70fece6210bc046270&imgtype=0&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F6%2F3%2Ff%2Fyuan_6326eeac1b40db77ee0f37edccd5177f.jpg\", \"count\": 1, \"price\": \"15.00\", \"title\": \"炸酱面\", \"labels\": [\"卤味\", \"不辣\", \"北方\"], \"addtime\": \"2020-05-02 12:22:56\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 3, \"classify_id\": 1}]', 104.64, 107.64, 3, '', 107.64, '2020-05-12 15:16:55', NULL, 0);
INSERT INTO `order` VALUES ('2020051215400373041', 6, 1, 8, '欢乐大家族', '[{\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 8, \"img\": \"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"青椒土豆丝盖饭\", \"labels\": [\"土豆丝\", \"辣椒\"], \"addtime\": \"2020-05-02 15:26:59\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 2, \"classify_id\": 6}, {\"id\": 2, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403405411&di=7e90903d6b1cab70fece6210bc046270&imgtype=0&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F6%2F3%2Ff%2Fyuan_6326eeac1b40db77ee0f37edccd5177f.jpg\", \"count\": 1, \"price\": \"15.00\", \"title\": \"炸酱面\", \"labels\": [\"卤味\", \"不辣\", \"北方\"], \"addtime\": \"2020-05-02 12:22:56\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 3, \"classify_id\": 1}, {\"id\": 3, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403484716&di=e36bd62e3a512004a05540f0355a81ca&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fm6%2FM09%2FE5%2F05%2FwKhQoVcLD6OEAbsfAAAAAO6rXbs588.jpg\", \"count\": 1, \"price\": \"13.00\", \"title\": \"刀削面\", \"labels\": [\"山西风味\", \"美食\"], \"addtime\": \"2020-05-02 12:23:45\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 3, \"classify_id\": 1}]', 78.76, 81.76, 3, '', 81.76, '2020-05-12 15:40:03', '2020-05-13 21:49:18', 0);
INSERT INTO `order` VALUES ('2020051216280770532', 6, 1, 8, '欢乐大家族', '[{\"id\": 11, \"img\": \"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2319893647,136711391&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"肯德基*汉堡\", \"labels\": [\"汉堡\", \"鸡肉\", \"快餐\"], \"addtime\": \"2020-05-02 15:33:00\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 7, \"classify_id\": 8}, {\"id\": 12, \"img\": \"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4034137002,1291263122&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"9.99\", \"title\": \"凉皮\", \"labels\": [\"麻辣\", \"特色\"], \"addtime\": \"2020-05-02 15:33:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 8, \"classify_id\": 9}]', 28.87, 31.87, 3, '', 31.87, '2020-05-16 16:28:07', '2020-05-08 21:49:15', 0);
INSERT INTO `order` VALUES ('2020051722302825419', 6, 1, 8, '欢乐大家族', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"addtime\": \"2020-05-02 15:25:51\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 8, \"img\": \"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg\", \"count\": 1, \"price\": \"18.88\", \"title\": \"青椒土豆丝盖饭\", \"labels\": [\"土豆丝\", \"辣椒\"], \"addtime\": \"2020-05-02 15:26:59\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 2, \"classify_id\": 6}]', 89.64, 92.64, 3, '', 92.64, '2020-05-17 22:30:28', '2020-05-06 21:49:10', 3);
INSERT INTO `order` VALUES ('2020051723004798304', 6, 1, 8, '欢乐大家族', '[{\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"addtime\": \"2020-05-02 13:32:57\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}, {\"id\": 6, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg\", \"count\": 1, \"price\": \"12.00\", \"title\": \"麻辣海带丝\", \"labels\": [\"麻辣\", \"海带\"], \"addtime\": \"2020-05-02 13:38:55\", \"shop_id\": 1, \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 1, \"class_index\": 1, \"classify_id\": 2}]', 31.88, 34.88, 3, '', 34.88, '2020-05-17 23:00:47', '2020-05-19 21:49:07', 3);
INSERT INTO `order` VALUES ('2020053019060850575', 6, 1, 8, '阿尔法餐厅2', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"shop_id\": 1, \"add_time\": \"2020-05-02 15:25:51\", \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 20, \"img\": \"http://ym-file.test.upcdn.net/qyj/product/Cnxp4AoCQtgQcqi2.png!qyj.product\", \"count\": 1, \"price\": \"18.90\", \"title\": \"QQ\", \"labels\": [\"爱三单\"], \"shop_id\": 1, \"add_time\": \"2020-05-27 15:49:27\", \"introduce\": \"朵拉快递领啦矿大框\", \"pro_index\": 1, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 24, \"img\": \"http://ym-file.test.upcdn.net/qyj/product/P0VM5kxepbGoEqy7.jpeg!qyj.product\", \"count\": 1, \"price\": \"18.00\", \"title\": \"炒面片\", \"labels\": [\"香辣\", \"美味\"], \"shop_id\": 1, \"add_time\": \"2020-05-27 16:15:15\", \"introduce\": \"自己搞的非常棒\", \"pro_index\": 2, \"class_index\": 0, \"classify_id\": 5}]', 75.78, 78.78, 3, '', 78.78, '2020-05-30 19:06:08', NULL, 3);
INSERT INTO `order` VALUES ('2020060921102329325', 10000, 1, 9, '阿尔法餐厅2', '[{\"id\": 7, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg\", \"count\": 1, \"price\": \"38.88\", \"title\": \"麻辣小龙虾\", \"labels\": [\"小龙虾\", \"麻辣\"], \"shop_id\": 1, \"add_time\": \"2020-05-02 15:25:51\", \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 20, \"img\": \"http://ym-file.test.upcdn.net/qyj/product/Cnxp4AoCQtgQcqi2.png!qyj.product\", \"count\": 1, \"price\": \"18.90\", \"title\": \"QQ\", \"labels\": [\"爱三单\"], \"shop_id\": 1, \"add_time\": \"2020-05-27 15:49:27\", \"introduce\": \"朵拉快递领啦矿大框\", \"pro_index\": 1, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 24, \"img\": \"http://ym-file.test.upcdn.net/qyj/product/P0VM5kxepbGoEqy7.jpeg!qyj.product\", \"count\": 1, \"price\": \"18.00\", \"title\": \"炒面片\", \"labels\": [\"香辣\", \"美味\"], \"shop_id\": 1, \"add_time\": \"2020-05-27 16:15:15\", \"introduce\": \"自己搞的非常棒\", \"pro_index\": 2, \"class_index\": 0, \"classify_id\": 5}, {\"id\": 4, \"img\": \"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg\", \"count\": 1, \"price\": \"19.88\", \"title\": \"凉拌猪耳朵\", \"labels\": [\"猪耳\", \"麻辣\"], \"shop_id\": 1, \"add_time\": \"2020-05-02 13:32:57\", \"introduce\": \"1、西红柿去皮切成块。\\r\\n\\r\\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\\r\\n\\r\\n3、锅放热油，下葱姜末爆香。\\r\\n\\r\\n4、放入西红柿快炒至浓稠。倒入番茄酱。\\r\\n\\r\\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。\", \"pro_index\": 0, \"class_index\": 1, \"classify_id\": 2}]', 95.66, 98.66, 3, '', NULL, '2020-06-09 21:10:23', NULL, 1);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `shop_id` int(11) UNSIGNED NOT NULL COMMENT '店铺id',
  `classify_id` int(11) UNSIGNED NOT NULL COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品主图',
  `labels` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '商品标签；多个以$隔开  api传出以数组形式',
  `price` decimal(10, 2) NOT NULL COMMENT '商品售价',
  `introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '商品介绍，例如如何制作、配料等',
  `add_time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 1, 3, '红烧狮子头', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403314216&di=301f13421be3254ace5641c6c788b4da&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180826%2F68bfdaed20474657b3a7b7ad29d9778e.jpeg', '丸子$红烧$酱油', 26.60, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 12:21:16');
INSERT INTO `product` VALUES (2, 1, 1, '炸酱面', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403405411&di=7e90903d6b1cab70fece6210bc046270&imgtype=0&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F6%2F3%2Ff%2Fyuan_6326eeac1b40db77ee0f37edccd5177f.jpg', '卤味$不辣$北方', 15.00, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 12:22:56');
INSERT INTO `product` VALUES (3, 1, 1, '刀削面', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588403484716&di=e36bd62e3a512004a05540f0355a81ca&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fm6%2FM09%2FE5%2F05%2FwKhQoVcLD6OEAbsfAAAAAO6rXbs588.jpg', '山西风味$美食', 13.00, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 12:23:45');
INSERT INTO `product` VALUES (4, 1, 2, '凉拌猪耳朵', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407580445&di=1ff5881d86d5a52a689b1095353a6114&imgtype=0&src=http%3A%2F%2Fm.cqhdzx.com%2Fup%2Fimg%2F20180207153510607042.jpg', '猪耳$麻辣', 19.88, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 13:32:57');
INSERT INTO `product` VALUES (5, 1, 1, '金银馒头', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407749723&di=b4a29c1db9083733c3061b340c4a2c87&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2016%2F01%2F13%2FFkZTGhRXDuroKZrRPGxuhwARbeI6.jpg%2521730x0.jpg', '面食$奶油', 9.99, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 13:35:18');
INSERT INTO `product` VALUES (6, 1, 2, '麻辣海带丝', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588407974799&di=0f18fb08bee52b9d34d2a2bfceb1351b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171122%2F0369da5302ab408bb1330178b9d3144f.jpeg', '麻辣$海带', 12.00, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 13:38:55');
INSERT INTO `product` VALUES (7, 1, 5, '麻辣小龙虾', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414408684&di=d34b075aa6eaaaad880ca13d4efcb511&imgtype=0&src=http%3A%2F%2Fimg.cwq.com%2F201706%2F1498276448815536.jpeg', '小龙虾$麻辣', 38.88, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:25:51');
INSERT INTO `product` VALUES (8, 1, 6, '青椒土豆丝盖饭', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2445315879,1160949812&fm=26&gp=0.jpg', '土豆丝$辣椒', 18.88, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:26:59');
INSERT INTO `product` VALUES (9, 1, 11, ' 牛腩炒河粉', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414564430&di=8b2d7d8c18943a3b05be4cb7756b5881&imgtype=0&src=http%3A%2F%2Fpic.pingguolv.com%2Fuploads%2Fallimg%2F180920%2F77-1P920150129.jpg', '牛腩$炒粉', 22.00, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:28:28');
INSERT INTO `product` VALUES (10, 1, 7, '花盛料理', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588414632303&di=6c757d593820543e654be5a27c547353&imgtype=0&src=http%3A%2F%2Fimg.91jm.com%2F2018%2F01%2Fn61H8zm27e56.jpg', '日韩$料理', 58.88, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:29:37');
INSERT INTO `product` VALUES (11, 1, 8, '肯德基*汉堡', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2319893647,136711391&fm=26&gp=0.jpg', '汉堡$鸡肉$快餐', 18.88, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:33:00');
INSERT INTO `product` VALUES (12, 1, 9, '凉皮', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4034137002,1291263122&fm=26&gp=0.jpg', '麻辣$特色', 9.99, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:33:51');
INSERT INTO `product` VALUES (14, 1, 4, '王老吉', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588415012839&di=ce4ff003c680f0ae67f51afea87c399f&imgtype=0&src=http%3A%2F%2Fimages.3158.cn%2Fdata%2Fattachment%2Ftougao%2Farticle%2F2017%2F08%2F10%2F5349de20a93388d3ce0a0703f9f44691.jpg', '罐装$饮料', 3.00, '1、西红柿去皮切成块。\r\n\r\n2、花菜洗干净掰成小朵，在沸水中焯8成熟，捞出备用。\r\n\r\n3、锅放热油，下葱姜末爆香。\r\n\r\n4、放入西红柿快炒至浓稠。倒入番茄酱。\r\n\r\n5、下菜花翻炒。等菜花熟透了就加糖、盐调味即可。', '2020-05-02 15:36:20');
INSERT INTO `product` VALUES (17, 1, 3, '源梦哒', 'http://ym-file.test.upcdn.net/qyj/product/VQ2zHTkYn38uS9OK.jpeg!qyj.product', '美丽$很美', 18.99, '但萨简单爱静定骄傲看定价', '2020-05-27 15:38:32');
INSERT INTO `product` VALUES (20, 1, 5, 'QQ', 'http://ym-file.test.upcdn.net/qyj/product/Cnxp4AoCQtgQcqi2.png!qyj.product', '爱三单', 18.90, '朵拉快递领啦矿大框', '2020-05-27 15:49:27');
INSERT INTO `product` VALUES (24, 1, 5, '炒面片', 'http://ym-file.test.upcdn.net/qyj/product/P0VM5kxepbGoEqy7.jpeg!qyj.product', '香辣$美味', 18.00, '自己搞的非常棒', '2020-05-27 16:15:15');

-- ----------------------------
-- Table structure for product_classify
-- ----------------------------
DROP TABLE IF EXISTS `product_classify`;
CREATE TABLE `product_classify`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `shop_id` int(11) NOT NULL COMMENT '商铺id',
  `title` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `ord` int(11) NOT NULL COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_classify
-- ----------------------------
INSERT INTO `product_classify` VALUES (1, 1, '主食', 4);
INSERT INTO `product_classify` VALUES (2, 1, '凉菜', 2);
INSERT INTO `product_classify` VALUES (3, 1, '荤菜', 5);
INSERT INTO `product_classify` VALUES (4, 1, '美味饮品', 10);
INSERT INTO `product_classify` VALUES (5, 1, '热销菜肴', 1);
INSERT INTO `product_classify` VALUES (6, 1, '盖饭', 3);
INSERT INTO `product_classify` VALUES (7, 1, '日韩料理', 8);
INSERT INTO `product_classify` VALUES (8, 1, '西式快餐', 9);
INSERT INTO `product_classify` VALUES (9, 1, '特色小吃', 7);
INSERT INTO `product_classify` VALUES (10, 1, '配料', 12);
INSERT INTO `product_classify` VALUES (11, 1, '炒粉', 6);

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '关联user表id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '店铺名',
  `notice` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT '公告',
  `shop_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '店铺图标',
  `minimum` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '起送价',
  `qrcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '小程序码url',
  `city` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '城市',
  `district` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区',
  `address` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '位置',
  `longitude` float(30, 6) NOT NULL COMMENT '经度 gcj02坐标系',
  `latitude` float(30, 6) NOT NULL COMMENT '维度 gcj02坐标系',
  `status` tinyint(2) UNSIGNED NOT NULL DEFAULT 2 COMMENT '状态 0关闭 1正常',
  `open_status` tinyint(2) NOT NULL DEFAULT 1 COMMENT '营业状态 1为营业 0为休息 ',
  `add_time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES (1, 10000, '阿尔法餐厅2', '美食与我同行，我们一起创建美食新风尚买卖送得快', 'http://ym-file.test.upcdn.net/qyj/shop/oE4qJyqaA3x2Bnxe.jpeg!qyj.shop.avatar', 9, NULL, '天津市', '津南区', '天津津南吾悦广场', 117.375755, 38.977566, 1, 1, '2020-05-01 19:42:08');
INSERT INTO `shop` VALUES (2, 10001, '爱源梦，爱生活', '小店新开张，欢迎光临!', 'https://wx.qlogo.cn/mmopen/vi_32/Ng8hB2SGJTmshhu7tdz7CUhatic3swFO7XNKLyg1NdAO75rRWD75JiayOaEL8SXibfZseXVgSW40RcA7gtSibVGuBQ/132', 0, NULL, '天津市', '津南区', '天津津南吾悦广场', 117.375755, 38.977566, 1, 1, '2020-06-09 13:31:02');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户电话',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户昵称',
  `type` tinyint(4) UNSIGNED NOT NULL DEFAULT 1 COMMENT '用户类型 :1|买家 2|卖家 ',
  `balance` decimal(20, 2) NOT NULL DEFAULT 0.00 COMMENT '余额',
  `status` tinyint(4) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1|正常 0|禁用',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '备注',
  `addtime` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_openid`(`openid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10000 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (10000, 'omL5t5atV8kyM8ewvQdKJXHjE5cM', 'https://wx.qlogo.cn/mmopen/vi_32/ThDSia5wXgD8GT84qn43U40D0AwWl1mCgddEGfFHDQA7PyWxBjeZhgVPfk37b7IHHXrBnXatCp6icWgYXSeXibNxw/132', '15609319042', '源°🍃', 3, 27.08, 1, '', '2020-05-29 22:41:09');
INSERT INTO `user` VALUES (10001, 'omL5t5TAwfq9vL9woVZKEn4yexJo', 'https://wx.qlogo.cn/mmopen/vi_32/Ng8hB2SGJTmshhu7tdz7CUhatic3swFO7XNKLyg1NdAO75rRWD75JiayOaEL8SXibfZseXVgSW40RcA7gtSibVGuBQ/132', '17320285191', '爱源梦，爱生活', 2, 0.00, 1, '', '2020-06-09 13:30:13');

SET FOREIGN_KEY_CHECKS = 1;
