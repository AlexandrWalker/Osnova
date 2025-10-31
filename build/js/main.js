document.addEventListener('DOMContentLoaded', () => {

  const checkEditMode = document.querySelector('.bx-panel-toggle-on') ?? null;

  /**
   * Подключение ScrollTrigger
   */
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: -60,
    },
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });


  /**
   * Инициализация слайдеров
   */
  const swiper = document.querySelector('.swiper');
  if (swiper) {
    const regulationsSlider = new Swiper(".regulations__slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".regulations-button-prev",
        nextEl: ".regulations-button-next",
      },
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      //   dynamicBullets: true,
      //   dynamicMainBullets: 1,
      // },
      breakpoints: {
        601: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        835: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true
      // },
      grabCursor: true,
      // effect: "creative",
      // creativeEffect: {
      //   prev: {
      //     shadow: true,
      //     translate: ["-20%", 0, -1],
      //   },
      //   next: {
      //     translate: ["100%", 0, 0],
      //   },
      // },
    });

    const buildingSlider = new Swiper(".building__slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 1000,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".building-button-prev",
        nextEl: ".building-button-next",
      },
      grabCursor: true,
    });

    const techniqueSlider = new Swiper(".technique__slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      navigation: {
        prevEl: ".technique-button-prev",
        nextEl: ".technique-button-next",
      },
    });

    const techniqueItemSlider = new Swiper(".technique__item-slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".technique-item-button-prev",
        nextEl: ".technique-item-button-next",
      },
    });

    const teamSliderBig = new Swiper(".team__slider--big", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      // loop: true,
      speed: 500,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".team-button-prev",
        nextEl: ".team-button-next",
      },
    });

    const teamSliderMin = new Swiper(".team__slider--min", {
      slidesPerGroup: 1,
      slidesPerView: 2,
      spaceBetween: 20,
      // loop: true,
      speed: 500,
      mousewheel: {
        forceToAxis: true,
      },
    });


    teamSliderBig.controller.control = teamSliderMin;
    teamSliderMin.controller.control = teamSliderBig;

  }

  /**
   * Расчёт ширины скроллбара старницы и добавление отступа в body при октрытии попапов
   */
  function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
  }

  /**
   * Управляет поведением меню-бургера.
   */
  function burgerNav() {
    const burgerBtn = document.getElementById('burger-btn');
    const burgerMenuInner = document.querySelector('.burger-menu__inner');

    const openMenu = () => {
      burgerBtn.classList.add('burger--open');
      document.documentElement.classList.add('menu--open');
      lenis.stop();
    };

    const closeMenu = () => {
      burgerBtn.classList.remove('burger--open');
      document.documentElement.classList.remove('menu--open');
      lenis.start();
    };

    const toggleMenu = (e) => {
      e.preventDefault();
      const isOpen = document.documentElement.classList.contains('menu--open');
      isOpen ? closeMenu() : openMenu();
    };

    burgerBtn.addEventListener('click', toggleMenu);

    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && document.documentElement.classList.contains('menu--open')) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      const isMenuOpen = document.documentElement.classList.contains('menu--open');
      const clickInsideMenu = burgerMenuInner.contains(event.target);
      const clickOnButton = burgerBtn.contains(event.target);

      if (isMenuOpen && !clickInsideMenu && !clickOnButton) {
        closeMenu();
      }
    });
  }
  burgerNav();

  /**
   * Открывание панелей.
   */
  const panelBtns = document.querySelectorAll('.panel-btn');

  panelBtns.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const targetId = button.dataset.target;
      const panel = document.querySelector(`[data-id="${targetId}"]`);
      if (!panel) return;

      const html = document.documentElement;
      const closePanel = () => {
        panel.classList.remove('is__open');
        html.classList.remove('panel-open');
        lenis.start();
      };

      html.classList.add('panel-open');
      panel.classList.add('is__open');
      lenis.stop();

      const backdrop = panel.querySelector('.panel__overlay');
      const closeBtn = panel.querySelector('.panel__close');

      [backdrop, closeBtn].forEach(el => {
        el?.addEventListener('click', closePanel, { once: true });
      });
    });
  });

  // const footer = document.querySelector('footer');
  // footer.addEventListener('mousemove', function () {
  //   footer.classList.add('footer--active');
  // })
  // footer.addEventListener('mouseleave', function () {
  //   footer.classList.remove('footer--active');
  // })

  // const hero = document.querySelector('.hero');
  // hero.addEventListener('mousemove', function () {
  //   hero.classList.add('animatedClass');
  // })
  // hero.addEventListener('mouseleave', function () {
  //   hero.classList.remove('animatedClass');
  // })

  const sections = gsap.utils.toArray("section")
  sections.forEach(function (section, index) {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => section.classList.add("showed"),
    })
  })

  const workItems = document.querySelectorAll(".work__item")
  workItems.forEach(workItem => {
    ScrollTrigger.create({
      trigger: workItem,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => workItem.classList.add("showed"),
    })
  });

  const footer = document.getElementById("footer")
  ScrollTrigger.create({
    trigger: footer,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => footer.classList.add("showed"),
  })
  /**
   * Управляет поведением хэдера.
   */
  function headerFunc() {
    const header = document.getElementById('header');
    const firstSection = document.querySelector('section');
    let lastScrollTop = 1;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
      if (scrollPosition() > lastScrollTop && scrollPosition() > firstSection.offsetHeight) {
        header.classList.add('out');
      } else {
        header.classList.remove('out');
      }

      if (scrollPosition() > firstSection.offsetHeight) {
        header.classList.add('show');
      } else {
        header.classList.remove('show');
      }

      lastScrollTop = scrollPosition();
    })
  }
  headerFunc();

  /**
   * Кнопка куки
   */
  if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
    const cookiesNotify = document.getElementById('plate-cookie');

    if (cookiesNotify) {
      cookiesNotify.style.transform = 'translateX(0)';
    }
  }

  // Полифилл для IE10-
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Открытие/закрытие dropdown
  document.addEventListener('click', function (e) {
    var isBtn = e.target.closest('.dropdown-btn');
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (drop) {
      if (drop.contains(e.target) && isBtn && drop.querySelector('.dropdown-btn') === isBtn) {
        drop.classList.toggle('show');
      } else {
        drop.classList.remove('show');
      }
    });
  });

  // Обработка кликов по пунктам
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const span = btn.querySelector('span');
    const input = dropdown.querySelector('input[type="hidden"]');
    const items = dropdown.querySelectorAll('.dropdown-item');

    items.forEach(item => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;
        const text = item.textContent || item.innerText;;

        input.value = value;
        span.textContent = text;
        btn.classList.add('filled');
        dropdown.classList.remove('show');
      });
    });
  });

  /**
   * Код видео
   */
  (function () {
    const videoThumb = document.getElementById('videoThumb');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const thumbIframe = document.getElementById('thumbIframe');
    const exitBtn = document.getElementById('exitBtn');

    const thumbSrc = videoThumb.getAttribute('data-thumb');
    const mainSrc = videoThumb.getAttribute('data-main');

    thumbIframe.src = thumbSrc;
    let isPaused = false;

    // Клик по миниатюре для увеличения и запуска основного видео
    videoThumb.addEventListener('click', () => {
      if (!videoThumb.classList.contains('active')) {
        videoThumb.classList.add('active');
        iframeWrapper.innerHTML = `<iframe
        id="mainVideo"
        src="${mainSrc}"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
        frameborder="0"
        allowfullscreen
      ></iframe>`;
        const mainIframe = document.getElementById('mainVideo');
        mainIframe.style.pointerEvents = "auto";

        // Клик по контейнеру для паузы/воспроизведения
        videoThumb.addEventListener('click', () => {
          const command = isPaused ? 'play' : 'pause';
          mainIframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command }), '*');
          isPaused = !isPaused;
        });
      }
    });

    // Клик по крестику
    exitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (videoThumb.classList.contains('active')) {
        // Если видео увеличено → возвращаем миниатюру
        videoThumb.classList.remove('active');
        iframeWrapper.innerHTML = `<iframe id="thumbIframe" src="${thumbSrc}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>`;
        isPaused = false;
      } else {
        // Если миниатюра без видео → плавно скрываем
        videoThumb.classList.add('hide');
        setTimeout(() => {
          videoThumb.style.display = 'none';
        }, 500); // соответствует времени transition opacity
      }
    });

  })();

  /**
   * Аккордеон
   */
  function accordionFunc() {
    var accordionParents = document.querySelectorAll('.accordion-parent');
    if (!accordionParents.length) return;

    // Закрытие при клике вне активного блока
    document.addEventListener('click', function (e) {
      var active = document.querySelector('.accordion.accordion-active');
      if (!active) return;

      var body = active.querySelector('.accordion-body');
      if (!body) return;

      if (!body.contains(e.target) && !active.querySelector('.accordion-head').contains(e.target)) {
        active.classList.remove('accordion-active');
      }
    });

    // Закрытие по Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        var active = document.querySelector('.accordion.accordion-active');
        if (active) active.classList.remove('accordion-active');
      }
    });

    // Перебор всех аккордеонов
    for (var i = 0; i < accordionParents.length; i++) {
      (function (accordionContainer) {
        var accordions = accordionContainer.querySelectorAll('.accordion');

        for (var j = 0; j < accordions.length; j++) {
          (function (accordion) {
            var head = accordion.querySelector('.accordion-head');
            if (!head) return;

            head.addEventListener('click', function (e) {
              e.stopPropagation();

              var active = accordionContainer.querySelector('.accordion.accordion-active');
              if (active && active !== accordion) {
                active.classList.remove('accordion-active');
              }

              accordion.classList.toggle('accordion-active');
            });
          })(accordions[j]);
        }
      })(accordionParents[i]);
    }
  }
  accordionFunc();

  /**
   * Инициализация формы набора символов
   */
  const form = document.querySelector('form');
  if (form) {
    const inputElements = document.querySelectorAll('.form-input');
    const textareaElements = document.querySelectorAll('.form-textarea');
    const className = 'filled';

    inputElements.forEach(element => {
      element.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      });
    });

    textareaElements.forEach(element => {
      element.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      });
    });
  }

  /**
   * Инициализация Fabcybox
   */
  Fancybox.bind('[data-fancybox]', {
    Html: {
      autoSize: false,
    },
    on: {
      'Carousel.ready': () => {
        lenis.stop();
      },
      destroy: () => {
        lenis.start();
      }
    }
  });

  /**
   * Анимация текста
   */
  console.clear();

  gsap.set('[data-title="split"]', { opacity: 1 });

  // document.fonts.ready.then(() => {
  let containers = gsap.utils.toArray(".container");

  containers.forEach((container) => {
    let text = container.querySelector('[data-title="split"]');
    let animation;

    SplitText.create(text, {
      type: "words,lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (instance) => {
        return gsap.from(instance.lines, {
          yPercent: 120,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "bottom top"
          }
        });
      }
    });
  });

  containers.forEach((container) => {
    let text = container.querySelector('[data-title="splitChars"]');
    let animation;

    SplitText.create(text, {
      type: "words,chars",
      mask: "chars",
      linesClass: "char",
      autoSplit: true,
      onSplit: (instance) => {
        return gsap.from(instance.chars, {
          opacity: 0,
          stagger: 0.1,
          duration: 0.3,
          ease: "sine.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "bottom top"
          }
        });
      }
    });
  });
  // });

  const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
  if (parallaxImgContainers.length > 0) {
    parallaxImgContainers.forEach(parallaxImgContainer => {
      const image = parallaxImgContainer.querySelector('img');
      gsap.fromTo(image,
        {
          y: '-10%',
          scale: 0.9,
        },
        {
          y: '10%',
          scale: 1,
          scrollTrigger: {
            trigger: parallaxImgContainer,
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }

  const fadeItems = document.querySelectorAll('[data-transform="fade"]');
  fadeItems.forEach(fadeItem => {
    const tl = gsap.timeline({
      paused: true
    });
    tl.from(fadeItem, {
      opacity: 0,
      y: "20",
      duration: .8,
      delay: .3,
      ease: "ease",
      stagger: {
        amount: .8
      }
    });
    scrollTriggerPlayer(fadeItem, tl)
  });

  const heroFadeItems = document.querySelectorAll('[data-transform="heroFade"]');
  heroFadeItems.forEach(heroFadeItem => {
    const tl = gsap.timeline({
      paused: true
    });
    tl.from(heroFadeItem, {
      opacity: 0,
      duration: 1,
      delay: .3,
      ease: "ease",
      stagger: {
        amount: .8
      }
    });
    scrollTriggerPlayer(heroFadeItem, tl)
  });

  const quiz = document.querySelector('.quiz');
  if (quiz) {
    // const quiz__bg = document.querySelector('.quiz__bg');
    // const tl = gsap.timeline({
    //   paused: true
    // });
    // tl.from(quiz__bg, {
    //   x: '100%',
    //   duration: 1,
    //   delay: .3,
    //   ease: "ease",
    //   scrub: true,
    //   stagger: {
    //     amount: .8
    //   }
    // });
    // scrollTriggerPlayer(quiz__bg, tl)

    // создаём Timeline, привязанный к скроллу
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".quiz__bg",
        start: "top 100%",
        end: "top 30%",
        scrub: true,
        // markers: true
      }
    });

    tl2.to(".quiz__bg", {
      x: 0,                  // конечная позиция
      scale: 1,
      duration: 0.5,
      // scrollTrigger: {
      //   trigger: ".quiz__bg",   // когда блок в зоне видимости
      //   start: "top 100%",    // запуск анимации
      //   end: "top 30%",      // конец анимации
      //   scrub: true          // плавная привязка к скроллу
      // },
      duration: 1,
      ease: "power1.out",
    });

    // tl2.to(animate, {
    //   y: 0,                  // конечная позиция
    //   duration: 0.5,
    //   delay: 0.5,
    //   opacity: 1,
    //   // scrollTrigger: {
    //   //   trigger: animate,   // когда блок в зоне видимости
    //   //   start: "top 100%",    // запуск анимации
    //   //   end: "top 30%",      // конец анимации
    //   //   scrub: true          // плавная привязка к скроллу
    //   // },
    //   duration: 1,
    //   ease: "power1.out"
    // }, "+=0.3");

    let splitQuiz = quiz.querySelector('[data-title="splitQuiz"]');

    SplitText.create(splitQuiz, {
      type: "words,lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (instance) => {
        return gsap.from(instance.lines, {
          yPercent: 120,
          stagger: 0.1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: splitQuiz,
            start: "top 90%",
            end: "bottom top"
          }
        });
      }
    });
  }

  // gsap.from("#counter", {
  //   innerText: 0,
  //   duration: 5,
  //   snap: {
  //     innerText: 1
  //   }
  // });

  function scrollTriggerPlayer(triggerElement, timeline, onEnterStart = "top 95%") {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(1);
        timeline.pause()
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: onEnterStart,
      scrub: true,
      onEnter: () => timeline.play()
    })
  }

  // const paths = document.querySelectorAll('.hoverable');

  // paths.forEach(path => {
  //   // сохраняем исходный цвет
  //   path.setAttribute('data-original', path.getAttribute('fill'));

  //   path.addEventListener('mouseenter', () => {
  //     gsap.to(path, {
  //       fill: '#032154',
  //       transformOrigin: "center center",
  //       filter: 'url(#shadow)',
  //       duration: 0.3,
  //       ease: "ease"
  //     });
  //   });

  //   path.addEventListener('mouseleave', () => {
  //     gsap.to(path, {
  //       fill: path.getAttribute('data-original'),
  //       filter: 'none',
  //       duration: 0.3,
  //       ease: "ease"
  //     });
  //   });
  // });

  const paths = document.querySelectorAll('.hoverable');

  paths.forEach(path => {
    path.addEventListener('mouseenter', () => {
      gsap.to(path, { fill: '#032154', duration: 0.3 });
    });
    path.addEventListener('mouseleave', () => {
      gsap.to(path, { fill: path.getAttribute('data-original') || path.getAttribute('fill'), duration: 0.3 });
    });

    // Сохраняем исходный цвет
    path.setAttribute('data-original', path.getAttribute('fill'));
  });

  $(window).on('resize load', function () { ScrollTrigger.refresh() });


  /**
   * Инициализация Fabcybox
   */
  Fancybox.bind('[data-fancybox]', {
    Html: {
      autoSize: false,
    },
    on: {
      'Carousel.ready': () => {
        lenis.stop();
      },
      destroy: () => {
        lenis.start();
      }
    },
  });

});

/*=================Скрипт для блока со скролом=====================*/
const tasks = document.querySelector('.partners');

if (tasks) {
  var len = $('.partners__item').length;
  $(window).on('resize load', function () {

    if (window.innerWidth < "767") {
      scroll = 0;
      inc = 0.06; // speed down
      inc2 = 0.06; // speed up
      scale = 1;
      var wH = document.documentElement.clientWidth


      $(window).on('scroll', function () {
        // Find the active element
        var $activeBlock = $('.active');
        var element = document.querySelector('.active');
        var h = element.clientHeight / 200;
        var distanceToTop = $activeBlock.offset().top - $(window).scrollTop();
        var top = window.pageYOffset;

        // Scroll direction checks
        if (scroll > top) {
          // Scrolling up
          if ($activeBlock.attr('data-index') != 1) {
            h = h * 200;
            if (distanceToTop > h) {
              var $prevBlock = $activeBlock.prev();
              $activeBlock.removeClass('active');
              $prevBlock.addClass('active');
              $($prevBlock).css('transform', 'scale(1)');
              scale = 0.90; // set initial scale
            }
          }
        } else if (scroll < top) {
          // Scrolling down

          if (distanceToTop < 200 && $activeBlock.attr('data-index') != len) {
            var $nextBlock = $activeBlock.next();
            $activeBlock.removeClass('active');
            $nextBlock.addClass('active');
          }

          if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
            var $prevBlock = $activeBlock.prev();
            $($prevBlock).css('transform', 'scale(0.90)');
            scale = 0.90;
          }
        }

        // Scaling effect
        if (scroll > top) {
          // Scrolling up
          if (distanceToTop > 50) {
            var $activeBlock = $('.active');
            var prevCurrentBlock = $($activeBlock).prev();

            scale += inc2 / 0.006; // Increase scale on scroll up
            scale = Math.min(scale, 1); // Ensure max scale is 1

            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

            // Adjust opacity of the over block
            var $overBlock = $(prevCurrentBlock).find('.over');
            var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
            $overBlock.css('opacity', newOpacity);
          }
        } else if (scroll < top) {
          // Scrolling down
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale -= inc * 0.06; // Decrease scale on scroll down
          if ($(prevCurrentBlock).attr('data-index') == 1) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.89, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 2) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.92, scale) + ')');
          }

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.min(0.6, (distanceToTop / h + 0.02)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        }

        if (distanceToTop < 0) {
          var $prevBlock = $activeBlock.prev();
          $($prevBlock).css('transform', 'scale(0.90)');
          scale = 0.90;
        }

        scroll = top; // Update scroll position
      });
    } else {

      scroll = 0;
      inc = 0.006; // speed down
      inc2 = 0.008; // speed up
      scale = 1;
      var wH = document.documentElement.clientWidth

      $(window).on('scroll', function () {
        // Find the active element
        var $activeBlock = $('.active');
        var element = tasks.querySelector('.active');
        var h = element.clientHeight / 200;
        var distanceToTop = $activeBlock.offset().top - $(window).scrollTop() - 130;
        var top = window.pageYOffset;

        // Scroll direction checks
        if (scroll > top) {
          // Scrolling up
          if ($activeBlock.attr('data-index') != 1) {
            h = h * 200;
            if (distanceToTop > h) {
              var $prevBlock = $activeBlock.prev();
              $activeBlock.removeClass('active');
              $prevBlock.addClass('active');
              $($prevBlock).css('transform', 'scale(1)');
              scale = 0.92; // set initial scale
            }
          }
        } else if (scroll < top) {

          // Scrolling down
          if (distanceToTop < h && $activeBlock.attr('data-index') != len) {
            var $nextBlock = $activeBlock.next();
            $activeBlock.removeClass('active');
            $nextBlock.addClass('active');
            if (scale !== 1) {
              scale = 1; // set to 1 when scrolling down
            }
          }

          if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
            var $prevBlock = $activeBlock.prev();
            $($prevBlock).css('transform', 'scale(0.92)');
            scale = 0.92;
          }
        }

        // Scaling effect
        if (scroll > top) {
          // Scrolling up
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale += inc2; // Increase scale on scroll up
          scale = Math.min(scale, 1); // Ensure max scale is 1

          $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        } else if (scroll < top) {
          // Scrolling down
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale -= inc; // Decrease scale on scroll down

          $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.90, scale) + ')');

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.min(0.6, (distanceToTop / h)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        }

        if (distanceToTop < 0) {
          var $prevBlock = $activeBlock.prev();
          $($prevBlock).css('transform', 'scale(0.92)');
          scale = 0.92;
        }

        scroll = top; // Update scroll position
      });

    }
  });
}

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').style.transform = 'translateX(100%)';
  setInterval(() => document.getElementById('plate-cookie').remove(), 5000);
}