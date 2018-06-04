$(function() {
    $.scrollify({
        section : ".fullwidth",
        features: ".features",
        easing : "easeOutExpo",
        scrollbars : true,
        scrollSpeed : 1100,
        standardScrollElements: ".scroll",
        interstitialSection : ".foot",
        before: function(section) {
            console.log(section);
            if(section >= 1){
                $(".scrollTop-wrapper").css('display', 'block');
            } else {
                $(".scrollTop-wrapper").css('display', 'none');
            }
        }
    });
});

$(".scroll").on("click", function(){
    $.scrollify.move($(this).attr("href"));
});

// $(".download-btn-filled").on("click", function(){
//     alert("Happy downloading by Chorus :)");
// });

var init = {
    method: 'GET',
};
var jarLink, exeLink, version;
var req = new Request('https://api.github.com/repos/iAmGio/chorus/releases/latest', init);
fetch(req, init).then(function(response){ return response.json(); }).then(function(data){
    jarLink = data.assets[0].browser_download_url;
    //exeLink = data.assets[1].browser_download_url;
    version = data.tag_name;
    dateRaw = data.assets[0].updated_at.substring(0, data.assets[0].updated_at.length - 11);
    date = dateRaw.split("-");
    year = date[0];
    month = date[1];
    day = date[2];
    document.getElementById('version').innerHTML = version;
    document.getElementById('date').innerHTML = date[0] + "/" + date[1] + "/" + date[2];
    $("#exe").attr("href", exeLink);
    $(".jar").attr("href", jarLink);
});