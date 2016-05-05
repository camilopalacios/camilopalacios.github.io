;(function() {
  "use strict";
  angular
  .module('GaugeApp',['ui.gauge'])
  .controller('GaugeController1', GaugeController1)
  .controller('GaugeController2', GaugeController2);

  function GaugeController1(){
    var controller = {
      value: 50,
      intervals: {
        values: [0,10,20,30,40,50,60,70,80,90,100],
      },
      options: {
        needleColor: 'grey',
        min: 0,
        max: 100,
        startAngle: -120,
        endAngle: 120,
        animate: {
          enabled: true,
          duration: 1000,
          ease: 'bounce',
        },
        displayInput: true,
        mainFormatter: function(v){return v;},
        subTextFormatter: function(v){return v;},
        intervalFormatter: function(v){return v;},
        readOnly: false,
        subText:{
          enabled: true,
          color: '#222',
          text: 'km/h',
        },
        textColor: '#212121',
      },
      randomIntervals: randomIntervals,
    };

    return controller;

    function randomIntervals(){
      controller.intervals.values = [];
      controller.intervals.values.push(controller.options.min);
      for(var i=1; i < 9; i++){
        controller.intervals.values.push(Math.floor(Math.random()*10)*10);
      }
      controller.intervals.values.push(controller.options.max);
    };
  }

  function GaugeController2(){
    var controller = {
      value: 8,
      intervals: {
        values: [0,1,2,3,4,5,6,7,8,9],
      },
      options: {
        needleColor: 'grey',
        intervalColors: ['#222', '#222', '#222', '#444', '#444', '#444', 'red', 'red', 'red'],
        min: 0,
        max: 9,
        startAngle: -120,
        endAngle: 120,
        animate: {
          enabled: true,
          duration: 1000,
          ease: 'bounce',
        },
        displayInput: true,
        mainFormatter: function(v){return v;},
        subTextFormatter: function(v){return v;},
        intervalFormatter: function(v){return v;},
        readOnly: false,
        subText:{
          enabled: true,
          color: '#222',
          text: 'x100 rpm',
        },
        textColor: '#212121',
        dynamicOptions: true,
      },
      setEase: setEase,
    };

    return controller;

    function setEase(ease){
      console.log('setting: ' + ease);
      controller.options.animate.ease = ease;
      console.log('ctrl options set to : ' + controller.options.animate.ease);
    }

  }
}());
