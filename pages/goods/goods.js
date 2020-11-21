// pages/goods/goods.js
import request from '../../request/requset.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsinfo: [],
    isCollected: false
  },
  options: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  preview(e) {
    let { url } = e.target.dataset;
    let urls = []
    this.data.goodsinfo.pics.forEach(v => {
      urls.push(v.pics_big)
    })
    wx.previewImage({
      current: url,
      urls: urls,
    })
  },
  carAdd() {
    let car = wx.getStorageSync('car') || [];
    let index = car.findIndex(v => v.goods_id === this.data.goodsinfo.goods_id)
    if (index == -1) {
      this.data.goodsinfo.num = 1
      this.data.goodsinfo.checked = true
      car.push(this.data.goodsinfo)
    } else {
      car[index].num++
    }
    wx.setStorageSync('car', car)
    wx.showToast({
      title: '加入购物车成功',
      icon: "success",
      mask: true
    })
  },
  onLoad: function (options) {
    this.options = options
    let localDataGoods = wx.getStorageSync('localDataGoods') || []
    let goods = localDataGoods.filter(v => v.goods_id == this.options.goodsid)

    if (!goods.goods_id) {
      this.getData(this.options.goodsid)
    }
    else {
      let feet = wx.getStorageSync('feet') || [];
      let time = Date.now()
      let feetItem = data;
      feetItem.time = time
      feet.unshift(feetItem)
      wx.setStorageSync('feet', feet)
      let collect = wx.getStorageSync('collect') || [];
      let isCollected = collect.some(v => v.goods_id == goods.goods_id)
      console.log("使用缓存");
      this.setData({
        goodsinfo: goods,
        isCollected
      })
    }

  },
  async getData(id) {

    let res = await request({
      url: "/goods/detail", data: { goods_id: id }
    })
    let data = res.data.message
    let feet = wx.getStorageSync('feet') || [];
    let time = Date.now()
    let feetItem = data;
    feetItem.time = time
    feet.unshift(feetItem)
    wx.setStorageSync('feet', feet)
    let collect = wx.getStorageSync('collect') || [];
    let isCollected = collect.some(v => v.goods_id == data.goods_id)
    let localDataGoods = wx.getStorageSync('localDataGoods') || []
    let index = localDataGoods.findIndex(v => v.goods_id == data.goods_id)
    if (index === -1) {
      localDataGoods.push(data)
      wx.setStorageSync('localDataGoods', localDataGoods)
    }

    this.setData({
      isCollected,
      goodsinfo: data
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
    let collect = wx.getStorageSync('collect') || [];
    let isCollected = collect.some(v => v.goods_id == this.data.goodsinfo.goods_id)
    this.setData({
      isCollected
    })
  },
  collect() {
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id == this.data.goodsinfo.goods_id)
    let isCollected = false
    if (index == -1) {
      collect.push(this.data.goodsinfo)
      wx.showToast({
        title: '收藏成功！',
        icon: 'success'
      })
      isCollected = true

    } else {
      collect.splice(index, 1)
      wx.showToast({
        title: '取消收藏~',
        icon: 'success'
      })
      isCollected = false
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollected: isCollected
    })

  },
  share() {
    wx.showToast({
      title: '仅为展示用~',
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
    this.getData(this.options)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/goods/goods'
    }
  }
})