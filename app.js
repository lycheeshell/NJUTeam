//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'http://115.29.224.114:8010/team/student/wxlogin',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'POST',
            success: res => {
              this.globalData.openid = res.data.openid;
              // if (this.loginCallback) {
              //   this.loginCallback(res.data.openid)
              // }
              wx.setStorageSync("openid", res.data.openid)
            },
            fail: res => {
              console.log('后台登录失败！' + res.errMsg)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: '',
    prefix_url: "http://115.29.224.114:8010/"
  }
})