const Position = require('../../utils/position')
const chooseLocation = requirePlugin('chooseLocation');
var _self = null
var position = new Position()
Page({
    data: {
        positionInfo: '定位中...',
        isGochooseLocationPage:false,//是否去过选择地址页面
        current: 0,
        tabbar: [{
            icon: "home",
            text: "首页",
            size: 21
        }, {
            icon: "category",
            text: "分类",
            size: 24
        }, {
            icon: "cart",
            text: "购物车",
            size: 22
        }, {
            icon: "people",
            text: "我的",
            size: 24
        }],
        banner: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg"
        ],
        category: [{
            img: "1.png",
            name: "超市百货"
        }, {
            img: "2.png",
            name: "优质蔬菜"
        }, {
            img: "3.png",
            name: "水果生鲜"
        }, {
            img: "4.png",
            name: "鲜花礼品"
        }, {
            img: "5.png",
            name: "送药到家"
        }],
        productList: [{
                img: 1,
                name: "珍珠酥皮鸡",
                sale: 48,
                factory: '珍45f',
                payNum: 2342
            },
            {
                img: 2,
                name: "黄豆芽排骨豆腐汤",
                sale: 29,
                factory: '小丸子',
                payNum: 999
            },
            {
                img: 3,
                name: "生爆盐煎肉",
                sale: 29,
                factory: '柔色尽情丝',
                payNum: 666
            },
            {
                img: 4,
                name: "酸辣臊子蹄筋",
                sale: 85,
                factory: '易掉',
                payNum: 236
            },
            {
                img: 5,
                name: "西湖醋鱼",
                sale: 599,
                factory: '闲零',
                payNum: 2399
            },
            {
                img: 6,
                name: "香酥鸡",
                sale: 35,
                factory: '闲零2',
                payNum: 2399
            },
            {
                img: 1,
                name: "清拌鸭丝儿",
                sale: 24,
                factory: '用户2',
                payNum: 2342
            },
            {
                img: 2,
                name: "三鲜鱼翅",
                sale: 29,
                factory: '用户3',
                payNum: 999
            },
            {
                img: 3,
                name: "熘鱼脯儿",
                sale: 25,
                factory: '用户2',
                payNum: 666
            },
            {
                img: 4,
                name: "烧花鸭",
                sale: 18,
                factory: '用户5',
                payNum: 236
            }
        ],
        pageIndex: 1,
        loadding: false,
        pullUpOn: true
    },
    onShow:function(){
        const location = chooseLocation.getLocation();
        if(this.data.isGochooseLocationPage && location instanceof Object){
            this.setData({
                positionInfo:location.name,
                isGochooseLocationPage:false
            })
            wx.startPullDownRefresh()
        }
    },
    onLoad: function (options) {
        _self = this
        position.getPostition(
            function success(res) {
                _self.setData({
                    positionInfo:res
                })
            },
            function fail(res,e) {
                _self.setData({
                    positionInfo:res
                })
            }
        )
    },
    onPullDownRefresh: function () {
        let loadData = JSON.parse(JSON.stringify(this.data.productList));
        loadData = loadData.splice(0, 10)
        this.setData({
            productList: loadData,
            pageIndex: 1,
            pullUpOn: true,
            loadding: false
        })
        setTimeout(function () {
            wx.stopPullDownRefresh()
        }, 2000)
    },
    onReachBottom: function () {
        if (!this.data.pullUpOn) return;
        this.setData({
            loadding: true
        }, () => {
            if (this.data.pageIndex == 4) {
                this.setData({
                    loadding: false,
                    pullUpOn: false
                })
            } else {
                let loadData = JSON.parse(JSON.stringify(this.data.productList));
                loadData = loadData.splice(0, 10)
                if (this.data.pageIndex == 1) {
                    loadData = loadData.reverse();
                }
                setTimeout(function() {
                    _self.setData({
                        productList: _self.data.productList.concat(loadData),
                        pageIndex: _self.data.pageIndex + 1,
                        loadding: false
                    })
                },2000)
            }
        })
    },
    chooseLocation(){
        this.setData({isGochooseLocationPage:true})
        position.chooseLocation()
    },
    detail: function () {
        wx.navigateTo({
            url: '/pages/shop/shop'
        })
    }
})