// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked: false,
    carsList: [],
    tabs: [{
      id: 1,
      name: "全部",
      isActive: true
    }, {
      id: 2,
      name: "时间",
      isActive: false
    },
    {
      id: 3,
      name: "价格",
      isActive: false
    }
    ],
    address: {},
    totalP: "",
    totalN: ""

  },
  //结算
  checkOut() {
    if (!this.data.address) {
      wx.showToast({
        title: '您还没有选择收货地址哟~',
        icon: 'none'
      })
      return
    }
    if (this.data.totalN == 0) {
      wx.showToast({
        title: '您还没有选购商品哟~',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '等待打开支付页面',
    })
    setTimeout(() => {
      wx.hideLoading({
        complete: (res) => {
          let newCar = this.data.carsList.filter(v => !v.checked);

          let payment = this.data.carsList.filter(v => v.checked);
          let payList = payList = payment
          wx.setStorageSync('car', newCar);
          wx.setStorageSync('payList', payList);
          this.onShow();
          wx.showToast({
            title: '支付成功',
            icon: 'success'
          })
        },
      })
    }, 3000);
  },
  changeNum(e) {
    let num = e.target.dataset.num;
    let index = e.target.dataset.index;
    let car = wx.getStorageSync('car')
    if (car[index].num == 1 && num == -1) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '删除确定',
        content: '确定要删除吗？',
        success: (res) => {
          if (res.confirm) {
            car.splice(index, 1)
            this.setcar(car)
            wx.showToast({
              title: '删除成功',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      car[index].num += num
      this.setcar(car)
    }
  },
  goodscheckAll() {
    let checked = !this.data.allChecked;
    let car = wx.getStorageSync('car')
    car.forEach(v => {
      v.checked = checked;
    })
    this.setcar(car)

  },
  goodscheck(e) {
    console.log(e);
    let { index } = e.currentTarget.dataset;
    let car = wx.getStorageSync('car')
    //every如果没数据会返回true
    car[index].checked = !car[index].checked

    this.setcar(car)
  },
  setcar(car) {
    wx.setStorageSync('car', car);
    let allChecked = true
    let totalP = 0;
    let totalN = 0;
    car.forEach(v => {
      if (v.checked) {
        totalP += v.num * v.goods_price;
        totalN += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = car.length > 0 ? allChecked : false
    this.setData({
      allChecked,
      totalP,
      totalN,
      carsList: car
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  selectAddress() {
    wx.getSetting({
      complete: (res) => {
        let Address = res.authSetting["scope.address"];
        if (Address === false) {
          wx.openSetting()
        } else {
          wx.chooseAddress({
            complete: (res) => { 
              if(res.provinceName){ wx.setStorageSync('address', res)}
              else{
                return
              }
              }
          })
        }
      },
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

    let address = wx.getStorageSync('address')
    address ? address.place = address.provinceName + address.cityName + address.countyName + address.detailInfo : address

    let car = wx.getStorageSync('car') || [];
    //every如果没数据会返回true
    //let allChecked = car.length > 0 ? car.every(v => v.checked) : false
    let allChecked = true
    let totalP = 0;
    let totalN = 0;
    car.forEach(v => {
      if (v.checked) {
        totalP += v.num * v.goods_price;
        totalN += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = car.length > 0 ? allChecked : false
    this.setData({
      address,
      carsList: car,
      allChecked,
      totalP,
      totalN
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