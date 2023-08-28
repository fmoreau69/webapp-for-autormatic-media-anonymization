$(function () {

  $(".js-upload-medias").click(function () {
    $("#fileupload").click();
  });

  $("#fileupload").fileupload({
    dataType: 'json',
    sequentialUploads: true,

    start: function (e) {
      $("#modal-progress").modal("show");
    },

    stop: function (e) {
      $("#modal-progress").modal("hide");
    },

    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      var strProgress = progress + "%";
      $(".progress-bar").css({"width": strProgress});
      $(".progress-bar").text(strProgress);
    },

    done: function (e, data) {
      if (data.result.is_valid) {
        $("#gallery tbody").prepend(
          "<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td></tr>"
        )
      }
    }

  }).bind('fileuploaddone', function (e, data) {
       $.ajax({
       type: 'GET',
       url : '/medias/refresh_table/',
       success: function (res) {
       console.log(res);
       $("#file_list_container")[0].innerHTML = res['render'];}
    });
  });

//  .bind('fileuploaddone', function (e, data) {
//       $.ajax({
//       type: 'GET',
//       url : '/medias/refresh_options/',
//       success: function (res) {
//       console.log(res);
//       $("#options_container")[0].innerHTML = res['render'];}
//    });
//  })

//  .bind('fileuploaddone', function (e, data) {
//       $.ajax({
//       type: 'GET',
//       url : '/medias/refresh_content/',
//       success: function (res) {
//       console.log(res);
//       $("#main_container")[0].innerHTML = res['render'];}
//    });
//  });

});
