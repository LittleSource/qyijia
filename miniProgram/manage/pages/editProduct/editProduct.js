const app = getApp()
const graceJS = require('../../../utils/grace.js');
const Upyun = require('../../../lib/upyun-wxapp-sdk');
const upyun = new Upyun({
    bucket: 'ym-file',
    operator: 'ymrw',
    getSignatureUrl: graceJS.baseUrl + 'common/up_yun/getSignature',
})
var _self = null
var eventChannel = null
Page({
    data: {
        id: 0,
        img: '',
        classify: [],
        index: 0, //分类索引
        title: '',
        labels: '',
        price: '',
        introduce: ''
    },
    onLoad: function (options) {
        _self = this
        eventChannel = this.getOpenerEventChannel()
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'manage/classify/getlist', {}, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                _self.setData({
                    classify: res
                })
            }
        )
        //判断添加还是修改
        if (parseInt(options.isadd) !== 1) {
            graceJS.setNavBar({
                title: '修改商品'
            })
            eventChannel.on('proData', function (data) {
                _self.setData({
                    id: data.id,
                    img: data.img,
                    index: data.classIndex, //分类索引
                    title: data.title,
                    labels: data.labels,
                    price: data.price,
                    introduce: data.introduce
                })
            })
        }
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
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    formSubmit: function (e) {

    }
})