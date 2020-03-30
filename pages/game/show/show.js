// pages/game/show/show.js
import wxRequest from "../../../api/common.js";

const app = getApp();

Page({

  data: {
    playId: '',
    selfStudentId: '',
    anotherStudentId: '',
    anotherStudent : null,
    showResult: '对方暂未对您展示个人信息'
  },

  onLoad: function (options) {
    this.setData({
      playId: options.playId,
      anotherStudentId: options.anotherStudentId,
      selfStudentId: wx.getStorageSync("studentId")
    })

    //查找对方的信息
    wxRequest({
      url: 'team/play/getShowStudent',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'playId': this.data.playId,
        'fromStudentId': this.data.anotherStudentId,
        'toStudentId': this.data.selfStudentId
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          if(res.data.empty == false) {
            this.setData({
              showResult: '对方已向您展示个人信息',
              anotherStudent: res.data.data
            })
          }
        }
        
      },
    });
  },

  addShow(e) {
    wxRequest({
      url: 'team/play/addShowStudent',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'POST',
      data: {
        'playId': this.data.playId,
        'fromStudentId': this.data.selfStudentId,
        'toStudentId': this.data.anotherStudentId
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showTip('向对方展示信息成功！');
        } else {
          this.showTip('向对方展示信息失败！')
        }
      },
    });
  },

  cancelShow(e) {
    wxRequest({
      url: 'team/play/deleteShowStudent',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'POST',
      data: {
        'playId': this.data.playId,
        'fromStudentId': this.data.selfStudentId,
        'toStudentId': this.data.anotherStudentId
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showTip('取消展示信息成功！');
        } else {
          this.showTip('取消展示信息失败！')
        }
      },
    });
  },

  showTip(msg) {
    this.setData({
      tip: 'tip',
      tipContent: msg
    })
  },

  hideTip(e) {
    this.setData({
      tip: null
    })
  },

})