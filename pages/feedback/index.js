// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [{
      id: 1,
      name: '功能建议',
      isActive: false
    }, {
      id: 2,
      name: '购买遇到问题',
      isActive: false
    }, {
      id: 3,
      name: '适配问题',
      isActive: false
    }, {
      id: 4,
      name: '其他',
      isActive: false
    }],
    tabs: [{
      id: 1,
      name: "体验反馈",
      isActive: true
    }, {
      id: 2,
      name: "商品反馈",
      isActive: false
    }],
    imageOrder: []

  },
  text: "",
  //提交
  fbSubmit() {
    if (!this.text.trim()) {
      wx.showToast({
        title: '请输入有效内容',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })
    this.data.imageOrder.forEach((v, i) => {
      wx.uploadFile({
        filePath: v,
        name: 'image',
        url: 'https://7bu.top/api/upload',
        success: (res) => {
          console.log(res);
          if (i == this.data.imageOrder.length - 1) {
            wx.hideLoading()
            wx.navigateBack({ delta: 1 }

            )
          }
          //   let img = JSON.parse(res.data).message
        }
      })
    })

  },
  //选择标签
  chooseTips(e) {
    let { index } = e.currentTarget.dataset;

    let tips = this.data.tips;
    tips.filter((v, i) => i == index ? v.isActive = true : v.isActive = false)
    this.setData({
      tips
    })
  },
  //文本内容
  handleTextInput(e) {
    this.text = e.detail.value
  },
  //删除图片
  deleteImg(e) {
    let { index } = e.currentTarget.dataset
    let imageOrder = this.data.imageOrder
    imageOrder.splice(index, 1)
    this.setData({
      imageOrder
    })

  },
  //上传图片
  uploadImg() {

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let imageOrder = res.tempFilePaths
        this.setData({
          imageOrder: [...this.data.imageOrder, ...imageOrder]
        })
      }
    })
  },
  changeTitle(e) {
    let index = e.detail
    let tabs = this.data.tabs

    tabs.forEach((v, i) => i != index ? v.isActive = false : v.isActive = true)
    this.setData({
      tabs
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