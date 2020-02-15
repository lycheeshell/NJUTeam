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
    sex: -1,
    sexlist: ['男', '女'],
    birthday: util.formatDate(new Date()),
    school: '',
    startYear: 0,
    pwd: '',
    newpwd: ''
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
        var account = res.data.data.account;
        var email = res.data.data.email;
        var phone = res.data.data.phone;
        var sex = res.data.data.sex;
        var school = res.data.data.school;
        var birthday = res.data.data.birthday.substring(0, 10);
        var startyear = res.data.data.startYear;
        this.setData({
          account: account,
          mail: email,
          phone: phone,
          sex: sex,
          birthday: birthday,
          school: school,
          startYear: startyear
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
    var birthday = this.data.birthday + ' ' + '00:00:00';
    var startyear = this.data.startYear;

    if (account == '' || mail == '' || phone == '' || school == '' || birthday == '' || startyear == '' || pwd == '' || nwpwd == '') {
      this.showModal1();
      return;
    }
    if (account.length > 20 || phone.length > 15 || mail.length > 40 || pwd.length > 20) {
      this.showModal1();
      return;
    }
    if (pwd !== nwpwd) {
      this.showModal4();
      return;
    }
    if (sex < 0 || sex > 1) {
      this.showModal1();
      return;
    }
    startyear = parseInt(startyear);
    if (isNaN(startyear) || startyear < 2000 || startyear > 2030) {
      this.showModal1();
      return;
    }
    
    wxRequest({
      url: 'team/student/update',
      content_type: 'application/json',
      method: 'POST',
      data: {
        'studentId': this.data.studentId,
        'account': account,
        'phone': phone,
        'email': mail,
        'sex': sex,
        'birthday': birthday,
        'school': school,
        'startYear': startyear,
        'password':pwd
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