const util = require('../../utils/util')
var _self = null
Page({
    data: {
        history: [
            "美洲杯",
            "D站观点",
            "C罗",
            "早安D站",
            "2019退役球星",
            "女神大会",
            "德利赫特",
            "托雷斯",
            "自热火锅",
            "华为手机",
            "有机酸奶"
        ],
        key: ""
    },
    onLoad: function (options) {
        _self = this
    },
    back: function () {
        wx.navigateBack();
    },
    input: function (e) {
        let key = util.trim(e.detail.value);
        this.setData({
            key: key
        })
    },
    cleanKey: function () {
        this.setData({
            key: ''
        });
    },
    clearHistory: function () {
        wx.showModal({
            title: '提示',
            content: '确认清空搜索历史吗？',
            success(res) {
                if (res.confirm) {
                    _self.setData({
                        history: []
                    })
                }
            }
        })
    }
})