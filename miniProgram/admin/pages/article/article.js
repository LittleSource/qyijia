const graceJS = require('../../../utils/grace.js')
let tui
const app = getApp()
var _self = null
Page({
    data: {
        newsList: [],
        pageIndex: 1,
        lastPage: 1,
        loadding: false,
        pullUpOn: true
    },
    onLoad: function (options) {
        _self = this
        wx.startPullDownRefresh()
    },
    onReady: function () {
        tui = this.selectComponent("#tui-message-ctx")
    },
    delete(e) {
        var news = this.data.newsList[e.currentTarget.dataset.index]
        wx.showModal({
            title: '提示',
            content: '确定要删除 ' + news.title + ' 吗？',
            success: (res) => {
                if (res.confirm) {
                    graceJS.post(
                        'admin/article/delete', {
                            id: news.id
                        }, {}, {
                            token: app.globalData.userInfo.token
                        }, (res) => {
                            graceJS.msgSuccess("删除成功")
                            wx.startPullDownRefresh()
                        }
                    )
                }
            }
        })
    },
    addOnClick(){
        wx.navigateTo({
          url: '/admin/pages/addArticle/addArticle',
        })
    },
    detail(e) {
        wx.navigateTo({
            url: '/pages/article/articleDetail/articleDetail?id=' + this.data.newsList[e.currentTarget.dataset.index].id
        })
    },
    //页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function () {
        graceJS.post(
            'common/article/getarticlelist', {
                page: 1
            }, {}, {}, (res) => {
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].create_time = graceJS.fromTime(graceJS.toTimeStamp(res.data[i].create_time))
                }
                _self.setData({
                    newsList: res.data,
                    lastPage: res.last_page,
                    pullUpOn: res.last_page != 1
                })
                wx.stopPullDownRefresh()
            }
        )
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        if (!this.data.pullUpOn) return;
        this.setData({
            loadding: true
        })
        if (this.data.pageIndex == this.data.lastPage) {
            this.setData({
                loadding: false,
                pullUpOn: false
            })
        } else {
            graceJS.post(
                'common/article/getarticlelist', {
                    page: this.data.pageIndex + 1
                }, {}, {}, (res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].create_time = graceJS.fromTime(graceJS.toTimeStamp(res.data[i].create_time))
                    }
                    this.setData({
                        newsList: this.data.newsList.concat(res.data),
                        pageIndex: this.data.pageIndex + 1,
                        loadding: false
                    })
                }
            )
        }
    },
    onShareAppMessage: function () {
        return {
            title: "麒亿家-创业资讯"
        }
    }
})