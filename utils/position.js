const QQMapWX = require('../lib/qqmap-wx-jssdk.min');
class Postition {
  qqmapsdk = null;
  key = 'TALBZ-ZN2KD-AYV45-PH7J3-Q2MPQ-DHFOG';
  constructor() {
    this.qqmapsdk = new QQMapWX({
      key: this.key
    });
  }
  getPostition(success_, fail_) {
    var _self = this
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success(res) {
        _self.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) { //成功后的回调
            success_(res.result.formatted_addresses.recommend)
          },
          fail: function (error) {
            fail_('定位失败，请点击选择', error)
          },
        })
      }
    })
  }
  chooseLocation(){
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + this.key + '&referer=麒亿家'
    });
  }
}
module.exports = Postition