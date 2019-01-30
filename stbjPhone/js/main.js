(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 1024) { // 最大宽度
            width = 1024;
        }
        var rem = width / 7.5;
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);

//获取url
function getUrlParam(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

//header
//城市选择
$('.location-city').click(function () {
    //初始化城市列表
    if ($('.head-left').hasClass('areaboxInit')==false){
        $('.head-left').addClass('areaboxInit');
        $('.head-left').append('<ul class="areabox"><li class="areabox-red2">北京</li>' +
            '            <li>长沙</li>' +
            '            <li>成都</li>' +
            '            <li>唐山</li>' +
            '            <li>天津</li>' +
            '            <li>西安</li>' +
            '            <li>南京</li>' +
            '            <li>贵阳</li>' +
            '            <li>合肥</li>' +
            '            <li>福州</li>' +
            '            <li>武汉</li>' +
            '            <li>郑州</li>' +
            '            <li>上海</li>' +
            '            <li>深圳</li>' +
            '            <li>厦门</li></ul>');
    }

    //点击展示或隐藏
    if ($('.head-left').hasClass('areaboxClick')) {
        $('.head-left').removeClass('areaboxClick');
        $('.head-left').find('.areabox').hide();
    }else{
        $('.head-left').addClass('areaboxClick');
        $('.head-left').find('.areabox').show();

        //城市列表内容的点击事件
        $('.head-left').on('click','.areabox li',function () {
            $(this).addClass('areabox-red2');
            $(this).siblings().removeClass('areabox-red2');

            $('.location-city span').text($(this).html());
            $('.head-left').removeClass('areaboxClick');
            $('.head-left').find('.areabox').hide();
        })
    }




});


//footer导航
//首页
$('footer ul:eq(0)').click(function () {
    location.href = '../html/index.html';
});
$('footer ul:eq(2)').click(function () {
    location.href = '../html/order.html';
});
// 导航展示
$('footer .footer-nav').click(function () {
    $('.footer-navBar').toggle();
})


//优惠券 tab切换
$('.coupon-wrapper .coupon-tabBar p').click(function(){
    var _index = $(this).index();

    $(this).siblings().removeClass('choose');
    $(this).addClass('choose');
});

//订单  tab切换
$('.orderList-wrapper .orderList-tabBar p').click(function(){
    var _index = $(this).index();

    $(this).siblings().removeClass('choose');
    $(this).addClass('choose');
});

//下单 order.html
//header切换
$('.order-tab-wrapper .order-tab-container').on('click','li',function(){
    var _index = $(this).index();
    $(this).addClass('choose');
    $(this).siblings().removeClass('choose');

    swiper.slideTo(_index, 1000, false);
});
//快速下单
$('#order-msg1 .order-btn').click(function () {
   window.location.href = '../html/quickOrder.html';
});
//下单无需支付弹窗
$('#order-msg .next').click(function(){
    $('.mask').show();
});

//首页搬家导航下单
$('.estimate .estimate-type-box li').click(function(){
    var _index = $(this).index(); //点击搬家图标的index
    var _name = encodeURIComponent($(this).text()); //点击的是什么搬家的name

    if (_index==0 ||_index==1 ||_index==2||_index==3){
        window.location.href = '../html/fileDetail.html?name=' + _name + '&type=0';
    } else{
        window.location.href = '../html/fileDetail.html?name=' + _name + '&type=1' ;
    }
});
//快速下单其他详情页的跳转
$('.fileDetail .QD').click(function(){
    var _type = getUrlParam('type');
    if (_type==0){
        window.location.href = '../html/quickOrderOther.html';
    }else{
        window.location.href = '../html/quickOrderOther1.html';
    }
});
