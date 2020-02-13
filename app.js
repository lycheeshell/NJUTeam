//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('weixin code : ' + res.code);
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
              console.log(res)
              this.globalData.openid = res.data.data.openid
              this.globalData.studentId = res.data.data.studentId
              // if (this.loginCallback) {
              //   this.loginCallback(res.data.data.openid)
              // }
              wx.setStorageSync("openid", res.data.data.openid)
              wx.setStorageSync("studentId", res.data.data.studentId)
              console.log('openid : ' + res.data.data.openid)
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
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  onLogin: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('weixin code : ' + res.code);
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
              this.globalData.openid = res.data.data.openid;
              this.globalData.studentId = res.data.data.studentId;
              // if (this.loginCallback) {
              //   this.loginCallback(res.data.data.openid)
              // }
              wx.setStorageSync("openid", res.data.data.openid)
              wx.setStorageSync("studentId", res.data.data.studentId)
              console.log('openid : ' + res.data.data.openid)
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
    studentId: '',
    openid: '',
    prefix_url: "http://115.29.224.114:8010/"
  }
})