// pages/game/index.js
import wxRequest from "../../api/common.js";

const app = getApp();

Page({

  data: {
    TabCur: 0,
    gameId : '',
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
    picker5: []
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

    //查更新用户的熟练分
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

})