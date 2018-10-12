const utils = require('../../utils/util');

//获取应用实例
const app = getApp()

Page({
  data: {
    messageMaxLength: 140,
    message: '',
    secret: '',
    remind: '',
  },
  onLoad: function () {
  },
  onShareAppMessage: function(res) {
    return {
      title: '您有一条加密消息，请查看',
      path: `pages/message/message?message=${utils.encode(this.data.message, this.data.secret)}&remind=${this.data.remind}`,
      imageUrl: '../../assets/images/share.png',
    }
  },

  toPreview: function() {
    wx.navigateTo({
      url: `../message/message?message=${utils.encode(this.data.message, this.data.secret)}&remind=${this.data.remind}&isPreview=true`
    })
  },

  bindMessageInput: function(e) {
    this.setData({
      message: e.detail.value
    })
  },
  bindSecretInput: function(e) {
    this.setData({
      secret: e.detail.value
    })
  },
  bindRemindInput: function(e) {
    this.setData({
      remind: e.detail.value
    })
  },
})
