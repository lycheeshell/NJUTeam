// pages/search/search.js
import wxRequest from "../../api/common.js";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    word: ''
  },

  wordInput: function (e) {
    this.setData({
      word: e.detail.value
    })
  },

  searchGame(e) {
    var keyWord = this.data.word;
    console.log(keyWord);
    //根据搜索框内容查找游戏
    wxRequest({
      url: 'team/game/search',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'word': keyWord
      },
      success: (res) => {
        console.log(res);
        
      },
    });
  }
})