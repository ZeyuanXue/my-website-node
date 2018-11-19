var transition = welcomePage.then(function(websiteContent){
  // TODO: Add Content to HomePage, Make it d-none
  return new Promise(function(resolve, reject){


    if (!getCookie('welcomeAnimation')||getCookie('welcomeAnimation')!='done'){
      //TODO: Display transition animation
      $('#content').css('position','relative');
      $('#greetingContent').css('position','relative');
      $('#jobTitleContetn').css('position','relative');
      $('#msgContent').css('position','relative');
      $('#content').removeClass('cursor');
      $('#content').addClass('w-100');
      $('#greetingContent').animate({
        left: '+=100%',
        opacity: '0',
      }, {duration:1000, queue:false});
      $('#jobTitleContetn').animate({
        left: '-=100%',
        opacity: '0',
      }, {duration:1000, queue:false});
      $('#msgContent').animate({
        left: '+=100%',
        opacity: '0',
      }, {duration:1000, queue:false}).promise().then(function(){
        $('#welcomePage').remove();
        resolve(websiteContent);
      });


      var curTime = new Date(Date.now()+60*60*1000);
      document.cookie = "welcomeAnimation=done; expires="+curTime.toUTCString();
    }else{
      $('#welcomePage').remove();
      resolve(websiteContent);
    }
    //$('#homePage').removeClass('d-none');
    //$('#welcomePage').remove();
    //resolve(websiteContent);
  });
});
