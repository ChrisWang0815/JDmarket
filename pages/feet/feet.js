// pages/feet/feet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feet: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let feet = wx.getStorageSync('feet');
    let now = Date.now()
    feet.forEach(v => {
      v.time = this.getDuration(now - v.time)
    })
    this.setData({
      feet,
    })
  },


  getDuration(my_time) {
    var days = my_time / 1000 / 60 / 60 / 24;
    var daysRound = Math.floor(days);
    var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound = Math.floor(hours);
    var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound = Math.floor(minutes);
    var seconds = my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    let secondsRound = Math.floor(seconds);
    if (daysRound > 0) {
      return daysRound + '天前'
    } else if (hoursRound > 0) {
      return hoursRound + '小时前'
    } else if (minutesRound > 0) {
      return minutesRound + '分钟前'
    } else if (seconds > 10) {
      return secondsRound + '秒钟前'
    }
    else {
      return "刚刚"
    }


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