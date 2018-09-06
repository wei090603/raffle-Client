const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');


/**
 * 获取上架中的抽奖活动列表
 */

function fetchList(callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/raffles',
    auth: true,
    method: 'GET',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}

/**
 * 获取参与者的抽奖记录
 * 
 */
function getRaffles(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/gamblers/getMyRaffles`,
    auth: true,
    data : {
      page : data.page,
      limit : data.limit
    },
    method: 'GET',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}


module.exports = { fetchList, getRaffles };