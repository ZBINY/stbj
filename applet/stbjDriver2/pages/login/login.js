// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'点击获取验证码',
    disabledCode:false,
    flag:false,
  },

  //事件处理函数
  bindViewTapLogin: function (e) {
    wx.navigateTo({
      url: '../home/home'
    })
  },

  // 倒计时
  countdown: function () {
    var that = this
    if(that.data.flag === false){
      var i = 60
      var text = i + '秒后重试'
      that.setData({
        text: text,
        disabledCode: true,
        flag: true
      })
      var time = setInterval(function () {
        i--;
        if (i > 0) {
          text = i + '秒后重试';
          that.setData({
            text: text,
          })
        } else {
          text = '点击获取验证码';
          clearInterval(time);
          that.setData({
            text: text,
            disabledCode: false,
            flag: false
          })
        }
      }, 1000, i);
    }
  },

  bindCode:function () {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})