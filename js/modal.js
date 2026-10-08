const modalgotoTop = document.getElementById('modalgotoTop');
const modal = document.querySelector('.pb-modal');
if (modal && modalgotoTop) {
  modalgotoTop.addEventListener('click', () => {
    modal.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });
}


$(function () {
  //퍼블리싱 모달 열기
  const $modal = $('.pb-modal');
  const $modalItems = $modal.find('.modal-item');
  const $pbSection = $('#publishing');
  let modalScrollTriggers = [];
  let currentModalIndex = 0;

  // 깃허브 링크
  const pbGithubLinks = [
    'https://github.com/rhkr20401/website',
    'https://github.com/rhkr20401/perfectday',
    'https://github.com/rhkr20401/responsive',
    'https://github.com/rhkr20401/landingpage',
    'https://github.com/rhkr20401/tiffany-co',
    'https://github.com/rhkr20401/seoulmilk'
  ];

  function pbModalFooter(idx) {
    const $currentModal = $modalItems.eq(idx);
    
    const projectName = $currentModal.find('.mod-intro-title span:nth-child(3)').text();
    $('.pb-modal .pj-name-bottom').text(projectName);
    
    const siteLink = $currentModal.find('.gotoSite').attr('href');
    $('.bottom-btns span:first-child').off('click').on('click', function() {
      window.open(siteLink, '_blank');
    });
    
    $('.bottom-btns span:last-child').off('click').on('click', function() {
      window.open(pbGithubLinks[idx], '_blank');
    });
  }

  // gsap 초기화
  function resetModalGSAP(idx) {
    const $targetModal = $modalItems.eq(idx);
    const aniTargets = $targetModal.find('[data-ani-target]').toArray();
    
    if (aniTargets.length) {
      gsap.set(aniTargets, { 
        clearProps: 'all'
      });
    }
  }

  // ScrollTrigger 초기화 함수
  function resetScrollTriggers(idx) {
    // 기존 ScrollTrigger 제거
    modalScrollTriggers.forEach(trigger => trigger.kill());
    modalScrollTriggers = [];

    const $currentModal = $modalItems.eq(idx);
    const $aniSections = $currentModal.find('[data-ani]');
    
    $aniSections.each(function() {
      const section = this;
      const aniTargets = $(section).find('[data-ani-target]').toArray();
      
      if (aniTargets.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            scroller: $modal[0],
            toggleActions: 'play none none none',
          },
          defaults: { 
            opacity: 1, 
            x: 0,
            y: 0,
            scale: 1,
            stagger: 0.15, 
            duration: 0.8,
            ease: 'power2.out'
          },
          overwrite: 'auto'
        });
        
        tl.to(aniTargets, {});
        
        if (tl.scrollTrigger) {
          modalScrollTriggers.push(tl.scrollTrigger);
        }
      }
    });
  }

  function openModalByIndex(idx) {
    currentModalIndex = idx;
    
    $modal.addClass('is-open');
    $('body').addClass('modal-open');
    $modalItems.hide().eq(idx).show();
    $modal.scrollTop(0);

    pbModalFooter(idx);
    resetScrollTriggers(idx);
  }

  function closeModal(goToPublishing) {
    modalScrollTriggers.forEach(trigger => trigger.kill());
    modalScrollTriggers = [];
    
    $modalItems.each(function() {
      const aniTargets = $(this).find('[data-ani-target]').toArray();
      if (aniTargets.length) {
        gsap.set(aniTargets, { 
          clearProps: 'all'
        });
      }
    });

    $modal.removeClass('is-open');
    $('body').removeClass('modal-open');
    $modalItems.hide();

    if (goToPublishing) {
      const el = $pbSection.get(0);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Prev 버튼
  $('.pb-modal-btn .pb-pre').on('click', function() {
    if (currentModalIndex > 0) {
      resetModalGSAP(currentModalIndex);
      openModalByIndex(currentModalIndex - 1);
    }
  });

  // Next 버튼
  $('.pb-modal-btn .pb-next').on('click', function() {
    if (currentModalIndex < $modalItems.length - 1) {
      resetModalGSAP(currentModalIndex);
      openModalByIndex(currentModalIndex + 1);
    }
  });

  $('.s2.publishing .openPbModal').on('click', function (e) {
    e.preventDefault();
    const idx = $(this).closest('.pb-item').index();
    openModalByIndex(idx);
  });

  $('.pb-modal .back-btn').on('click', function (e) {
    e.preventDefault();
    closeModal(true);
  });

  //cjone 서브페이지 탭
  $('.sub-tab-menu').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');

    const dataVideo = $(this).attr('data-video');
    $('.modal-video video').attr('src', dataVideo).hide().fadeIn();
  });

  //반응형 디바이스 팝업
  $('.res-btn').on('click', function() {
    const popupId = $(this).data('popup');
    const $modalItem = $(this).closest('.modal-item');
    const $popup = $modalItem.find(`.popup[data-popup-id="${popupId}"]`);

    $popup.fadeIn(400);
    $("html").css({overflowY: "hidden"});
  });

  $('.res-close').on('click', function(e) {
    e.preventDefault();
    const $modalItem = $(this).closest('.modal-item');
    $modalItem.find('.popup').fadeOut(400);
    $("html").css({overflowY: "scroll"});
  });

  $('.popup').on('click', function(e) {
    if ($(e.target).hasClass('popup')) {
      $(this).fadeOut(400);
      $("html").css({overflowY: "scroll"});
    }
  });

  $('.pop').on('click', function(e) {
    e.stopPropagation();
  });

  //프론트엔드 모달
  const $frontendItem = $('#frontend .front-work li');
  $frontendItem.on('click',function(){
    frontPageNum = $(this).index();

    $('.fe-modal-item').eq(frontPageNum).stop().fadeIn();
    $('.frontend-modal').stop().fadeIn();
    $('.fe-modal-body').scrollTop(0);
    $("html").css({overflowY:"hidden"}); 
    
    setTimeout(function() {
      $('img[usemap]').rwdImageMaps();
    }, 100);
  });

  $(".fe-close, .frontend-modal").click(function(){
    $(".frontend-modal").stop().fadeOut();
    $(".fe-modal-item").stop().fadeOut();
    $("html").css({overflowY:"scroll"}); 
  });

  $(".fe-modal-body, .bottom-btns a").on("click", function (e) {
    e.stopPropagation();
  });

  //디자인 모달
  const $designItem = $('#design .design-work li');
  let designTotalNum = $designItem.length;
  $('.de-modal-gnb .num span:nth-child(2)').text(designTotalNum);

  //모달열기
  $designItem.on('click',function(){
    designPageNum = $(this).index();
    
    $('.de-modal-gnb .num span:nth-child(1)').text(designPageNum+1);
    $('.de-modal-item').eq(designPageNum).stop().fadeIn();
    $('.design-modal').stop().fadeIn();
    $('.de-modal-body').scrollTop(0);
    $("html").css({overflowY:"hidden"}); 
  });

  $(".de-modal-btn .pre").click(function(){
    $(".de-modal-body").scrollTop(0);
    if(designPageNum > 0){
      stopCurrentIframe(designPageNum);
      
      $(".de-modal-item").eq(designPageNum).hide(); 
      designPageNum--;
      $(".de-modal-gnb .num span:nth-child(1)").text(designPageNum+1); 
      $(".de-modal-item").eq(designPageNum).stop().fadeIn();
    }
  });

  $(".de-modal-btn .next").click(function(){
    $(".de-modal-body").scrollTop(0);
    if(designPageNum < designTotalNum-1){
      stopCurrentIframe(designPageNum);
      
      $(".de-modal-item").eq(designPageNum).hide(); 
      designPageNum++;
      $(".de-modal-gnb .num span:nth-child(1)").text(designPageNum+1); 
      $(".de-modal-item").eq(designPageNum).stop().fadeIn();
    }
  });

  $(".close, .design-modal").click(function(){
    stopAllIframes();
    
    $(".design-modal").stop().fadeOut();
    $(".de-modal-item").stop().fadeOut();
    $("html").css({overflowY:"scroll"}); 
  });

  $(".de-modal-body, .de-modal-btn, .de-modal-list, .de-modal-item, .num").on("click", function (e) {
    e.stopPropagation();
  });

  function stopCurrentIframe(index) {
    const $currentIframe = $(".de-modal-item").eq(index).find("iframe");
    if ($currentIframe.length > 0) {
      const currentSrc = $currentIframe.attr('src');
      $currentIframe.attr('src', '');
      setTimeout(function() {
        $currentIframe.attr('src', currentSrc);
      }, 100);
    }
  }

  function stopAllIframes() {
    $(".de-modal-item iframe").each(function() {
      const originalSrc = $(this).attr('src');
      $(this).attr('src', '');
      setTimeout(() => {
        $(this).attr('src', originalSrc);
      }, 100);
    });
  }

  //커리어모달
  const $careerItem = $('#career .career-work li a[href="#none"]');

  $careerItem.on('click', function(e) {
    e.preventDefault();
    
    const careerPageNum = $(this).parent('li').index();

    $('.ca-modal-item').eq(careerPageNum).stop().fadeIn();
    $('.career-modal').stop().fadeIn();
    $('.ca-modal-body').scrollTop(0);
    $("html").css({overflowY:"hidden"}); 
  });

  $(".ca-close, .career-modal").click(function(){
    $(".career-modal").stop().fadeOut();
    $(".ca-modal-item").stop().fadeOut();
    $("html").css({overflowY:"scroll"}); 
  });

  $(".ca-modal-body").on("click", function (e) {
    e.stopPropagation();
  });

});
