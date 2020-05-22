const app = getApp()
const graceJS = require('../../utils/grace.js');
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
            _self.setData({
                imgUrl: res
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