const graceJS = require('../../../utils/grace.js')
let tui
var _self = null
Page({
  data: {
    banner: [{
      img: "https://cdn.ymkj8.com/qyj/static/banan1.jpg",
      title: "这里有零元创业项目"
    }, {
      img: "https://cdn.ymkj8.com/qyj/static/banan2.jpg",
      title: "小成本撬动大财富"
    }],
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
  detail(e) {
    wx.navigateTo({
      url: '/pages/article/articleDetail/articleDetail?id=' + e.currentTarget.dataset.id
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
          lastPage: res.last_page
        })
        wx.stopPullDownRefresh();
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