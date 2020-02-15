// pages/student/participant/participant.js
import wxRequest from "../../../api/common.js";

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId:'',
    plays: []
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
      url: 'team/play/myPlay',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'studentId': this.data.studentId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          plays: res.data.data
        })
      },
    });
  },

  ToConcretPlay(e) {
    var playId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../game/detail/detail?playId=' + playId + '&studentId=' + this.data.studentId
    })
  },

})