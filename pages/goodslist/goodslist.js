// pages/goodslist/goodslist.js
import request from '../../request/requset.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 1,
      name: "综合",
      isActive: true
    }, {
      id: 2,
      name: "价格",
      isActive: false
    },
    {
      id: 3,
      name: "销量",
      isActive: false
    }
    ],

    goodsList: [],
    numOrder: [],
    priceOrder: []
  },

  urlData: {
    query: '',
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  pageTotal: 0,


  onReachBottom: async function () {
    if (this.pageTotal > this.urlData.pagenum) {
      this.urlData.pagenum++;
      this.getData()
    } else {
      wx.showToast({
        title: '没有数据了~',
      })
    }
  },
  changeTitle(e) {
    let index = e.detail
    let tabs = this.data.tabs
    if (index == 1 && tabs[1].isActive == true) {
      let priceOrder = this.data.priceOrder.reverse();
      this.setData({
        priceOrder
      })
    } else if (index == 2 && tabs[2].isActive == true) {
      let numOrder = this.data.numOrder.reverse();
      this.setData({
        numOrder
      })
    }
    tabs.forEach((v, i) => i != index ? v.isActive = false : v.isActive = true)
    this.setData({
      tabs
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.urlData.cid = options.cid;
    this.getData()

  },
  async getData() {
    let res = await request({ url: "/goods/search", data: this.urlData })
    let total = res.data.message.total;
    res.data.message.goods.forEach(v => v.random = Math.floor(Math.random() * 10000) + 1)
    this.pageTotal = Math.ceil(total / 10)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    });
    let priceOrder = this.data.goodsList;
    priceOrder.sort(function (a, b) {
      return b.goods_price - a.goods_price;
    });
    this.setData({
      priceOrder
    });
    let numOrder = this.data.goodsList;
    numOrder.sort(function (a, b) {
      return b.random - a.random;
    });
    this.setData({
      numOrder
    });
    wx.stopPullDownRefresh()
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
    this.setData({
      goodsList: []
    })
    this.urlData.pagenum = 1;
    this.getData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})