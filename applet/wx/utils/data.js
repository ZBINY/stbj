function getClassData() {
  var arrays = [
    {
      id: 'bingxiang',
      cate: '冰箱',
      num:'0',
      detail: [
        {
          thumb: '/images/erha.jpg',
          name: '二哈'
        }
      ]
    },
    {
      id: 'dianshi',
      cate: '电视',
      detail: [
        {
          thumb: '/images/fanfan.jpg',
          name: '饭饭'
        }
      ]
    },
    {
      id: 'xiyiji',
      cate: '洗衣机',
      detail: [
        {
          thumb: '/images/pingtouge.jpg',
          name: '平头哥'
        }
      ]
    },
    {
      id: 'xiwanji',
      cate: '洗碗机',
      detail: [
        {
          thumb: '/images/qijiao.jpg',
          name: '七饺'
        }
      ]
    }
  ]
  return arrays
}

module.exports = {
  getClassData: getClassData
}
