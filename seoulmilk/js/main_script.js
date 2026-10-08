//header scroll
$(function(){
    // 스크롤 시 header fade-in
    $(document).on('scroll', function(){
        if($(window).scrollTop()){
            $('#header').addClass('active');
            $(".header_more img").attr("src","img/more_black.svg");
        }else{
            $('#header').removeClass('active');
            $(".header_more img").attr("src","img/more.svg");
        }
    });

//header dep
    $('.dep01>li').on('mouseover', function(){
        $('.dep02').stop().slideDown(300);
        $('#header').addClass('on');
    }).mouseout(function(){
        $('.dep02').stop().slideUp(200);
        $('#header').removeClass('on');
    });

//swiper-slide
    var bullet = ['우유', '발효유', '음료', '커피', '치즈'];
    var proSlide = new Swiper(".pro_swiper",{
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop:true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '"><span>' + (bullet[index]) + '</span></div>';
        }
      },
    });

    var eventSlide = new Swiper(".event_swiper",{
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop:true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

// btn_hover
    $(".event_btn").on("mouseover",function(){
        $(".btn").attr("src","img/item_btn_hover.svg");
    });
    $(".event_btn").on("mouseout",function(){
        $(".btn").attr("src","img/item_btn.svg");
    });
    $(".item_btn").on("mouseover",function(){
        $(".btn").attr("src","img/item_btn_hover.svg");
    });
    $(".item_btn").on("mouseout",function(){
        $(".btn").attr("src","img/item_btn.svg");
    });

    $(".icon").on("click", function(){
        const idx = $(this).closest('li').index() + 1;

        $(".icon").each(function(i) {
            if (i === idx - 1) {
                $(this).attr("src", "img/icon" + idx + "_color.svg");
            } else {
                $(this).attr("src", "img/icon" + (i + 1) + ".svg");
            }
        });

        $(".sns_wrap").removeClass("click"); // 모든 .sns_wrap의 click 클래스 제거
        $(".sns_wrap .sns_icon").each(function(i) {
            $(this).attr("src", "img/icon" + (i + 1) + ".svg");
        });

        const selectedSnsWrap = $(".sns_list li").eq(idx - 1).find(".sns_wrap");
        selectedSnsWrap.addClass("click");
        selectedSnsWrap.find(".sns_icon").attr("src", "img/icon" + idx + "_color.svg");
    });
    
    $(".sns_wrap").mouseover(function(){
        const idx = $(this).closest('li').index() + 1;
        $(this).addClass("click");
        $(this).find(".sns_icon").attr("src", "img/icon" + idx + "_color.svg");
        $('.icon_list .icon').eq(idx - 1).attr("src", "img/icon" + idx + "_color.svg");
    }).mouseout(function(){
        const idx = $(this).closest('li').index() + 1;
        $(this).removeClass("click");
        $(this).find(".sns_icon").attr("src", "img/icon" + idx + ".svg");
        $('.icon_list .icon').eq(idx - 1).attr("src", "img/icon" + idx + ".svg");
    });
});



