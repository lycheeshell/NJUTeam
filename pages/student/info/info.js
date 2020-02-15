// pages/student/info/info.js
import wxRequest from "../../../api/common.js";

const app = getApp();

var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: '',
    account: '',
    mail: '',
    phone: '',
    sex: '选择',
    sexlist: ['男', '女'],
    birthday: '选择',
    school: '',
    startYear: '选择',
    pwd: '',
    newpwd: '',
    imgUrl: '',
    credit: '',
    session_key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        this.setData({
          imgUrl: res.data.data.photoUrl,
          credit: res.data.data.credit,
          session_key:res.data.data.session_key
        })
      },
    });
  },
  updateInfo(e) {
    var account = this.data.account;
    var mail = this.data.mail;
    var phone = this.data.phone;
    var sex = this.data.sex;
    var school = this.data.school;
    var pwd = this.data.pwd;
    var nwpwd = this.data.newpwd;
    var birthday = new Date(this.data.birthday.replace(/-/g, "/"));
    var startyear = util.formatDate(new Date(this.data.startyear)).split('-')[0];
    var imgUrl = this.data.imgUrl;
    var credit = this.data.credit;
    var session_key = this.data.session_key;
    console.log(birthday + " " + startyear);
    if (account == '' || mail == '' || phone == '' || sex == '' || school == '' || birthday == '' || startyear == '' || pwd == '' || nwpwd == '') {
      this.showModal1();
      return;
    }
    if (pwd !== nwpwd) {
      this.showModal4();
      return;
    }
    sex == '男' ? 0 : 1;
    wxRequest({
      url: 'team/student/update',
      content_type: 'application/json',
      method: 'POST',
      data: {
        'studentId': this.data.studentId,
        'account': account,
        'email': mail,
        'sex': sex,
        'birthday': birthday,
        'school': school,
        'startYear': startyear,
        'password':pwd,
        'photoUrl': imgUrl,
         'credit':credit,
        'openid': wx.getStorageSync("openid"),
        'session_key':session_key
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showModal2();
          wx.navigateTo({
            url: "../student/student"
          })
        } else {
          this.showModal1();
        }
      },
      fail: (res) => {
        wx.showModal({
          title: '提示',
          content: '更新失败',
          showCancel: false
        })
      }
    });
  },
  accountInput: function(e) {
    this.setData({
      account: e.detail.value
    })
  },
  mailInput: function(e) {
    this.setData({
      mail: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  schoolInput: function(e) {
    this.setData({
      school: e.detail.value
    })
  },
  pwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  newpwdInput: function(e) {
    this.setData({
      newpwd: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  YearChange(e) {
    this.setData({
      startYear: e.detail.value
    })
  },
  showModal1() {
    this.setData({
      modalName1: 'Modal1'
    })
  },
  hideModal1(e) {
    this.setData({
      modalName1: null
    })
  },
  showModal2() {
    this.setData({
      modalName2: 'Modal2'
    })
  },
  hideModal2(e) {
    this.setData({
      modalName2: null
    })
  },
  showModal4() {
    this.setData({
      modalName4: 'Modal4'
    })
  },
  hideModal4(e) {
    this.setData({
      modalName4: null
    })
  },
})