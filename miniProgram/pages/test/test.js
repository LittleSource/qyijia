var graceJS = require('../../utils/grace');
const app = getApp()
var _self = null
Page({
    data: {
        lists: [{
            title: '源哥1',
            ord: 0
        }, {
            title: '源哥2',
            ord: 1
        }, {
            title: '源哥3',
            ord: 2
        }, {
            title: '源哥4',
            ord: 3
        }]
    },
    onLoad: function () {
        app.checkLogin()
        _self = this
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'manage/classify/getlist', {}, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                console.log(res)
            }
        )
    },
    inputChange(e) {
        this.data.lists[e.currentTarget.dataset.index].title = e.detail.value
        this.setData({
            lists: this.data.lists
        })
    },
    delete(e) {
        var index = e.currentTarget.dataset.index
        if (this.data.lists[index].count > 0) {
            graceJS.msg('该分类下存在商品，无法删除')
        } else if (this.data.lists[index].isNew === 1) {
            this.data.lists.splice(index, 1)
            this.setData({
                lists: this.data.lists
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '确定删除 ' + _self.data.list[index].title + ' 分类吗？',
                success: function (res) {
                    if (res.confirm) {
                        _self.catesList.splice(index, 1);
                    }
                }
            })
        }
    },
    sortUp(e) {
        var index = e.currentTarget.dataset.index
        if (!index) {
            return
        }
        let ord = this.data.lists[index].ord
        this.data.lists[index].ord = this.data.lists[index - 1].ord
        this.data.lists[index - 1].ord = ord
        this.setData({
            lists: this.swapArray(this.data.lists, index, index - 1)
        })
    },
    sortDown(e) {
        var index = e.currentTarget.dataset.index
        if (index == this.data.lists.length - 1) {
            return
        }
        let ord = this.data.lists[index].ord
        this.data.lists[index].ord = this.data.lists[index + 1].ord
        this.data.lists[index + 1].ord = ord
        this.setData({
            lists: this.swapArray(this.data.lists, index, index + 1)
        })
    },
    swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    }
})