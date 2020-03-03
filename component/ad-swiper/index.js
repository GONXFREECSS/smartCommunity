// component/adswiper/index.js
const app = getApp()
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    indicatorDots: Boolean,
    autoplay: Boolean,
    duration: Number,
    interval: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    ad: [{
        cover: '/img/shequ.jpeg'
      },
      {
        cover: '/img/shequ2.jpg'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAd() {
      return new Promise((resolve, reject) => {
        // 没获取过广告则获取
        if (!app.globalData.ad.length) {
          util.req('adv/list', {}, (res) => {
            if (res.status === 1) {
              app.globalData.ad = res.list.map(item => {
                item.cover = app.globalData.URL + item.cover
                return item
              })
              resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })

    },
    setAd() {
      this.getAd()
        .then(() => {
          this.setData({
            ad: app.globalData.ad
          })
        })
    }
  },
  created() {
    // this.setAd()
  }
})