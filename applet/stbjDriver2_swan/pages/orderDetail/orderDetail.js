// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false, //遮罩层hide
    showView1: true, //付款方式show
    showView2: false, //扫描二维码hide
    customer: {
      name: "张先生",
      phone: "133-1333-1333"
    },
    service: {
      name: "北京5号客服",
      phone: "400-8888-888"
    },
    customerPhoneNum: "133-1333-1333", //客户电话
    servicePhoneNum: "400-8888-888", //客服电话
    costList: { //基础费用
      errcode: 0,
      errmsg: 'OK',
      data: [{
        name: "金杯车起步价（含10公里）",
        remark1: "",
        price1: "¥200",
        remark2: "",
        price2: ""
      }, {
        name: "2米2货箱步价（含10公里）",
        remark1: "",
        price1: "¥320",
        remark2: "",
        price2: ""
      }, {
        name: "金杯车超里程费",
        remark1: "6元/公里*8元",
        price1: "¥48",
        remark2: "",
        price2: ""
      }, {
        name: "楼层费（无电梯）",
        remark1: "搬出：10元/层*5层",
        price1: "¥50",
        remark2: "搬入：10元/层*3层",
        price2: "¥30"
      }]
    },
    largeHandling: { //大件搬运
      errcode: 0,
      errmsg: 'OK',
      data: [{
        name: "冰箱（200-249升）",
        remark1: "",
        price1: "¥50"
      }, {
        name: "电视（50-54寸）",
        remark1: "",
        price1: "¥100"
      }, {
        name: "衣柜拆装",
        remark1: "50元/门*3元",
        price1: "¥150"
      }, {
        name: "楼层费（无电梯）",
        remark1: "搬出：10元/层*5层",
        price1: "¥50"
      }]
    },
    packingArticles: { //包装物品
      errcode: 0,
      errmsg: 'OK',
      data: [{
        name: "普通资料箱（55cm*35 cm*40 cm）",
        remark1: "14元/个*5个",
        price1: "¥70"
      }, {
        name: "电脑箱（40cm*40 cm*60 cm）",
        remark1: "18元/个*5个",
        price1: "¥90"
      }, {
        name: "普通资料箱（55cm*35 cm*40 cm）",
        remark1: "14元/个*5个",
        price1: "¥70"
      }]
    },
    orderTotal: { //订单总额
      errcode: 0,
      errmsg: 'OK',
      data: [{
        name: "订单总额",
        price: "¥2352"
      }, {
        name: "优惠券",
        price: "-¥5"
      }, {
        name: "剩余尾款",
        price: "¥2846"
      }]
    },
    indexFlag: false, //基础费用弹窗表示，显示介绍
    indexFlag1: false, //包装费用弹窗表示，显示介绍
    costListPicker: [//基础费用弹窗
    {
      costListNum: '0',
      name: '楼层费'
    }, {
      costListNum: '1',
      name: '超里程费'
    }, {
      costListNum: '2',
      name: '平面运费'
    }],
    packingArticlesPicker: [//包装费用弹窗
    {
      costListNum: '0',
      name: '胶带'
    }, {
      costListNum: '0',
      name: '电视'
    }, {
      costListNum: '2',
      name: '资料箱'
    }],
    MultiArray: [//大件搬运
    [{
      id: 0,
      name: '贵、重、易损'
    }, {
      id: 1,
      name: '家用电器'
    }, {
      id: 3,
      name: '家居拆装'
    }], [{
      id: 0,
      name: '贵'
    }, {
      id: 1,
      name: '重'
    }, {
      id: 2,
      name: '易损'
    }, {
      id: 3,
      name: '金'
    }, {
      id: 3,
      name: '银'
    }]],
    multiIndex: [0, 0],
    indexFlag3: false, //大件搬运弹窗表示，显示介绍
    // 基础费用picker选择存储对应值
    jcfy: '',
    // 基础费用input是否填写
    indexFlagJcfy: false,
    addFlag: true,
    djby: '',
    indexFlagDjby: false,
    addFlag1: true,
    bzwp: '',
    indexFlagBzwp: false,
    addFlag2: true
  },

  //拨打电话函数
  tel: function (e) {
    var targetId = e.target.id; //targetId=0拨打客户电话 targetId=1客服电话
    console.log('targetId:' + targetId);
    if (targetId == 1) {
      swan.makePhoneCall({
        phoneNumber: this.data.servicePhoneNum
      });
    } else {
      swan.makePhoneCall({
        phoneNumber: this.data.customerPhoneNum
      });
    }
  },
  //基础费用弹窗
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      indexFlag: true,
      index: e.detail.value,
      jcfy: that.data.costListPicker[e.detail.value].name
    });
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('123', that.data.costListPicker[e.detail.value].name);
    if (that.data.indexFlagJcfy && that.data.indexFlag) {
      swan.showModal({
        title: '提示',
        content: '是否增加此项费用',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            var arr = { name: that.data.costListPicker[e.detail.value].name, price1: "¥" + that.data.priceJcfy };
            that.data.costList.data.push(arr);
            that.setData({
              costList: that.data.costList,
              addFlag: false
            });
          } else {
            console.log('用户点击取消');
          }
        }
      });

      console.log(that.data.jcfy);
      console.log(that.data.costList);
    }
  },
  //输入金额后，确定弹框
  confirmPrice: function (e) {
    var that = this;
    var price = e.detail.value.replace("¥", "");
    console.log(price);
    that.setData({
      indexFlagJcfy: true,
      priceJcfy: price
    });
    if (that.data.indexFlag && that.data.indexFlagJcfy) {

      if (price != '' && price != '0') {
        swan.showModal({
          title: '提示',
          content: '是否增加此项费用',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              var arr = { name: that.data.jcfy, price1: "¥" + that.data.priceJcfy };
              that.data.costList.data.push(arr);
              that.setData({
                costList: that.data.costList,
                addFlag: false
              });
            } else {
              console.log('用户点击取消');
            }
          }
        });
      }
    } else {
      swan.showModal({
        title: '提示',
        content: '请选择收费项目',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  // 基础费用add
  add: function () {
    var that = this;
    that.setData({
      addFlag: true,
      indexFlag: false,
      indexFlagJcfy: false,
      priceJcfy: '',
      jcfy: ''
    });
  },

  //大件搬运弹窗
  bindMultiPickerChange: function (e) {
    console.log('e', e);
    console.log('e', e.detail.value[0]);
    var that = this;
    this.setData({
      indexFlag3: true,
      multiIndex: e.detail.value,
      djby: that.data.MultiArray[0][e.detail.value[0]].name,
      djby1: that.data.MultiArray[0][e.detail.value[1]].name
    });
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('123', that.data.MultiArray[e.detail.value[0]].name);
    console.log('123', that.data.MultiArray[e.detail.value[1]].name);
    if (that.data.indexFlagDjby && that.data.indexFlag3) {
      swan.showModal({
        title: '提示',
        content: '是否增加此项费用',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            var arr = { name: that.data.djby + '(' + that.data.djby1 + ')', price1: "¥" + that.data.priceDjby };
            that.data.largeHandling.data.push(arr);
            that.setData({
              largeHandling: that.data.largeHandling,
              addFlag1: false
            });
          } else {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  //大件搬运输入金额后，确定弹框
  confirmPrice1: function (e) {
    var that = this;
    var price = e.detail.value.replace("¥", "");
    console.log(price);
    that.setData({
      indexFlagDjby: true,
      priceDjby: price
    });
    if (that.data.indexFlag3 && that.data.indexFlagDjby) {
      if (price != '' && price != '0') {
        swan.showModal({
          title: '提示',
          content: '是否增加此项费用',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              var arr = { name: that.data.djby + '(' + that.data.djby1 + ')', price1: "¥" + that.data.priceDjby };
              that.data.largeHandling.data.push(arr);
              that.setData({
                largeHandling: that.data.largeHandling,
                addFlag1: false
              });
            } else {
              console.log('用户点击取消');
            }
          }
        });
      }
    } else {
      swan.showModal({
        title: '提示',
        content: '请选择收费项目',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  // 大件搬运add
  add1: function () {
    var that = this;
    that.setData({
      addFlag1: true,
      indexFlag3: false,
      indexFlagDjby: false,
      priceDjby: '',
      djby: ''
    });
  },

  //包装费用弹窗
  bindPackingChange: function (e) {
    var that = this;
    this.setData({
      indexFlag1: true,
      index: e.detail.value,
      bzwp: that.data.packingArticlesPicker[e.detail.value].name
    });
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('123', that.data.packingArticlesPicker[e.detail.value].name);
    if (that.data.indexFlagBzwp && that.data.indexFlag1) {
      swan.showModal({
        title: '提示',
        content: '是否增加此项费用',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            var arr = { name: that.data.packingArticlesPicker[e.detail.value].name, price1: "¥" + that.data.priceBzwp };
            that.data.packingArticles.data.push(arr);
            that.setData({
              packingArticles: that.data.packingArticles,
              addFlag2: false
            });
          } else {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  //大件搬运输入金额后，确定弹框
  confirmPrice2: function (e) {
    var that = this;
    var price = e.detail.value.replace("¥", "");
    console.log(price);
    that.setData({
      indexFlagBzwp: true,
      priceBzwp: price
    });
    if (that.data.indexFlag1 && that.data.indexFlagBzwp) {
      if (price != '' && price != '0') {
        swan.showModal({
          title: '提示',
          content: '是否增加此项费用',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              var arr = { name: that.data.bzwp, price1: "¥" + that.data.priceBzwp };
              that.data.packingArticles.data.push(arr);
              that.setData({
                packingArticles: that.data.packingArticles,
                addFlag2: false
              });
            } else {
              console.log('用户点击取消');
            }
          }
        });
      }
    } else {
      swan.showModal({
        title: '提示',
        content: '请选择收费项目',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  // 大件搬运add
  add2: function () {
    var that = this;
    that.setData({
      addFlag2: true,
      indexFlag1: false,
      indexFlagBzwp: false,
      priceBzwp: '',
      bzwp: ''
    });
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      MultiArray: this.data.MultiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.MultiArray[1] = [{
              id: 0,
              name: '贵'
            }, {
              id: 1,
              name: '重'
            }, {
              id: 2,
              name: '易损'
            }, {
              id: 3,
              name: '金'
            }, {
              id: 3,
              name: '银'
            }];
            break;
          case 1:
            data.MultiArray[1] = [{
              id: 0,
              name: '电脑'
            }, {
              id: 1,
              name: '电视'
            }, {
              id: 2,
              name: '冰箱'
            }];
            break;
          case 2:
            data.MultiArray[1] = [{
              id: 0,
              name: '空调'
            }, {
              id: 1,
              name: '柜门'
            }, {
              id: 2,
              name: '组合'
            }];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },

  // 发起收款  
  receivable: function () {
    this.setData({
      showView: !this.data.showView
    });
  },
  //关闭遮罩层
  close: function () {
    this.setData({
      showView: !this.data.showView,
      showView1: !this.data.showView1,
      showView2: !this.data.showView2
    });
  },
  //扫描二维码
  ToQrcode: function () {
    this.setData({
      showView1: !this.data.showView1,
      showView2: !this.data.showView2
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