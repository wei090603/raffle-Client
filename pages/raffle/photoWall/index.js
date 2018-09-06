// pages/raffle/photoWall/index.js
const raffleRecord = require('../../../utils/api/rafflerecord')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMore: "加载更多",
    loadingComplete : false,
    page: 1,
    limit: 100,
    list : [],
    loadsWitch: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(options)
  },
  loadData(options) {
    this.setData({
      raffle: options.raffle
    });
    var data = {
      raffle: options.raffle,
      page: this.data.page,
      limit: this.data.limit
    };
    this.getWinners(data);
  },
  getWinners(data) {
    var self = this;
    raffleRecord.getGamblers(data, function(err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        var page = self.data.page + 1;
        var total = data.total;
        var list = self.data.list.concat(data.list);
        self.setData({
          page: page,
          total: total,
          list: list,
          loadingComplete: true,
          showMore: "加载更多",
          loadsWitch: true,
        });
        wx.hideLoading();
      }
    });
  },
  handleShowMore() {
    this.setData({
      showMore : "加载中...",
      loadsWitch : false,
    })
    var data = {
      raffle: this.data.raffle,
      page: this.data.page,
      limit: this.data.limit
    };
    this.getWinners(data);
  }
})