const Position = require('../../utils/position')
const app = getApp()
const graceJS = require('../../utils/grace.js');
var _self = null
var position = new Position()
Page({
    data: {
        shopId: 1,
        classify: [], //商品分类
        product: [], //商品列表
        shopInfo: null,
        shoppingCart: [],
        priceSum: "0.00",
        countSum: 0,
        minimum: 0, //起送价
        good: {}, //modal展示的商品对象
        scrollHeight: 100, //滚动视图高度
        capsuleTop: 100, //胶囊距离屏幕顶部的距离
        capsuleHeight: 15, //胶囊的高度
        currentTab: 0, //预设当前项的值
        scrollTop: 0, //tab标题的滚动条位置
        showModalStatus: false, //展示购物车modal
        showGoodModal: false //展示商品modal
    },
    onLoad: function (options) {
        _self = this
        wx.getSystemInfo({
            success: (res) => {
                var temp = res.windowWidth / 750
                _self.setData({
                    scrollHeight: res.windowHeight - (temp * (400 + 100)), //400是顶部hearder高度 100是购物栏高度
                })
            }
        })
        var capsuleButton = wx.getMenuButtonBoundingClientRect() //获取胶囊的布局信息
        this.setData({
            capsuleHeight: capsuleButton.height,
            capsuleTop: capsuleButton.top,
            id: options.id ? parseInt(options.id) : 1
        })
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
            if (options.hasdata) {
                const eventChannel = this.getOpenerEventChannel()
                eventChannel.on('orderPage', function (data) {
                    //这个地方要处理下已下架的商品  !!!!未做
                    _self.setData({
                        shoppingCart: data.shopping_cart,
                        priceSum: data.price_sum,
                        countSum: data.count
                    })
                })
            }
        })
        graceJS.post(
            'shop/shop/getAllInfo', {
                id: _self.data.shopId
            }, {}, {},
            (res) => {
                _self.setData({
                    classify: res.classify,
                    product: res.product,
                    shopInfo: res.shopInfo,
                    minimum: parseFloat(res.shopInfo.minimum)
                })
                _self.initProduct()
                if (res.shopInfo.open_status == 0) {
                    wx.showModal({
                        title: '提示',
                        content: '该商家休息中,请稍后再来~',
                        showCancel: false,
                        complete: () => {
                            wx.navigateBack()
                        }
                    })
                }
            }
        )
    },
    initProduct: function () {
        let product_ = this.data.product
        for (let i = 0; i < this.data.classify.length; i++) {
            var classifyId = this.data.classify[i].id
            for (let j = 0; j < product_['classify' + classifyId].length; j++) {
                product_['classify' + classifyId][j].count = 0
                product_['classify' + classifyId][j].labels = product_['classify' + classifyId][j].labels.split("$")
            }
        }
        this.setData({
            product: product_
        })
    },
    routePlan: function () {
        position.navigateRoutePlan(this.data.shopInfo.title, this.data.shopInfo.latitude, this.data.shopInfo.longitude)
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        let index = e.currentTarget.dataset.current
        if (this.data.currentTab == index) {
            return false
        } else {
            this.setData({
                currentTab: index
            })
            this.checkCor(index)
        }
    },
    //判断设置右侧商品滚动
    checkCor: async function (index) {
        var scrollHeight_ = 0;
        if (index != 0) {
            for (let i = 0; i < index; i++) {
                let res = await graceJS.select('#class-' + this.data.classify[i].id)
                scrollHeight_ += res.height;
            }
        }
        _self.setData({
            scrollTop: scrollHeight_
        })
    },
    add(e) {
        let classIndex = e.currentTarget.dataset.classindex
        let proIndex = e.currentTarget.dataset.proindex
        //修改总count
        var countSum_ = ++this.data.countSum
        //修改商品count
        var proList_ = this.data.product
        proList_['classify' + this.data.classify[classIndex].id][proIndex].count++
        //添加购物车
        var shoppingCart_ = this.data.shoppingCart
        let pro = graceJS.copyDeep(proList_['classify' + this.data.classify[classIndex].id][proIndex]) //深拷贝
        pro.pro_index = proIndex
        pro.class_index = classIndex
        if (shoppingCart_.length > 0) { //如果购物车里有东西就要查重复的
            var findIndex = this.findProduct(pro)
            if (findIndex !== -1) { //如果查到有相同的商品
                shoppingCart_[findIndex].count++
            } else {
                shoppingCart_.push(pro)
            }
        } else {
            shoppingCart_.push(pro)
        }
        this.addReduceOver(countSum_, proList_, shoppingCart_)
    },
    reduce(e) {
        let classIndex = e.currentTarget.dataset.classindex
        let proIndex = e.currentTarget.dataset.proindex
        //修改总count
        let countSum_ = --this.data.countSum
        //修改商品count
        let proList_ = this.data.product
        proList_['classify' + this.data.classify[classIndex].id][proIndex].count--
        //删减购物车
        let pro = graceJS.copyDeep(proList_['classify' + this.data.classify[classIndex].id][proIndex]) //深拷贝
        let shoppingCart_ = this.data.shoppingCart
        let findIndex = this.findProduct(pro)
        shoppingCart_[findIndex].count--
        if (shoppingCart_[findIndex].count == 0) {
            shoppingCart_.splice(findIndex, 1)
            if (shoppingCart_.length == 0 && this.data.showModalStatus) {
                this.setData({
                    showModalStatus: false
                })
            }
        }
        this.addReduceOver(countSum_, proList_, shoppingCart_)
    },
    addReduceOver(countSum_, proList_, shoppingCart_) {
        //计算总金额
        var priceSum_ = 0.00
        for (let pro_ of shoppingCart_) {
            priceSum_ += pro_.count * pro_.price
        }
        this.setData({
            countSum: countSum_,
            priceSum: priceSum_.toFixed(2),
            product: proList_,
            shoppingCart: shoppingCart_
        })
    },
    /**
     * 从购物车shoppingCart查找商品
     * return 找到返回索引 未找到返回 -1
     */
    findProduct(pro) {
        var result = -1;
        for (let i = 0; i < this.data.shoppingCart.length; i++) {
            if (pro.id == this.data.shoppingCart[i].id) {
                result = i;
                break;
            }
        }
        return result;
    },
    changeNum(e) {
        e.currentTarget.dataset.classindex = this.data.shoppingCart[e.detail.index].class_index
        e.currentTarget.dataset.proindex = this.data.shoppingCart[e.detail.index].pro_index
        if (e.detail.type == 'reduce') {
            this.reduce(e)
        }
        if (e.detail.type == 'plus') {
            this.add(e)
        }
    },
    showGoodModal(e) {
        this.setData({
            good: e.currentTarget.dataset.good,
            showGoodModal: true
        })
    },
    hideGoodModal() {
        this.setData({
            showGoodModal: false
        })
    },
    showImg() {
        wx.previewImage({
            urls: [this.data.good.img],
        })
    },
    back() {
        let page = getCurrentPages()
        if (page.length > 1) {
            wx.navigateBack()
        } else {
            wx.switchTab({
                url: '/pages/index/index',
            })
        }
    },
    clearShoppingCart: function () {
        wx.showModal({
            title: '提示',
            content: '确定清空购物车吗？',
            success(res) {
                if (res.confirm) {
                    let product_ = _self.data.product
                    for (let i = 0; i < _self.data.classify.length; i++) {
                        var classifyId = _self.data.classify[i].id
                        for (let j = 0; j < product_['classify' + classifyId].length; j++) {
                            product_['classify' + classifyId][j].count = 0
                        }
                    }
                    _self.setData({
                        shoppingCart: [],
                        countSum: 0,
                        priceSum: "0.00",
                        showModalStatus: false,
                        product: product_
                    })
                    graceJS.msgSuccess('购物车已清空')
                }
            }
        })
    },
    showModal: function () {
        if (this.data.shoppingCart.length == 0) {
            graceJS.msg('购物车内空空如也~')
            return false
        }
        this.setData({
            showModalStatus: true
        })
    },
    hideModal: function () {
        this.setData({
            showModalStatus: false
        })
    },
    getShopPhone() {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'shop/shop/getShopPhone', {
                id: _self.data.shopId
            }, {}, {},
            (res) => {
                wx.makePhoneCall({
                    phoneNumber: res.phone,
                    fail: (e) => {
                        graceJS.msg('联系取消')
                    }
                })
            }
        )
    },
    submitOrder() {
        if (this.data.shoppingCart.length == 0 || this.data.shopInfo.open_status == 0) {
            return
        }
        app.globalData.goodsInfo.shopId = this.data.shopId
        app.globalData.goodsInfo.shopPosition = {
            latitude: this.data.shopInfo.latitude,
            longitude: this.data.shopInfo.longitude
        }
        app.globalData.goodsInfo.shoppingCart = this.data.shoppingCart
        app.globalData.goodsInfo.priceSum = this.data.priceSum
        if (app.globalData.userInfo === null) {
            graceJS.navigate('/pages/login/login?path=/pages/cashier/cashier')
        } else {
            graceJS.navigate('/pages/cashier/cashier')
        }
    }
})