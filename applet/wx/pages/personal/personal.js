// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //事件处理函数（切换账号）
  bindViewTap: function (e) {
    wx.redirectTo({
      url: '../login/login'
    })
  },

  //事件处理函数（订单）
  bindViewTapOrder: function (e) {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  },

  //事件处理函数（优惠券）
  bindViewTapCoupon: function (e) {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },

  // 收费标准
  bindViewTapCharge: function (e) {
    wx.navigateTo({
      url: '../charge/charge'
    })
  },

  // 客服中心
  bindViewTapCs: function (e) {
    wx.navigateTo({
      url: '../charge/charge'
    })
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