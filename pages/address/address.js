// pages/address/address.js
const app = getApp()
const graceJS = require('../../utils/grace.js');
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        toggle: false,
        actions: [{
            name: '修改',
            color: '#fff',
            fontsize: '22',
            width: 60,
            //icon: 'like.png',//此处为图片地址
            background: '#ff7900'
        }, {
            name: '删除',
            color: '#fff',
            fontsize: '22',
            width: 60,
            //icon: 'like.png',//此处为图片地址
            background: '#ed3f14'
        }],
        addressList: [{
                name: '王大大',
                phone: '13888888888',
                address: '广东省深圳市南山区高新科技园中区一路',
                isDefault: 1
            },
            {
                name: '旺达',
                phone: '13888888888',
                address: '深圳市南山区高新科技园中区一路',
                isDefault: 0
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    handlerCloseButton(e) {
        let index = e.detail.index;
        //let item = e.detail.item;
        let menuTxt = this.data.actions[index].name;
        wx.showToast({
            title: "您点击了【" + menuTxt + "】按钮，列表id：",
            icon: "none"
        })
        //list中可以每一项都设置toggle
        setTimeout(() => {
            this.setData({
                toggle: this.data.toggle ? false : true
            });
        }, 200)
    },
    editAddr(e){
        graceJS.navigate('/pages/editAddress/editAddress')
    }
})