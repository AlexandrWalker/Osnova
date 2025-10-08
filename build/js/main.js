document.addEventListener('DOMContentLoaded', () => {

  const checkEditMode = document.querySelector('.bx-panel-toggle-on') ?? null;

  /**
   * Подключение ScrollTrigger
   */
  gsap.registerPlugin(ScrollTrigger);

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
    const eventsOtherSlider = new Swiper(".events__other--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".events-button-prev",
        nextEl: ".events-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
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
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      // grabCursor: true,
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
    burgerBtn.addEventListener('click', function () {
      burgerBtn.classList.toggle('burger--open');

      document.documentElement.classList.toggle('menu--open');
    })
  }
  burgerNav();

  const footer = document.querySelector('footer');
  footer.addEventListener('mousemove', function () {
    footer.classList.add('footer--active');
  })
  footer.addEventListener('mouseleave', function () {
    footer.classList.remove('footer--active');
  })

  // const headerDropHead = document.querySelector('.header__drop-head');
  // const headerDropBody = document.querySelector('.header__drop-body');
  // headerDropHead.addEventListener('click', function () {
  //   headerDropBody.classList.toggle('header__drop-body--open');
  // })

  /**
   * Управляет поведением меню-бургера.
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
   * Разбиение текста по буквам
   */
  const titleChars = document.querySelectorAll('[data-splitting="chars"]');
  titleChars.forEach(titleChar => {
    const char = new SplitType(titleChar, { types: 'words, chars' });
  });

  /**
   * Разбиение текста по словам
   */
  const titleWords = document.querySelectorAll('[data-splitting="words"]');
  titleWords.forEach(titleWord => {
    const word1 = new SplitType(titleWord.querySelector('h1'), { types: 'words, words' });
    const word2 = new SplitType(titleWord.querySelector('h2'), { types: 'words, words' });
    const word3 = new SplitType(titleWord.querySelector('h3'), { types: 'words, words' });
    const word4 = new SplitType(titleWord.querySelector('h4'), { types: 'words, words' });
    const word5 = new SplitType(titleWord.querySelector('h5'), { types: 'words, words' });
    const word6 = new SplitType(titleWord.querySelector('h6'), { types: 'words, words' });
  });

  /**
   * Разбиение текста по строкам
   */
  const titleLines = document.querySelectorAll('[data-splitting="lines"]');
  titleLines.forEach(titleLine => {
    const line = new SplitType(titleLine, { types: 'words, lines' });
  });

  $(window).on('resize', function () { ScrollTrigger.refresh() });

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').style.transform = 'translateX(100%)';
  setInterval(() => document.getElementById('plate-cookie').remove(), 5000);
}