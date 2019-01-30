var map, geolocation;
var mapdCity;//声明定位城市
  //拖拽
var dragAdd ='';
var poiname ;
var posName;
var addr;
var lnglat;
var poiPicker;
var searchcity = "auto";
var mapCount = 0;

init();
function init(){  
  var frequency = 0;
    var poiname ='';
    // var lnglat =0;
    var lng = 0;
    var lat = 0;
    var dragLng =0;
    var dragLat = 0;
   // var href = getQry('href');
   $('.cityLef').on('click',function(){
    // location.href="city.html";
      // $('.map_box').addClass('mapTop').removeClass('mapBot');
      $('.map_box').hide();
      $('.city_box,.city-container').css('display','block');
   })

  // if(href){    //判断href是否有值 无值为页面初始加载
  //
	// if(href=="end"){
	// 	$("#container").hide();
	// 	$(".mapFooter").hide();
	// }else{
	// 	$("#container").show();
	// 	$(".mapFooter").show();
	// }
	//
  //   var str = sessionStorage.getItem('coordinate'+href);
  //   var obj;
  //   if(str!='' && str!=null){
  //     obj = JSON.parse(str);
  //     var ll = obj.lnglat;
  //     var splist = ll.split(',');
  //     lng = splist[0];
  //     lat = splist[1];
  //   }
	//
	// if(href=="end" && !str){ //如果目的地为空  赋值定位的坐标
	// 	 var str2 = sessionStorage.getItem('startlatlng');
	// 	 if(str2){
	// 	 var splist2 = str2.split(',');
	// 	lng = splist2[0];
	// 	lat = splist2[1];
	// 	 }
	// }
  // }




    var city = '';
    
    //加载地图，调用浏览器定位服务
    if(lng>0 && lat>0){
        map = new AMap.Map('container', {
        zoom: 16,
            resizeEnable: true,
            center: [lng, lat],
            scrollWheel: false
        });
    }else{
        map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 16,
            scrollWheel: false
        });
    }
    // if(!href){
      map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB',
        noIpLocate:1
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition(function(status,result){
         // alert(result.city)
      });
      geolocation.getCityInfo(function(status,result){
        // alert(result.city)
    })
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      });
    // }

    //解析定位结果
    function onComplete(data) {
      var token = localStorage.getItem("loginState");
        dragLng=data.position.getLng();
        dragLat=data.position.getLat();
        localStorage.setItem("startLng",dragLng);
        localStorage.setItem("startLat",dragLat);
        localStorage.setItem("startCity",city)
       var showCity=data.addressComponent.city==""?data.addressComponent.province:data.addressComponent.city;
     //   var showCity="北京市"
        if(!token){
          showAd(showCity)
        }
        
        setIcon();
    }
    //解析定位错误信息
    function onError(data) {
      //定位失败的话，定位到当前城市
      sessionStorage.setItem('dCity',"北京市");
      getpackage();
      alert('定位失败');
       var showOne = sessionStorage.getItem('showOne');
      if(!showOne && !token){
        sessionStorage.setItem('showOne',1)
       showAd("北京市")
      }
      document.getElementById('cityName').innerHTML = '定位中';
    }  
    //当前的城市 
 
    function setIcon(){
        map.clearMap();
        // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {

        new AMap.Marker({
                //自定义图标地址
                iconStyle:{//自定义外观
                   url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA+CAYAAABOU8kiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBODAxRTM3NzlCMzNFNzExQTU5Qjg1NTI3NkU2MTg5QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUyRDkwRjU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUyRDkwRTU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCMzUxQkZDMEU0Q0U3MTE5Nzc0RUUwQjZDMEIyQTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MDFFMzc3OUIzM0U3MTFBNTlCODU1Mjc2RTYxODlBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8QaFrAAAA7lJREFUeNrsmd1LU2EYwN8tTZsf04ViFzKz+VGZWFuadVGC5kVBl5VBFAVeBVESXkiUVlDSRfQHpBf1D1hYoNjNEsuxgZUuRS0TU9DlGppOt57HPZNX3fnYOS52cR74eTGf93l/nPOec573HF0wGGTxEAn4x2azyc1PBc4Cp4AyYC9gpP/NA2OAC3gPvAZ8cor29/eHRGREAXAHqAMMAjnZRAVQDywCr4DHwLDUBHqJ/+OkrcAX4LqIRKTYBVwDvlINg1IRPAp9QAOQqPL0N1CtgmhFrIAdKNnG9VhCNa1yRSxAJ5AVg4sji2pbpERSgI4YSfAyHTTXxsuXi2agWKqStegPq63wsLICH8vOXF77bcazk7mGU9m7vkzmcKdJlcA5WoBb4R90eEOj+0gR8DmC3HrkZi+xpivf10TEAkUetJnZxEySWNoKrRs33kf4U9MoJnGk0Mfam4YkJcJHDHNxjMTV1Lh5jWQAF8SOxNMbIyw9ZUX2QsBcHINjReIizb0ucgZIFsq+e3WcpRlWo16VOAbHikQSzb0uUiWUeeyglx0u9Cm+RHBsZYlXLKWKFykVyjpd7lF9vdYcFa1RyovkC2XZir2qRSRq5PMi6UJZOSa/apGc3cui65oXCQhl+Vd0qkX8ftGHfIAXETx2055E1SISNby8iGDjMjieolpEosYwL+ISynrTa1ItIlHDxYt0C2V9GDAy57dUxRL4IMQaItHNi3SKrZOWtjzmW9wRtQSOaX6RJ7U+3vIi2Oi2C2X/mE5it5/vYwtLetkSmItjcKxI4JwLmxujVhISfLRfbtkvp9eQm/uX5tzSGE0Aj6hhiRjjU8ms/kkhKz/gZdW2UGMUvuH9mktcWw9dn0zs42CanIP2kObc0hiFxXBzdCLGGzs7Pez84Q2WPkLXdB4YiaHECPU+fqkufhKoBUZjIDFKtX/K3dfggONAzzZK9FDN0Wh3etPYSgA3aYOtNOapRg3VVLT3xf7wGfUM9+m0yY1JGpNPNVYlX0vIiDngHu17KoFq4BBwjquBWxE3MAB0Ab1i7YVSEb53sBMYv7n3I3UkoSj0LE5CE9FENBFNRBPRRDQRTUQT0UTiXUR2F2+1WvH1In7VxE8ce4AMp9OZEAiEdgwWi+WS0WjE92FTwBAw5nA4gtsuQtuFDd/kTCaTfXZ29qTBYHCDBL7vyCXKWegl3ctY7Ws2hNls7kX+66lhoW+4eGqK6NRkstAn1QR6nYFvmzx0anDHNxaNiC5ePslrl+/m+CfAAK3BB2GmT6wXAAAAAElFTkSuQmCC',//图片地址
                   size:[17,31],  //要显示的点大小，将缩放图片
                   ancher:[14,31],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
                },
                //设置基点偏移
                offset: new AMap.Pixel(-19, -60),
                map: map,
                showPositionPoint: true,
                position: [dragLng, dragLat],
                zIndex: 100
            });
        // });
    }
   // AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
   //
   //     map.clearMap();
   //      var positionPicker = new PositionPicker({
   //          mode: 'dragMap',
   //          map: map,
   //          iconStyle:{//自定义外观
   //             url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA+CAYAAABOU8kiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBODAxRTM3NzlCMzNFNzExQTU5Qjg1NTI3NkU2MTg5QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUyRDkwRjU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUyRDkwRTU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCMzUxQkZDMEU0Q0U3MTE5Nzc0RUUwQjZDMEIyQTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MDFFMzc3OUIzM0U3MTFBNTlCODU1Mjc2RTYxODlBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8QaFrAAAA7lJREFUeNrsmd1LU2EYwN8tTZsf04ViFzKz+VGZWFuadVGC5kVBl5VBFAVeBVESXkiUVlDSRfQHpBf1D1hYoNjNEsuxgZUuRS0TU9DlGppOt57HPZNX3fnYOS52cR74eTGf93l/nPOec573HF0wGGTxEAn4x2azyc1PBc4Cp4AyYC9gpP/NA2OAC3gPvAZ8cor29/eHRGREAXAHqAMMAjnZRAVQDywCr4DHwLDUBHqJ/+OkrcAX4LqIRKTYBVwDvlINg1IRPAp9QAOQqPL0N1CtgmhFrIAdKNnG9VhCNa1yRSxAJ5AVg4sji2pbpERSgI4YSfAyHTTXxsuXi2agWKqStegPq63wsLICH8vOXF77bcazk7mGU9m7vkzmcKdJlcA5WoBb4R90eEOj+0gR8DmC3HrkZi+xpivf10TEAkUetJnZxEySWNoKrRs33kf4U9MoJnGk0Mfam4YkJcJHDHNxjMTV1Lh5jWQAF8SOxNMbIyw9ZUX2QsBcHINjReIizb0ucgZIFsq+e3WcpRlWo16VOAbHikQSzb0uUiWUeeyglx0u9Cm+RHBsZYlXLKWKFykVyjpd7lF9vdYcFa1RyovkC2XZir2qRSRq5PMi6UJZOSa/apGc3cui65oXCQhl+Vd0qkX8ftGHfIAXETx2055E1SISNby8iGDjMjieolpEosYwL+ISynrTa1ItIlHDxYt0C2V9GDAy57dUxRL4IMQaItHNi3SKrZOWtjzmW9wRtQSOaX6RJ7U+3vIi2Oi2C2X/mE5it5/vYwtLetkSmItjcKxI4JwLmxujVhISfLRfbtkvp9eQm/uX5tzSGE0Aj6hhiRjjU8ms/kkhKz/gZdW2UGMUvuH9mktcWw9dn0zs42CanIP2kObc0hiFxXBzdCLGGzs7Pez84Q2WPkLXdB4YiaHECPU+fqkufhKoBUZjIDFKtX/K3dfggONAzzZK9FDN0Wh3etPYSgA3aYOtNOapRg3VVLT3xf7wGfUM9+m0yY1JGpNPNVYlX0vIiDngHu17KoFq4BBwjquBWxE3MAB0Ab1i7YVSEb53sBMYv7n3I3UkoSj0LE5CE9FENBFNRBPRRDQRTUQT0UTiXUR2F2+1WvH1In7VxE8ce4AMp9OZEAiEdgwWi+WS0WjE92FTwBAw5nA4gtsuQtuFDd/kTCaTfXZ29qTBYHCDBL7vyCXKWegl3ctY7Ws2hNls7kX+66lhoW+4eGqK6NRkstAn1QR6nYFvmzx0anDHNxaNiC5ePslrl+/m+CfAAK3BB2GmT6wXAAAAAElFTkSuQmCC',//图片地址
   //             size:[17,31],  //要显示的点大小，将缩放图片
   //             ancher:[14,31],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
   //          }
   //      });
   //
   //        positionPicker.on('success', function(positionResult) {
   //           mapCount  +=1
   //           if(mapCount==2){
   //
   //            var startCity = positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city;
   //
   //           if(token){
   //            getCity(positionResult.position.lng,positionResult.position.lat,startCity);
   //           }
   //
   //          }
   //          var winH = $(window).height() - 45;
   //          $('.amap-ui-poi-picker-sugg-container,.amap-ui-poi-picker-search-results-container').height(winH);
   //
   //          map.clearMap();//清除标记物
   //        dragAdd = positionResult.address
   //          var posAdd = positionResult.regeocode.pois[0].address;
   //            posName = positionResult.regeocode.pois[0].name;
   //            lnglat = positionResult.position.lng + "," +  positionResult.position.lat;
   //
   //
   //        $('.amap-ui-misc-positionpicker').html('<div>'+ posName +'</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA+CAYAAABOU8kiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBODAxRTM3NzlCMzNFNzExQTU5Qjg1NTI3NkU2MTg5QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUyRDkwRjU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUyRDkwRTU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCMzUxQkZDMEU0Q0U3MTE5Nzc0RUUwQjZDMEIyQTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MDFFMzc3OUIzM0U3MTFBNTlCODU1Mjc2RTYxODlBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8QaFrAAAA7lJREFUeNrsmd1LU2EYwN8tTZsf04ViFzKz+VGZWFuadVGC5kVBl5VBFAVeBVESXkiUVlDSRfQHpBf1D1hYoNjNEsuxgZUuRS0TU9DlGppOt57HPZNX3fnYOS52cR74eTGf93l/nPOec573HF0wGGTxEAn4x2azyc1PBc4Cp4AyYC9gpP/NA2OAC3gPvAZ8cor29/eHRGREAXAHqAMMAjnZRAVQDywCr4DHwLDUBHqJ/+OkrcAX4LqIRKTYBVwDvlINg1IRPAp9QAOQqPL0N1CtgmhFrIAdKNnG9VhCNa1yRSxAJ5AVg4sji2pbpERSgI4YSfAyHTTXxsuXi2agWKqStegPq63wsLICH8vOXF77bcazk7mGU9m7vkzmcKdJlcA5WoBb4R90eEOj+0gR8DmC3HrkZi+xpivf10TEAkUetJnZxEySWNoKrRs33kf4U9MoJnGk0Mfam4YkJcJHDHNxjMTV1Lh5jWQAF8SOxNMbIyw9ZUX2QsBcHINjReIizb0ucgZIFsq+e3WcpRlWo16VOAbHikQSzb0uUiWUeeyglx0u9Cm+RHBsZYlXLKWKFykVyjpd7lF9vdYcFa1RyovkC2XZir2qRSRq5PMi6UJZOSa/apGc3cui65oXCQhl+Vd0qkX8ftGHfIAXETx2055E1SISNby8iGDjMjieolpEosYwL+ISynrTa1ItIlHDxYt0C2V9GDAy57dUxRL4IMQaItHNi3SKrZOWtjzmW9wRtQSOaX6RJ7U+3vIi2Oi2C2X/mE5it5/vYwtLetkSmItjcKxI4JwLmxujVhISfLRfbtkvp9eQm/uX5tzSGE0Aj6hhiRjjU8ms/kkhKz/gZdW2UGMUvuH9mktcWw9dn0zs42CanIP2kObc0hiFxXBzdCLGGzs7Pez84Q2WPkLXdB4YiaHECPU+fqkufhKoBUZjIDFKtX/K3dfggONAzzZK9FDN0Wh3etPYSgA3aYOtNOapRg3VVLT3xf7wGfUM9+m0yY1JGpNPNVYlX0vIiDngHu17KoFq4BBwjquBWxE3MAB0Ab1i7YVSEb53sBMYv7n3I3UkoSj0LE5CE9FENBFNRBPRRDQRTUQT0UTiXUR2F2+1WvH1In7VxE8ce4AMp9OZEAiEdgwWi+WS0WjE92FTwBAw5nA4gtsuQtuFDd/kTCaTfXZ29qTBYHCDBL7vyCXKWegl3ctY7Ws2hNls7kX+66lhoW+4eGqK6NRkstAn1QR6nYFvmzx0anDHNxaNiC5ePslrl+/m+CfAAK3BB2GmT6wXAAAAAElFTkSuQmCC" class="amap-ui-misc-positionpicker-pin" style="width: 17px; height: 31px; top: -31px; left: -14px;">')
   //
   //       if(posName == ''){
   //            posName =="当前位置"
   //       }
   //       posAdd = positionResult.regeocode.pois[0].businessArea +  positionResult.regeocode.pois[0].name ;
   //     // / defauCost(mapdCity);
   //      $('.mapBuild').html(posName);
   //      $('.mapAdd').html(dragAdd);
   //
	//    if(href=="start"){
   //      mapdCity = positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city;
   //
   //        $("#index-start").text(posName);
   //        sessionStorage.setItem('coordinatestart',"{\"addr\":\"" + dragAdd+ "\",\"lnglat\":\"" + lnglat + "\",\"addname\":\"" + posName + "\"}");
   //        sessionStorage.setItem('dCity',positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city);
   //       // localStorage.setItem('ordcity',positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city);
   //
   //
	// 	  sessionStorage.setItem('startlatlng',lnglat);  //将定位的坐标存住
   //        getpackage(); //调用加载服务项的方法
   //        getCost(type);
   //     }
   //
   //      if(!href){
   //         href = "start";
   //       }
   //       document.getElementById('cityName').innerHTML = positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city;
   //
	// 	 searchcity =  positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city;
   //
		  //这是搜索关键词的  如果有城市，应该加上城市名
        // AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
        //
        //     var poiPicker = new PoiPicker({
        //          city: searchcity,
        //         input: 'pickerInput'
        //     });
        //     //初始化poiPicker
        //     poiPickerReady(poiPicker);
        //
        // });

        // });
        // positionPicker.start();
   //
   //
   //
   //      });
		
	 // $(".amap-ui-poi-picker-sugg-container").remove();
 
    function getQry(name) {//获取页面传参
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    }
    $('#cancel').on('click',function(){
     if(href=="start"){ 
    var   oldAdd = sessionStorage.getItem('coordinateold');
    if(oldAdd){
      sessionStorage.setItem('coordinatestart' ,oldAdd);
      var sobjMap = JSON.parse(oldAdd);
      posName = sobjMap.addname;
      $("#index-start").text(posName);
    }
  }  
        $('#pickerInput').val('');
       $('.map_box').hide();
         $("#container").html("");
    });
}

function fn(){
  //给输入框赋值
    if(href=="end"){
       $("#index-dest").text(posName);
    }else{
     if(href){
          $("#index-start").text(posName);
     }
    }
       
       sessionStorage.setItem('coordinate' + href,"{\"addr\":\"" + dragAdd+ "\",\"lnglat\":\"" + lnglat + "\",\"addname\":\"" + posName + "\"}");
    
      if(href=="start"){ //如果是始发地，给定位城市赋值 并且调用加载服务项
      sessionStorage.setItem('dCity',mapdCity);
   //   localStorage.setItem('ordcity',mapdCity)
             getpackage(); //调用加载服务项的方法

    }
       defauCost(mapdCity);
       getCost(type);
       //showAd(mapdCity);
        // $('.map_box').addClass('mapTop').removeClass('mapBot');
        $('.map_box').hide();
        $("#container").html("");
}
function poiPickerReady(poiPicker) {
        window.poiPicker = poiPicker;

         var marker = new AMap.Marker();
    

        var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -20)
        });

        //选取了某个POI
        poiPicker.on('poiPicked', function(poiResult) {
          $('.map_box').show();
            map.clearMap();//清除标记物
            var source = poiResult.source,
                poi = poiResult.item,
                info = {
                    source: source,
                    id: poi.id,
                    name: poi.name,
                    location: poi.location.toString(),
                    address: poi.address,
                };
                 poiname =poi.name;
                 var locat= poi.address;
                  $("#container").html("");
                  //清空输入的地址信息
                  $('#pickerInput').val('');
            map = new AMap.Map('container', {
                  zoom: 16,
                  scrollWheel: false,
                center: [poi.location.lng,poi.location.lat]
            });
         AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
      
        var positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map,
            iconStyle:{//自定义外观
               url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA+CAYAAABOU8kiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBODAxRTM3NzlCMzNFNzExQTU5Qjg1NTI3NkU2MTg5QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUyRDkwRjU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUyRDkwRTU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCMzUxQkZDMEU0Q0U3MTE5Nzc0RUUwQjZDMEIyQTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MDFFMzc3OUIzM0U3MTFBNTlCODU1Mjc2RTYxODlBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8QaFrAAAA7lJREFUeNrsmd1LU2EYwN8tTZsf04ViFzKz+VGZWFuadVGC5kVBl5VBFAVeBVESXkiUVlDSRfQHpBf1D1hYoNjNEsuxgZUuRS0TU9DlGppOt57HPZNX3fnYOS52cR74eTGf93l/nPOec573HF0wGGTxEAn4x2azyc1PBc4Cp4AyYC9gpP/NA2OAC3gPvAZ8cor29/eHRGREAXAHqAMMAjnZRAVQDywCr4DHwLDUBHqJ/+OkrcAX4LqIRKTYBVwDvlINg1IRPAp9QAOQqPL0N1CtgmhFrIAdKNnG9VhCNa1yRSxAJ5AVg4sji2pbpERSgI4YSfAyHTTXxsuXi2agWKqStegPq63wsLICH8vOXF77bcazk7mGU9m7vkzmcKdJlcA5WoBb4R90eEOj+0gR8DmC3HrkZi+xpivf10TEAkUetJnZxEySWNoKrRs33kf4U9MoJnGk0Mfam4YkJcJHDHNxjMTV1Lh5jWQAF8SOxNMbIyw9ZUX2QsBcHINjReIizb0ucgZIFsq+e3WcpRlWo16VOAbHikQSzb0uUiWUeeyglx0u9Cm+RHBsZYlXLKWKFykVyjpd7lF9vdYcFa1RyovkC2XZir2qRSRq5PMi6UJZOSa/apGc3cui65oXCQhl+Vd0qkX8ftGHfIAXETx2055E1SISNby8iGDjMjieolpEosYwL+ISynrTa1ItIlHDxYt0C2V9GDAy57dUxRL4IMQaItHNi3SKrZOWtjzmW9wRtQSOaX6RJ7U+3vIi2Oi2C2X/mE5it5/vYwtLetkSmItjcKxI4JwLmxujVhISfLRfbtkvp9eQm/uX5tzSGE0Aj6hhiRjjU8ms/kkhKz/gZdW2UGMUvuH9mktcWw9dn0zs42CanIP2kObc0hiFxXBzdCLGGzs7Pez84Q2WPkLXdB4YiaHECPU+fqkufhKoBUZjIDFKtX/K3dfggONAzzZK9FDN0Wh3etPYSgA3aYOtNOapRg3VVLT3xf7wGfUM9+m0yY1JGpNPNVYlX0vIiDngHu17KoFq4BBwjquBWxE3MAB0Ab1i7YVSEb53sBMYv7n3I3UkoSj0LE5CE9FENBFNRBPRRDQRTUQT0UTiXUR2F2+1WvH1In7VxE8ce4AMp9OZEAiEdgwWi+WS0WjE92FTwBAw5nA4gtsuQtuFDd/kTCaTfXZ29qTBYHCDBL7vyCXKWegl3ctY7Ws2hNls7kX+66lhoW+4eGqK6NRkstAn1QR6nYFvmzx0anDHNxaNiC5ePslrl+/m+CfAAK3BB2GmT6wXAAAAAElFTkSuQmCC',//图片地址
               size:[17,31],  //要显示的点大小，将缩放图片
                ancher:[14,31],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
            }
        });
          positionPicker.on('success', function(positionResult) {
            map.clearMap();//清除标记物 
			
			 dragAdd= positionResult.address;  //给地址变量赋值
            lnglat = positionResult.position.lng + "," +  positionResult.position.lat;
            posName = positionResult.regeocode.pois[0].name;
            if(href=="start"){
              mapdCity = positionResult.regeocode.addressComponent.city==""?positionResult.regeocode.addressComponent.province:positionResult.regeocode.addressComponent.city;
			  
            $('.amap-ui-misc-positionpicker').html('<div>'+ posName +'</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA+CAYAAABOU8kiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBODAxRTM3NzlCMzNFNzExQTU5Qjg1NTI3NkU2MTg5QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUyRDkwRjU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUyRDkwRTU0OTkxMUU3ODk0Qzg4MjVEQjhFNUMyQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCMzUxQkZDMEU0Q0U3MTE5Nzc0RUUwQjZDMEIyQTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MDFFMzc3OUIzM0U3MTFBNTlCODU1Mjc2RTYxODlBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8QaFrAAAA7lJREFUeNrsmd1LU2EYwN8tTZsf04ViFzKz+VGZWFuadVGC5kVBl5VBFAVeBVESXkiUVlDSRfQHpBf1D1hYoNjNEsuxgZUuRS0TU9DlGppOt57HPZNX3fnYOS52cR74eTGf93l/nPOec573HF0wGGTxEAn4x2azyc1PBc4Cp4AyYC9gpP/NA2OAC3gPvAZ8cor29/eHRGREAXAHqAMMAjnZRAVQDywCr4DHwLDUBHqJ/+OkrcAX4LqIRKTYBVwDvlINg1IRPAp9QAOQqPL0N1CtgmhFrIAdKNnG9VhCNa1yRSxAJ5AVg4sji2pbpERSgI4YSfAyHTTXxsuXi2agWKqStegPq63wsLICH8vOXF77bcazk7mGU9m7vkzmcKdJlcA5WoBb4R90eEOj+0gR8DmC3HrkZi+xpivf10TEAkUetJnZxEySWNoKrRs33kf4U9MoJnGk0Mfam4YkJcJHDHNxjMTV1Lh5jWQAF8SOxNMbIyw9ZUX2QsBcHINjReIizb0ucgZIFsq+e3WcpRlWo16VOAbHikQSzb0uUiWUeeyglx0u9Cm+RHBsZYlXLKWKFykVyjpd7lF9vdYcFa1RyovkC2XZir2qRSRq5PMi6UJZOSa/apGc3cui65oXCQhl+Vd0qkX8ftGHfIAXETx2055E1SISNby8iGDjMjieolpEosYwL+ISynrTa1ItIlHDxYt0C2V9GDAy57dUxRL4IMQaItHNi3SKrZOWtjzmW9wRtQSOaX6RJ7U+3vIi2Oi2C2X/mE5it5/vYwtLetkSmItjcKxI4JwLmxujVhISfLRfbtkvp9eQm/uX5tzSGE0Aj6hhiRjjU8ms/kkhKz/gZdW2UGMUvuH9mktcWw9dn0zs42CanIP2kObc0hiFxXBzdCLGGzs7Pez84Q2WPkLXdB4YiaHECPU+fqkufhKoBUZjIDFKtX/K3dfggONAzzZK9FDN0Wh3etPYSgA3aYOtNOapRg3VVLT3xf7wGfUM9+m0yY1JGpNPNVYlX0vIiDngHu17KoFq4BBwjquBWxE3MAB0Ab1i7YVSEb53sBMYv7n3I3UkoSj0LE5CE9FENBFNRBPRRDQRTUQT0UTiXUR2F2+1WvH1In7VxE8ce4AMp9OZEAiEdgwWi+WS0WjE92FTwBAw5nA4gtsuQtuFDd/kTCaTfXZ29qTBYHCDBL7vyCXKWegl3ctY7Ws2hNls7kX+66lhoW+4eGqK6NRkstAn1QR6nYFvmzx0anDHNxaNiC5ePslrl+/m+CfAAK3BB2GmT6wXAAAAAElFTkSuQmCC" class="amap-ui-misc-positionpicker-pin" style="width: 17px; height: 31px; top: -31px; left: -14px;">')
            $('.mapBuild').html(posName);
            $('.mapAdd').html(dragAdd);
             defauCost(mapdCity)
            }else{
				  sessionStorage.setItem('coordinate' + href,"{\"addr\":\"" + dragAdd+ "\",\"lnglat\":\"" + lnglat + "\",\"addname\":\"" + posName + "\"}");
				 $("#index-dest").text(posName);
				  getCost(type);
				$('.map_box').hide();
				$("#container").html("");
			}
        });
        positionPicker.start();

       
        });


    });
	

		if(href == "end"){
		poiPicker.onCityReady(function() {
          poiPicker.suggest(searchcity);
        });
		}
    }


