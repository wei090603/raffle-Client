const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/**
 * 获取抽奖页面数据
 */
function getRaffleData(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/tickets/getRaffleData`,
    auth: true,
    data: data,
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
 */
function getRaffleRecords(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/tickets/getMasterTickets`,
    auth: true,
    data: data,
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
 * 抽奖
 */
function createRaffle(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/tickets/betTicket`,
    auth : true,
    data: data,
    method: 'POST',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}
/**
 * 助力抽奖
 */
function helpBargain(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/tickets/helpBet`,
    auth : true,
    data: data,
    method: 'POST',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}
/**
 * 获取参与活动的用户列表
 */
function getGamblers(data,callback){
  requestUtil.request({
    url: `${config.baseUrl}/api/raffles/${data.raffle}/getGamblers`,
    auth: true,
    data: {
      limit : data.limit,
      page : data.page
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


module.exports = { 
  getRaffleData,
  getRaffleRecords,
  createRaffle,
  helpBargain,
  getGamblers,
};