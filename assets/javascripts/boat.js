(function($) {

  $.boat = function(options) {

    // VARIABLES
    var boat = this;
    var currentInd = 0;
    var destinationInd = 0;
    var waterLevel = 610;
    var currentWaterPos = 0;

    var defaults = {};
    boat.settings = $.extend({}, defaults, options);

    // CONSTRUCTOR

    function init() {
      $('#boat').css('top', 560 + 'px');
      boat.adjustboatHorizontal(560);
      boat.turnLights("off");
      boat.turnDir("right");
      boat.floatMyBoat();
    }

    // PUBLIC METHODS
    boat.floatMyBoat = function() {
      if (parseInt($('#boat').css('marginTop')) > 0) {
        $('#boat').animate({
          marginTop: '-10px'
        }, {
          duration: 1500,
          easing: 'easeInOutQuad',
          step: function() {
            boat.updateWaterLevel(currentWaterPos, {
              prop: 'top'
            })
          },
          complete: function() {
            boat.floatMyBoat();
          }
        });
      } else {
        $('#boat').animate({
          marginTop: '10px'
        }, {
          duration: 1500,
          easing: 'easeInOutQuad',
          step: function() {
            boat.updateWaterLevel(currentWaterPos, {
              prop: 'top'
            })
          },
          complete: function() {
            boat.floatMyBoat();
          }
        });
      }
    }

    boat.turnDir = function(dir) {
      this.dir = dir;
      if (dir == "right") {
        $('#boat').addClass('right');
      } else {
        $('#boat').removeClass('right');
      }
    }

    boat.turnLights = function(dir) {
      this.lights = dir;
      if (dir == "on") {
        $('#boat #boat-lights').stop().animate({
          opacity: 1
        }, {
          duration: 900,
          easing: 'easeInElastic'
        });
      } else {
        $('#boat #boat-lights').stop().animate({
          opacity: 0
        }, {
          duration: 800,
          easing: 'easeOutQuad'
        });
      }
    }

    boat.adjustboatHorizontal = function(top) {
      var section_height = 1000;
      var horizontal_center = 475 - (131 / 2);
      var maximum_offset = 300;
      var initial_top = 500;

      // position after xx; just go straight down
      if (top > 3150) {
        top = 3150;
      }

      var degrees = ((top - initial_top) / (section_height / 2)) * (Math.PI / 2);
      var left = horizontal_center + Math.sin(degrees) * maximum_offset;

      $('#boat').css('left', left + "px");
    }


    boat.updateWaterLevel = function(currentTop, fx) {
      if (fx.prop == "top") {
        currentWaterPos = currentTop;
        var h = waterLevel - currentTop - parseInt($('#boat').css('marginTop'));
        h = (h < 0) ? 0 : (h > 84) ? 84 : h;
        $('#boat-object-above').css('height', h + 'px');
      }
    }

    boat.showBubbles = function() {
      //stop floating animation for performance
      $('#boat').stop();

      //show bubbles and animate them back out, also restart the floating
      $('#bubbles').stop(true, false).animate({
        opacity: 1
      }, 200, 'easeOutExpo').animate({
        opacity: 0
      }, {
        duration: 400,
        easing: 'easeOutQuint',
        complete: function() {
          boat.floatMyBoat()
        }
      });
    }

    // INIT
    init();

    return boat;
  }

})(jQuery);
