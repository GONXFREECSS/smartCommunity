//app.js
var util = require('./utils/util.js');

App({
  onLaunch: function () {
    var that = this;
    this.hasUpdate()
  },
  hasLogin: function (fun) {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        fun()
      },
      fail: function (res) {
        wx.reLaunch({
          url: '/pages/toLogin/toLogin'
        })
      }
    });
  },
  getUser() {

  },
  login: function () {
    wx.reLaunch({
      url: '/pages/toLogin/toLogin'
    })
  },
  loginFail: function () {
    var that = this;
    wx.showModal({
      content: '登录失败，请允许获取用户信息,如不显示请删除小程序重新进入',
      showCancel: false
    });
    that.login();
  },
  setUserInfo: function (data) { //将用户信息缓存保存
    this.globalData.userInfo = data;
    wx.setStorage({
      key: "userInfo",
      data: data
    })
  },
  setSk: function (data) { //将用户信息缓存保存
    this.globalData.sk = data;
    wx.setStorage({
      key: "sk",
      data: data
    })
  },
  hasUpdate() {
    // 检查更新
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        // 监听更新完成事件（更新动作微信会自动触发，无需开发者调用）
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })

        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showToast({
            title: '更新失败！',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
          })
        })
      }
    })
  },
  globalData: {
    userInfo: '',
    sk: '',
    URL: "http://134.175.114.99",
    // URL: "https://happy.ngrok2.xiaomiqiu.cn/weixin",
    ad: [],
  }
})