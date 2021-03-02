// admin/pages/index/index.js
var _self = null
Page({
    data: {
        urls: [
            '/admin/pages/shop/shop',
            '/admin/pages/order/order',
            '/admin/pages/addShop/addShop',
            '/admin/pages/article/article'
        ]
    },
    onLoad() {
        _self = this
    },
    href(e) {
        wx.navigateTo({
            url: _self.data.urls[e.currentTarget.dataset.index]
        })
    }
})