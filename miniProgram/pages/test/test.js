var graceJS = require('../../utils/grace');
const app = getApp()
var _self = null
Page({
    data: {
        
    },
    onLoad: function () {
        _self = this
        
    },
    inputChange(e) {
        this.data.lists[e.currentTarget.dataset.index].title = e.detail.value
        this.setData({
            lists: this.data.lists
        })
    },
})