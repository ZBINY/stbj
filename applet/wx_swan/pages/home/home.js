// pages/home/home.js
var modules = require('../../utils/util.js');
var tabs = [{
  name: "标准货车"
}, {
  name: "标准货车"
}, {
  name: "金杯车"
}, {
  name: "小型箱货"
}, {
  name: "护栏敞车"
}, {
  name: "护栏敞车"
}, {
  name: "护栏敞车"
}, {
  name: "护栏敞车"
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navScrollLeft: 0,
    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: 1, //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    index: 0,
    indexs: 0,
    index1: 0,
    indexFlag: false,
    indexFlag1: false,
    objectArray: [{
      areaNum: '0',
      name: '有电梯，无需楼层费'
    }, {
      areaNum: '1',
      name: '无电梯，1楼'
    }, {
      areaNum: '2',
      name: '无电梯，2楼'
    }, {
      areaNum: '3',
      name: '无电梯，3楼'
    }, {
      areaNum: '4',
      name: '无电梯，4楼'
    }, {
      areaNum: '5',
      name: '无电梯，5楼'
    }, {
      areaNum: '6',
      name: '无电梯，6楼'
    }],
    objectArray1: [{
      areaNum: '0',
      name: '有电梯，无需楼层费'
    }, {
      areaNum: '1',
      name: '无电梯，1楼'
    }, {
      areaNum: '2',
      name: '无电梯，2楼'
    }, {
      areaNum: '3',
      name: '无电梯，3楼'
    }, {
      areaNum: '4',
      name: '无电梯，4楼'
    }, {
      areaNum: '5',
      name: '无电梯，5楼'
    }, {
      areaNum: '6',
      name: '无电梯，6楼'
    }],
    region: ['2018-08-21', '11', '10'],
    date: modules.formatDate(new Date()),
    time: modules.formatTime(new Date()),
    startAddress: '',
    endAddress: '',
    array: ['美国', '中国', '巴西', '日本']
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value
    });
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      time: e.detail.value
    });
  },

  //返回首页
  bindViewTapHome: function (e) {
    console.log(e.currentTarget.dataset.id);
    swan.redirectTo({
      url: '../personal/personal?id=' + e.currentTarget.dataset.id
    });
  },

  //事件处理函数
  bindViewTap: function (e) {
    console.log(e.currentTarget.dataset.id);
    swan.redirectTo({
      url: '../order/order?id=' + e.currentTarget.dataset.id
    });
  },

  //事件处理函数
  bindViewTaps: function (e) {
    console.log(e.currentTarget.dataset.id);
    swan.redirectTo({
      url: '../map/map?id=' + e.currentTarget.dataset.id
    });
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      region: e.detail.value
    });
  },
  bindPickerChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      indexs: e.detail.value
    });
  },

  // 下拉框选择方法
  bindPickerChange: function (e) {
    var that = this;

    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('picker发送选择改变，携带值为', e);
    console.log(this.data.objectArray[e.detail.value].areaNum);
    this.setData({
      indexFlag: true,
      index: e.detail.value,
      areaNum: this.data.objectArray[e.detail.value].areaNum
    });
  },

  // 下拉框选择方法
  bindPickerChange1: function (e) {
    var that = this;

    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('picker发送选择改变，携带值为', e);
    console.log(this.data.objectArray[e.detail.value].areaNum);
    this.setData({
      indexFlag1: true,
      index1: e.detail.value,
      areaNum1: this.data.objectArray[e.detail.value].areaNum
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;

    swan.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / (that.data.tabs.length - 1),
          sliderOffset: res.windowWidth / (that.data.tabs.length - 1) * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68 //计算内容区高度，rpx -> px计算
        });
        console.log(that.data.tabs.length - 1);
        console.log(res.windowWidth);
        console.log(that.data.sliderOffset);
      }
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    console.log("bindChange:" + current);
  },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
    console.log("s:" + this.data.sliderOffset);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    swan.getStorage({
      key: 'startAddress',
      success: function (res) {
        console.log(res);
        that.setData({
          startAddress: res.data
        });
      }
    });
    swan.getStorage({
      key: 'endAddress',
      success: function (res) {
        console.log(res);
        that.setData({
          endAddress: res.data
        });
      }
    });
  },

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