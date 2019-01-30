// pages/Quickorder/Quickorder.js
var tabs = [{
  name: "进行中"
}, {
  name: "已完成"
}, {
  name: "已取消"
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: tabs, //展示的数据
    activeIndex: 0, //当前展示的Tab项索引
    scrollTop: 0
  },

  scroll: function (e) {
    console.log(e);
  },

  //返回首页
  bindConfirm: function (e) {
    console.log(e.currentTarget.dataset.id);
    swan.redirectTo({
      url: '../assess/assess?id=' + e.currentTarget.dataset.id
    });
  },

  //返回首页
  bindConfirms: function (e) {
    console.log(e.currentTarget.dataset.id);
    swan.redirectTo({
      url: '../drawing/drawing?id=' + e.currentTarget.dataset.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current
    });
  },

  navTabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      scrollTop: 0
    });
  },

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