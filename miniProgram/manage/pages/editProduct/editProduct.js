const app = getApp()
const graceJS = require('../../../utils/grace.js');
const utils = require('../../../utils/util.js');
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
        isAdd: true,
        id: 0,
        img: '',
        classify: [],
        index: 0, //分类索引
        title: '',
        labels: '',
        price: '',
        introduce: '',
        isEdit: false
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
                    isAdd: false,
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
        wx.previewImage({
            urls: [_self.data.img],
        })
    },
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    inputPrice(e) {
        this.setData({
            price: e.detail.value,
            isEdit: true
        })
    },
    inputLabels(e) {
        this.setData({
            labels: utils.trim(e.detail.value),
            isEdit: true
        })
        return this.data.labels
    },
    inputTitle(e) {
        this.setData({
            title: utils.trim(e.detail.value),
            isEdit: true
        })
        return this.data.title
    },
    inputIntroduce: function (e) {
        this.setData({
            introduce: e.detail.value,
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
        } else {
            var data = {
                img: this.data.img,
                title: this.data.title,
                labels: this.data.labels,
                price: this.data.price,
                introduce: this.data.introduce,
                classify_id: this.data.classify[this.data.index].id
            }
            if (!this.data.isAdd) {
                data.id = this.data.id
            }
            graceJS.showLoading('Loading...')
            graceJS.setAfter(() => {
                wx.hideLoading()
            })
            graceJS.post(
                'manage/product/addoredit', {
                    data: JSON.stringify(data)
                }, {}, {
                    token: app.globalData.userInfo.token
                }, (res) => {
                    graceJS.msgSuccess(_self.data.isAdd ? '添加成功!' : '修改成功', () => {
                        setTimeout(() => {
                            wx.navigateBack({
                                complete: () => {
                                    eventChannel.emit('isSuccess', true)
                                }
                            })
                        }, 1500)
                    })
                }
            )
        }
    }
})