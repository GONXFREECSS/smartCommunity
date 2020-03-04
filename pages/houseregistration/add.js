// pages/info/add.js
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    idTypes: [{id:0,name:'身份证'}],
    idType: 0,
    types: [{id:0,name:'业主'},{id:1,name:'家属'},{id:2,name:'租客'}],
    type: 0,
  },
  setidTypes: function(e) {
    this.setData({
      idType: e.detail.value
    })
  },
  settypes:function(e){
    this.setData({
      type: e.detail.value
    })
  },
  uploadImg: function(e) {
    // let {
    //     pics
    // } = this.data;
    // if (pics.length == 3) {
    //     return;
    // }
    let that = this;
    wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
            let tempFilePaths = res.tempFilePaths
            let arr = that.uploadMutileimg({
                pictures: tempFilePaths
            })
        }
    })

},
  formSubmit: function(e) {
    var data = e.detail.value;
    var that = this;
    console.log(data);

    if (data.name == '') {
      util.isError('请输入姓名', that);
      return false;
    }

    if (data.phone == '') {
      util.isError('请输入手机号码', that);
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(data.phone))) {
      util.isError('手机号码错误', that);
      return false;
    }
    if (data.surplus == '0') {
      var arr = new Array('', '剩余空位', '乘车人数');
      util.isError('请选择' + arr[data.type], that);
      return false;
    }

    util.req('info/add', data, function(data) {
      if (data.status == 1) {
        wx.redirectTo({
          url: '/pages/info/index?id=' + data.info
        });
      } else {
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        })
        return false;
      }
    })
    util.clearError(that);
  },
  
  onLoad: function(options) {
  },
  onShow() {
   
  }
})