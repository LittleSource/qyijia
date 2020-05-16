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
  calculateDistance(from, to, success_) {
    this.qqmapsdk.calculateDistance({
      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      from: from, //起点坐标，若为空默认当前地址
      to: to, //终点坐标
      success: function (res) { //成功后的回调
        if (res.status == 0) {
          success_(res.result.elements[0])
        } else {
          wx.showToast({
            title: '计算距离失败!' + res.message,
          })
        }
      },
      fail: function (error) {
        console.error(error);
      }
    })
  }
  chooseLocation() {
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + this.key + '&referer=麒亿家'
    });
  }
  navigateRoutePlan(name, latitude, longitude) {
    let endPoint = JSON.stringify({ //终点
      'name': name,
      'latitude': latitude,
      'longitude': longitude
    })
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + this.key + '&referer=麒亿家' + '&endPoint=' + endPoint
    })
  }
}
module.exports = Postition