// pages/student/history/history.js
import wxRequest from "../../../api/common.js";

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: '',
    games: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      studentId: wx.getStorageSync("studentId")
    })
    //查找参与过的游戏
    wxRequest({
      url: 'team/game/myGame',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'studentId': this.data.studentId
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
      url: "../../game/index?gameId=" + gameId
    })
  },

})