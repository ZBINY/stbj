var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
var originalData = [];
Page({
    data: {
      markers: [],
      latitude: '',
      longitude: '',
      placeData: {},
      array: ['河北', '山东', '辽宁', '黑龙江', '吉林', '甘肃', '青海', '河南', '江苏', '湖北', '湖南', '江西', '浙江', '广东', '云南', '福建', '台湾', '海南', '山西', '四川', '陕西', '贵州', '安徽', '重庆', '北京', '上海', '天津', '内蒙古', '广西', '西藏', '新疆', '宁夏', '澳门', '香港'],
      index: 0,
      sugData: '',
      province: '',
      result: [],
      mapId:''
    },
    bindPickerChange: function (e) {
      var that = this
      console.log('picker发送选择改变，携带值为', e.detail.value)
      console.log('picker发送选择改变，携带值为', e)
      for (var i = 0; i < that.data.array.length; i++) {
        if (i == e.detail.value) {
          that.setData({
            province: that.data.array[i]
          })
        }
      }
      this.setData({
        index: e.detail.value,
      })
    },
  bindKeyInput: function (e) {
    var that = this;
    if (e.detail.value === '') {
      that.setData({
        sugData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: '8SfGmaaeK4m6sCTjg14CLNUDOEuagP6q'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data)
      if(data.message === 'ok'){
        that.setData({
          result: data.result
        })
      }
      var sugData = '';
      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n';
      }
      that.setData({
        sugData: sugData
      });
    }
    BMap.suggestion({
      query: e.detail.value,
      // region: '北京',
      region: that.data.province,
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  //事件处理函数
  bindViewTap: function (e) {
    var that = this
    console.log(e.currentTarget.dataset)

    if (that.data.mapId === '0') {
      wx.setStorage({
        key: 'startAddress',
        data: e.currentTarget.dataset.address ? e.currentTarget.dataset.address + e.currentTarget.dataset.name : e.currentTarget.dataset.province + e.currentTarget.dataset.city + e.currentTarget.dataset.district + e.currentTarget.dataset.name
      })
    } else if (that.data.mapId === '1') {
      wx.setStorage({
        key: 'endAddress',
        data: e.currentTarget.dataset.address ? e.currentTarget.dataset.address + e.currentTarget.dataset.name : e.currentTarget.dataset.province + e.currentTarget.dataset.city + e.currentTarget.dataset.district + e.currentTarget.dataset.name
      })
    }

    wx.redirectTo({
      url: '../home/home'
    })
  },
  // 搜索框输入时触发事件回调
  bindInputContent: function (e) {
    console.log(e)
    if (e.detail.cursor !== 0) {
      var entName = encodeURI(encodeURI(e.detail.value))
      var that = this
      var current2Page = that.data.current2Page;

      this.setData({ currentPages: current2Page, list2: [], entName: entName })

      wx.getStorage({
        key: 'openid',
        success: function (res) {
          // - 请求关注接口(企业名称(entName)，地区编号(areaNums)，openid, page, count)
          that.requestLists({ areaNums: that.data.areaNum, openid: res.data, count: 20, page: that.data.current2Page, entName: entName });
        }
      });
    }

  },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
      that.showSearchInfo(originalData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
  onLoad: function (options) {
        var that = this;
        that.setData({
          mapId : options.id
        })
        var BMap = new bmap.BMapWX({
          ak: '8SfGmaaeK4m6sCTjg14CLNUDOEuagP6q'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            console.log(data);
            wxMarkerData = data.wxMarkerData;
            originalData = data.originalData;
            if (data.originalData.message === 'ok'){
              that.setData({
                province: data.originalData.results[0].province,
                result: data.originalData.results
              });
              for (var i = 0; i < that.data.array.length; i++) {
                if (data.originalData.results[0].province.indexOf(that.data.array[i]) !== -1) {
                  that.setData({
                    province: that.data.array[i],
                    index: i,
                  })
                }
              }
            }
            that.setData({
                markers: wxMarkerData,
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        BMap.search({
            "query": '小区',
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        console.log(data)
        console.log(i)
        console.log(data[i])
        var array = []
      array.push(data.results[i])
      that.setData({
        // province: data.originalData.results[0].province,
        result: array
      });
      console.log(that.data.result)
        // that.setData({
        //     placeData: {
        //         title: '名称：' + data[i].title + '\n',
        //         address: '地址：' + data[i].address + '\n',
        //         telephone: '电话：' + data[i].telephone
        //     }
        // });
    },
    changeMarkerColor: function(data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                data[i].iconPath = "../../img/marker_yellow.png";
            } else {
                data[i].iconPath = "../../img/marker_red.png";
            }
            markersTemp[i] = data[i];
        }
        that.setData({
            markers: markersTemp
        });
    }
})