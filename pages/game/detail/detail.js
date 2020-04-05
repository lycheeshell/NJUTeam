// pages/game/detail/detail.js
import wxRequest from "../../../api/common.js";

const app = getApp();

Page({

  data: {
    playId: '',
    studentId: '',
    students: [],
    tip: null,
    tipContent: ''
  },

  onLoad: function(options) {
    this.setData({
      playId: options.playId,
      studentId: options.studentId
    })

    //查找组局的所有参与者
    wxRequest({
      url: 'team/play/member',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'playId': this.data.playId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          students: res.data.data
        })
      },
    });
  },

  joinPlay(e) {
    wxRequest({
      url: 'team/play/addParticipant',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'POST',
      data: {
        'playId': this.data.playId,
        'studentId': this.data.studentId
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200 && res.data.data == -1) {
          this.showTip('信誉分不够，加入组局失败！');
        }else if(res.data.status == 200) {
          this.showTip('加入组局成功！');
        } else {
          this.showTip('加入组局失败！' + res.data.msg)
        }
      },
    });
  },

  quitPlay(e) {
    wxRequest({
      url: 'team/play/leaveParticipant',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'POST',
      data: {
        'playId': this.data.playId,
        'studentId': this.data.studentId
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showTip('退出组局成功！');
        } else {
          this.showTip('退出组局失败！' + res.data.msg)
        }
      },
    });
  },

  signIn(e) {
    wxRequest({
      url: 'team/play/signIn',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'POST',
      data: {
        'playId': this.data.playId,
        'studentId': this.data.studentId
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showTip('签到成功！');
        } else {
          this.showTip('签到失败！' + res.data.msg)
        }
      },
    });
  },

  showInfo(e) {
    // itr 2 展示对方的信息
    var playId = this.data.playId;
    var selfStudentId = this.data.studentId;
    var anotherStudentId = e.currentTarget.id;
    if(selfStudentId != anotherStudentId) {
      wx.navigateTo({
        url: '../show/show?playId=' + playId + '&anotherStudentId=' + anotherStudentId
      })
    }
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