var provinces = ['china','shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];
var provincesText = ['中国','上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];
function showProvince() {

    var name = provinces[currentIdx];

    var myChart = echarts.init(document.getElementById('fzdw_zxs'));

    myChart.showLoading();

    $.get('../json/' + name + '.json', function (geoJson) {

        myChart.hideLoading();

        echarts.registerMap(provincesText[currentIdx], geoJson);

        myChart.setOption(option = {
            backgroundColor: '#fff',
            grid: {
                left: '-10%',
                top:'2%',
                right: '9%',
                bottom: '0%',
                containLabel: true
            },
            selectedMode: true ,
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },

            series: [
                {
                    type: 'map',
                    mapType: provincesText[currentIdx],
                    color:'#fff',
                    label: {
                        normal : {
                            show : true,
                            textStyle : {
                                color: '#fff'
                            }
                        },

                        emphasis: {
                            show:true,
                            textStyle: {
                                color: '#222'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            areaColor: '#d6c9ca',
                            color:'#fff',
                            borderWidth: 1,
                            label:{
                                show: true,
                            }
                        },
                        emphasis: {
                            areaColor: '#d6c911',
                            color:'#fff',
                            borderWidth: 1,
                            label:{
                                show: true,
                            }
                        }
                    },
                    data:[
                        {
                            name: '河北',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '北京',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '天津',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '山东',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '河南',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '江苏',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '安徽',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '陕西',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '湖北',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '湖南',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '广西',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '福建',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '贵州',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ca161e'
                                }
                            }
                        },
                        {
                            name: '四川',
                            itemStyle: {
                                normal: {
                                    areaColor: '#ff6600'
                                }
                            }
                        },
                    ],
                }
            ]
        });
    });
}

var currentIdx = 0;

showProvince();
var myChart = echarts.init(document.getElementById('fzdw_zxs'));
myChart.on('click', function (param) {
    //遍历取到provincesText 中的下标  去拿到对应的省js
    for(var  i= 0 ;i<provincesText.length;i++){

        if(param.name == provincesText[i]){
            currentIdx = i
            //显示对应省份的方法
            break ;
        }else{
            currentIdx = 0
            // break ;
        }
    }
    showProvince();
});
