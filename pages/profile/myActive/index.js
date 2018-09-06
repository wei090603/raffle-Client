// pages/profile/myActive/index.js
const gambler = require('../../../utils/api/gambler')
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    limit: 10,
    total: 0,
    showMore: "点击加载历史活动",
    stopLoad : false,
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData(){
    var data = {
      page: this.data.page,
      limit: this.data.limit
    };
    this.getMyRaffle(data);
  },
  getMyRaffle(data){
    var self = this;
    gambler.getMyRaffles(data, function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        var page = self.data.page + 1;
        var total = data.total;
        
        for (let l of data.list) {
          l.joinAt = utils.formatTimeByJoin(new Date(l.joinAt))
        }
        var list = self.data.list.concat(data.list);
        self.setData({
          page: page,
          total: total,
          list: list,
          loadingComplete: true,
          stopLoad: false,
          showMore: "点击加载历史活动",
        });
        
        wx.hideLoading();
      }
    });
  },
  show_more(e){
    this.setData({
      showMore : "加载中...",
      stopLoad : true,
    })
    var data = {
      page: this.data.page,
      limit: this.data.limit
    };
    this.getMyRaffle(data);
  },
  handleNavigateToRaffle(e) {
    
    let benefitId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../raffle/join/join?raffle=' + benefitId
    });
  }
})