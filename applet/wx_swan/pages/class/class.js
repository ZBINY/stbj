var classData = require('../../utils/data.js');
var tabs = [{
  name: "冰箱"
}, {
  name: "电视"
}, {
  name: "洗衣机"
}, {
  name: "洗碗机"
}, {
  name: "洗碗机"
}];
Page({
  data: {
    tabs: tabs, //展示的数据
    activeIndex: 0, //当前展示的Tab项索引
    category: [{ name: '冰箱', id: 'bingxiang' }, { name: '电视', id: 'dianshi' }, { name: '洗衣机', id: 'xiyiji' }, { name: '洗碗机', id: 'xiwanji' }],
    detailData: '',
    details: [{
      id: 'bingxiang',
      cate: '拆家大队长',
      detail: [{
        thumb: '/images/erha.jpg',
        name: '二哈'
      }]
    }],
    curIndex: 0,
    isScroll: false,
    toView: 'erha'
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
  onReady() {
    // var self = this;
    // wx.request({
    //   url: 'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
    //   success(res) {
    //     console.log(res.data)
    //     self.setData({
    //       detail: res.data.result
    //     })
    //   }
    // });

  },
  //事件处理函数
  bindViewTap: function (e) {
    swan.navigateTo({
      url: '../order/order?'
    });
  },
  onLoad(options) {
    console.log(options);
    this.setData({
      activeIndex: options.id
    });

    const _this = this;
    classData.getClassData();
    console.log(classData.getClassData());
    console.log(classData.getClassData()[0]);
    _this.setData({
      details: classData.getClassData()[0]
    });
    console.log(this.data.details);
  },
  switchTab(e) {
    let index = e.target.dataset.index;
    classData.getClassData();
    this.setData({
      "curIndex": index,
      "details": classData.getClassData()[index]
    });
  }

});