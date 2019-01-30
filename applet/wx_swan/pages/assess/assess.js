// pages/assess/assess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    texts: "至少5个字",
    min: 5, //最少字数
    max: 520, //最多字数 (根据自己需求改变) 
    start: [false, false, false, false, false],
    start1: [false, false, false, false, false],
    start2: [false, false, false, false, false],
    start3: [{
      name: 4,
      key: false
    }, {
      name: 5,
      key: false
    }, {
      name: 6,
      key: false
    }, {
      name: 7,
      key: false
    }]
  },

  bindStar: function (e) {
    var that = this;
    console.log(e);
    console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    var array = [];
    for (var i = 0; i <= that.data.start.length - 1; i++) {
      that.data.start[i] = false;
      this.setData({
        start: that.data.start
      });
      console.log(that.data.start);
    }
    for (var i = 0; i <= index; i++) {
      that.data.start[i] = true;
      this.setData({
        start: that.data.start
      });
      console.log(that.data.start);
    }
  },

  bindStar1: function (e) {
    var that = this;
    console.log(e);
    console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    var array = [];
    for (var i = 0; i <= that.data.start1.length - 1; i++) {
      that.data.start1[i] = false;
      this.setData({
        start1: that.data.start1
      });
      console.log(that.data.start1);
    }
    for (var i = 0; i <= index; i++) {
      that.data.start1[i] = true;
      this.setData({
        start1: that.data.start1
      });
      console.log(that.data.start1);
    }
  },

  bindStar2: function (e) {
    var that = this;
    console.log(e);
    console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    var array = [];
    for (var i = 0; i <= that.data.start2.length - 1; i++) {
      that.data.start2[i] = false;
      this.setData({
        start2: that.data.start2
      });
      console.log(that.data.start2);
    }
    for (var i = 0; i <= index; i++) {
      that.data.start2[i] = true;
      this.setData({
        start2: that.data.start2
      });
      console.log(that.data.start2);
    }
  },

  bindStar3: function (e) {
    var that = this;
    console.log(e);
    console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    var array = [];
    for (var i = 0; i <= that.data.start3.length - 1; i++) {
      that.data.start3[i].key = false;
      this.setData({
        start3: that.data.start3
      });
      console.log(that.data.start3);
    }
    that.data.start3[index].key = true;
    this.setData({
      start3: that.data.start3
    });
    console.log(that.data.start3);
  },

  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min) this.setData({
      texts: "加油，够5个字可以得20积分哦"
    });else if (len > this.data.min) this.setData({
      texts: " "
    });

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  //返回首页
  bindViewTap: function (e) {
    console.log(e.currentTarget.dataset.id);
    swan.redirectTo({
      url: '../home/home?id=' + e.currentTarget.dataset.id
    });
  },

  // 评价成功
  bindConfirm: function () {
    this.setData({
      showView: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});