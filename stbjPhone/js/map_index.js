$('#FROM').click(function () {
    $('#order-msg1').hide();
    $(".map_box").show();
    init('#FROM')
});
$('#TO').click(function () {
    $('#order-msg1').hide();
    $(".map_box").show();
    init('#TO')
});

//搬到哪里去 检索框取消
$('#cancel').click(function () {
    $('#order-msg1').show();
    $(".map_box").hide();
});



//地图加载
function init(data){
    if ($('#pickerInput').val()!=''){
        $('#pickerInput').val('')
    }

    var map = new AMap.Map("container", {
        resizeEnable: true
    });
    //输入提示
    var autoOptions = {
        input: "pickerInput"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: map
    });  //构造地点查询类

    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
        $('.amap-sug-result').on('click','.auto-item',function(){
            $(this).html().split('<')[0];
            console.log($(this).html().split('<')[0]);
            var text = $(this).html().split('<')[0] //选中的地址

            $(".map_box").hide();
            $('#order-msg1').show();
            $(data).html(text);
        })
    }
}
