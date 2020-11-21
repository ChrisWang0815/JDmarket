// pages/search/search.js
import request from '../../request/requset.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    goods: []
  },
  async searchItem(e) {
    let value = e.detail.value;
    let res = await request({ url: "/goods/qsearch", data: { query: value } })
    let goods = res.data.message
    this.setData({
      goods,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res = await request({ url: "/goods/qsearch", data: { query: options.value } })
    let goods = res.data.message
    this.setData({
      goods,
      value: options.value
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