let config = getApp().globalData.config;
Page({
    data: {
        config: config
    },
    onLoad: function (options) {},
    copy: function (e) {
        let text = e.currentTarget.dataset.text;
        wx.setClipboardData({
            data: text
        })
    },
    showQrcode(){
        var qrcode = this.data.config.qrcode
        wx.previewImage({
          urls: [qrcode],
        })
    }
})