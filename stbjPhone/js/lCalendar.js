/*
 * lCalendar日期控件
 * 
 * 作者：黄磊
 * 
 * 邮箱：xfhxbb@yeah.net
 * 
 * Copyright 2016
 * 
 * 创建于：2016-01-08
 */
 alertMessage()
 function alertMessage(){


 try{
window.lCalendar = (function() {
	var MobileCalendar = function() {
		this.gearDate;
		this.minY = 1900;
		this.minM = 1,
			this.minD = 1,
			this.maxY = 2099,
			this.maxM = 12,
			this.maxD = 31
	}
	MobileCalendar.prototype = {
		init: function(params) {
			this.type = params.type;
			this.trigger = document.querySelector(params.trigger);
			if (this.trigger.getAttribute("data-lcalendar") != null) {
				var arr = this.trigger.getAttribute("data-lcalendar").split(',');
				var minArr = arr[0].split('-');
				this.minY = ~~minArr[0];
				this.minM = ~~minArr[1];
				this.minD = ~~minArr[2];
				
				//增加小时和分钟
				this.minH = ~~minArr[3];
				this.minMi = ~~minArr[4];
				
				var maxArr = arr[1].split('-');
				this.maxY = ~~maxArr[0];
				this.maxM = ~~maxArr[1];
				this.maxD = ~~maxArr[2];
				
				//增加小时和分钟
				this.maxH = ~~maxArr[3];
				this.maxMi = ~~maxArr[4];
				
				this.isCrossY = this.maxY - this.minY == 1 ?true:false;
				this.isCrossM = this.maxM - this.minM == 1 || this.maxM - this.minM == -11 ?true:false;
				function two(n){
					return n=n>=10?''+n:'0'+n
				}
				var timeSel=this.minY +'-'+  two(this.minM)+'-'+two(this.minD)+' '+two(this.minH)+':'+two(this.minMi);
				localStorage.setItem('timesel',timeSel)
			}
			this.bindEvent(this.type);
		},
		bindEvent: function(type) {
			var _self = this;
			//呼出日期插件
			function popupDate(e) {
				_self.gearDate = document.createElement("div");
				_self.gearDate.className = "gearDate";
				_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
					'<div class="date_btn_box">' +
					'<div class="date_btn lcalendar_cancel">取消</div>' +
					'<div class="date_btn lcalendar_finish">确定</div>' +
					'</div>' +
					'<div class="date_roll_mask">' +
					'<div class="date_roll">' +
					'<div>' +
					'<div class="gear date_yy"  data-datetype="date_yy"></div>' +
					'<div class="date_grid">' +
					'<div>年</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear date_mm" data-datetype="date_mm"></div>' +
					'<div class="date_grid">' +
					'<div>月</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear date_dd" data-datetype="date_dd"></div>' +
					'<div class="date_grid">' +
					'<div>日</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>';
				document.body.appendChild(_self.gearDate);
				dateCtrlInit();
				var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
				lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
				var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
				lcalendar_finish.addEventListener('touchstart', finishMobileDate);
				var date_yy = _self.gearDate.querySelector(".date_yy");
				var date_mm = _self.gearDate.querySelector(".date_mm");
				var date_dd = _self.gearDate.querySelector(".date_dd");
				date_yy.addEventListener('touchstart', gearTouchStart);
				date_mm.addEventListener('touchstart', gearTouchStart);
				date_dd.addEventListener('touchstart', gearTouchStart);
				date_yy.addEventListener('touchmove', gearTouchMove);
				date_mm.addEventListener('touchmove', gearTouchMove);
				date_dd.addEventListener('touchmove', gearTouchMove);
				date_yy.addEventListener('touchend', gearTouchEnd);
				date_mm.addEventListener('touchend', gearTouchEnd);
				date_dd.addEventListener('touchend', gearTouchEnd);
			}
			//初始化年月日插件默认值
			function dateCtrlInit() {
				var date = new Date();
				var dateArr = {
					yy: date.getYear(),
					mm: date.getMonth(),
					dd: date.getDate() - 1
				};
				if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.innerHTML)) {
					rs = _self.trigger.innerHTML.match(/(^|-)\d{1,4}/g);
					dateArr.yy = rs[0] - _self.minY;
					dateArr.mm = rs[1].replace(/-/g, "") - 1;
					dateArr.dd = rs[2].replace(/-/g, "") - 1;
				} else {
					dateArr.yy = dateArr.yy + 1900 - _self.minY;
				}
				_self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
				_self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
				_self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
				setDateGearTooth();
			}
			//呼出日期+时间插件
			function popupDateTime(e) {
				_self.gearDate = document.createElement("div");
				_self.gearDate.className = "gearDatetime";
				_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
					'<div class="date_btn_box">' +
					'<div class="date_btn lcalendar_cancel" style="color:#666;">取消</div>' +
					'<div class="" style="padding:.5em 1em;font-size:1.8em;color:#000;">选择时间</div>'+
					'<div class="date_btn lcalendar_finish" style="color:#ca1025;">确定</div>' +
					'</div>' +
					'<div class="date_roll_mask">' +
					'<div class="datetime_roll">' +
					'<div  style="display: none;">' +
					'<div class="gear date_yy"  data-datetype="date_yy"></div>' +
					'<div class="date_grid" >' +
					'<div>年</div>' +
					'</div>' +
					'</div>' +
					'<div style="display: none;">' +
					'<div class="gear date_mm"  data-datetype="date_mm"></div>' +
					'<div class="date_grid">' +
					'<div>月</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear date_dd" data-datetype="date_dd"></div>' +
					'<div class="date_grid">' +
					'<div>-</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear time_hh" data-datetype="time_hh"></div>' +
					'<div class="date_grid">' +
					'<div>-</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear time_mm" data-datetype="time_mm"></div>' +
					'<div class="date_grid">' +
					'<div></div>' +
					'</div>' +
					'</div>' +
					'</div>' + //date_roll
					'</div>' + //date_roll_mask
					'</div>';
				document.body.appendChild(_self.gearDate);
				$('body').on('touchmove', function (event) {
				    event.preventDefault();
				});
				dateTimeCtrlInit();
				var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
				lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
				var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
				lcalendar_finish.addEventListener('touchstart', finishMobileDateTime);
				var date_yy = _self.gearDate.querySelector(".date_yy");
				var date_mm = _self.gearDate.querySelector(".date_mm");
				var date_dd = _self.gearDate.querySelector(".date_dd");
				var time_hh = _self.gearDate.querySelector(".time_hh");
				var time_mm = _self.gearDate.querySelector(".time_mm");
				date_yy.addEventListener('touchstart', gearTouchStart);
				date_mm.addEventListener('touchstart', gearTouchStart);
				date_dd.addEventListener('touchstart', gearTouchStart);
				time_hh.addEventListener('touchstart', gearTouchStart);
				time_mm.addEventListener('touchstart', gearTouchStart);
				date_yy.addEventListener('touchmove', gearTouchMove);
				date_mm.addEventListener('touchmove', gearTouchMove);
				date_dd.addEventListener('touchmove', gearTouchMove);
				time_hh.addEventListener('touchmove', gearTouchMove);
				time_mm.addEventListener('touchmove', gearTouchMove);
				date_yy.addEventListener('touchend', gearTouchEnd);
				date_mm.addEventListener('touchend', gearTouchEnd);
				date_dd.addEventListener('touchend', gearTouchEnd);
				time_hh.addEventListener('touchend', gearTouchEnd);
				time_mm.addEventListener('touchend', gearTouchEnd);
			}
			//初始化年月日时分插件默认值
			function dateTimeCtrlInit() {
				var date = new Date();
				var dateArr = {
					yy: date.getYear(),
					mm: date.getMonth() + 1,
					dd: date.getDate() ,
					hh: date.getHours(),
					mi: date.getMinutes()
				};
				if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/.test(_self.trigger.innerHTML)) {
					rs = _self.trigger.innerHTML.match(/(^|-|\s|:)\d{1,4}/g);
					dateArr.yy = rs[0].replace(/-/g, "");
					dateArr.mm = parseInt(rs[1].replace(/-/g, ""));
					dateArr.dd = rs[2].replace(/-/g, "");
					dateArr.hh = parseInt(rs[3].replace(/\s0?/g, ""));
					dateArr.mi = parseInt(rs[4].replace(/:0?/g, ""));
				} else {
					dateArr.yy = dateArr.yy + 1900;
				}
				_self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
				_self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
				_self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.yy + "_"+ dateArr.mm +"_" + dateArr.dd);
				setDateGearTooth();
				_self.gearDate.querySelector(".time_hh").setAttribute("val", dateArr.hh);
				// var datemm=59 - _self.minMi;
				// for(var g = 0; g < 59 - _self.minMi + 1; g++) {

				// 	if(( _self.minMi+g)%10==0){
				// 		dateArr.mi=_self.minMi+g%10
				// 	}else{
				// 		continue;
				// 	}
				// 	console.log(dateArr.mi)
				// //_self.gearDate.querySelector(".time_mm").setAttribute("val", dateArr.mi);
				// }
				_self.gearDate.querySelector(".time_mm").setAttribute("val", dateArr.mi);
				setTimeGearTooth();
			}
			//呼出时间插件
			function popupTime(e) {
				_self.gearDate = document.createElement("div");
				_self.gearDate.className = "gearDate";
				_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
					'<div class="date_btn_box">' +
					'<div class="date_btn lcalendar_cancel">取消</div>' +
					'<div class="date_btn lcalendar_finish">确定</div>' +
					'</div>' +
					'<div class="date_roll_mask">' +
					'<div class="time_roll">' +
					'<div>' +
					'<div class="gear time_hh" data-datetype="time_hh"></div>' +
					'<div class="date_grid">' +
					'<div>点</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear time_mm" data-datetype="time_mm"></div>' +
					'<div class="date_grid">' +
					'<div>分</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear time_ss" data-datetype="time_ss"></div>' +
					'<div class="date_grid">' +
					'<div>秒</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>';
				document.body.appendChild(_self.gearDate);
				timeCtrlInit();
				var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
				lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
				var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
				lcalendar_finish.addEventListener('touchstart', finishMobileTime);
				var time_hh = _self.gearDate.querySelector(".time_hh");
				var time_mm = _self.gearDate.querySelector(".time_mm");
				var time_ss = _self.gearDate.querySelector(".time_ss");
				time_hh.addEventListener('touchstart', gearTouchStart);
				time_mm.addEventListener('touchstart', gearTouchStart);
				time_ss.addEventListener('touchstart', gearTouchStart);

				time_hh.addEventListener('touchmove', gearTouchMove);
				time_mm.addEventListener('touchmove', gearTouchMove);
				time_ss.addEventListener('touchmove', gearTouchMove);

				time_hh.addEventListener('touchend', gearTouchEnd);
				time_mm.addEventListener('touchend', gearTouchEnd);
				time_ss.addEventListener('touchend', gearTouchEnd);


			}
			//初始化时分插件默认值
			function timeCtrlInit() {
				var d = new Date();
				var e = {
					hh: d.getHours(),
					mm: d.getMinutes(),
					ss: d.getSeconds()
				};
				if (/^\d{2}:\d{2}:\d{2}$/.test(_self.trigger.innerHTML)) {
					rs = _self.trigger.innerHTML.match(/(^|:)\d{2}/g);
					e.hh = parseInt(rs[0].replace(/^0?/g, ""));
					e.mm = parseInt(rs[1].replace(/:0?/g, ""));
					e.ss = parseInt(rs[2].replace(/:0?/g, ""));
				}
				
				//alert(e.ss);   测试用
				_self.gearDate.querySelector(".time_hh").setAttribute("val", e.hh);
				_self.gearDate.querySelector(".time_mm").setAttribute("val", e.mm);
				_self.gearDate.querySelector(".time_ss").setAttribute("val", e.ss);
				setTimeGearTooth();
			}
			
			
			
	
			
			
			
			//重置日期节点个数
			function setDateGearTooth() {
				var passY = _self.maxY - _self.minY + 1;
				var date_yy = _self.gearDate.querySelector(".date_yy");
				var itemStr = "";
				if (date_yy && date_yy.getAttribute("val")) {
					//得到年份的值
					var yyVal = parseInt(date_yy.getAttribute("val"));
					//p 当前节点前后需要展示的节点个数
					for (var p = 0; p <= passY - 1; p++) {
						itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
					}
					date_yy.innerHTML = itemStr;
					var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
					if (!isNaN(top)) {
						top % 2 == 0 ? (top = top) : (top = top + 1);
						top > 8 && (top = 8);
						var minTop = 8 - (passY - 1) * 2;
						top < minTop && (top = minTop);
						date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
						date_yy.setAttribute('top', top + 'em');
						yyVal = Math.abs(top - 8) / 2;
						date_yy.setAttribute("val", yyVal);
					} else {
						date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
						date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
					}
				} else {
					return;
				}
				var date_mm = _self.gearDate.querySelector(".date_mm");
				if (date_mm && date_mm.getAttribute("val")) {
					itemStr = "";
					//得到月份的值
					var mmVal = parseInt(date_mm.getAttribute("val"));
					var maxM = 11;

					var minM = 0;
					//当年份到达最大值
					if (yyVal == passY - 1) {
						maxM = _self.maxM - 1;
					}
					//当年份到达最小值
					if (yyVal == 0) {
						minM = _self.minM - 1;
					}
					//p 当前节点前后需要展示的节点个数
					for (var p = 0; p < maxM - minM + 1; p++) {
						itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
					}
					date_mm.innerHTML = itemStr;
					if (mmVal > maxM) {
						mmVal = maxM;
						date_mm.setAttribute("val", mmVal);
					} else if (mmVal < minM) {
						mmVal = maxM;
						date_mm.setAttribute("val", mmVal);
					}
					date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
					date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
				} else {
					return;
				}
				var date_dd = _self.gearDate.querySelector(".date_dd");
				if (date_dd && date_dd.getAttribute("val")) {
					itemStr = "";
					//得到日期的值
					
					var DateStr = date_dd.getAttribute("val");
					
					var objdate = DateStr.split("_");
					
					
					//var ddVal = parseInt(date_dd.getAttribute("val"));
					var ddVal = parseInt(objdate[2]);
					var yyVal = parseInt(objdate[0]);
					var mmVal = parseInt(objdate[1]);
					//返回月份的天数
					var maxMonthDays = calcDays(_self.minY, _self.minM);
					
					
					var DayNums = 0;
					 if(_self.maxM - _self.minM ==1 || _self.maxM-_self.minM ==-11){
						 //跨月
						 DayNums = _self.maxD + maxMonthDays - _self.minD;
						 
					 }else{
						 //不跨月
						 DayNums =_self.maxD  - _self.minD;
					 }
					
					//p 当前节点前后需要展示的节点个数
					// var maxD = maxMonthDays - 1;
					// var minD = 0;
					// //当年份月份到达最大值
					// if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
						// maxD = _self.maxD - 1;
					// }
					// //当年、月到达最小值
					// if (yyVal == 0 && _self.minM == mmVal + 1) {
						// minD = _self.minD - 1;
					// }
					// for (var p = 0; p < maxD - minD + 1; p++) {
						// itemStr += "<div class='tooth'>" + (minD + p + 1) + "</div>";
					// }
					for (var p = 0; p < DayNums+1; p++) {
						 var datenum = _self.minD + p;
						 if(datenum>maxMonthDays){
						 	var monNum=_self.maxM;
						 	var dateNum=datenum - maxMonthDays;
						 	//mmVal = _self.maxM ;
						 	dateNum=dateNum>=10?dateNum:'0'+dateNum;
						 	monNum=monNum>=10?monNum:'0'+monNum;
							itemStr += "<div class='tooth'>" +monNum+'-'+ dateNum + "</div>";
						 }else{
						 	var monNum=_self.minM;
						 	//mmVal = _self.minM;
						 	datenum=datenum>=10?datenum:'0'+datenum;
						 	monNum=monNum>=10?monNum:'0'+monNum;
							itemStr += "<div class='tooth'>"+ monNum+'-'+datenum + "</div>";
						 }
					}
					
					date_dd.innerHTML = itemStr;
					
					// if (ddVal > _self.maxD) {
						
						// if(mmVal  -_self.minM ==1 || mmVal  -_self.maxM ==-11){
							// //跨月
							// ddVal = _self.minD;
						// }else{
							// //不跨月
							// ddVal = _self.maxD;
						// }
						// date_dd.setAttribute("val", yyVal + "_" + mmVal + "_" + ddVal);
					// } else if (ddVal < _self.minD) {
						
						// if(_self.maxM  -_self.minM ==1 || _self.maxM -_self.maxM ==-11){
							// //跨月
							// ddVal = _self.maxD;
						// }else{
							// //不跨月
							// ddVal = _self.minD;
						// }
						// date_dd.setAttribute("val", yyVal + "_" + mmVal + "_" + ddVal);
					// }
					
					date_dd.setAttribute("val", yyVal + "_" + mmVal + "_" + ddVal);
					if( mmVal-_self.maxM ==0 && (mmVal -_self.minM ==1 || mmVal -_self.minM ==-11)){
						//跨月
						date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal + maxMonthDays - _self.minD) * 2) + 'em,0)';
						date_dd.setAttribute('top', 8 - (ddVal + maxMonthDays - _self.minD) * 2 + 'em');
					}else{
						//不跨月
						date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - _self.minD) * 2) + 'em,0)';
						date_dd.setAttribute('top', 8 - (ddVal - _self.minD) * 2 + 'em');
					}
				} else {
					return;
				}
			}
			//重置时间节点个数
			function setTimeGearTooth() {
				var maxtime=0;
				var passY = _self.maxY - _self.minY + 1;
				
				var date_yy = _self.gearDate.querySelector(".date_yy");
				//var yyVal = parseInt(date_yy.getAttribute("val"));
				
				var date_mm = _self.gearDate.querySelector(".date_mm");
				//var mmVal = parseInt(date_mm.getAttribute("val"));
				
				var date_dd = _self.gearDate.querySelector(".date_dd");
				
				var DateStr = date_dd.getAttribute("val");
					
					var objdate = DateStr.split("_");
					var ddVal = parseInt(objdate[2]);
					var yyVal = parseInt(objdate[0]);
					var mmVal = parseInt(objdate[1]);
				//var ddVal = parseInt(date_dd.getAttribute("val"));
				
				var time_hh = _self.gearDate.querySelector(".time_hh");
				var time_mm = _self.gearDate.querySelector(".time_mm");
				if (time_hh && time_hh.getAttribute("val")) {
					var i = "";
					var hhVal = parseInt(time_hh.getAttribute("val"));
				
					
					var maxH = 23;
					var minH = 0;
					//当年份/月份/天到达最大值

					if (yyVal ==  _self.maxY  && _self.maxM == mmVal  && _self.maxD == ddVal) {
						maxH = _self.maxH
						if(_self.maxMi>50){
							maxH= _self.maxH+1;
						//	_self.maxMi=0;
							maxtime=1;
						}
						//;
					}
					//当年份/月份/天到达最小值
					if (yyVal == _self.minY && _self.minM == mmVal  && _self.minD == ddVal ) {
						minH = _self.minH;
						if(_self.minMi>50){
							minH =_self.minH+1;
							//_self.minMi=1;
							maxtime=1;
						}
						//;
					}
					var timeStr=$("#demo2").attr("data-lcalendar",minstr + "," + maxstr);
					var minTime = minstr.split('-');
					for (var g = 0; g < maxH - minH + 1; g++) {
						var hhTime=minH + g;
						// if(minTime[4]>50&& minTime[4]<=60){
						// 	_self.minMi=0;
						// 	 hhTime=minH + g+1;
						// }
						i += "<div class='tooth'>"  + hhTime +'点'+"</div>";
					}
					time_hh.innerHTML = i;
					if (hhVal > maxH) {
						hhVal = maxH;
						time_hh.setAttribute("val", hhVal);
					} else if (hhVal < minH) {
						hhVal = minH;
						time_hh.setAttribute("val", hhVal);
					}
					// if(minTime[4]>50&& minTime[4]<=60&&hhVal==minTime[3]){
					// 	time_hh.setAttribute("val", hhVal+1);
					// 	hhVal = minH;
					// }else{
					// 	time_hh.setAttribute("val",hhVal);
					// 	hhVal = minH;
					// }
					time_hh.style["-webkit-transform"] = 'translate3d(0,' + (8 - (hhVal - minH) * 2)+ 'em,0)';
					time_hh.setAttribute('top', (8 - (hhVal - minH) * 2) + 'em');
				} else {
					return
				}
				
				
				var time_mm = _self.gearDate.querySelector(".time_mm");
				if (time_mm && time_mm.getAttribute("val")) {
					
					
					var i = "";
					var mmmVal = parseInt(time_mm.getAttribute("val"));
					
					var maxMi = 59;
					var minMi = 0;
					//当年份/月份/天/小时到达最大值
					// if(_self.maxMi>50){
					// 	hhVal= _self.maxH+1;
					// }
					if(_self.maxMi>50){
						var hhVal=time_hh.getAttribute('val')-1;
					}
					if (yyVal == _self.maxY  && _self.maxM == mmVal  && _self.maxD == ddVal   && _self.maxH == hhVal) {
						if(_self.maxMi>50){
							maxMi =1;
							//minMi=_self.maxMi
						}else{
							maxMi=_self.maxMi+(10-_self.maxMi%10);
						}
					}
					//当年份/月份/天/小时到达最小值
					var hhVal=time_hh.getAttribute('val');
					if (yyVal == _self.minY && _self.minM == mmVal  && _self.minD == ddVal  && _self.minH == hhVal) {
						//minMi = _self.minMi;
						//minMi=0;
						if(_self.minMi%10==0){
							minMi = _self.minMi;
						}else{
							if(_self.minMi +(10-_self.minMi%10)>60){
								//return;
							}else if(_self.minMi +(10-_self.minMi%10)>=50 && _self.minMi +(10-_self.minMi%10)<=60){
								//time_hh.setAttribute("val", (hhVal+1));
								minMi=_self.minMi +(10-_self.minMi%10);
							}else{
								minMi = _self.minMi +(10-_self.minMi%10);
							}
						}
						if(minMi<0){
							minMi = 0;
						}
					}
					
					for (var g = 0; g < maxMi - minMi + 1; g++) {
						var mmTime=minMi + g ;
						if(mmTime%10==0){
							mmTime=mmTime
						}else{
							continue;
						}
						mmTime=mmTime>=10?mmTime:'0'+mmTime;
						i += "<div class='tooth'>"  + mmTime +'分'+ "</div>";
					}
					if(maxtime){
						maxMi=0;
					}
					time_mm.innerHTML = i;
					if (mmmVal > maxMi) {
						mmmVal = maxMi;
						time_mm.setAttribute("val", mmmVal);
					} else if (mmmVal < minMi) {
						mmmVal = minMi;
						time_mm.setAttribute("val", mmmVal);
					}
					time_mm.style["-webkit-transform"] = 'translate3d(0,' +  (8 - (mmmVal/10 - minMi/10) * 2) + 'em,0)';
					time_mm.setAttribute('top', (8 - (mmmVal/10- minMi/10) * 2) + 'em');
				} else {
					return
				}
				
				var time_ss = _self.gearDate.querySelector(".time_ss");
				if (time_ss && time_ss.getAttribute("val")) {
					var i = "";
					var mmVal = parseInt(time_ss.getAttribute("val"));
					for (var g = 0; g <= 59; g++) {
						i += "<div class='tooth'>" + g + "</div>";
					}
					time_ss.innerHTML = i;
					time_ss.style["-webkit-transform"] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
					time_ss.setAttribute('top', 8 - mmVal * 2 + 'em');
				} else {
					return
				}
			}
			//求月份最大天数
			function calcDays(year, month) {
				month = month -1;
				if (month == 1) {
					year += _self.minY;
					if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
						return 29;
					} else {
						return 28;
					}
				} else {
					if (month == 3 || month == 5 || month == 8 || month == 10) {
						return 30;
					} else {
						return 31;
					}
				}
			}
			//触摸开始
			function gearTouchStart(e) {
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				clearInterval(target["int_" + target.id]);
				target["old_" + target.id] = e.targetTouches[0].screenY;
				target["o_t_" + target.id] = (new Date()).getTime();
				var top = target.getAttribute('top');
				if (top) {
					target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
				} else {
					target["o_d_" + target.id] = 0;
				}
			}
			//手指移动
			function gearTouchMove(e) {
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				target["new_" + target.id] = e.targetTouches[0].screenY;
				target["n_t_" + target.id] = (new Date()).getTime();
				//var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / target.clientHeight;
				var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
				target["pos_" + target.id] = target["o_d_" + target.id] + f;
				target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
				target.setAttribute('top', target["pos_" + target.id] + 'em');
			}
			//离开屏幕
			function gearTouchEnd(e) {
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break;
					}
				}
				var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
				if (Math.abs(flag) <= 0.2) {
					target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
				} else {
					if (Math.abs(flag) <= 0.5) {
						target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
					} else {
						target["spd_" + target.id] = flag / 2;
					}
				}
				if (!target["pos_" + target.id]) {
					target["pos_" + target.id] = 0;
				}
				rollGear(target);
			}
			//缓动效果
			function rollGear(target) {
				var d = 0;
				var stopGear = false;
				var passY = _self.maxY - _self.minY + 1;
				clearInterval(target["int_" + target.id]);
				target["int_" + target.id] = setInterval(function() {
					var pos = target["pos_" + target.id];
					var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
					pos += speed;
					if (Math.abs(speed) > 0.1) {} else {
						speed = 0.1;
						var b = Math.round(pos / 2) * 2;
						if (Math.abs(pos - b) < 0.02) {
							stopGear = true;
						} else {
							if (pos > b) {
								pos -= speed
							} else {
								pos += speed
							}
						}
					}
					if (pos > 8) {
						pos = 8;
						stopGear = true;
					}
					switch (target.dataset.datetype) {
						case "date_yy":
							var minTop = 8 - (passY - 1) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_mm":
							var date_yy = _self.gearDate.querySelector(".date_yy");
							//得到年份的值
							var yyVal = parseInt(date_yy.getAttribute("val"));
							var maxM = 11;
							var minM = 0;
							//当年份到达最大值
							if (yyVal == passY - 1) {
								maxM = _self.maxM - 1;
							}
							//当年份到达最小值
							if (yyVal == 0) {
								minM = _self.minM - 1;
							}
							var minTop = 8 - (maxM - minM) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2 + minM;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_dd":
							//var date_yy = _self.gearDate.querySelector(".date_yy");
							var date_mm = _self.gearDate.querySelector(".date_mm");
							
							var date_dd = _self.gearDate.querySelector(".date_dd");
							
							//得到年份的值
							//var yyVal = parseInt(date_yy.getAttribute("val"));
							//得到月份的值
							//var mmVal = parseInt(date_mm.getAttribute("val"));
							
							//得到天数的值
							
							
							var DateStr = date_dd.getAttribute("val");
					
							var objdate = DateStr.split("_");
							var ddVal = parseInt(objdate[2]);
							var yyVal = parseInt(objdate[0]);
							var mmVal = parseInt(objdate[1]);
							//var ddVal = parseInt(date_dd.getAttribute("val"));
							
							
							//返回月份的天数
							var maxMonthDays =  calcDays(_self.minY, _self.minM);
							var maxD = 0;
							var minD = 0;
							// //当年份月份到达最大值
							// if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
								// maxD = _self.maxD - 1;
							// }
							// //当年、月到达最小值
							// if (yyVal == 0 && _self.minM == mmVal + 1) {
								// minD = _self.minD - 1;
							// }
							
							
							
							
							//var minTop = 8 - (maxD - minD) * 2;
							var DayNums = 0;
					 if(_self.maxM-_self.minM ==1 || _self.maxM-_self.minM ==-11){
						 //跨月
						 DayNums = _self.maxD + maxMonthDays - _self.minD;
						 
					 }else{
						 //不跨月
						 DayNums =_self.maxD  - _self.minD;
					 }
					 
					 var minTop = 8 - DayNums * 2;
							
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.round(Math.abs(pos - 8) / 2 + _self.minD) ;
								if(gearVal>maxMonthDays){
									mmVal = _self.maxM ;
									yyVal=_self.maxY;
									gearVal = gearVal - maxMonthDays;
								}else{
									mmVal = _self.minM;
									yyVal=_self.minY;
									//gearVal = gearVal - maxMonthDays;
								}
								setGear(target, yyVal + "_" + mmVal + "_"+gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_hh":
						
							var date_yy = _self.gearDate.querySelector(".date_yy");
							//var yyVal = parseInt(date_yy.getAttribute("val"));
				
							var date_mm = _self.gearDate.querySelector(".date_mm");
							
							
							//var mmVal = parseInt(date_mm.getAttribute("val"));
				
							var date_dd = _self.gearDate.querySelector(".date_dd");
							
							var DateStr = date_dd.getAttribute("val");
					
							var objdate = DateStr.split("_");
							var ddVal = parseInt(objdate[2]);
							var yyVal = parseInt(objdate[0]);
							var mmVal = parseInt(objdate[1]);
							//var ddVal = parseInt(date_dd.getAttribute("val"));
						
							var maxH = 23;
							var minH = 0;
							//当年份/月份/天到达最小值
							if (yyVal == _self.minY && _self.minM == mmVal   && _self.minD == ddVal  ) {
								minH = _self.minH ;
								if(_self.minMi>50){
									minH = _self.minH+1;
								}
							}
							if (yyVal == _self.maxY && _self.maxM == mmVal   && _self.maxD == ddVal  ) {
								maxH = _self.maxH ;
								//_self.maxMi=1;
								if(_self.maxMi>50){
									maxH = _self.maxH+1;
								}
								
							}

							var minTop = 8 - (maxH - minH) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal =Math.round(Math.abs(pos - 8) / 2 + minH);
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_mm":
							var date_dd = _self.gearDate.querySelector(".date_dd");
							var DateStr = date_dd.getAttribute("val");
					
							var objdate = DateStr.split("_");
							var ddVal = parseInt(objdate[2]);
							var yyVal = parseInt(objdate[0]);
							var mmVal = parseInt(objdate[1]);
							var maxMi=5,
								minMi=0;
							//当年份/月份/天到达最小值
							var time_hh=_self.gearDate.querySelector(".time_hh");
							var minH=time_hh.getAttribute('val');
							if(yyVal == _self.minY && _self.minM == mmVal   && _self.minD == ddVal && _self.minH==minH){
								minMi= _self.minMi ;
								//minMi=0;
								if(_self.minMi%10==0){
									minMi = _self.minMi/10;
								}else{
									minMi =(_self.minMi +(10-_self.minMi%10))/10;
								}


							}
							var maxH=time_hh.getAttribute('val');
							if(_self.maxMi>50){
								var maxH=time_hh.getAttribute('val')-1;
							}
							if(yyVal == _self.maxY && _self.maxM == mmVal   && _self.maxD == ddVal && _self.maxH==maxH){
								//minMi= _self.minMi ;
								// maxMi=0;
								// if(_self.maxMi%10==0){
								// 	maxMi = _self.maxMi/10;
								// }else{
								// 	maxMi =(_self.maxMi +(10-_self.maxMi%10))/10;
								// }
								if(_self.maxMi>50){
									maxMi =0;
									//minMi=_self.maxMi
								}else{
									maxMi=(_self.maxMi+(10-_self.maxMi%10))/10;
								}
								
							}
							var minTop01= 8 - (maxMi - minMi) * 2;
							if (pos < minTop01) {
								pos = minTop01;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal =Math.round((Math.abs(pos - 8) / 2+minMi)*10);
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_ss":
							if (pos < -110) {
								pos = -110;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						default:
					}
					target["pos_" + target.id] = pos;
					target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
					target.setAttribute('top', pos + 'em');
					d++;
				}, 30);
			}
			//控制插件滚动后停留的值
			function setGear(target, val) {
				if(!isNaN(val)){
					val = Math.round(val);
				}
				target.setAttribute("val", val);
				// var time_mm=_self.gearDate.querySelector(".time_mm");
				// var minH=time_mm.getAttribute('val');
				// console.log(time_mm.getAttribute('val'))
				 setDateGearTooth();
				 setTimeGearTooth();
				 // if (/date/.test(target.dataset.datetype)) {
					 // setDateGearTooth();
				 // } else {
					 // setTimeGearTooth();
				 // }
			}
			//取消
			function closeMobileCalendar(e) {
				$("body").unbind("touchmove");
				e.preventDefault();
				//var evt = new CustomEvent('input');
				//_self.trigger.dispatchEvent(evt);
				document.body.removeChild(_self.gearDate);
			}
			//日期确认
			function finishMobileDate(e) {
				var passY = _self.maxY - _self.minY + 1;
				var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
				var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
				date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
				var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
				date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
				_self.trigger.innerHTML= (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd;
				closeMobileCalendar(e);
			}
			//日期时间确认
			function finishMobileDateTime(e) {
				var passY = _self.maxY - _self.minY + 1;
				//var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
				//var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
				var date_dd = _self.gearDate.querySelector(".date_dd");
				var DateStr = date_dd.getAttribute("val");
				var objdate = DateStr.split("_");
				//var ddVal = parseInt(date_dd.getAttribute("val"));
				var date_dd = parseInt(objdate[2]);
				var date_yy = parseInt(objdate[0]);
				var date_mm = parseInt(objdate[1]);
				//date_yy=date_mm>12?date_yy+1:date_yy;
				if(date_mm>12){
					date_mm=date_mm%12;
					//date_yy=date_yy+1;
				}else if(date_mm<9){
					date_mm='0' + date_mm;
				}
				//var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
				date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
				var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
				time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
				var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
				time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
				
				var ordTime=(date_yy) + "-" + date_mm + "-" + date_dd + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
				_self.trigger.innerHTML= ordTime;
				if(ordTime<new Date){
					alert(1)
				}
				localStorage.setItem('timesel',_self.trigger.innerHTML)
				closeMobileCalendar(e);
				$("body").unbind("touchmove");
			}
			//时间确认
			function finishMobileTime(e) {
				var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
				time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
				var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
				time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
				
				var time_ss = parseInt(Math.round(_self.gearDate.querySelector(".time_ss").getAttribute("val")));
				time_ss = time_ss > 9 ? time_ss : '0' + time_ss;	
				_self.trigger.innerHTML = (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm+ (time_ss.length < 2 ? ":0" : ":") + time_ss;
				closeMobileCalendar(e);
			}
			_self.trigger.addEventListener('click', {
				"date": popupDate,
				"datetime": popupDateTime,
				"time": popupTime
			}[type]);
		}
	}
	return MobileCalendar;
})()
}
 catch(e){
 	alert(e.message)
 }
};