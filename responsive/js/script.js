//GSAP---------------------
let funcObj = {
  f_0:function(){
    let tl = gsap.timeline({opacity:1});
    tl.from('#visual-section .visual-tit-wrap>p',{y:40})
    tl.from('#visual-section .visual-tit p',{opacity:0,x:-150,duration:1})
    tl.fromTo('#visual-section .visual-tit-wrap a',{opacity:0},{opacity:1,x: 0,duration:1.2},'<')
    tl.to('#visual-section .dash',{scaleX:1,transformOrigin:'left',duration:1})
    tl.to('#visual-section .visual-tit p span',{
      scaleY:0, transformOrigin:'19 42', duration:0.3, yoyo:true, repeat:3, repeatDelay:0.1,ease: "power3.inOut"},'-=1')
  },
  f_1:function(){
    let tl = gsap.timeline({defaults:{opacity:1}});
    tl.to('#section1 .tit-wrap>*',{
      x:20,
      stagger:0.1,
    });
    tl.to('#section1 .s1-list>*',{
      x:-30,
      stagger:0.2,
    });
  },
  f_2:function(){
    let tl = gsap.timeline({defaults:{opacity:1}});
    tl.to('#section2 .tit-wrap>*',{
      y:-30,
      stagger:0.3,
      duration:1
    });
    tl.to('#section2 .s2-list li .card-inner',{
      y:-40,
      stagger:0.3
    },"-=1");
    tl.to('#section2 .con-btn',{
      y:-20
    })
  },
  f_3:function(){
    let tl = gsap.timeline({defaults:{opacity:1}});
    tl.to('.s3-tit-wrap .tit-wrap>*',{
      x:10
    });
    tl.to('.s3-tit-wrap .more-btn',{
      x:-10
    },'<');
    tl.to('#section3 .s3-list>li',{
      y:-20,
      stagger:0.3
    })
  },
  f_4:function(){
    let tl = gsap.timeline({defaults:{opacity:1}});
    tl.to('#section4 .tit-wrap>*',{
      x:20,
      stagger:0.1,
    });
    tl.to('#section4 .app-wrap',{
      x:-20
    });
    tl.to('#section4 .app-wrap .app-alarm',{
      opacity:1,
      y:-20,
      stagger:0.3
    })
  }
};

let section = document.querySelectorAll('section');
funcObj['f_0']();

window.addEventListener('scroll',function(){
  let scroll = document.scrollingElement.scrollTop;
  let outerHeight = window.innerHeight - 150;

  section.forEach((sec,i)=>{
    if(scroll > section[i].offsetTop - outerHeight && scroll < section[i].offsetTop - outerHeight + section[i].offsetHeight){
      funcObj['f_'+i]();
    }
  });
});







//jquery-----------------------------
  //header-mobile--------------------------------

  

  
  $(function(){
    // header----------------------------------start
    const BODY = $("body");
    const pcMenu = $(".gnb .main-menu");
    const moMenu = $(".mo-gnb .main-menu");
    const subMenu = $(".sub-menu");

    $(".mob-btn").on('click',()=>{
      BODY.toggleClass('mOpen');
    });

    pcMenu.hover(function(){
      $(this).addClass('active').find(subMenu).stop().slideDown(300);
    },function() {
      $(this).removeClass('active').find(subMenu).stop().slideUp(300);
    });

    moMenu.on('click',function(){
      $(this).toggleClass('active').siblings().removeClass('active');
      $(this).siblings().find(".sub-menu").stop().slideUp(300);
      $(this).find(subMenu).stop().slideToggle(300);
    });

    $(window).on('load resize',()=>{
      BODY.removeClass('mOpen');
      subMenu.removeAttr('style');
      pcMenu.removeClass('active');
      moMenu.removeClass('active');
    });

  // header----------------------------------end

  //visual slide-----------------------------start
  let $visualContainer = $(".visual"),
      $img = $visualContainer.find("ul li"),
      $indicator = $visualContainer.find(".visual-indicator a"),
      oldIdx = 0,
      newIdx = 0,
      count = $img.length;

  function changeImg(){
    if(oldIdx != newIdx){
      $img.eq(oldIdx).removeClass("imgVisible");
      $img.eq(newIdx).addClass("imgVisible");
      $indicator.eq(oldIdx).removeClass("active");
      $indicator.eq(newIdx).addClass("active");
    }
    oldIdx = newIdx;
  };
  function changeAuto(){
    newIdx++;
    if(newIdx>count-1){
      newIdx=0;
    }
    changeImg(newIdx);
  };
  timerAuto = setInterval(changeAuto,5000);

  $indicator.click(function(){
    newIdx = $(this).index();
    changeImg(newIdx);
  });

  $visualContainer.mouseenter(function(){
    clearInterval(timerAuto)
  }).mouseleave(function(){
    timerAuto = setInterval(changeAuto,5000);
  });
  //visual slide-----------------------------end

  //quick-menu-------------------------------start
  let $quickIcon = $(".quick-icon");
  let $quickIconImg = $(".quick-icon li a img");
  let quick = true;
  $(".quick-btn").click(function(){
    $(this).toggleClass("active");

    if(quick){
      $quickIcon.find('.icon4').stop().animate({"bottom":"8rem"},500,"easeOutBack");
      $quickIcon.find('.icon3').stop().animate({"bottom":"16rem"},500,"easeOutBack");
      $quickIcon.find('.icon2').stop().animate({"bottom":"24rem"},500,"easeOutBack");
      $quickIcon.find('.icon1').stop().animate({"bottom":"32rem"},500,"easeOutBack");
      $quickIcon.stop().animate({"opacity":"1"},500,"easeOutBack");
      quick = false;
    }else{
      $quickIcon.stop().animate({"opacity":"0"},500,"easeOutBack");
      $quickIcon.find('li').stop().animate({"bottom":"0px"},300);
      quick = true;
    }
  });
  //quick-menu-------------------------------end
});