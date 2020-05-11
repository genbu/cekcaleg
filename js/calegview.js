// $(document).ready(function () {
  //url: 'https://infopemilu.kpu.go.id/pileg2019/pencalonan/calon/43776', //+ $('#idCalon').val(), 
$.ajax({
  // url: '/pileg2019/pencalonan/pengajuan-calon/' + $('#dapilFilter').val() + '/' + 1 + '/' + 'dct',
  url: "https://infopemilu.kpu.go.id/pileg2019/api/dapil/39436/2",
  type: "GET",
  dataType: "JSON",
  cache: false,
  success: function(returnhtml) {
    showAjax(returnhtml);
  }
});

  var idParpol = 1;

  function showAjax(returnhtml) {
    //table.clear();
    $.each(returnhtml, function (key, value) {

      var img;
      if (value.originalFilename == null) {
        img = '<p style="text-align: center;"><img class="img-logo-dcs" src="/images/nophoto.jpg" /></p>'
      } else {
        img = '<p style="text-align: center;"><img class="img-logo-dcs" src="https://silonpemilu.kpu.go.id/publik/calon/' + value.id + '/19" /></p>'
      }
      var name = value.nama;
      if (value.gelarDepan != null) {
        name = value.gelarDepan + ' ' + name;
      }

      if (value.gelarBelakang != null) {
        name = name + ', ' + value.gelarBelakang;
      }

      var detail = '<a href="/pileg2019/pencalonan/calon/' + value.id + '" target="_blank">Detail</a>'

      // table.row.add([value.noUrut, img, name, value.stringJenisKelamin, value.namaKab,detail]).draw(false);
    });
  }


// function getURL(variable) {
//   var query = window.location.search.substring(1);
//   var vars = query.split("&");
//   for (var i = 0; i < vars.length; i++) {
//     var pair = vars[i].split("=");
//     if (pair[0] == variable) { return pair[1]; }
//   }
//   return (false);
// }
// function shortenLargeNumber(num, digits) {
//   var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
//     decimal;

//   for (var i = units.length - 1; i >= 0; i--) {
//     decimal = Math.pow(1000, i + 1);

//     if (num <= -decimal || num >= decimal) {
//       return +(num / decimal).toFixed(digits) + units[i];
//     }
//   }

//   return num;
// }

// $(document).ready(function () {
//   // id ='288512';
//   // dapil='6647';
//   var id = getURL("id");
//   var dapil = getURL("dapil");
//   // var nama = getURL("nama");
//   var dapilnama = decodeURI(getURL("dapilnama"));
//   var dataResults = '';
//   var profil_url = "https://infopemilu.kpu.go.id/pileg2019/pencalonan/calon/" + id;
//   var data_url = "./data/" + dapil + ".json";
//   // var data_url = "https://infopemilu.kpu.go.id/pileg2019/pencalonan/pengajuan-calon/" + dapil + "/calonDct.json";

//   // M.toast({ html: data_url });

//   $.get(data_url, function (data) {
//     var items = data.filter(function (o) {
//       return o.id == id
//     }).pop();
//     //$.each(data, function (key, items) {
//       dataResults += ''
//         + '          <div class="row center">'
//         + '            <div class="calegimgProfil circle white z-depth-3">'
//         + '              <img src="https://silonpemilu.kpu.go.id/publik/calon/' + items.id + '/19" alt="' + items.id + '" class="">'
//         + '            </div>'
//         + '            <h5 class="judul">' + items.nama + '</h5>'
//         + '            <p>Calon Anggota DPRD </p>'
//         + '            <p>' + dapilnama + '</p>'
//         + '            <p>Nomor Urut ' + items.noUrut + '</p>'
//         + '            <p>' + items.namaPartai + '</p>'
//         + '            <input id="title" value="Cek Caleg Kota Bogor!" size="40" class="hide" />'
//         + '            <input id="text" value="Caleg '+items.nama+' '+dapilnama+' '+items.noUrut+' '+items.namaPartai+'" class="hide"/>'
//         + '            <input id="url" value="'+location.href+'" class="hide"/>'
//         + '            <a id="share" href="#" class="btn-floating center btn-large waves-effect waves-light red"><i class="material-icons">share</i></a>'
//         + '          </div>';    
//     // })
//     // $('#dataCaleg').css('display', 'none').fadeIn(1000);
//     // M.toast({ html: dataResults });
//     $("#dataCaleg").html(dataResults);
//     $(".preloader-background").delay(1700).fadeOut("slow");
//     $(".preloader-wrapper").delay(1700).fadeOut();
//   }, 'json')

//   $.get(profil_url,{mode:'no-cors'}).then(function (html) {
//     // M.toast({ html: "Ambil data Riwayat Hidup dari infopemilu.kpu.go.id" });

//     var $profil = $(html).find(".ibox-content");
//     document.getElementById("profilCaleg").innerHTML = $profil.html();

//     var $dokumen = $(html).find("#dokumenCalon");
//     document.getElementById("dokumenCaleg").innerHTML = $dokumen.html();

//   //}, function () {
//     //M.toast({ html: "Koneksi Gagal" });
//     //$("#dataCaleg").html('<p>Koneksi Error!</p>');
//     $(".preloader-background").delay(1700).fadeOut("slow");
//     $(".preloader-wrapper").delay(1700).fadeOut();
//   });
// }); //end of document ready



// // =======================WEB SHARE API==============================
// 'use strict';
// function sleep(delay) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }
// function logText(message, isError) {
//   if (isError)
//     console.error(message);
//   else
//     console.log(message);
//   const p = document.createElement('p');
//   if (isError)
//     p.setAttribute('class', 'error');
//   document.querySelector('#output').appendChild(p);
//   p.appendChild(document.createTextNode(message));
//   M.toast({ html: "Gagal Share Data!" });
// }
// function logError(message) {
//   M.toast({ html: message });
//   // logText(message, true);
// }
// async function testWebShare() {
//   if (navigator.share === undefined) {
//     logError('Error: Unsupported feature: navigator.share');
//     return;
//   }
//   const title_input = document.querySelector("#title");
//   const text_input = document.querySelector('#text');
//   const url_input = document.querySelector('#url');
//   const title = title_input.disabled ? undefined : title_input.value;
//   const text = text_input.disabled ? undefined : text_input.value;
//   const url = url_input.disabled ? undefined : url_input.value;
//   try {
//     await navigator.share({ title, text, url });
//   } catch (error) {
//     logError('Error sharing: ' + error);
//     return;
//   }
//   logText('Successfully sent share');
// }
// async function testWebShareDelay() {
//   await sleep(2000);
//   testWebShare();
// }
// function onLoad() {
//   // document.querySelector('#share').addEventListener('click', testWebShare);
//   if (navigator.share === undefined) {
//     logError('Error: You need to use a browser that supports this draft ' +
//       'proposal.');
//   }
// }
// window.addEventListener('load', onLoad);