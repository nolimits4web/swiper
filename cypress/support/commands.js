// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('navigationNextSlide', { prevSubject: 'optional' }, () => {
  cy.get('.swiper-button-next').click();
});
Cypress.Commands.add('navigationPrevSlide', { prevSubject: 'optional' }, () => {
  cy.get('.swiper-button-prev').click();
});
// subject, options
Cypress.Commands.add('getActiveSlide', { prevSubject: 'optional' }, () => {
  return cy.get('.swiper-slide-active');
});

Cypress.Commands.add('getSliderWrapper', { prevSubject: 'optional' }, () => {
  return cy.get('.swiper-wrapper');
});

Cypress.Commands.add('getSliderContainer', { prevSubject: 'optional' }, () => {
  return cy.get('.swiper-container');
});

Cypress.Commands.add('getSlide', { prevSubject: 'optional' }, (subject, slideIndex) => {
  return cy.get(`.swiper-slide:nth-child(${slideIndex + 1})`);
});
Cypress.Commands.add('getSlideContains', { prevSubject: 'optional' }, (subject, content) => {
  cy.get('.swiper-container').contains(content);
});
Cypress.Commands.add('getSlides', { prevSubject: 'optional' }, () => {
  return cy.get(`.swiper-slide`);
});
Cypress.Commands.add('swiperPage', { prevSubject: 'optional' }, () => {
  return cy.visit('cypress/test.html');
});

Cypress.Commands.add(
  'initSwiper',
  { prevSubject: 'optional' },
  (subject, config = {}, el = '.swiper-container') => {
    return cy.window().then((_window) => {
      _window.document.body.innerHTML = `
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
        ${
          config.navigation
            ? `
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        `
            : ''
        }
        ${
          config.pagination
            ? `
        <div class="swiper-pagination"></div>`
            : ''
        }
      </div>
      `;
      // eslint-disable-next-line dot-notation
      const _config = config;
      if (!_config.speed) {
        _config.speed = 0;
      }
      if (config.navigation === true) {
        _config.navigation = {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: false,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
        };
      }
      if (config.pagination === true) {
        _config.pagination = {
          el: '.swiper-pagination',
          bulletElement: 'span',
          clickable: true,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: (number) => number,
          formatFractionTotal: (number) => number,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          modifierClass: 'swiper-pagination-', // NEW
          currentClass: 'swiper-pagination-current',
          totalClass: 'swiper-pagination-total',
          hiddenClass: 'swiper-pagination-hidden',
          progressbarFillClass: 'swiper-pagination-progressbar-fill',
          progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
          clickableClass: 'swiper-pagination-clickable', // NEW
          lockClass: 'swiper-pagination-lock',
        };
      }
      _window.swiperRef = new _window.Swiper(el, _config);
      console.log(_window.swiperRef);
      return _window.swiperRef;
    });
  },
);

Cypress.Commands.add(
  'reinitSwiper',
  { prevSubject: 'optional' },
  (subject, config = {}, options) => {
    return cy.window().then((_window) => {
      _window.swiperRef.destroy();
      cy.initSwiper(config, options);
    });
  },
);

Cypress.Commands.add('swipeLeft', () => {
  cy.getSliderContainer()
    .trigger('pointerdown', { which: 1, pageX: 100, pageY: 100, force: true })
    .trigger('pointermove', { pageX: 50, pageY: 100, force: true })
    .trigger('pointerup', { force: true });
});

Cypress.Commands.add('swipeRight', () => {
  cy.getSliderContainer()
    .trigger('pointerdown', { which: 1, pageX: -100, pageY: 100, force: true })
    .trigger('pointermove', { pageX: 50, pageY: 100, force: true })
    .trigger('pointerup', { force: true });
});

Cypress.Commands.add(
  'expectToBeActiveSlide',
  {
    prevSubject: 'optional',
  },
  (subject, className = 'swiper-slide-active') => {
    // subject may be defined or undefined
    // so you likely want to branch the logic
    // based off of that

    // wrap the existing subject
    // and do something with it
    cy.wrap(subject).should('have.class', className);
  },
);
