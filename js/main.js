$(document).ready(function () {
  var carouselResults = '';
  var dapil =$('#dapilDropdown').val();
  var dapilnama = $('#dapilDropdown').find('option:selected').attr('name');
  var _url = "./data/" + dapil + ".json";
  // var _url = "https://infopemilu.kpu.go.id/pileg2019/pencalonan/pengajuan-calon/" + dapil + "/calonDct.json";

  function lopen() {
    $('.preloader-background').delay(100).fadeIn('slow');
    $('.preloader-wrapper').delay(100).fadeIn();
  };
  function lclose() {
    $('.preloader-background').delay(1700).fadeOut('slow');
    $('.preloader-wrapper').delay(1700).fadeOut();
  };
  function nodata(isi){
    isi+=''
      + '<a class="carousel-item">' 
      + '  <div class="calegimg circle white">'
      + '    <img src="img/logo_simpang_300x300px.png"  alt="No Data" style="width: 190px;"/>'
      + '  </div>'
      + '  <div class="carouselCaption">'
      + '    <p class="judul"> Tidak ada data!</p>'
      + '  </div>'     
      + '</a>';     
    $('#carouselCaleg').html(isi);
    // $('#carouselCaleg').carousel({ dist: -50, shift: 0, padding: 0 });
  }
  function renderPage(data) {
    $.each(data, function (key, items) {
      carouselResults += ''
      + '<a href="calegview.html?id=' + items.id + '&dapil=' + $("#dapilDropdown").val() +'&dapilnama='+dapilnama+'" class="carousel-item" >' 
      + '  <p class="judul">' + items.namaPartai + '</p>'
      + '  <div class="calegimg circle white z-depth-3">' 
      + '    <img src="https://silonpemilu.kpu.go.id/publik/calon/' + items.id + '/19"  alt="' + items.id + '"/>' 
      + '  </div>' 
      + '  <div class="carouselCaption">' 
      + '    <p class="judul">' + items.nama + '</p>' 
      + '  </div>' 
      + '</a>';
    })

    // $('#carouselCaleg').css('display', 'none').fadeIn(1000);
    $('#carouselCaleg').html(carouselResults);
    $('#carouselCaleg').carousel();
    $('#carouselCaleg').carousel({ dist: -50, shift: 0, padding: 0 });
    lclose();
  }
  var networkDataReceived = false
  var networkUpdate = fetch(_url).then(function (response) {
    return response.json()
  },'json').then(function (data) {
    networkDataReceived = true
    renderPage(data)
  })
  //return data
  caches.match(_url).then(function (response) {
    if (!response) throw Error('no data cache')
    return response.json()
  }).then(function (data) {
    if (!networkDataReceived) {
      renderPage(data)
      // console.log('render data '+_url+' dari cache')
    }
  }).catch(function () {
    return networkUpdate
  })

  var networkDataReceived=false;
  var networkUpdate = fetch(_url).then(async function(response) {
      return response.json();
    })
    .then(function(data) {
      // M.toast({ html: "Ambil data dari infopemilu.kpu.go.id" });
      networkDataReceived = true;
      // M.toast({ html: "ada internet!" });
      renderPage(data);
      // M.toast({ html: "ambil data, render dari internet!" });
    })
    .catch(function(error) {
      console.log("Request failed " + _url, error);
      // M.Toast.dismissAll();
      M.toast({ html: "Gagal ambil data!" });
      lclose();
      // nodata();
    });

  caches.match(_url).then(function(response){
    if(!response)throw Error('no data cache')
      return response.json() 
  }).then(function(data){
    if(!networkDataReceived){
      renderPage(data)
      console.log('render data '+_url+' dari cache')
    }
  }).catch(function(){
    //M.toast({ html: "Cek Internet lagi!" });
    return networkUpdate
  })

  $('#dapilDropdown').on('change', function(){
    $('#carouselResults').css('display', 'none').fadeIn(500);
    updateCaleg($(this).val());
  })

  function updateCaleg(dapil){
    lopen();
    var dataResults='';
    // var _newurl = "https://infopemilu.kpu.go.id/pileg2019/pencalonan/pengajuan-calon/" + $("#dapilDropdown").val() + "/calonDct.json";
    var _newurl = "./data/" + $("#dapilDropdown").val() + ".json";

    $.get(_newurl, {
      mode: 'no-cors', headers: {
        'Access-Control-Allow-Origin': '*'
      }}, function (data) {
      $.each(data, function (key, items) {
        dataResults += '<a href="calegview.html?id=' + items.id + '&nama=' + items.nama + '&dapil=' + $("#dapilDropdown").val()+'&dapilnama=' + $('#dapilDropdown').find('option:selected').attr('name') + '" id="calegCarousel" class="carousel-item">'
          + '    <p class="judul">' + items.namaPartai + '</p>'
          + '  <div class="calegimg circle white z-depth-3">'
          + '    <img src="https://silonpemilu.kpu.go.id/publik/calon/' + items.id + '/19"  alt="' + items.id + '"/>'
          + '  </div>'
          + '  <div class="carouselCaption">'
          + '    <p class="judul">' + items.nama + '</p>'
          + '  </div>'
          + '</a>';
      })
      $('#carouselCaleg').css('display', 'none').fadeIn(1000);
      $('#carouselCaleg').html(dataResults);
      $('#carouselCaleg').carousel({dist:-50, shift:0, padding:0});
    }, 'json');
  }


}); //end of document ready
