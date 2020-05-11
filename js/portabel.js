  function lopen() {
    $('.preloader-background').delay(100).fadeIn('slow');
    $('.preloader-wrapper')
      .delay(100)
      .fadeIn();
  };
  function lclose() {
    $('.preloader-background').delay(1700).fadeOut('slow');
    $('.preloader-wrapper')
      .delay(1700)
      .fadeOut();
  };
  $(".preloader-background").on('click', function(){
    lclose();
  })
$(document).ready(function () {
  // M.AutoInit();
  // $("#carouselCaleg").carousel({dist:-50,shift:0,padding:0,Height:200});
  $('#dapilDropdown').formSelect({ classes: 'btn-large red darken-3 white-text center-align' });

});
