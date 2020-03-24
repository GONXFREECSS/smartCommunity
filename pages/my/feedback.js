// pages/my/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pop:false,
    columns:['杭州', '宁波', '温州', '嘉兴', '湖州'],
    loading:false,
    field:'',
    imgs:[]
  },
  afterRead(event) {
    var imgs = this.data.imgs
    const { file } = event.detail;
    console.log(event.detail)
    imgs.push({"url":file.path})
    this.setData({
      imgs:imgs
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   }
    // });
  },
  typeIdPicker(){
    this.setData({
      pop:true,
      field:'typeId',
      columns:['类型','杭州',  '温州','宁波', '嘉兴', '湖州']
    })
  },
  villagIdPicker(){
    this.setData({
      pop:true,
      field:'villagId',
      columns:['小区','杭州',  '温州','宁波', '嘉兴', '湖州']
    })
  },
  houseIdPicker(){
    this.setData({
      pop:true,
      field:'houseId',
      columns:['房间','杭州',  '温州','宁波', '嘉兴', '湖州']
    })
  },
  buildingIdPicker(){
    this.setData({
      pop:true,
      field:'buildingId',
      columns:['楼栋','杭州',  '温州','宁波', '嘉兴', '湖州']
    })
  },
  onConfirm(event){
    var field = this.data.field
    if(field=='typeId'){
      this.setData({
        typeId:event.detail.value,
        pop:false
      })
    }else if(field=='villagId'){
      this.setData({
        villagId:event.detail.value,
        pop:false
      })
    }else if(field=='buildingId'){
      this.setData({
        buildingId:event.detail.value,
        pop:false
      })
    }else if(field=='houseId'){
      this.setData({
        houseId:event.detail.value,
        pop:false
      })
    }
    
  },
  onCancel(event){
    this.setData({
      pop:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})