$(function(){
    // nav mouseover
    $('.dep01>li').on('mouseover',function(){
        $(this).find(".h_sub_wrap").stop().slideDown(300);
    }).mouseout(function(){
        $(this).find(".h_sub_wrap").stop().slideUp(100);
    });

    // main_slide
    var mainSlide = new Swiper(".main_swiper", {
        debugger: true,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
    });
    mainSlide.on('slideChange', function () {
        var activeSlideIndex = mainSlide.realIndex;
    
        var mainItemImg = document.querySelector('.main_item_img');
        mainItemImg.style.opacity = 0;
    
        setTimeout(function () {
            updateMainItem(activeSlideIndex);
    
            mainItemImg.style.opacity = 1;
        }, 350);
    });
    
    updateMainItem(mainSlide.realIndex);
    
    function updateMainItem(slideIndex) {
        var imagePaths = [
            "img/main_1_item.png",
            "img/main_2_item.png",
            "img/main_3_item.png",
        ];
    
        var mainItemImg = document.querySelector('.main_item_img');
        mainItemImg.src = imagePaths[slideIndex];
    }
    // col_slide
    var Colswiper = new Swiper(".col_swiper", {
        slidesPerView: 3,
        spaceBetween: 50,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
        navigation: {
            nextEl: '.col_swiper_wrap .swiper-button-next',
            prevEl: '.col_swiper_wrap .swiper-button-prev',
        }
      });
      document.querySelectorAll('.col_swiper .swiper-slide').forEach(function(slide, index) {
        slide.addEventListener('mouseover', function() {
            // 슬라이드 내 이미지 엘리먼트를 찾아서 src 속성을 변경합니다.
            // 숫자에 해당하는 부분을 변경합니다.
            var imageSrc = 'img/col_item_' + (index + 1) + '_sv.webp';
            
            // 슬라이드 내 이미지 엘리먼트를 찾아서 src 속성을 변경합니다.
            slide.querySelector('img').src = imageSrc;
        });
        slide.addEventListener('mouseout', function() {
            // 마우스가 벗어난 슬라이드의 이미지를 원래대로 돌립니다.
            var originalImageSrc = 'img/col_item_' + (index + 1) + '.webp';
            slide.querySelector('img').src = originalImageSrc;
        });
    });

    // shop_slide
    var shopSlide = new Swiper(".shop_swiper", {
        effect: "coverflow",
        centeredSlides: true,
        grabCursor: true,
        slidesPerView: 3,
        coverflowEffect: {
            rotate: 0,
            depth: 300,
            modifier: 0.7,
            slideShadows: false,
        },
        navigation: {
            prevEl: ".shop_swiper_wrap .swiper-button-prev",
            nextEl: ".shop_swiper_wrap .swiper-button-next",
        },
        initialSlide: 0,
        on: {
            init: function () {
                // 초기화 시에 첫 번째 슬라이드에 active-slide 클래스 추가
                var firstSlide = document.querySelector('.shop_swiper .swiper-slide:first-child .cate');
                if (firstSlide) {
                    firstSlide.classList.add('on');
                }
            },
            slideChange: function () {
                // 현재 활성 슬라이드 인덱스 가져오기
                var activeIndex = shopSlide.activeIndex;
                // 모든 슬라이드에서 활성 클래스 제거
                var slides = document.querySelectorAll('.shop_swiper .swiper-slide .cate');
                slides.forEach(function (slide) {
                    slide.classList.remove('on');
                });
                // 현재 활성 슬라이드에 클래스 추가
                slides[activeIndex].classList.add('on');
            },
        },
    });
    

//   click_sns_list

    $(".icon").on("mouseover", function() {
        const idx = $(this).closest('li').index() + 1;
        $(this).attr("src", "img/icon" + idx + "_color.svg");
    });

    $(".icon").on("mouseout", function() {
        const idx = $(this).closest('li').index() + 1;
        $(this).attr("src", "img/icon" + idx + ".svg");
    });
    




    
});

