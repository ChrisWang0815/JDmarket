
let requestTimes = 0
const request = (params) => {
  wx.showLoading({
    title: '加载中',
  })
  requestTimes++
  return new Promise((resolve, reject) => {
    let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    params.url = baseUrl + params.url
    wx.request({
      ...params,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {

        requestTimes--
        if (requestTimes == 0) {
          wx.hideLoading()
        }
      }
    })
  })
}

export default request