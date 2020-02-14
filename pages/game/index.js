// pages/game/index.js
import wxRequest from "../../api/common.js";

const app = getApp();

var util = require('../../utils/util.js');  

Page({

  data: {
    TabCur: 0,
    gameId : '',
    name : '',
    studentId : '',
    score : 0,
    quizNum : 5,
    questions : [],
    correctOptions : [],
    plays : [],
    chosen1: -1,
    chosen2: -1,
    chosen3: -1,
    chosen4: -1,
    chosen5: -1,
    picker1: [],
    picker2: [],
    picker3: [],
    picker4: [],
    picker5: [],
    startTime: util.formatTimeSF(new Date()),
    endTime: util.formatTimeSF(new Date()),
    date: util.formatDate(new Date()),
    region: ['江苏省', '南京市', '玄武区'],
    location: '',
    minPerson: -1,
    maxPerson: -1,
    minAdeptScore: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gameId: options.gameId,
      studentId: wx.getStorageSync("studentId")
    })
    console.log('gameId:' + this.data.gameId + ', studentId:' + this.data.studentId);

    //查找游戏
    wxRequest({
      url: 'team/game/getGame',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'gameId': this.data.gameId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          name: res.data.data[0].name
        })
      },
    });

    //查找用户的熟练分
    wxRequest({
      url: 'team/game/getAdept',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'studentId': this.data.studentId,
        'gameId' : this.data.gameId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          score: res.data.data.score
        })
      },
    });

    //查找问卷
    wxRequest({
      url: 'team/game/getQuiz',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        'gameId': this.data.gameId,
        'num' : this.data.quizNum
      },
      success: (res) => {
        console.log(res);
        var questions = res.data.data;
        this.setData({
          questions: res.data.data
        })
        var list1 = [questions[0].a, questions[0].b, questions[0].c, questions[0].d];
        var list2 = [questions[1].a, questions[1].b, questions[1].c, questions[1].d];
        var list3 = [questions[2].a, questions[2].b, questions[2].c, questions[2].d];
        var list4 = [questions[3].a, questions[3].b, questions[3].c, questions[3].d];
        var list5 = [questions[4].a, questions[4].b, questions[4].c, questions[4].d];
        var crtOpt = [this.optionToNum(questions[0].correctOption),
          this.optionToNum(questions[1].correctOption),
          this.optionToNum(questions[2].correctOption),
          this.optionToNum(questions[3].correctOption),
          this.optionToNum(questions[4].correctOption)];
        this.setData({
          picker1: list1,
          picker2: list2,
          picker3: list3,
          picker4: list4,
          picker5: list5,
          correctOptions: crtOpt
        })
      },
    });
  },

  //创建组局
  createPlay(e) {
    var startTime = this.data.date + ' ' + this.data.startTime + ':00';
    var endTime = this.data.date + ' ' + this.data.endTime + ':00';
    var province = this.data.region[0];
    var city = this.data.region[1];
    var county = this.data.region[2];
    var location = this.data.location;
    var minPerson = this.data.minPerson;
    var maxPerson = this.data.maxPerson;
    var minAdeptScore = this.data.minAdeptScore;
    
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    if(end_date.getTime() - start_date.getTime() < 0) {
      this.showModal1();
      return;
    }

    if(location == '' || minPerson == -1 || maxPerson == -1 || minAdeptScore == -1) {
      this.showModal1();
      return;
    }

    wxRequest({
      url: 'team/play/create',
      content_type: 'application/json',
      method: 'POST',
      data: {
        'gameId': this.data.gameId,
        'startTime': startTime,
        'endTime': endTime,
        'province': province,
        'city': city,
        'county': county,
        'location': location,
        'minPerson': minPerson,
        'maxPerson': maxPerson,
        'minAdeptScore': minAdeptScore,
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showModal2();
        }
      },
    });

  },

  locationInput: function (e) {
    this.setData({
      location: e.detail.value
    })
  },

  minPersonInput: function (e) {
    this.setData({
      minPerson: e.detail.value
    })
  },

  maxPersonInput: function (e) {
    this.setData({
      maxPerson: e.detail.value
    })
  },

  minAdeptScoreInput: function (e) {
    this.setData({
      minAdeptScore: e.detail.value
    })
  },

  //提交问卷的得分
  submitQuiz(e) {
    var crtOpt = this.data.correctOptions;
    var scoreTemp = 0;
    if (this.data.chosen1 == crtOpt[0]) {
      scoreTemp = scoreTemp + 20;
    }
    if (this.data.chosen2 == crtOpt[1]) {
      scoreTemp = scoreTemp + 20;
    }
    if (this.data.chosen3 == crtOpt[2]) {
      scoreTemp = scoreTemp + 20;
    }
    if (this.data.chosen4 == crtOpt[3]) {
      scoreTemp = scoreTemp + 20;
    }
    if (this.data.chosen5 == crtOpt[4]) {
      scoreTemp = scoreTemp + 20;
    }
    this.setData({
      score : scoreTemp
    })
    console.log('score:' + this.data.score);

    //更新用户的熟练分
    wxRequest({
      url: 'team/game/updateAdept',
      content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'POST',
      data: {
        'studentId': this.data.studentId,
        'gameId': this.data.gameId,
        'score' : this.data.score
      },
      success: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.showModal();
        }
      },
    });
  },

  optionToNum(str) {
    if (str == 'A') {
      return 0;
    }
    if (str == 'B') {
      return 1;
    }
    if (str == 'C') {
      return 2;
    }
    if (str == 'D') {
      return 3;
    }
  },

  StartTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  EndTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  PickerChange1(e) {
    console.log(e);
    this.setData({
      chosen1: e.detail.value
    })
  },

  PickerChange2(e) {
    console.log(e);
    this.setData({
      chosen2: e.detail.value
    })
  },

  PickerChange3(e) {
    console.log(e);
    this.setData({
      chosen3: e.detail.value
    })
  },

  PickerChange4(e) {
    console.log(e);
    this.setData({
      chosen4: e.detail.value
    })
  },

  PickerChange5(e) {
    console.log(e);
    this.setData({
      chosen5: e.detail.value
    })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  showModal() {
    this.setData({
      modalName: 'Modal'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
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

})