$(function(){
  // Mobile Menu
  const $body = $('body');
  const $menuBtn = $('.mob-menu-btn');
  const $navLinks = $('.nav a');

  $menuBtn.on('click',function(e){
    e.preventDefault();
    $body.toggleClass('mobMenuOpen');
    $(this).toggleClass('on');
    const tl = gsap.timeline()
    tl.to($navLinks,{x:0, opacity:1, stagger:0.3, ease:'power1.inOut'})

    $navLinks.on('click',function(e){
      $menuBtn.removeClass('on');
      $body.removeClass('mobMenuOpen');
    });
  });

  // design-chips
  $('.s4 .chips li').on('click', function () {
    const filter = $(this).data('filter');
    $(this).addClass('active').siblings().removeClass('active');

    if (filter === 'all') {
      $('.design-work li').show();
    } else {
      $('.design-work li').hide().filter(`[data-filter="${filter}"]`).show();
    }

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
});

// scroll down bottom button
const bottomBtn = document.querySelector('.bottom-btn');
let prevScrollTop = 0;

document.addEventListener('scroll', function (){
  const nowScrollTop = window.scrollY;
  if (nowScrollTop > prevScrollTop) {
    bottomBtn.classList.add('active');
  }else if (nowScrollTop === prevScrollTop){
    bottomBtn.classList.remove('active');
  }
});

// gototop
const gotoTop = document.getElementById('gotoTop');
if (gotoTop) {
  gotoTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
}

// darkmode
const darkModeBtn = document.getElementById('darkModeBtn');
const bottomDarkModeBtn = document.getElementById('bottomDarkModeBtn');
const body = document.querySelector('body');

function initialTheme() {
  if (localStorage.theme === 'light') {
    body.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    body.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

function toggleDarkMode() {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    body.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

if (darkModeBtn) darkModeBtn.addEventListener('click', toggleDarkMode);
if (bottomDarkModeBtn) bottomDarkModeBtn.addEventListener('click', toggleDarkMode);
initialTheme();

// profile-img (parallax)
const profileImg = document.querySelector('.profile-img');
let x = 0;
let targetX = 0;
const speed = 0.5;

window.addEventListener('mousemove', (e) => {
  x = e.pageX - window.innerWidth / 2;
});

const loop = () => {
  if (profileImg) {
    targetX += (x - targetX) * speed;
    profileImg.style.transform = `scale(1.05) translateX(${-targetX / 200}px)`;
  }
  window.requestAnimationFrame(loop);
};
loop();

new TypeIt("#typing", {
  speed: 200,
  strings: [
    "Kwak SeungHyeon",
    "Web Publisher",
    "Welcome to my portfolio"
  ],
  waitUntilVisible: true,
  loop: true,
  breakLines: false
}).go();

// GSAP
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

function careerAnimation(){
  gsap.timeline({
    scrollTrigger: {
      trigger: '.s5.career',
      start: '0% 80%',
      end: '100% 100%',
      invalidateOnRefresh: true,
    }
  })
  .to('.s5.career .title', { y: 0 })
  .to('.career-item', { opacity: 1, stagger: 0.2, duration: 0.3 });

  let activeImage;
  gsap.utils.toArray('.career-item').forEach((elem) => {
    const image = elem.querySelector('img.cursor-img');
    if (!image) return;

    const align = (e) => {
      gsap.set(image, {
        x: e.clientX,
        y: e.clientY
      });
    };

    const startPoint = () => { document.addEventListener('mousemove', align); };
    const stopPoint = () => { document.removeEventListener('mousemove', align); };

    const fade = gsap.to(image, { scale: 1, autoAlpha: 0.9, ease: "power4.inOut", paused: true });

    elem.addEventListener('mouseenter', (e) => {
      fade.play();

      if (activeImage) {
        gsap.set(image, {
          x: gsap.getProperty(activeImage, "x"),
          y: gsap.getProperty(activeImage, "y"),
        });
      }
      activeImage = image;

      gsap.quickTo(image, 'x', { duration: 0.7, ease: 'elastic' });
      gsap.quickTo(image, 'y', { duration: 0.7, ease: 'elastic' });

      align(e);
      startPoint();
    });

    elem.addEventListener('mouseleave', () => {
      fade.reverse();
      stopPoint();
    });
  });
}

// about
gsap.timeline({
  scrollTrigger: {
    trigger: '.s1.about',
    start: '0% 80%',
    end: '90% 100%',
    invalidateOnRefresh: true,
  }
})
  .to('.about-left', { y: 0 }, 0)
  .to('.about-right', { y: 0 }, "-=0.4");

//skill-bar
gsap.utils.toArray('.skill-bar').forEach(bar => {
  const percentText = bar.querySelector('.percent-text');
  if (!percentText) return;

  const percent = percentText.dataset.barpercent;
  const colorBar = bar.querySelector('.color-bar');

  percentText.textContent = percent;

  if (!colorBar) return;

  gsap.to(colorBar, {
    width: percent,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.s1.about',
      start: 'top 50%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
    }
  });
});  

mm.add("(min-width: 992px)", () => {
  
  //publishing
  const pbSection = document.querySelectorAll('.s2.publishing');
  
  if(pbSection.length > 0){
    pbSection.forEach((wrapper) => {
      const pbInner = wrapper.querySelector('.pb-items');
      const pbTitle = wrapper.querySelector('.pb-title-wrap');
      
      if (!pbInner || !pbTitle) return;

      gsap.to(pbInner, {
        x: () => {
          const totalWidth = pbInner.scrollWidth + pbTitle.offsetWidth;
          const viewportWidth = window.innerWidth;
          return -(totalWidth - viewportWidth);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => {
            const totalWidth = pbInner.scrollWidth + pbTitle.offsetWidth;
            const viewportWidth = window.innerWidth;
            return `+=${totalWidth - viewportWidth}`;
          },
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });
  }

  // front-end
  const frontTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.s3.frontend',
      start: '0% center',
      end: '100% 100%',
      scrub: 2,
      invalidateOnRefresh: true,
      onLeave(self) {
        self.animation.progress(1).pause();
        self.disable(false);
      },
    }
  })
    .to('.frontend-bg', { top: 0, borderRadius: '0 0 0 0', duration: 2.5, ease: "power1.inOut" })
    .to('.s3.frontend .title', { opacity: 1, y: -50 }, 0)
    .to('.s3 .front-item', { y: -30, stagger: 0.3 }, 0)

  // design
  const designTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.s4.design',
      start: '-20% 80%',
      end: '60% 100%',
      scrub: 2,
      invalidateOnRefresh: true,
      onLeave(self) {
        self.animation.progress(1).pause();
        self.disable(false);
      },
    }
  })
    .to('.design-bg', { y: '-100%', duration: 2 })
    .to('.s4.design .title', { y: 0, scale: 1 }, "<1")
    .to('.s4.design .chips', { y: 0, scale: 1 }, "<")
    .to('.s4.design .design-work', { y: 0, scale: 1 }, "<");

  // career
  careerAnimation();
  
  return () => {
    // 992px 미만으로 변경될 때 실행
  };
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

//모바일
mm.add("(max-width: 992px)", () => {

  // publishing
  const pbTlM = gsap.timeline({
    scrollTrigger: {
      trigger: '.s2.publishing',
      start: 'top center',
      end: '100% 100%',
      invalidateOnRefresh: true
    }
  })
    .to('.s2.publishing .title', { y: 0 })
    .to('.s2.publishing .pb-item', { x: 0, stagger: 0.3, duration: 0.5, ease: "power1.inOut" });

  // front-end
  const frontTlM = gsap.timeline({
    scrollTrigger: {
      trigger: '.s3.frontend',
      start: '0% center',
      end: '100% 100%',
      invalidateOnRefresh: true,
    }
  })
    .to('.s3.frontend .title', { y: -30 }, 0)
    .to('.s3 .front-item', { y: -30, stagger: 0.3 }, 0)

  // design
  const designTlM = gsap.timeline({
    scrollTrigger: {
      trigger: '.s4.design',
      start: 'top center',
      end: '100% 100%',
      invalidateOnRefresh: true
    }
  })
    .to('.s4.design .title', { y: -20 })
    .to('.s4.design .chips', { y: -20 }, "<")
    .to('.s4.design .design-item', { y: 0, stagger: 0.3, duration: 0.5 }, "<");

  careerAnimation();
});

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

