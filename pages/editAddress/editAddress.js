const graceJS = require('../../utils/grace.js');
const Position = require('../../utils/position')
const chooseLocation = requirePlugin('chooseLocation');
const app = getApp()
var _self = null
var position = new Position()
Page({
  data: {
    isChoosedPosition: false, //是否去过选择地址页面
    isAdd: true, //新增true  修改false
    isFirstOronlyOne: false, //是否第一次添加
    isDefault: true,
    id: 0,
    typeList: [{
      name: "家",
      value: 1
    }, {
      name: "公司",
      value: 2,
    }, {
      name: '学校',
      value: 3
    }, {
      name: '其他',
      value: 0
    }],
    currentTypeIndex: 0,
    name: '',
    gender: 1,
    phone: '',
    address: '',
    addressDetail: '',
    house_num: '',
    latitude: 0,
    longitude: 0,
  },
  onShow: function () {
    const location = chooseLocation.getLocation();
    if (this.data.isChoosedPosition && location) {
      this.setData({
        latitude: location.latitude,
        longitude: location.longitude,
        addressDetail: location.address,
        address: location.name,
        isChoosedPosition: false
      })
    }
  },
  onLoad: function (options) {
    _self = this
    let title = '添加地址'
    let isAdd_ = true
    if (parseInt(options.isadd) == 0) { //修改
      title = '修改地址'
      isAdd_ = false
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('addressData', (data) => { //监听传送过来的地址数据
        let typeIndex = 0
        for (let i = 0; i < this.data.typeList.length; i++) {
          if (this.data.typeList[i].value == data.tag) {
            typeIndex = i
            break
          }
        }
        this.setData({
          id: data.id,
          gender: data.gender,
          isDefault: data.is_default,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          phone: data.phone,
          address: data.address,
          currentTypeIndex: typeIndex,
          houseNum: data.house_num
        })
        if (parseInt(options.isonlyone)) { //只有一条地址
          this.setData({
            isFirstOronlyOne: true,
          })
        }
        console.log(data)
      })
    } else { //新增
      if (parseInt(options.isfirst)) { //第一次新增
        this.setData({
          isFirstOronlyOne: true,
        })
      }
    }
    this.setData({
      isAdd: isAdd_
    })
    graceJS.setNavBar({
      title: title
    })
  },
  chooseAddress: function () {
    this.setData({
      isChoosedPosition: true
    })
    position.chooseLocation()
  },
  changeGender: function (e) {
    this.setData({
      gender: parseInt(e.detail.value)
    })
  },
  changeType: function (e) {
    this.setData({
      currentTypeIndex: e.currentTarget.dataset.index
    })
    console.log(this.data.typeList[this.data.currentTypeIndex].value)
  },
  deleteAddress: function (e) {
    if (!this.data.id) {
      return
    }
    graceJS.showLoading('Loading...')
    graceJS.setAfter(() => {
      wx.hideLoading()
    })
    graceJS.post(
      'common/address/delete', {
        id: _self.data.id
      }, {}, {
        token: app.globalData.userInfo.token
      },
      (res) => {
        graceJS.msgSuccess('删除成功', () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        })
      }
    )
  }
})