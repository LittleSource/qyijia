var graceJS = require('../../../utils/grace');
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
        }],
        isEdit: false,
        focus: false,
        btnList: [{
            bgColor: "#16C2C2",
            text: "保存",
            fontSize: 26,
            color: "#fff"
        }, {
            bgColor: "#64B532",
            text: "新增",
            fontSize: 26,
            color: "#fff"
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
                for (let i = 0; i < res.length; i++) {
                    res[i].isNew = 0
                }
                _self.setData({
                    lists: res
                })
            }
        )
    },
    onClick(e) {
        if (e.detail.index) { //新增
            let classify = {
                title: '',
                ord: this.data.lists.length > 0 ? this.data.lists[this.data.lists.length - 1].ord + 1 : 1,
                isNew: 1
            }
            this.data.lists.push(classify)
            this.setData({
                lists: this.data.lists,
                isEdit: true
            })
            wx.pageScrollTo({
                scrollTop: 10000,
                duration: 300
            })
        } else {
            if (this.data.isEdit) {
                for (const classify of this.data.lists) {
                    if (classify.title.replace(/(^\s*)|(\s*$)/g, "") == '') {
                        graceJS.msg('分类名称不能为空')
                        return
                    }
                }
                graceJS.showLoading('Loading...')
                graceJS.setAfter(() => {
                    wx.hideLoading()
                })
                graceJS.post(
                    'manage/classify/updateData', {
                        data: JSON.stringify(_self.data.lists)
                    }, {}, {
                        token: app.globalData.userInfo.token
                    },
                    (res) => {
                        wx.navigateBack({
                            complete: () => {
                                graceJS.msgSuccess('保存成功')
                            }
                        })
                    }
                )
            } else {
                graceJS.msg('您还未作任何修改哦')
            }
        }
    },
    inputChange(e) {
        this.data.lists[e.currentTarget.dataset.index].title = e.detail.value
        this.setData({
            lists: this.data.lists,
            isEdit: true
        })
    },
    delete(e) {
        var index = e.currentTarget.dataset.index
        if (this.data.lists[index].isNew === 1) {
            this.data.lists.splice(index, 1)
            this.setData({
                lists: this.data.lists
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '确定删除 ' + _self.data.lists[index].title + ' 吗？',
                success: function (res) {
                    if (res.confirm) {
                        graceJS.showLoading('Loading...')
                        graceJS.setAfter(() => {
                            wx.hideLoading()
                        })
                        graceJS.post(
                            'manage/classify/delete', {
                                id: _self.data.lists[index].id
                            }, {}, {
                                token: app.globalData.userInfo.token
                            },
                            (res) => {
                                graceJS.msgSuccess('删除成功!')
                                _self.data.lists.splice(index, 1);
                                _self.setData({
                                    lists: _self.data.lists,
                                    isEdit: true
                                })
                            }
                        )
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
            lists: this.swapArray(this.data.lists, index, index - 1),
            isEdit: true
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
            lists: this.swapArray(this.data.lists, index, index + 1),
            isEdit: true
        })
    },
    swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    }
})