const graceJS = require('../../utils/grace.js');
const utils = require('../../utils/util.js');
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
    isDefault: false, //是否原本就是默认
    _isDefault: false, //form填写的默认情况
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
    houseNum: '',
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
    app.checkLogin()
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
          _isDefault: data.is_default,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          phone: data.phone,
          address: data.address,
          addressDetail: data.address_detail,
          currentTypeIndex: typeIndex,
          houseNum: data.house_num
        })
        if (parseInt(options.isonlyone)) { //只有一条地址
          this.setData({
            isFirstOronlyOne: true,
          })
        }
      })
    } else { //新增
      if (parseInt(options.isfirst)) { //第一次新增
        this.setData({
          isFirstOronlyOne: true,
          isDefault: true,
          _isDefault: true
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
  inputName: function (e) {
    this.setData({
      name: utils.trim(e.detail.value)
    })
    return utils.trim(e.detail.value)
  },
  changeGender: function (e) {
    this.setData({
      gender: parseInt(e.detail.value)
    })
  },
  inputPhone: function (e) {
    this.setData({
      phone: utils.trim(e.detail.value)
    })
    return utils.trim(e.detail.value)
  },
  inputHouse: function (e) {
    this.setData({
      houseNum: utils.trim(e.detail.value)
    })
    return utils.trim(e.detail.value)
  },
  changeDefault: function (e) {
    this.setData({
      _isDefault: e.detail.value
    })
  },
  changeType: function (e) {
    this.setData({
      currentTypeIndex: e.currentTarget.dataset.index
    })
  },
  checkForm: async function () {
    return new Promise((resolve, reject) => {
      if (utils.isEmpty(_self.data.name)) {
        reject('请填写联系人姓名!')
      } else if (utils.isEmpty(_self.data.phone)) {
        reject('请填写手机号!')
      } else if (!utils.isMobile(_self.data.phone)) {
        reject('手机号格式不正确~')
      } else if (utils.isEmpty(_self.data.address)) {
        reject('请选择收货地址!')
      } else if (utils.isEmpty(_self.data.houseNum)) {
        reject('请填写门牌号!')
      } else {
        resolve(false)
      }
    })
  },
  saveAddress: async function () {
    //表单验证
    try {
      await this.checkForm()
    } catch (error) {
      graceJS.msg(error)
      return
    }
    //发起请求
    graceJS.showLoading('Loading...')
    graceJS.setAfter(() => {
      wx.hideLoading()
    })
    graceJS.post(
      'common/address/addoredit', {
        is_add: _self.data.isAdd ? 1 : 0,
        is_default: _self.data._isDefault ? 1 : 0,
        id: _self.data.id,
        name: _self.data.name,
        phone: _self.data.phone,
        gender: _self.data.gender,
        address: _self.data.address,
        address_detail: _self.data.addressDetail,
        house_num: _self.data.houseNum,
        latitude: _self.data.latitude,
        longitude: _self.data.longitude,
        tag: _self.data.typeList[_self.data.currentTypeIndex].value,
      }, {}, {
        token: app.globalData.userInfo.token
      }, (res) => {
        graceJS.msgSuccess(_self.data.isAdd ? '添加成功!' : '修改成功', () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        })
      }
    )
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