import request from '../../request/requset.js'
// pages/category/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolltop: 0,
    left: [],
    currentIndex: 0,
    right: []

  },
  cateData: [],
  handleItem: function (e) {
    let index = e.currentTarget.dataset.index;
    let right = this.cateData[index].children;
    //console.log(right);
    this.setData({
      currentIndex: index,
      right,
      scrolltop: 0
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let localCateData = wx.getStorageSync('localCateData')

    if (!localCateData) {
      console.log('获取数据');
      this.getData()
    } else {
      if (Date.now - localCateData.time > 1000 * 60 * 60) {
        console.log('缓存过期');
        this.getData()
      } else {
        console.log('使用缓存');
        this.cateData = localCateData.data
        let left = this.cateData.map(v => v.cat_name)
        let right = this.cateData[0].children
        this.setData({
          left,
          right
        })
      }
    }
  },
  getData: async function () {
    let result1 = await request({ url: "/categories" })
    this.cateData = result1.data.message
    wx.setStorageSync('localCateData', { time: Date.now(), data: this.cateData })

    let left = this.cateData.map(v => v.cat_name)
    let right = this.cateData[0].children
    this.setData({
      left,
      right
    })
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