var home = transition.then(function(websiteContent){
  return new Promise(function(resolve, reject){
    //Add About Content
    //TODO: Fix after wrap no space before content problem; Add max size of upper-left icon; set relative size for font
    for (var i=0; i<websiteContent.homePage.about.length; i++){
      $('#aboutContent').html($('#aboutContent').html()+"<span>"+(i==0?"$ ":"\n$ ")+websiteContent.homePage.about[i][0]+"</span>");
      $('#aboutContent').html($('#aboutContent').html()+"\n<span class='twoSpaceIndent'>"+websiteContent.homePage.about[i][1]+"\n</span>");
    }
    $('#linkedInIcon').click(function(){
      window.open('https://www.linkedin.com/in/zeyuanxue/','_blank');
    });
    $('#githubIcon').click(function(){
      window.open('https://github.com/ZeyuanXue','_blank');
    });
    $('#resumeIcon').click(function(){
      window.open('/view/files/resume-zeyuanxue.pdf','_blank');
    });

    (function endlessDownArrowAnimation(){
      $('#downArrow').animate({
        top: '77%'
      },300).promise().then(function(){
        $('#downArrow').animate({
          top: '78%'
        },300).promise().then(function(){
          endlessDownArrowAnimation();
        });
      });
    })();
    // $('#aboutHeader').html("<img src='/view/imgs/"+getCookie('language')+"-favicon-1024.png' width='4.5%' style='position: absolute; top: 1.5%; left: 3%; max-width: 50px'>");
    // var photoAndContact = "<div style='text-align: justify; width: 25%; position: absolute; top: 30%;'><img src='/view/imgs/me.jpeg' alt='My Photot' style='display:block; border-radius: 50%; border-style: solid; border-color: #e3e7ed; max-width: 100%; max-height: 100%; margin: 0;' width='100%' /><p class='whiteColor' style='text-align:center; font-size: 1.8vw;' ><b>"+websiteContent.name+"</b></span></p>";
    // $('#photoAndContact').html(photoAndContact);
    $('#homePage').removeClass('d-none');

    $('#homePage').animate({opacity: 1},700);
    $('#linkedInIcon').hover(function(){
      $(this).animate({
        width: '+=10px',
        height: '+=10px',
        left: '-=5px'
      },100);
    },function(){
      $(this).animate({
        width: '-=10px',
        height: '-=10px',
        left: '+=5px'
      },100);
    });
    $('#githubIcon').hover(function(){
      $(this).animate({
        width: '+=10px',
        height: '+=10px',
        left: '-=5px'
      },100);
    },function(){
      $(this).animate({
        width: '-=10px',
        height: '-=10px',
        left: '+=5px'
      },100);
    });
    $('#resumeIcon').hover(function(){
      $(this).animate({
        width: '+=10px',
        height: '+=10px',
        left: '+=5px'
      },100);
    },function(){
      $(this).animate({
        width: '-=10px',
        height: '-=10px',
        left: '-=5px'
      },100);
    });
    $(window).scroll(function(){
      if ($(document).scrollTop() > 50) {
        $('#downArrow').animate({
          opacity: 0
        },{duration: 100, queue: false});


      } else {
        $('#downArrow').stop().animate({
          opacity: 1
        },{duration: 150, queue: false});
      }
    });
    // if ($(document).scrollTop()>0 && $(document).scrollTop()<window.innerHeight){
    //   $('html, body').animate({scrollTop: window.innerHeight+'px'},100)
    // }

    function setupTypewriter(t) {
      var HTML = t.innerHTML;

      t.innerHTML = "";

      var cursorPosition = 0,
          tag = "",
          writingTag = false,
          tagOpen = false,
          typeSpeed = 100,
        tempTypeSpeed = 0;

      var type = function() {

          if (writingTag === true) {
              tag += HTML[cursorPosition];
          }

          if (HTML[cursorPosition] === "<") {
              tempTypeSpeed = 0;
              if (tagOpen) {
                  tagOpen = false;
                  writingTag = true;
              } else {
                  tag = "";
                  tagOpen = true;
                  writingTag = true;
                  tag += HTML[cursorPosition];
              }
          }
          if (!writingTag && tagOpen) {
              tag.innerHTML += HTML[cursorPosition];
          }
          if (!writingTag && !tagOpen) {
              if (HTML[cursorPosition] === " ") {
                  tempTypeSpeed = 0;
              }
              else {
                  tempTypeSpeed = 50;
              }
              t.innerHTML += HTML[cursorPosition];
          }
          if (writingTag === true && HTML[cursorPosition] === ">") {
              tempTypeSpeed = 50;
              writingTag = false;
              if (tagOpen) {
                  var newSpan = document.createElement("span");
                  t.appendChild(newSpan);
                  newSpan.innerHTML = tag;
                  tag = newSpan.firstChild;
              }
          }

          cursorPosition += 1;
          if (cursorPosition < HTML.length - 1) {
              setTimeout(type, tempTypeSpeed);
          }else{
            console.log('typed');
            resolve(websiteContent);
          }

      };

      return {
          type: type
      };
  }
  var typer = document.getElementById('aboutContent');

  typewriter = setupTypewriter(typer);
  typewriter.type();
  });
});
