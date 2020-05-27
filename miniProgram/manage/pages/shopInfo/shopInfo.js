const app = getApp()
const graceJS = require('../../../utils/grace.js')
const Position = require('../../../utils/position')
const chooseLocation = requirePlugin('chooseLocation')
const utils = require('../../../utils/util.js')
const Upyun = require('../../../lib/upyun-wxapp-sdk')
const upyun = new Upyun({
    bucket: 'ym-file',
    operator: 'ymrw',
    getSignatureUrl: graceJS.baseUrl + 'common/up_yun/getSignature',
})
const position = new Position()
var _self = null
Page({
    data: {
        isChoosedPosition: false,
        address: '天净沙撒海红昂家的',
        latitude: 0,
        longitude: 0,
        city: '',
        img: '',
        title: '',
        minimum: 0,
        notice: '',
        openStatus: 1,
        isEdit: false
    },
    onShow: function () {
        const location = chooseLocation.getLocation();
        if (this.data.isChoosedPosition && location) {
            this.setData({
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.name,
                isChoosedPosition: false
            })
        }
    },
    onLoad: function () {
        _self = this
        // graceJS.showLoading('Loading...')
        // graceJS.setAfter(() => {
        //     wx.hideLoading()
        // })
        // graceJS.post(
        //     'manage/classify/getlist', {}, {}, {
        //         token: app.globalData.userInfo.token
        //     }, (res) => {
        //         _self.setData({
        //             classify: res
        //         })
        //     }
        // )
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
                                isEdit: true,
                                img: graceJS.cdnUrl + imgName + '!qyj.product'
                            })
                            wx.hideLoading()
                        },
                        fail: function (e) {
                            graceJS.msg('上传失败！请稍后再试~')
                        }
                    })
                }
            })
        })
    },
    imgLongTap() {
        if (!this.data.img) {
            return
        }
        wx.previewImage({
            urls: [_self.data.img],
        })
    },
    chooseLocation() {
        this.setData({
            isChoosedPosition: true
        })
        position.chooseLocation()
    },
    switchChange(e) {
        this.setData({
            openStatus: e.detail.value ? 1 : 0
        })
    },
    inputTitle(e) {
        this.setData({
            title: utils.trim(e.detail.value),
            isEdit: true
        })
        return this.data.title
    },
    inputMinimum(e) {
        this.setData({
            minimum: parseInt(e.detail.value),
            isEdit: true
        })
    },
    inputNotice: function (e) {
        this.setData({
            notice: utils.trim(e.detail.value),
            isEdit: true
        })
    },
    formSubmit: function () {
        if (!this.data.isEdit) {
            graceJS.msg('数据未发生改变')
            return
        } else if (utils.isEmpty(this.data.img)) {
            graceJS.msg('请上传商品图片!')
            return
        } else if (utils.isEmpty(this.data.title)) {
            graceJS.msg('请填写商品名称!')
            return
        } else if (utils.isEmpty(this.data.price)) {
            graceJS.msg('请输入商品价格!')
            return
        } else {}
    }
})