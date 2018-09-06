// pages/raffle/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url : "",
    loadingComplete : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = options.url
    this.setData({
      url,
      loadingComplete: true
    })
  },

 
})