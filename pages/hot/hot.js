// pages/hot/hot.js
import wxRequest from "../../api/common.js";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    hotNum : 5,
    games: []
  },

  onLoad: function (options) {
    var keyWord = this.data.word;
    //查找hot游戏
    wxRequest({
      url: 'team/game/hot',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'num': this.data.hotNum
      },
      success: (res) => {
        console.log(res);
        this.setData({
          games: res.data.data
        })
      },
    });
  },

  switchToGame(e) {
    var gameId = e.currentTarget.id;
    wx.navigateTo({
      url: "../game/index?gameId=" + gameId
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  }
})