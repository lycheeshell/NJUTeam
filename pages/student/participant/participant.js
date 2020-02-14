// pages/student/participant/participant.js
import wxRequest from "../../../api/common.js";

const app = getApp();

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     CustomBar: app.globalData.CustomBar,
//     word: '',
//     games: []
//   },

//   wordInput: function (e) {
//     this.setData({
//       word: e.detail.value
//     })
//   },

//   searchGame(e) {
//     var keyWord = this.data.word;
//     //根据搜索框内容查找游戏
//     wxRequest({
//       url: 'team/game/search',
//       content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
//       data: {
//         'word': keyWord
//       },
//       success: (res) => {
//         console.log(res);
//         this.setData({
//           games: res.data.data
//         })
//       },
//     });
//   },

//   switchToGame(e) {
//     var gameId = e.currentTarget.id;
//     wx.navigateTo({
//       url: "../game/index?gameId=" + gameId
//     })
//   },

//   showModal(e) {
//     this.setData({
//       modalName: e.currentTarget.dataset.target
//     })
//   },
//   hideModal(e) {
//     this.setData({
//       modalName: null
//     })
//   },
//   // ListTouch计算方向
//   ListTouchMove(e) {
//     this.setData({
//       ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
//     })
//   },
//   // ListTouch计算滚动
//   ListTouchEnd(e) {
//     if (this.data.ListTouchDirection == 'left') {
//       this.setData({
//         modalName: e.currentTarget.dataset.target
//       })
//     } else {
//       this.setData({
//         modalName: null
//       })
//     }
//     this.setData({
//       ListTouchDirection: null
//     })
//   }
// })

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})