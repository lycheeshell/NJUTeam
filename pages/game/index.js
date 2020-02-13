// pages/game/index.js
Page({

  data: {
    gameId : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gameId: options.gameId
    })
    console.log(this.data.gameId)
  },

  
})