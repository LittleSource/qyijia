const graceJS = require('../../../utils/grace.js')
const app = getApp()
var _self = null
Page({
    data: {
        title: '',
        text: ''
    },
    inputTitle: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    inputText: function (e) {
        this.setData({
            text: e.detail.value
        })
    },
    submit: function () {
        if(this.data.title == '' || this.data.text == ''){
            return
        }
        graceJS.post(
            'admin/article/push', {
                title:this.data.title,
                text:this.data.text
            }, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                graceJS.msgSuccess("发布成功")
                setTimeout(()=>{
                    wx.navigateBack()
                },1500)
            }
        )
    }
})