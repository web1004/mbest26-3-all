$(function(){
// header-----------------------------------------------------------------------------
  //header.scroll
  $(window).scroll(function(){
    const header = $("header");
    const gnbMenuWrap = $("header .gnbMenuWrap");
    const utilMenuWrap = $("header .utilMenuWrap");
    const visuHeight = $(".mainVisual").outerHeight();
    const h_Height = header.outerHeight();
    const scrollTop = $(window).scrollTop();

    if(scrollTop >= visuHeight - h_Height){
      gnbMenuWrap.addClass("down");
      utilMenuWrap.addClass("down");
    }else{
      gnbMenuWrap.removeClass("down");
      utilMenuWrap.removeClass("down");
    }
  });

  //header.active
  $(".gnb").hover(function(){
    $(this).find(".sub-menu").stop().slideDown();
    $(".sub-bg").stop().slideDown();
    $(".gnbMenuWrap").addClass("active");
  }, function(){
    $(this).find(".sub-menu").stop().slideUp();
    $(".sub-bg").stop().slideUp();
    $(".gnbMenuWrap").removeClass("active");
  });

  //m-header
  $('.trigger').on('click',()=>{
    $('body').toggleClass('mOpen');
  });

  //modal------------------------------
  //login
  $(".login-modal").click(function(){
    $(".modalLogin").fadeIn();
  });
  $(".btn-close").click(function(){
    $(".modalLogin").fadeOut();
  });
  //app
  $(".app-modal").click(function(){
    $(".modalApp").fadeIn();
  });
  $(".btn-close").click(function(){
    $(".modalApp").fadeOut();
  });

  //footer - sitemap---------------------------------------------
  $(".sitemap-title").click(function(){
    $(this).toggleClass("active");
    $(".site").slideToggle(200)
  });


  //scroll animation-----------------------------------------------------------------------------
  let ani = $(".ani");

  $.fn.scrollMoving = function(){
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return (viewportTop < elementBottom && elementTop < viewportBottom);
  };

  $(window).on("load", function(){
    $(".visual-text strong").addClass("moving");
    $(".sub-tit").addClass("moving");
    setTimeout(function(){
      $(".visual-text p").addClass("moving");
    }, 200);
  });

  $(window).on("scroll",function(){
    ani.each(function(){
      if($(this).scrollMoving()){
        $(this).addClass("moving");
      }else{
        $(this).removeClass("moving");
      }
    });
  });


  //mainSec------------------------------------------------------
  //mainSec1  tab------------------------------------
  const $prismList = $(".prismWrap li");

  $prismList.hover(function(){
    $(this).addClass("active");
    $(this).find(".keywords").addClass("active");

    let prismImage = $(this).attr("data-prismImg");
    $(".prismImg img").attr("src",prismImage).fadeIn("fast");
  },function(){
    $(this).removeClass("active");
    $(this).find(".keywords").removeClass("active");
  });

  //mainSec2 slide--------------------------
  let cloneCate = $(".cate-list").clone(true).addClass('clone-item');
  $(cloneCate).appendTo(".mainSec2-right");

  //mainSec3 event-banner--------------------------
  let eventBannerWidth;
  function updateBannerWidth() {
    eventBannerWidth = $(".event-list li").width() + 25;
    $(".event-list").css({"left": -eventBannerWidth + "px"});
  }

  updateBannerWidth();

  $(window).resize(function() {
    updateBannerWidth();
  });

  $(".event-list li:last").prependTo(".event-list");

  $(".slide-btn .prev").click(function(){
    $(".event-list").stop().animate({left:"+="+eventBannerWidth+"px"},500,function(){
      $(".event-list li:last-child").prependTo(".event-list");
      $(this).css({left:-eventBannerWidth+"px"});
    });
  });

  $(".slide-btn .next").click(function(){
    $(".event-list").stop().animate({left:"-="+eventBannerWidth+"px"},500,function(){
      $(".event-list li:first-child").appendTo(".event-list");
      $(this).css({left:-eventBannerWidth+"px"});
    });
  });

  //mainSec4 slide
  let cloneSlide = $(".img-slide-list").clone(true);
  $(cloneSlide).appendTo(".img-slide");

  //sub------------------------------
  //tabmenu
  //about2 tab-------------
  $(".aboutSec5 .tab li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    let tabResult1 = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $(`#${tabResult1}`).addClass("active");
  });
  //point2 tab
  $(".pointSec1 .tab li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    let tabResult2 = $(this).attr("data-alt2");
    $(".tab-contents div").removeClass("active");
    $(`#${tabResult2}`).addClass("active");
  });
  //event1 tab
  $(".eventSec1 .tab li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    let tabResult3 = $(this).attr("data-alt3");
    $(".tab-contents div").removeClass("active");
    $(`#${tabResult3}`).addClass("active");
  });
  let eventCount = $(".sub-event-list li").length;
  $(".event-count span").text(eventCount);
  //notice tab
  $(".noticeSec1 .tab li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    let tabResult4 = $(this).attr("data-alt4");
    $(".tab-contents div").removeClass("active");
    $(`#${tabResult4}`).addClass("active");
  });
  let noticeCount = $(".notice-contents .con-list li").length;
  $(".notice-count span").text(noticeCount);

  //point2
  $(".card-list li").click(function(){
    $(this).toggleClass("active");
    $(this).find(".txt-box .benefit").slideToggle(200);
  });
});