//app.js
var util = require('./utils/util.js');

App({
  onLaunch: function () {
    var that = this;
    this.getTlist();
  },
  hasLogin: function () {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
      },
      fail: function (res) {
        wx.reLaunch({
          url: '/pages/toLogin/toLogin'
        })
      }
    });
  },
  //获取类别列表
  getTlist() {
    var self = this;
    wx.request({
      url: self.globalData.baseUrl + '/source/json/category.json',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //划分分类
        var _data = res.data.data, _tlist = [];
        //选出一级分类，放入firstType
        for (var x in _data) {
          if (_data[x].pid == 0) {
            _tlist.push({
              firstType: _data[x],
              second: []
            })
          }
          //判断是否存在二级分类
          if (self.globalData.navigate_type == 1 && _data[x].pid != 0) {
            self.globalData.navigate_type = 2;
          }
        }
        //如果存在二级分类
        if (self.globalData.navigate_type == 2) {
          //选出二级分类，放入对应的secondList
          for (var x in _data) {
            for (var y in _tlist) {
              if (_data[x].pid == _tlist[y].firstType.id) {
                _tlist[y].second.push(_data[x]);
              }
            }
          }
          //整理二级分类
          for (var x in _tlist) {
            //两行显示
            if (_tlist[x].second.length >= 10) {
              var _slist = _tlist[x].second;
              _tlist[x].secondList = [];
              _tlist[x].thirdList = [];
              for (var y in _slist) {
                if (y % 2) {
                  _tlist[x].thirdList.push(_slist[y]);
                } else {
                  _tlist[x].secondList.push(_slist[y]);
                }
              }
            }
          }
        } else {
          _tlist[0].secondList = [];
          _tlist[0].thirdList = [];
          for (var x in _tlist) {
            //两行显示
            if (_tlist.length >= 10) {
              if (x % 2) {
                _tlist[0].thirdList.push(_tlist[x].firstType);
              } else {
                _tlist[0].secondList.push(_tlist[x].firstType);
              }
            } else {
              _tlist[0].secondList.push(_tlist[x].firstType);
            }
          }
        }
        self.globalData.tlist = _tlist;
      }
    })
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
    ad: [],
    baseUrl: 'https://nginx.ngrok2.xiaomiqiu.cn',
    tlist: [],
    navigate_type:1,
  }
})