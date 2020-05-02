const app = getApp()
Page({
    data: {
        userInfo:null
    },
    onShow:function (params) {
        this.setData({
            userInfo:app.globalData.userInfo
        })
    },
    onLoad: function (options) {

    },
    login() {
        //判断是否为登录状态
        if (this.data.userInfo === null) {
            let thisPagePath = '/pages/mine/mine'
            wx.navigateTo({
                url: '/pages/login/login?path=' + thisPagePath+'&type=1',
            })
        }else{
            //进入个人设置页面
        }
    },
    href(e) {
        let page = Number(e.currentTarget.dataset.type)
        let url = "";
        switch (page) {
            case 1:
                break;
            case 2:
                url = "../set/set"
                break;
            case 3:
                url = "../userInfo/userInfo"
                break;
            case 4:
                url = "../myOrder/myOrder"
                break;
            default:
                break;
        }
        if (url) {
            wx.navigateTo({
                url: url
            })
        } else {
            wx.showToast({
                title: "功能尚未完善~",
                icon: "none"
            })
        }
    }
})