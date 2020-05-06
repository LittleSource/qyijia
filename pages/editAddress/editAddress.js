const graceJS = require('../../utils/grace.js');
const Position = require('../../utils/position')
const chooseLocation = requirePlugin('chooseLocation');
var _self = null
var position = new Position()
Page({
  data: {
    typeList: ["家", "公司", "学校", "其他"],
    currentTypeIndex: 0,
    gender:1,
    phone:'',
    province:'',
    city:'',
    area:'',
    address:'',
    roomNumber:'',
    latitude:0,
    longitude:0
  },
  onShow: function () {
    const location = chooseLocation.getLocation();
    if(location){
      console.log(location)
    }
  },
  onLoad: function (options) {
    graceJS.setNavBar({
      title: '添加地址'
    })
  },
  chooseAddress:function () {
    position.chooseLocation()
  },
  changeGender: function (e) {
    console.log(e.detail.value)
  },
  changeType: function (e) {
    this.setData({
      currentTypeIndex: e.currentTarget.dataset.index
    })
  }
})