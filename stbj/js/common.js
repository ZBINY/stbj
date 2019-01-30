$('.srbj-head .Head').load("../html/head.html .head",function (responseTxt, statusTxt, xhr) {
    if (statusTxt == 'success'){
        Headfn();
    }
});

// $('.Sec-head').load("../html/head.html .sec-head", secHeadNav);
$('.srbj-head .Sec-head').load("../html/head.html .sec-head", function (responseTxt, statusTxt, xhr) {
    // console.log(statusTxt)
    if (statusTxt == 'success') {
        secHeadNav()
    }
});
$('.srbj-head .Login').load('../html/head.html .login');
$('.stbj-footer').load("../html/footer.html .footer");
$('.stbj-copyRight').load("../html/footer.html .copyRight");


var areas_name = ['北京','长沙','成都','唐山','天津','西安','南京','贵阳','台肥','福州','武汉','郑州','上海','深圳','厦门'];

//头部  登录等点击事件 切换城市
function Headfn() {
    //click登陆
    $('.head .head-choose p:eq(0)').click(function () {
        $('.login').toggle();
        $('body').css('overflow','hidden');
    });
    $('.Login').on('click','.login .login-btn',function () {
        $('body').css('overflow','visible');
        $('.login').toggle();
    });
    //click城市
    $('.head .area .area-change').click(function(){
        $('.head .area .areabox').show();
    });

    //切换城市框 选择
    $('.head .area .areabox').on('click','li',function(){
        var name = $(this).html();
        var index = $(this).index();
        $('.head .area .area-choose').html(name);
        $('.head .area .areabox li').removeClass('areabox-red2');
        $('.head .area .areabox li').eq(index).addClass('areabox-red2');
        $('.head .area .areabox').hide();
    });
    $('.head .area .areabox').on('mouseenter','li',function () {
        $(this).addClass('areabox-red');
    }).on('mouseleave','li',function () {
        $(this).removeClass('areabox-red');
    });

    //小程序、公众号
    $('.head-choose').on('mouseenter',' .wechat',function () {
        $(this).find('.wechat_applet').show();
        $(this).siblings().find('.wechat_applet').hide();
    }).on('mouseleave','.wechat',function(){
        $(this).find('.wechat_applet').hide();
    })
}


var secHeadNav_index = 0;
//头部 网站导航切换
function secHeadNav() {
    $('.sec-head .nav li').removeClass('choose_click');
    $('.sec-head .nav li').removeClass('choose');
    $('.sec-head .nav li').eq(sessionStorage.getItem('secHeadNav_index')).addClass('choose_click');

    $('.sec-head .nav li').hover(function () {
        $(this).addClass('choose');
        $(this).siblings().removeClass('choose');
    }, function () {
        $('.sec-head .nav li').removeClass('choose');
    });

    $('.sec-head .nav li').click(function () {
        var _index = $(this).index();
        sessionStorage.setItem('secHeadNav_index',_index);
        switch(_index){
            case 0:
                window.location.href = '../html/index.html';
                break;
            case 1:
                window.location.href = '../html/order.html';
                break;
            case 2:
                window.location.href = '../html/service.html';
                break;
            case 3:
                window.location.href = '../html/area.html';
                break;
            case 4:
                window.location.href = '../html/case.html';
                break;
            case 5:
                window.location.href = '../html/news.html';
                break;
            case 6:
                window.location.href = '../html/about.html';
                break;
        }
    });

}


/****************首页**************/
//为什么选择四通搬家 切换
$('.whyChoose-con .con').mouseenter(function () {
    $(this).addClass('whyChoose-choose');
    $(this).siblings().removeClass('whyChoose-choose');
});
//车型选择
//计算车型展示left多少
var Left = Zindex = 0;
for (i = 1; i <= $('.carModle-con-wrapprer .carModle-con').length; i++) {
    Left += ($('.carModle-con-wrapprer').width() / $('.carModle-con-wrapprer .carModle-con').length - 45);
    $('.carModle-con-wrapprer .carModle-con').eq(i).css({
        'left': Left + 'px',
        'z-index': ++Zindex,
        'borderLeft': '1px solid #ccc'
    });
    // console.log('left',Left);
    if (i == $('.carModle-con-wrapprer .carModle-con').length) {
        $('.carModle-con-wrapprer .carModle-con').eq(i - 1).find('.shadowBox').hide();
        // $('.carModle-con-wrapprer .carModle-con').eq(i - 1).addClass('carModle-con-top')
    }
}

$('.carModle-con-wrapprer .carModle-con').on('mouseenter', function () {
    var init_zIndex = $(this).index() +1;
    $(this).find('.shadowBox').hide();
    // $(this).addClass('carModle-con-top');
    $(this).css({
        'z-index': '100'
    });
    $(this).siblings().find('.shadowBox').show();
    // $(this).siblings().removeClass('carModle-con-top');
    $(this).siblings().css({'z-index':init_zIndex});

    $(this).find('.carModle-pic').addClass('transitionHeight_pic');
    $(this).find('.carModle-msg').addClass('transitionHeight_msg');
    $(this).find('.choose').addClass('transitionHeight_choose');
    $(this).siblings().find('.carModle-pic').removeClass('transitionHeight_pic');
    $(this).siblings().find('.carModle-msg').removeClass('transitionHeight_msg');
    $(this).siblings().find('.choose').removeClass('transitionHeight_choose');
});

//四通新闻
$('.stNews-tab li').click(function(){
    $(this).addClass('choose');
    $(this).siblings().removeClass('choose');
});


/****************服务项目**************/
//tab
$('.Service-con ul').mouseenter(function(){
    $(this).addClass('Service-con-choose');
    $(this).siblings().removeClass('Service-con-choose');
    $(this).find('.title1').hide();
    $(this).find('.title2').show();
    $(this).siblings().find('.pic .name').remove();
    $(this).siblings().find('.title1').show();
    $(this).siblings().find('.title2').hide();

    if($(this).find('.pic').children().hasClass('name')== false){
        $(this).find('.pic').append('<p class="name">'+ $(this).find('.title1').html() +'</p>');
    }
});





