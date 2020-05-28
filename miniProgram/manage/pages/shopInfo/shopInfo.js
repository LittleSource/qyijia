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
        address: '',
        latitude: 0,
        longitude: 0,
        city: '',
        district: '',
        shopImg: '',
        title: '',
        minimum: 0,
        notice: '',
        openStatus: 1,
        isEdit: false
    },
    onShow: function () {
        const location = chooseLocation.getLocation();
        if (this.data.isChoosedPosition && location) {
            console.log(location)
            this.setData({
                city: location.city,
                district: location.district,
                address: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                isChoosedPosition: false
            })
        }
    },
    onLoad: function () {
        _self = this
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'manage/shop/getinfo', {}, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                _self.setData({
                    shopImg: res.shop_img,
                    title: res.title,
                    address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    city: res.city,
                    district: res.district,
                    minimum: res.minimum,
                    notice: res.notice,
                    openStatus: res.open_status
                })
            }
        )
    },
    chooseImage: function () {
        graceJS.chooseImgs({}, (res) => {
            wx.getImageInfo({
                src: res[0],
                success(res2) {
                    var imgName = '/qyj/shop/' + graceJS.uuid(16) + '.' + res2.type
                    graceJS.showLoading('上传中...')
                    upyun.upload({
                        localPath: res[0],
                        remotePath: imgName,
                        success: function (res3) {
                            _self.setData({
                                isEdit: true,
                                shopImg: graceJS.cdnUrl + imgName + '!qyj.shop.avatar'
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
        wx.previewImage({
            urls: [_self.data.shopImg],
        })
    },
    chooseLocation() {
        this.setData({
            isChoosedPosition: true,
            isEdit: true
        })
        position.chooseLocation()
    },
    switchChange(e) {
        this.setData({
            openStatus: e.detail.value ? 1 : 0,
            isEdit: true
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
        } else if (utils.isEmpty(this.data.title)) {
            graceJS.msg('请填写店铺名称!')
            return
        } else {
            graceJS.showLoading('Loading...')
            graceJS.setAfter(() => {
                wx.hideLoading()
            })
            var data = {
                shop_img: this.data.shopImg,
                title: this.data.title,
                address: this.data.address,
                latitude: this.data.latitude,
                longitude: this.data.longitude,
                city: this.data.city,
                district: this.data.district,
                minimum: isNaN(this.data.minimum) ? 0 : this.data.minimum,
                notice: this.data.notice,
                open_status: this.data.openStatus
            }
            graceJS.post(
                'manage/shop/update', {
                    data: JSON.stringify(data)
                }, {}, {
                    token: app.globalData.userInfo.token
                }, () => {
                    wx.navigateBack({
                        complete: () => {
                            graceJS.msgSuccess('修改成功!')
                        }
                    })
                }
            )
        }
    }
})