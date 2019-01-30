// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:true,
    showView:false
  },

  //事件处理函数
  bindViewTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../class/class?id=' + e.currentTarget.dataset.id
    })
  },

  //事件处理函数
  bindViewTaps: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  //查看订单
  bindViewTapss: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.redirectTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  // 下单成功  
  receivable: function () {
    this.setData({
      showView: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options);
    if (options.id === '0'){
      this.setData({
        tab: false
      })
    } else if (options.id === '1'){
      this.setData({
        tab: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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