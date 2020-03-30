// pages/student/student.js
import wxRequest from "../../api/common.js";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: '',
    gameId:'',
    imgUrl: '/images/avatar/1.jpg',
    account:'',
    credit:'',
    actionSheetHidden: true, // 是否显示底部可选菜单
    actionSheetItems: [{
        bindtap: 'changeImage',
        txt: '修改头像'
      },
      // {
      //   bindtap: 'viewImage',
      //   txt: '查看头像'
      // }
    ] // 底部可选菜单

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    this.setData({
      studentId: wx.getStorageSync("studentId")
    })
    wxRequest({
      url: 'team/student/query',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'studentId': this.data.studentId
      },
      success: (res) => {
        console.log(res);
        if(res.data.data!=null){
          if (res.data.data.photoUrl != null) {
            this.setData({
              imgUrl: res.data.data.photoUrl
            })
          }
          this.setData({
            account: res.data.data.account,
            credit: res.data.data.credit
          })
        }
      },
    });
  },
  // 点击头像 显示底部菜单
  clickImage: function() {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  // 点击其他区域 隐藏底部菜单
  actionSheetbindchange: function() {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  changeImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: app.globalData.prefix_url + 'team/student/updateStudentPhoto',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'studentId': wx.getStorageSync('studentId')
            // studentId: JSON.stringify(that.data.studentId)
          }, 
          header: {
            content_type: 'multipart/form-data',
          },
          success: function(res) {
            console.log(res);
            var dataRes = JSON.parse(res.data);
            if (JSON.parse(res.statusCode) == '200' && dataRes.status == 200) {
              that.setData({
                'imgUrl': tempFilePaths[0],
                'actionSheetHidden': !that.data.actionSheetHidden
              });
              wx.showModal({
                title: '提示',
                content: '上传成功',
                showCancel: false
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              that.setData({
                'actionSheetHidden': !that.data.actionSheetHidden
              });
            }
          },
          fail: function (err) {
            console.log(err);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            that.setData({
              'actionSheetHidden': !that.data.actionSheetHidden
            });
          }
        })
      }
    })
  },
  // 查看原图
  viewImage: function() {
    var that = this;
    wx.previewImage({
      current: this.data.imgUrl, // 当前显示图片的http链接
      urls: [this.data.imgUrl], // 需要预览的图片http链接列表
    })
  },
  switchToInfo(e) {
    var stuId = e.currentTarget.id;
    wx.navigateTo({
      url: "../student/info/info?stuId=" + stuId
    })
  },
  switchToParti(e) {
    var stuId = e.currentTarget.id;
    wx.navigateTo({
      url: "../student/participant/participant?stuId=" + stuId
    })
  },
  switchToHis(e) {
    var stuId = e.currentTarget.id;
    wx.navigateTo({
      url: "../student/history/history?stuId=" + stuId
    })
  },
  switchToAdmin(e) {
    var stuId = e.currentTarget.id;
    wx.navigateTo({
      url: "../student/admin/admin?stuId=" + stuId
    })
  },
})