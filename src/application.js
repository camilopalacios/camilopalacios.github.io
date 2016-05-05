;(function() {
  "use strict";
  angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById('GlassApp'), ['MeasureGlassApp']);
  });
}());

$(document).ready();


function showMenu(){
  $('.topnav').toggleClass('responsive'); // Using javascript: document.getElementsByClassName('topnav')[0].classList.toggle('responsive');
}

function setActive(){
  $('.active').removeClass('active'); // Using javascript: document.getElementsByClassName('active')[0].classList.toggle('active');
  $(document.activeElement).parent().addClass('active'); // Using javascript: document.activeElement.parentElement.classList.toggle('active');
  showMenu();
}
