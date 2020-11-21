// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    feetNum: 0,
    collectedNum: 0
  },
  //获取用户信息
  getUserInfo(e) {

    if (e.detail.rawData) {
      let userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', userInfo)
      this.setData({
        userInfo
      })
    }
  },
  show() {
    wx.showToast({
      title: '仅做展示用~',
    })
  },

  //查看订单列表
  getOrderList(e) {
    let { index } = e.currentTarget.dataset
    let payList = wx.getStorageSync('payList') || []
    if (payList.length > 0) {
      wx.navigateTo({
        url: '/pages/pay/index?index=' + index,
      })
    } else {
      wx.showToast({
        title: '您还没有订单哦~',
      })
    }
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
    let collected = wx.getStorageSync('collect') || [];
    let collectedNum = collected.length
    let feet = wx.getStorageSync('localDataGoods') || [];
    let feetNum = feet.length

    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo,
      feetNum,
      collectedNum
    })
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