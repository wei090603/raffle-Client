// pages/raffle/list.js
const rafffle = require('../../utils/api/raffle')
const utils = require('../../utils/util.js')

Page({

  data: {
    list: [],
    page: 1,
    limit: 10,
    total: 0,
    ShowMore: "点击加载历史活动"
  },

  onLoad: function (options) {
    this.loadData()
  },
  loadData(options) {
    this.getFetchList();
  },
  getFetchList() {
    var self = this;
    rafffle.fetchList(function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        console.info("data:",data)
        data.sort( (a, b) => new Date( a.endDate ) - new Date( b.endDate ))
        for(let d of data){
          d.endDate = utils.formatTime(new Date(d.endDate))
        }
        self.setData({
          list: data,
          loadingComplete: true,
        });
        wx.hideLoading();
      }
    });
  },
  show_more: function () {
    this.setData({
      ShowMore: "加载中..."
    })
    var data = {
      page: this.data.page,
      limit: this.data.limit
    };
    this.getFetchList(data)
  },
  handleNavigateToBenefit(e) {
    let benefitId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './join/join?benefit=' + benefitId,
    })
  }
})