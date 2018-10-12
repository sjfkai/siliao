const utils = require('../../utils/util')

Page({
  data: {
    isPreview: false,
    message: '',
    encodedMessage: '',
    remind: '',
    secret: '',
  },
  //事件处理函数
  toSend: function() {
    if (this.data.isPreview) {
      wx.navigateBack()
      return
    }
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onLoad: function (query) {
    if (query.isPreview) {
      wx.setNavigationBarTitle({
        title: '预览',
      })
    }
    this.setData({
      encodedMessage: query.message || this.data.encodedMessage,
      isPreview: !!query.isPreview,
      remind: query.remind || '',
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '您有一条加密消息，请查看',
      path: `pages/message/message?message=${this.data.encodedMessage}&remind=${this.data.remind}`,
      imageUrl: '../../assets/images/share.png',
    }
  },
  bindSecretInput: function(e) {
    this.setData({
      secret: e.detail.value
    })
  },
  decode: function(e){
    const message = utils.decode(this.data.encodedMessage, this.data.secret)

    if (!message) {
      wx.showToast({
        icon: 'none',
        title: '密码错误！',
        image: '../../assets/images/error.svg',
        duration: 3000
      })
      this.setData({
        message: '',
      })
      return;
    }
    wx.showToast({
      title: '解密成功！',
      duration: 3000
    })
    this.setData({
      message,
    })
  }
})
