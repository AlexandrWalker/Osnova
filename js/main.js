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
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".building-button-prev",
        nextEl: ".building-button-next",
      },
      grabCursor: true,
    });
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

    const closeMenu = () => {
      burgerBtn.classList.remove('burger--open');
      document.documentElement.classList.remove('menu--open');
      lenis.start();
    };

    burgerBtn.addEventListener('click', function () {

      if (document.documentElement.classList.contains('menu--open')) {
        lenis.start();
      } else {
        lenis.stop();
      }

      burgerBtn.classList.toggle('burger--open');
      document.documentElement.classList.toggle('menu--open');
    })

    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!burgerMenuInner.contains(event.target) && !burgerBtn.contains(event.target)) {
        closeMenu();
      }
    });
  }
  burgerNav();

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

  const footer = document.querySelector("footer")
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

  document.fonts.ready.then(() => {
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
          console.log("split")
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
  });

  $(window).on('resize', function () { ScrollTrigger.refresh() });

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').style.transform = 'translateX(100%)';
  setInterval(() => document.getElementById('plate-cookie').remove(), 5000);
}