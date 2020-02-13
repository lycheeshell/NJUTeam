// pages/game/index.js
import wxRequest from "../../api/common.js";

const app = getApp();

Page({

  data: {
    TabCur: 0,
    gameId : '',
    quizNum : 5,
    questions : [],
    correctOptions : [],
    plays : [],
    chosen1: null,
    chosen2: null,
    chosen3: null,
    chosen4: null,
    chosen5: null,
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
      gameId: options.gameId
    })
    console.log(this.data.gameId);
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
    console.log(crtOpt);
    
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
  }

})