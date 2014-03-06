var boat; // 船物件
var pos; // 捲軸偏移量
var oldScroll = 0; // 上次的捲軸偏移量
var isDown; // 是否為往下捲動
var wasDown = true; // 上次是否為往下捲動
var currentZone = 0;
var zone;

// 場景分段斷點
var waypoints = [0, 525, 1532, 3050, 5000];

// 捲動動畫事件
var anim = function () {
  var offset = $(document).scrollTop();

  pos = parseInt($("#boat").css("top"), 10) + parseInt($(".boat_container").css("top"), 10) + offset;

  isDown = pos > oldScroll;
  var dif = pos - oldScroll;
  oldScroll = pos;

  if (wasDown != isDown) {
    boat.turnDir((boat.dir == "left") ? "right" : "left");
  }
  wasDown = isDown;

  for (var i = currentZone - 1, len = waypoints.length; i < len; i++) {
    if (offset < waypoints[i]) {
      zone = i;
      break;
    }
  }

  if (currentZone != zone) {
    //console.log(zone);
    // 轉換場景處理。這邊可以塞 GA PV Tracking。
    currentZone = zone;
    var m = (isDown) ? waypoints[currentZone - 1] : waypoints[currentZone];

    switch(m) {
      case 0:
        boat.turnDir("right");
        break;

      case 525:
        boat.turnDir("left");
        break;

      case 1532:
        boat.turnLights((isDown) ? "on" : "off");
        break;

      case 3050:
        boat.turnDir("right");
        break;
    }
  }
};

var s = skrollr.init({
  render: function (data) {
    //console.log(data.curTop);
  }
});

$(function (){
  $(".arrow > a").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    $("html,body").animate({
      scrollTop: $(target).offset().top
    }, 2000);
  });

  // 平滑捲動效果
  $('body').mousewheel(function(event, delta) {
    $.scrollTo.window().queue([]).stop();

    if (delta < 0) {
      $('body').stop().scrollTo('+=100', 500);
    } else {
      $('body').stop().scrollTo('-=100', 500);
    }

    return false;
  });

  boat = $.boat({ el: '#boat' });

  $(window).scroll(function () {
    $("#console").text($(window).scrollTop());
    anim();
  });
  anim();
});
