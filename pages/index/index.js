import request from '../../request/requset.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    category: [],
    floor: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let localDataIndex = wx.getStorageSync('localDataIndex')
    if (!localDataIndex) { this.getData() }
    else {
      if (Date.now - localDataIndex.time > 1000 * 60 * 60) {
        console.log('缓存过期');
        this.getData()
      } else {
        console.log('使用缓存');
        let data = localDataIndex.data
        console.log(data);
        this.setData({
          swiper: data[0].data.message,
          category: data[1].data.message,
          floor: data[2].data.message
        });
      }
    }

  },
  async getData() {
    //获取轮播图
    let result1 = await request({ url: "/home/swiperdata" })
    let swiper = result1.data.message;
    swiper.forEach(v => {
      let reg = /\/pages\/goods_detail\/main\?goods_id(.*)/igs
      let baseUrl = reg.exec(v.navigator_url)[1]
      v.url = '/pages/goods/goods?goodsid' + baseUrl

    })
    this.setData({
      swiper
    });
    //获取分类 
    let result2 = await request({ url: "/home/catitems" })
    this.setData({
      category: result2.data.message
    });
    //获取楼层
    let result3 = await request({ url: "/home/floordata" })
    this.setData({
      floor: result3.data.message
    });
    wx.setStorageSync('localDataIndex', { time: Date.now(), data: [result1, result2, result3] })
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