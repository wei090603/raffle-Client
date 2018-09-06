const app = getApp();
const gamblerUtil = require('../../../utils/api/gambler');
const rafflerecord = require('../../../utils/api/rafflerecord.js');
const sessionUtil = require('../../../utils/wx-extend/session');

Page({
  data: {
    master: null,
    bettor: null,
    raffle: null,
    codeTotalCount : 0,      
    ruleRichText: null,
    myRaffleNumber : false,
    rafffleRecordApi: [],   // userinfo array
   
    winnerUser : false,

    gamblerList: [],
    gamblerCount: 0,
    loadingComplete: false,
    masterTickets : {},
    bargainErrorMsg: '',
    buttonswitch : true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad(options) {
   
    this.checkLoginStatus();
    this.loadData(options);
  },
  onShow(){
    
  },
  checkLoginStatus() {   // 检查登录状态
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (!this.data.canIUse) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          sessionUtil.setUserInfo(e.detail.userInfo);
          gamblerUtil.updateGambler(e.detail.userInfo, function (err, player) {
            if (err) {
              console.error('error: ', err);
            }
          });
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      sessionUtil.setUserInfo(e.detail.userInfo);
      gamblerUtil.updateGambler(e.detail.userInfo, function (err, player) {
        if (err) {
          console.error('error: ', err);
        }
      });
    }
  },
  loadData(options) {
    var self = this;
    const data = {
      type: 'join',
      raffle: options.raffle
    };
    
    rafflerecord.getRaffleData(data, function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        
        
        let myRaffleCode = data.masterTickets.filter(e => e.bettor.id != data.master.id)//好友送码榜单
        let isWinner = data.masterTickets.filter(e => e.isWinner == true)//自己是否有中奖的号码
        
        for(let m of data.masterTickets){
          m.code = PrefixInteger(m.code, 6)
        }
        for(let w of data.winnerList){
          w.code = PrefixInteger(w.code,6)
        }
        let winnerListLoad = updateLength(data.winnerList,5)
        
        function updateLength(array,num){
          if(array.length>num){
            return array.slice(0,num)
          }else{
            return array 
          }
        }
        function PrefixInteger(num, n) {
          return (Array(n).join(0) + num).slice(-n);
        }
        console.info(data)
        console.info(data.gamblerList)
        self.setData({
          loadingComplete: true,
          master: data.master,
          bettor: data.bettor,
          raffle: data.raffle,
          winnerListLoad : winnerListLoad,
          winnerList : data.winnerList,
          masterTickets : data.masterTickets,
          gamblerCount : data.gamblerCount,
          gamblerList : data.gamblerList,
          codeTotalCount : data.codeTotalCount,
          myRaffleCode : myRaffleCode,
          isWinner,
        })
       
      }
    });
  },
  raffleObtain(e){
    this.setData({
      buttonswitch : false,
    })
    let formId = e.detail.formId
    this.createRaffle(formId)
  },
  createRaffle(formId) {
    var self = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var data = {
      raffle: this.data.raffle._id,
      master: this.data.master.id,
      formId,
    };

    rafflerecord.createRaffle(data, function (err, result) {
     
      wx.hideLoading();
      if (err) {
        console.error('error: ', err);
      } else {
        if (result.error) {
          this.setData({
            bargainErrorMsg: result.message,
            benefit: result.data.benefit,
            winnerCount: result.data.winnerCount
          });
          self.toogleBargainErrorModal();
        } else {
          
          for(let m of result.data.masterTickets){
            m.code=PrefixInteger(m.code,6)
          }
          function PrefixInteger(num, n) {
            return (Array(n).join(0) + num).slice(-n);
          }
          let createRaffle = result.data.masterTickets
          let masterTickets = createRaffle.concat(self.data.masterTickets)
          self.setData({
            createRaffle,
            masterTickets
          });
          
          
          self.toogleBargainModal();
        }
      }
    });
  },
  handleShowDetail(){
    
    wx.navigateTo({
      url : "../detail/detail?url="+this.data.raffle.bannerUrl
    })
  },
  winnerUserList(){
    this.setData({
      winnerUser : !this.data.winnerUser
    })
   
  },
  toogleRule() {
    this.setData({
      showRule: !this.data.showRule
    });
  },
  toogleBargainModal() {
    this.setData({
      showBargainModal: !this.data.showBargainModal
    });
  },
  toogleBargainErrorModal() {
    this.setData({
      showBargainErrorModal: !this.data.showBargainErrorModal
    });
  },
  handleShowMore() {
    var self = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    const dataJson = {
      master: this.data.master.id,
      raffle: this.data.raffle._id,
    };
    rafflerecord.getRaffleRecords(dataJson, function (err, data) {
      wx.hideLoading();
      if (err) {
        console.error('error: ', err);
      } else {
       
        let masterTickets = data.masterTickets
        let myRaffleCode = masterTickets.filter(e=>e.bettor.id!=dataJson.master)
        for(let m of myRaffleCode){
          m.code=PrefixInteger(m.code,6)
        }
        function PrefixInteger(num, n) {
          return (Array(n).join(0) + num).slice(-n);
        }
        self.setData({
          myRaffleCode
        });
      }
    });
  },

  onShareAppMessage(options) {    // 分享设置
    console.log("this.data.raffle._id==5b767cb93f4c11028eca60b1")
      console.log(this.data.master.id)
      console.log("5b767cfc37bbfd02887e2456")
    if (options.from == 'button') {
      if (options.target.id == 'seek-help-modal') {
        this.toogleBargainModal();
      }
      
      return {
        title: this.data.raffle.helpShareTitle,
        path: `/pages/raffle/help/help?raffle=${this.data.raffle._id}&master=${this.data.master.id}`,
        imageUrl: this.data.raffle.helpShareUrl

      }
    } else {
      return {
        title: this.data.raffle.normalShareTitle,
        path: `/pages/raffle/join/join?raffle=${this.data.raffle._id}`,
        imageUrl: this.data.raffle.normalShareUrl
      }
    }
  },
  //我的抽奖码
  myRaffleNumber(){
    this.setData({
      myRaffleNumber: !this.data.myRaffleNumber
    })
  },
  //抽奖码取消
  raffleRule(){
    this.setData({
      myRaffleNumber: !this.data.myRaffleNumber
    })
  },
  
});