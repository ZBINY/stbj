$(function () {
    $('.right').eq(0).show().siblings('.right').hide();
    $('.order_content').eq(0).show().siblings('.order_content').hide();
    //登陆
    $('.loginWrapper').load("../html/head.html .login",function (responseTxt, statusTxt, xhr) {
        if (statusTxt == 'success'){
            $('.location li:eq(1)').click(function () {
                $('.login').toggle();
                $('body').css('overflow','hidden');
            });
            $('.loginWrapper').on('click','.login .login-btn',function () {
                $('body').css('overflow','visible');
                $('.loginWrapper').toggle();
            });
        }
    });
    // 主导航
    $('.navs li').click(function () {
        var index = $(this).index();
        $(this).addClass('choose_click').siblings().removeClass('choose_click');
        if (index == 0){
            sessionStorage.setItem('secHeadNav_index',0);
            window.location.href = '../html/index.html';
        }else if (index ==3){
            sessionStorage.setItem('secHeadNav_index',3);
            window.location.href = '../html/service.html';
        }else if (index ==4){
            sessionStorage.setItem('secHeadNav_index',6);
            window.location.href = '../html/about.html';
        }

    });
    //城市选择
    $('.location li:eq(0)').click(function () {
        $('.areabox').toggle();
    });
    //城市选择框的点击和hover
    $('.areabox').on('click','li',function(){
        var name = $(this).html();
        var index = $(this).index();
        $('.location li:eq(0) span').html(name);
        $('.areabox li').removeClass('areabox-red2');
        $('.areabox li').eq(index).addClass('areabox-red2');
        $('.areabox').hide();
    });
    $('.areabox').on('mouseenter','li',function () {
        $(this).addClass('areabox-red');
    }).on('mouseleave','li',function () {
        $(this).removeClass('areabox-red');
    });
    // 侧边导航
    $('.content .left li').click(function () {
        var index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.right').eq(index).show().siblings('.right').hide();
    })

    // 我的订单
    $('.nav li').click(function () {
        var index = $(this).index();
        $(this).addClass('choose_click').siblings().removeClass('choose_click');
        $('.order_content').eq(index).show().siblings('.order_content').hide();

    })

    //居民搬家
    $('.jmbj .nav li').click(function(){
        var index = $(this).index();
        $('.jmbj .thing-wrapper').hide();
        $('.jmbj .thing-wrapper').eq(index).show();
    })

})

for (var i=0;i<3;i++){
    setTimeout(function () {
        console.log(i)
    },0)
} 