const app = getApp()
const graceJS = require('../../utils/grace.js');
const Upyun = require('../../lib/upyun-wxapp-sdk');
const upyun = new Upyun({
    bucket: 'ym-file',
    operator: 'ymrw',
    getSignatureUrl: graceJS.baseUrl + 'common/up_yun/getSignature',
})
var _self = null
Page({
    data: {
        imgUrl: '',
        classify: [{
                id: 0,
                title: '美国'
            },
            {
                id: 1,
                title: '中国'
            },
            {
                id: 2,
                title: '巴西'
            },
            {
                id: 3,
                title: '日本'
            }
        ],
        index: 0 //分类索引
    },
    onLoad: function (options) {
        _self = this
    },
    chooseImage: function () {
        graceJS.chooseImgs({}, (res) => {
            wx.getImageInfo({
                src: res[0],
                success(res2) {
                    var imgName = '/qyj/product/' + graceJS.uuid(16) + '.' + res2.type
                    graceJS.showLoading('上传中...')
                    upyun.upload({
                        localPath: res[0],
                        remotePath: imgName,
                        success: function (res3) {
                            _self.setData({
                                imgUrl: app.globalData.cdnUrl + imgName + '!qyj.product'
                            })
                            wx.hideLoading()
                        },
                        fail: function (e) {
                            console.log(e)
                        },
                    })
                }
            })
        })
    },
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    formSubmit: function (e) {

    }
})