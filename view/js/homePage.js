var home = transition.then(function(websiteContent){
  return new Promise(function(resolve, reject){
    //Add About Content
    //TODO: Fix after wrap no space before content problem; Add max size of upper-left icon; set relative size for font
    for (var i=0; i<websiteContent["homePage"]["about"].length; i++){
      $('#aboutContent').html($('#aboutContent').html()+"<span>"+(i==0?"$ ":"\n$ ")+websiteContent["homePage"]["about"][i][0]+"</span>");
      $('#aboutContent').html($('#aboutContent').html()+"\n<span class='twoSpaceIndent'>"+websiteContent["homePage"]["about"][i][1]+"\n</span>");
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

    if (getCookie('language')=='cn'){
      $('#expEduLabel').html('<b>学历</b>');
      $('#expExpLabel').html('<b>工作经历</b>');
      $('#expProjLabel').html('<b>项目经验</b>');
      $('#skillLabel').html('<b>技能</b>');
      $('#certLabel').html('<b>认证</b>');
      $('#hobbyLabel').html('<b>兴趣爱好</b>');
    }else if (getCookie('language')=='jp'){
      $('#expEduLabel').html('<b>教育</b>');
      $('#expExpLabel').html('<b>職務経験</b>');
      $('#expProjLabel').html('<b>プロジェクト</b>');
      $('#skillLabel').html('<b>スキルズ</b>');
      $('#certLabel').html('<b>認証</b>');
      $('#hobbyLabel').html('<b>興味</b>');
    }


    for (var x=0; x<websiteContent["homePage"]["skills"].length; x++){
      $('#skillsContent').html($('#skillsContent').html()+'  <div class="col-md-2 col-sm-2 col-xs-2 col-xxs-2" style="margin-bottom: 0.5%;"><span class="whiteColor">'+websiteContent["homePage"]["skills"][x][0]+'</span></div><div class="col-md-10 col-sm-10 col-xs-10 col-xxs-10" style="margin-bottom: 0.5%;"><div style="background: white; height: 1vw; width: 0;" id="'+websiteContent["homePage"]["skills"][x][2]+'"></div></div>');
    }

    for (var i=0; i<websiteContent["homePage"]["experience"]["education"].length; i++){
      $('#educationRow').html(  $('#educationRow').html()+'<div class="col-md-2 col-sm-3 col-xs-3 col-xxs-6"><a><div class="tile"><img width="100" height="100" src="'+websiteContent["homePage"]["experience"]["education"][i]["preview"]+'" alt="'+websiteContent["homePage"]["experience"]["education"][i]["title"]+'"></div></a></div><div class="col-md-2 col-sm-3 col-xs-3 col-xxs-6"><pre style="color: white;">\n'+websiteContent["homePage"]["experience"]["education"][i]["title"]+'\n'+websiteContent["homePage"]["experience"]["education"][i]["degree"]+'\n'+websiteContent["homePage"]["experience"]["education"][i]["year"]+'\n</pre></div>');
    }
    for (var i=0; i<websiteContent["homePage"]["experience"]["experience"].length; i++){
      $('#experienceRow').html(  $('#experienceRow').html()+'<div class="col-md-2 col-sm-3 col-xs-3 col-xxs-6"><a><div class="tile"><img width="100" height="100" src="'+websiteContent["homePage"]["experience"]["experience"][i]["preview"]+'" alt="'+websiteContent["homePage"]["experience"]["experience"][i]["title"]+'"></div></a></div><div class="col-md-2 col-sm-3 col-xs-3 col-xxs-6"><pre style="color: white;">\n'+websiteContent["homePage"]["experience"]["experience"][i]["title"]+'\n'+websiteContent["homePage"]["experience"]["experience"][i]["position"]+'\n'+websiteContent["homePage"]["experience"]["experience"][i]["year"]+'\n'+websiteContent["homePage"]["experience"]["experience"][i]["location"]+'\n</pre></div>');
    }
    for (var i=0; i<websiteContent["homePage"]["experience"]["projects"].length; i++){
      $('#projectsRow').html(  $('#projectsRow').html()+'<div class="col-md-2 col-sm-3 col-xs-3 col-xxs-6"><a><div class="tile"><img width="100" height="100" src="'+websiteContent["homePage"]["experience"]["projects"][i]["preview"]+'" alt="'+websiteContent["homePage"]["experience"]["projects"][i]["title"]+'"></div></a></div><div class="col-md-2 col-sm-3 col-xs-3 col-xxs-6"><pre style="color: white;">\n'+websiteContent["homePage"]["experience"]["projects"][i]["title"]+'\n'+websiteContent["homePage"]["experience"]["projects"][i]["company"]+'\n'+websiteContent["homePage"]["experience"]["projects"][i]["year"]+'\n</pre></div>');
    }
    var pivot = Math.floor(websiteContent["homePage"]["certification"].length/2);
    for (var i=0; i<websiteContent["homePage"]["certification"].length; i++){
      if (i<=pivot){
        $('#certCol1').html($('#certCol1').html()+'<div style="width:100%"><a target="_blank" href="'+websiteContent["homePage"]["certification"][i]["link"]+'" style="color:white;">'+websiteContent["homePage"]["certification"][i]["title"]+'</a></div>');
      }else{
        $('#certCol2').html($('#certCol2').html()+'<div style="width:100%"><a target="_blank" href="'+websiteContent["homePage"]["certification"][i]["link"]+'" style="color:white;">'+websiteContent["homePage"]["certification"][i]["title"]+'</a></div>');
      }
    }

    for (var i=0; i<websiteContent["homePage"]["hobby"].length; i++){
      $('#hobbyRow').html($('#hobbyRow').html()+'<div class="col-md-2 col-sm-2 col-xs-3 col-xxs-6"><a><div class="tile"><img width="140" height="140" src="'+websiteContent["homePage"]["hobby"][i]["preview"]+'" alt="'+websiteContent["homePage"]["hobby"][i]["title"]+'"><span>'+websiteContent["homePage"]["hobby"][i]["title"]+'</span></div></a></div>');
    }

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

    $('#homePage').removeClass('d-none');

    $('#homePage').animate({opacity: 1},{duration: 700, queue: false});
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

    $('#menuIcon').on('click', function(event){
      alert('menu clicked');
      event.stopPropagation();
    });

    var canScrollNext = false;
    var canScrollTop = false;
    if ($(document).scrollTop()>window.innerHeight){
      canScrollTop = true;
    }else{
      canScrollNext = true;
    }
    $(window).scroll(scrollToTop);
    $(window).scroll(scrollToNext);
    function scrollToNext(){
      if ($(document).scrollTop() > 0 && $(document).scrollTop()<$('#experiencePart').offset().top && canScrollNext && !canScrollTop){
        canScrollNext = false;
        $('html, body').stop().animate({
          scrollTop: $('#experiencePart').offset().top
        },400).promise().then(function(){
          setTimeout(function(){canScrollTop = true;}, 250);
        });
      }
    }

    function scrollToTop(){
      if ($(document).scrollTop() > 0 && $(document).scrollTop()<$('#experiencePart').offset().top && canScrollTop && !canScrollNext){
        canScrollTop = false;
        $('html, body').animate({
          scrollTop: 0
        },400).promise().then(function(){
          setTimeout(function(){canScrollNext = true;}, 250);
        });
      }
    }

    var skillShowed = false;
    function showSkills(){
      for (var i=0; i<websiteContent["homePage"]["skills"].length; i++){
        $('#'+websiteContent["homePage"]["skills"][i][2]).animate({
          width: websiteContent["homePage"]["skills"][i][1]
        }, {duration:700, queue: false});
      }
    }

    $(window).scroll(function(){
      if ($(document).scrollTop() > 50) {
        $('#downArrow').stop().animate({
          opacity: 0
        },{duration: 50, queue: false});
      }else {
        $('#downArrow').stop().animate({
          opacity: 1
        },{duration: 300, queue: false});
      }
      if($(document).scrollTop() > ($('#skillsPart').height()/2+$('#experiencePart').offset().top) && !skillShowed) {
        skillShowed = true;
        showSkills();
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
