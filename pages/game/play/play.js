// pages/game/play/play.js
import wxRequest from "../../../api/common.js";

const app = getApp();

Page({

  data: {
    gameId: '',
    name: '',
    studentId: '',
    plays: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gameId: options.gameId,
      name: options.name,
      studentId: options.studentId
    })
    var startTime = options.startTime;
    var endTime = options.endTime;
    var province = options.province;
    var city = options.city;
    var county = options.county;
    var minAdeptScore = -1;
    if (options.minAdeptScore) {
      minAdeptScore = options.minAdeptScore;
    }
    
    //查找组局
    wxRequest({
      url: 'team/play/search',
      content_type: 'application/json',
      method: 'POST',
      data: {
        'gameId': this.data.gameId,
        'startTime': startTime,
        'endTime': endTime,
        'province': province,
        'city': city,
        'county': county,
        'minAdeptScore': minAdeptScore
      },
      success: (res) => {
        console.log(res);
        this.setData({
          plays: res.data.data
        })
      },
    });
  },


})