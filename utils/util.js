// 显示失败提示
var showError = (message) => {
    wx.showModal({
        title: '错误提示',
        content: JSON.stringify(message),
        showCancel: false
    })
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [ month, day].map(formatNumber).join('月') + '日 ' + hour +'时'
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTimeByJoin = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return [ month, day].map(formatNumber).join('月') + '日 ' 
}

module.exports = { showError, formatTime, formatTimeByJoin };