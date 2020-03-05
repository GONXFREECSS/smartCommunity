// pages/info/add.js
var util = require('../../utils/util.js');
var app = getApp();
var token = wx.getStorageSync('token')

Page({
  data: {
    name: '',
    phone: '',
    idCard: '',
    housesId: '',
    img:[],
    pics:[],
    idTypes: [{ id: '', name: '请选择证件类型' }, { id: 0, name: '身份证' }],
    idType: 0,
    items: [
      { name: '0', value: '业主', checked: 'true' },
      { name: '1', value: '家属' },
      { name: '2', value: '租客' },
    ],
    multiArray: [],  // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标
    step: 0, // 默认显示请选择
  },
  bindIdcard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindhouse: function (e) {
    this.setData({
      houseId: e.detail.value
    })
  },
  setidtypes: function (e) {
    this.setData({
      idType: e.detail.value
    })
  },
  settypes: function (e) {
    this.setData({
      type: e.detail.value
    })
  },
  pickchange(e) {
    var length = this.data.multiIndex.length
    var houseId = this.data.storeList[this.data.multiIndex[length - 1]].id
    console.log(houseId)
    this.setData({
      step: 1,  // 更新，用来选择用户选中的门店
      multiIndex: e.detail.value,  // 更新下标字段
      housesId: houseId
    })
    console.log(this.data.housesId)
  },
  columnchange(e) {  // 滚动选择器 触发的事件
    var column = e.detail.column  // 当前改变的列
    var data = {
      multiIndex: JSON.parse(JSON.stringify(this.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(this.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value;  // 第几列改变了就是对应multiIndex的第几个，更新它
    switch (column) { // 处理不同的逻辑
      case 0:   // 第一列更改 就是省级的更改
        var currentProvinceKey = this.data.provinceList[e.detail.value].sqId
        if (currentProvinceKey != this.data.currnetProvinceKey) {  // 判断当前的key是不是真正的更新了
          this.getStorey(currentProvinceKey)  // 获取当前key下面的市级数据
        }

        data.multiIndex[1] = 0  // 将市默认选择第一个
        break;

      case 1:  // 市发生变化
        var currentCitykey = this.data.cityList[e.detail.value].id
        if (currentCitykey != this.data.currnetCityKey) {  // 同样判断
          this.getRoom(currentCitykey)   // 获取门店
        }
        data.multiIndex[2] = 0  // 门店默认为第一个
        break;
    }
    this.setData(data)  // 更新数据
  },

  uploadImg: function (e) {
    let that = this;
    var imgs = that.data.img
    var pics = that.data.pics
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://r7mgyt.natappfree.cc/api/sqwuye/common/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': token
          },
          success (res){
            var data =JSON.parse(res.data);
            imgs.push(data.url)
            pics.push('http://r7mgyt.natappfree.cc/'+data.url)
            console.log(imgs)
            that.setData({
              img:imgs,
              pics:pics
            })
            //do something
          }
        })
      }
    })

  },

  delete_this(e){
    var index= e.currentTarget.dataset.src
    var imgs = this.data.img
    var pics = this.data.pics
    console.log(imgs)
    imgs.splice(index,1)
    pics.splice(index,1)
    console.log(imgs)
    this.setData({
      img:imgs,
      pics:pics
    })
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    var that = this;
    console.log(data);
    data.housesId = this.data.housesId;
    data.img = this.data.img.join(',')
    if (data.name == '') {
      util.isError('请输入姓名', that);
      return false;
    }

    if (data.phone == '') {
      util.isError('请输入手机号码', that);
      return false;
    }

    if (data.idCard == '') {
      util.isError('请输入证件号码', that);
      return false;
    }

    if (data.idType == '') {
      util.isError('请选择证件类型', that);
      return false;
    }

    if (data.housesId == '') {
      util.isError('请选择房屋', that);
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(data.phone))) {
      util.isError('手机号码错误', that);
      return false;
    }

    wx.request({
      url: 'http://r7mgyt.natappfree.cc/api/sqwuye/app/isVerify/add',
      data: data,
      method: 'post',
      header: {
        'Authorization': token
      },
      success: function (res) {
        var data = res.data
        if (data.code == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'error'
          })
          return false;
        }
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
    util.clearError(that);
  },
  getCommunity() { // 获取社区数据
    var that = this;
    wx.request({
      url: 'http://r7mgyt.natappfree.cc/api/sqwuye/sq/getAllSqList',
      method: 'get',
      header: {
        'Authorization': token
      },
      success: function (res) {
        var data = res.data
        if (data.code == 0) {
          data = data.rep
          console.log(data)
          var provinceList = [...data] // 放在一个数组里面
          var provinceArr = data.map((item) => { return item.name }) // 获取数据里面的value值，就是只用数据的名称 
          that.setData({
            multiArray: [provinceArr, [], []], // 更新三维数组 更新后长这样 [['江苏省', '福建省'],[],[]]
            provinceList,   // 省级原始数据
            provinceArr    // 省级所有的名称
          })
          var defaultCode = that.data.provinceList[0].sqId  // 使用第一项当作参数获取市级数据
          if (defaultCode) {
            that.setData({
              currnetProvinceKey: defaultCode  // 保存在当前的省级key
            })
            that.getStorey(defaultCode)  // 获取市级数据
          }
        } else {

        }
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
  },
  getStorey(code) { // 获取楼栋数据
    var that = this;
    that.setData({
      currnetProvinceKey: code  // 保存当前选择的市级code
    })
    wx.request({
      url: 'http://r7mgyt.natappfree.cc/api/sqwuye/louDong/getLouDongList',
      data: { sqId: code },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token
      },
      success: function (res) {
        var data = res.data.sq
        var cityArr = data.map((item) => { return item.buildingName })
        var cityList = [...data]
        that.setData({
          multiArray: [that.data.provinceArr, cityArr, []],  // 更新三维数组 更新后长这样 [['江苏省', '福建省'], ['徐州市'], []]
          cityList,  // 保存下市级原始数据
          cityArr  // 市级所有的名称
        })
        var defaultCode = that.data.cityList[0].id  // 用第一个获取门店数据
        if (defaultCode) {
          that.setData({
            currnetCityKey: defaultCode  // 存下当前选择的城市key
          })
          that.getRoom(defaultCode) // 获取门店数据
        }
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
  },
  getRoom(code) { //获取房间数据
    var that = this;
    that.setData({
      currnetCityKey: code // 更新当前选择的市级key
    })
    wx.request({
      url: 'http://r7mgyt.natappfree.cc/api/sqwuye/houses/getRoomName',
      data: { louDongId: code },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token
      },
      success: function (res) {
        var data = res.data.roomName
        var storeList = [...data]
        var storeArr = data.map((item) => { return item.roomNumber })
        console.log(storeArr)
        that.setData({
          multiArray: [that.data.provinceArr, that.data.cityArr, storeArr],  // 重新赋值三级数组 此时的数组大概是这样 [['江苏省', '福建省'], ['徐州市'], ['徐州第一门店','徐州第二门店']]
          storeList,  // 保存下门店原始数据
          storeArr    // 保存下门店名称，可以不保存
        })
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
  },
  onLoad: function (options) {
    this.getCommunity()
  },
  onShow() {

  }
})