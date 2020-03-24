//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
    data: {
        avatar: '',
        phone: '',
        nickName: ''
    },
    onLoad: function () {

    },
    changePhone() {
        console.log('dddd')
        wx.navigateTo({
            url: '../my/changePhone'
        })
    },
    onShow: function () {
        var that = this
        wx.getStorage({
            key: "userInfo",
            success: function (res) {
                var userInfo = res.data
                that.setData({
                    avatar: userInfo.avatarUrl,
                    nickName: userInfo.nickName,
                    phone: userInfo.phone ? userInfo.phone : ''
                })
            }
        })
    },

})
