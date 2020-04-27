Page({
    data: {
        tabbar: ["推荐分类", "进口超市", "国际名牌", "奢侈品", "海囤全球", "男装", "女装", "男鞋", "女鞋", "钟表珠宝", "手机数码"],
        scrollHeight: 100, //滚动视图高度
        capsuleTop: 100, //胶囊距离屏幕顶部的距离
        capsuleHeight: 15, //胶囊的高度
        currentTab: 0, //预设当前项的值
        scrollTop: 0, //tab标题的滚动条位置
        animationData:'',
        showModalStatus: false
    },
    onLoad: function (options) {
        wx.getSystemInfo({
            success: (res) => {
                var temp = res.windowWidth / 750
                this.setData({
                    scrollHeight: res.windowHeight - (temp * (400 + 100)), //400是顶部hearder高度 100是购物栏高度
                });
            }
        });
        var capsuleButton = wx.getMenuButtonBoundingClientRect() //获取胶囊的布局信息
        this.setData({
            capsuleHeight: capsuleButton.height,
            capsuleTop: capsuleButton.top
        });
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        let cur = e.currentTarget.dataset.current;
        if (this.data.currentTab == cur) {
            return false;
        } else {
            wx.pageScrollTo({
                scrollTop: 0
            })
            this.setData({
                currentTab: cur
            })
            this.checkCor();
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        let that = this;
        //这里计算按照实际情况进行修改，动态数据要进行动态分析
        //思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
        //数据很多可以多次if判断然后进行滚动距离计算即可
        if (that.data.currentTab > 7) {
            that.setData({
                scrollTop: 500
            })
        } else {
            that.setData({
                scrollTop: 0
            })
        }
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
    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({// 创建动画实例 
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        animation.translateY(500).step()//执行第一组动画：Y轴偏移500px后(盒子高度是500px) ，停
        //导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    hideModal: function () {
        this.setData({
            showModalStatus: false
        })
    },

})