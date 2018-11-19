'use strict';

var getLanguage = getContent().then(function(data){
  return new Promise(function(resolve, reject){
    $(document).ready(function(){
      resolve(data);
    });
  });
}).catch(function(error){
  console.log("Error: "+error);
});


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getContent (){

  function getLanguage(){
    var websiteLanguage = getCookie("language");

    if (websiteLanguage==""){
      var browserLanguage = navigator.language;
      if (browserLanguage.includes("zh")){
        websiteLanguage = "cn";
      }else if (browserLanguage.includes("ja")){
        websiteLanguage = "jp";
      }else{
        websiteLanguage = "en";
      }
    }
    var title = "Zeyuan Xue";
    if (websiteLanguage=="cn"){
      title = "薛泽原"
    }else if (websiteLanguage=="jp"){
      title = "薛澤原"
    }
    $('head').html($('head').html()+'<title>'+title+'</title>');
    $('head').html($('head').html()+'<link rel="icon" href="/view/imgs/'+websiteLanguage+'-favicon.ico">');
    document.cookie = "language="+websiteLanguage;
    return websiteLanguage;
  };

  function fetchLanguagePackage(language){
    return new Promise(function(resolve, reject){
      $.ajax({
        type: 'GET',
        url: ('/view/language/'+language),
        dataType: 'json',
        success: function(res, status, xhr){
          if (xhr.status==200){
            $('#content').css('font-family',res.welcomeAnimationPage.fontFamily);
            $('#homePage').css('font-family',res.welcomeAnimationPage.fontFamily);
            $('#aboutContent').css('font-family',res.welcomeAnimationPage.fontFamily);
            $('#navBrand').html("<img src='/view/imgs/"+getCookie('language')+"-favicon-1024.png' width='4.5%' style='min-width: 30px;position: absolute; top: 1.5%; left: 3%; max-width: 50px; top: 5px;'>"+$('#navBrand').html());
            var photoAndContact = "<div style='text-align: justify; width: 25%; position: absolute; top: 30%;'><img id='myPhoto' src='/view/imgs/me.jpeg' alt='My Photot' style='display:block; border-radius: 50%; border-style: solid; border-color: #e3e7ed; max-width: 100%; max-height: 100%; margin: 0;' width='100%' /><p class='whiteColor' style='text-align:center; font-size: 1.8vw;' ><b>"+res.name+"</b></span></p>";
            $('#photoAndContact').html(photoAndContact+$('#photoAndContact').html());
            $('#'+getCookie('language')+'LangIcon').removeClass('d-none').css('z-index', '99999');
            $('#'+getCookie('language')+'LangIcon').removeAttr('onclick');
            var langs = ['cn','en','jp'];
            for (var i=0; i<3; i++){
              if (langs[i]==getCookie('language')){
                continue;
              }
              $('body').on("click", '#'+langs[i]+'LangLink',function(){
                document.cookie = 'language='+$(this).attr('id').substring(0,2);
                location.href='/';
                event.stopPropagation();
              });
            }
            $('body').on("click", '#'+getCookie('language')+'LangIcon',function(event){
              var langs = ['cn','en','jp'];
              var height = $('#'+getCookie('language')+'LangIcon').height()+13;
              var count = 1;
              for (var i=0; i<3; i++){
                if (langs[i]==getCookie('language')){
                  continue;
                }
                if($('#'+langs[i]+'LangIcon').position().top>16){
                  $('#'+langs[i]+'LangIcon').stop().animate({
                    top: '15px',
                    opacity: 0
                  },{duration:300, queue:false}).promise().then(function(){
                    $('#'+langs[i]+'LangIcon').addClass('d-none');
                  });
                }else{
                  $('#'+langs[i]+'LangIcon').removeClass('d-none').css('opacity','0').css('z-index', '9999').animate({
                    top: ('+='+((count++)*(height))),
                    opacity: 1
                  },{duration:300, queue:false});
                }
              }
              event.stopPropagation();
            });
            $(document).on('click',function() {
              var langs = ['cn','en','jp'];
              for (var i=0; i<3; i++){
                if (langs[i]==getCookie('language')){
                  continue;
                }
                $('#'+langs[i]+'LangIcon').stop().animate({
                  top: '15px',
                  opacity: 0
                },{duration:300, queue:false}).promise().then(function(){
                  $('#'+langs[i]+'LangIcon').addClass('d-none');
                });

              }
            });
            var font = new FontFace(res.welcomeAnimationPage.fontFamily, "url('view/css/fonts/"+res.welcomeAnimationPage.fontFamily+"')");
            font.load().then(function(){
              resolve(res);
            });
          }
        }
      }).fail(function(){
        reject("Could not get website content for this language - "+language);
      });
    }).catch(function(error){
      console.log('Error: '+error);
    });
  };

  return fetchLanguagePackage(getLanguage());
}
