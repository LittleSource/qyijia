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
  resolutionAddress(latitude, longitude, success_) {
    this.qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) { //成功后的回调
        if (res.status === 0) {
          console.log(res)
          success_({
            province: res.result.address_component.province,
            city: res.result.address_component.city,
            area: res.result.address_component.district,
            address: res.result.address
          })
        } else {
          wx.showToast({
            title: '地址解析失败!' + res.message
          })
        }
      },
    })
  }
  chooseLocation() {
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + this.key + '&referer=麒亿家'
    });
  }
}
module.exports = Postition