var welcomePage = getLanguage.then(function(websiteContent){
  return new Promise(function(resolve, reject){
   $('#greetingContent').text(websiteContent.welcomeAnimationPage.greeting);
   $('#jobTitleContetn').text(websiteContent.welcomeAnimationPage.jobTitle[0]+' '+websiteContent.welcomeAnimationPage.jobTitle[1]+' '+websiteContent.welcomeAnimationPage.jobTitle[2]+' '+websiteContent.welcomeAnimationPage.jobTitle[3]);
   $('#msgContent').text(websiteContent.welcomeAnimationPage.msg);
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
                 tempTypeSpeed = 70;
             }
             t.innerHTML += HTML[cursorPosition];
         }
         if (writingTag === true && HTML[cursorPosition] === ">") {
             tempTypeSpeed = 70;
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

 var typer = document.getElementById('content');

 typewriter = setupTypewriter(typer);
 if(getCookie('welcomeAnimation')||getCookie('welcomeAnimation')=='done'){
   resolve(websiteContent);
 }else{
   $('#content').removeClass('d-none');
   setTimeout(function(){
     typewriter.type();
   }, 1000);
 }

 });
}).then(function(data){
  return new Promise(function(resolve, reject){
    if(getCookie('welcomeAnimation')||getCookie('welcomeAnimation')=='done'){
      resolve(data);
    }
    setTimeout(function(){
      resolve(data);
    }, 1500)
  });
});
