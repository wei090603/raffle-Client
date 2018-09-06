const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

function updateGambler(userInfo, callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/players/updateMyInfo',
    auth: true,
    data: {
      userInfo: JSON.stringify(userInfo)
    },
    method: 'PUT',
    header: {
      'content-type': 'application/json'
    },
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}
//查询活动信息
function getMyBenefits(data, callback){
  if(data){
    let list = {
    total:1,
    list:[{
      "giftFloorPrice": 1400, 
      "bargainSteps": [250, 250, 250, 200, 150, 150, 150], 
      "status": 1, 
      "isActive": true, 
      "_id": "5b5d909dbf1a59412f606b5f", 
      "title": "金牌美食", 
      "giftName": "黄金鸡柳plus", 
      "giftFullPrice": 2800, 
      "giftTotalCount": 100, 
      "bannerUrl": "https://res.wofangyou.cn/banner-test-3_1532858284539.png", 
      "headerUrl": "https://res.wofangyou.cn/banner-test-3_1532858284539.png", 
      "ruleContent": "活动日期：2018.6.26—2018.7.2；\n\n兑奖日期：2018.6.28—2018.7.10；\n\n活动奖品：仙豆糕一份（每份包含5种口味）；\n\n活动规则：\n\n您获得奖品后，可以将活动分享给不同的微信群、微信好友，邀请好友帮助自己助力砍价。有1位新好友通过您分享的活动帮您助力，即可砍价成功！砍到0元即可免费领取奖品！\n奖品发放：\n\n本奖品成功信息均在小程序内在线通知，砍价成功后会在活动页面提示成功，领奖时出示即可；本奖品仅供1人使用；     \n\n兑奖地址：\n\n1.  玄武区鱼市街2号（联系电话：17372952518）\n2.  鼓楼区湖北路15-1（联系电话：13269136376）\n3.  玄武区八宝前街9-5（联系电话：18100616008）\n4.  南京市秦淮区莫愁路329号7-1-102越界梦幻城临街（联系电话：17712883114）\n\n兑奖规则：\n\n请在线下门店兑换时，向店员出示砍价成功页面，由店员确认后输入领取码，即可成功领取奖品。\n\n备注：\n\n进店领奖的小伙伴，需关注门店仙爷个人号。\n\n*活动最终解释权归柒捌玖所有", "rule": "<p>活动日期：2018.6.26—2018.7.2；</p>\n<p>兑奖日期：2018.6.28—2018.7.10；</p>\n<p>活动奖品：仙豆糕一份（每份包含5种口味）；</p>\n<p>活动规则：</p>\n<p>您获得奖品后，可以将活动分享给不同的微信群、微信好友，邀请好友帮助自己助力砍价。有1位新好友通过您分享的活动帮您助力，即可砍价成功！砍到0元即可免费领取奖品！\n奖品发放：</p>\n<p>本奖品成功信息均在小程序内在线通知，砍价成功后会在活动页面提示成功，领奖时出示即可；本奖品仅供1人使用；     </p>\n<p>兑奖地址：</p>\n<ol>\n<li>玄武区鱼市街2号（联系电话：17372952518）</li>\n<li>鼓楼区湖北路15-1（联系电话：13269136376）</li>\n<li>玄武区八宝前街9-5（联系电话：18100616008）</li>\n<li>南京市秦淮区莫愁路329号7-1-102越界梦幻城临街（联系电话：17712883114）</li>\n</ol>\n<p>兑奖规则：</p>\n<p>请在线下门店兑换时，向店员出示砍价成功页面，由店员确认后输入领取码，即可成功领取奖品。</p>\n<p>备注：</p>\n<p>进店领奖的小伙伴，需关注门店仙爷个人号。</p>\n<p>*活动最终解释权归柒捌玖所有</p>", 
      "normalShareTitle": "疯狂来抢", 
      "normalShareUrl": "https://res.wofangyou.cn/yxdq-icon_1532858452883.png", 
      "helpShareTitle": "帮我助力", 
      "helpShareUrl": "https://res.wofangyou.cn/yxdq-icon_1532858466359.png", 
      "startDate": "07月29日", "endDate": "08月09日", "autoReply": "兑奖回复\"1\"", 
      "createdAt": "2018-07-29T10:02:05.691Z", "__v": 4 
    }]}
    callback(null,list)
  }else{
    let err = "查询错误"
    callback(err)
  }
}

module.exports = { updateGambler, getMyBenefits };