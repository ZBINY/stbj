// pages/homePage/homePage.js
var tabs = [
    {
        name: "进行中"
    },
    {
        name: "已完成"
    },
    {
        name: "已取消"
    }
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: tabs,     //展示的数据

    },
    //事件处理函数（个人中心）
    bindViewTap:function(){
        wx.navigateTo({
            url: '../personal/personal'
        })
    },
    //事件处理函数（列表详情）
    bindViewTapDetail: function () {
      wx.navigateTo({
        url: '../orderDetail/orderDetail'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

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
