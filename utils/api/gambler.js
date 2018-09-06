const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

function updateGambler(userInfo, callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/gamblers/updateMyInfo',
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
function getMyRaffles(data, callback){
  requestUtil.request({
    url: config.baseUrl + '/api/gamblers/getMyRaffles',
    auth: true,
    method: 'GET',
    data: data,
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  });
}

module.exports = { updateGambler, getMyRaffles };