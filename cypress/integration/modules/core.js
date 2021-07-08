/// <reference types="cypress" />

context('Core', () => {
  beforeEach(() => {
    cy.swiperPage();
  });

  it('centeredSlides', () => {
    cy.initSwiper({
      centeredSlides: true,
      slidesPerView: 3,
    });
    cy.getActiveSlide().should(($el) => {
      expect($el[0].getBoundingClientRect().x).to.be.greaterThan(100);
    });
  });

  it('autoHeight', () => {
    cy.initSwiper({
      autoHeight: true,
    });
    cy.injectStyles(`
    .swiper-container .swiper-slide {
      height: 300px;
      line-height: 300px;
    }

    .swiper-container .swiper-slide:nth-child(2n) {
      height: 500px;
      line-height: 500px;
    }`);
    cy.getActiveSlide().should(($el) => {
      expect($el[0].getBoundingClientRect().height).not.to.be.greaterThan(400);
    });
    cy.swipeLeft();
    cy.getActiveSlide().should(($el) => {
      expect($el[0].getBoundingClientRect().height).to.be.greaterThan(400);
    });
  });

  it('speed', () => {
    cy.initSwiper({
      speed: 0,
    });
    cy.getSlide(1).should(($el) => {
      expect($el[0].getBoundingClientRect().x).to.be.greaterThan(400);
    });
    cy.swipeLeft();
    cy.getSlide(1).should(($el) => {
      expect($el[0].getBoundingClientRect().x).to.be.equal(0);
    });
    cy.getSlide(1).expectToBeActiveSlide();
    cy.reinitSwiper({
      speed: 200,
    });
    cy.swipeLeft();
    cy.getActiveSlide().should(($el) => {
      expect($el[0].getBoundingClientRect().x).to.be.greaterThan(400);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5);
    cy.getActiveSlide().should(($el) => {
      expect($el[0].getBoundingClientRect().x).not.to.be.greaterThan(200);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    cy.getActiveSlide().should(($el) => {
      expect($el[0].getBoundingClientRect().x).not.to.be.greaterThan(50);
    });
  });

  it('Active slide class', () => {
    cy.initSwiper();
    cy.getSlide(0).expectToBeActiveSlide().and('be.visible');
  });

  it('Next slide class', () => {
    cy.initSwiper();
    cy.getSlide(1).should('have.class', 'swiper-slide-next').and('be.visible');
  });

  it('Prev slide class', () => {
    cy.initSwiper();
    cy.getSlides().should('not.have.class', 'swiper-slide-prev');
    cy.reinitSwiper({
      initialSlide: 1,
    });
    cy.getSlide(0).should('have.class', 'swiper-slide-prev');
  });

  it('slidesPerView', () => {
    cy.initSwiper({
      slidesPerView: 2,
      spaceBetween: 10,
    });
    cy.getSlides().filter(':visible').its('length').should('be.eq', 2);
    cy.reinitSwiper({
      slidesPerView: 3,
      spaceBetween: 10,
    });
    cy.getSlides().filter(':visible').its('length').should('be.eq', 3);
  });

  it('slidesPerView auto', () => {
    cy.injectStyles(`
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      width: 100%;
    }
    .swiper-slide:nth-child(2n) {
      width: 60%;
    }

    .swiper-slide:nth-child(3n) {
      width: 40%;
    }
    `);
    cy.initSwiper({
      slidesPerView: 'auto',
      spaceBetween: 10,
    });
    cy.getSlides().filter(':visible').its('length').should('be.eq', 1);
    cy.swipeLeft();
    cy.getSlides().filter(':visible').its('length').should('be.eq', 2);
  });

  it('slidesPerGroup', () => {
    cy.initSwiper({
      slidesPerView: 3,
      slidesPerGroup: 2,
    });
    cy.swipeLeft();
    cy.getSlide(2).expectToBeActiveSlide();
  });

  it('slidesPerGroupSkip', () => {
    cy.initSwiper({
      slidesPerGroupSkip: 2,
      slidesPerView: 3,
      slidesPerGroup: 2,
    });
    cy.swipeLeft();
    cy.getSlide(1).expectToBeActiveSlide();
  });

  it('spaceBetween', () => {
    cy.initSwiper({
      spaceBetween: 10,
    });
    cy.getSlides()
      .should('have.attr', 'style')
      .and('match', /margin-right:\s+10px/);
    cy.reinitSwiper({
      spaceBetween: 20,
    });
    cy.getSlides()
      .should('have.attr', 'style')
      .and('match', /margin-right:\s+20px/);
  });

  it('initialSlide', () => {
    cy.initSwiper({
      initialSlide: 2,
    });
    cy.getSlideContains('Slide 3').expectToBeActiveSlide();
    cy.reinitSwiper({
      initialSlide: 4,
    });
    cy.getSlideContains('Slide 5').expectToBeActiveSlide();
    cy.reinitSwiper({
      initialSlide: 0,
    });
    cy.getSlideContains('Slide 1').expectToBeActiveSlide();
  });

  it('allowTouchMove', () => {
    cy.initSwiper({
      allowTouchMove: false,
      navigation: true,
      pagination: true,
    });
    cy.swipeLeft();
    cy.swipeRight();
    cy.navigationNextSlide();
    cy.navigationPrevSlide();
    cy.getSlide(0).expectToBeActiveSlide();
  });

  it('containerModifierClass', () => {
    cy.initSwiper({
      containerModifierClass: 'unique-test-',
    });
    cy.get('.unique-test-horizontal').should('exist');
    cy.get('.swiper-container-horizontal').should('not.exist');
  });

  it('slideActiveClass', () => {
    cy.initSwiper({
      slideActiveClass: 'unique-test-active',
    });
    cy.get('.unique-test-active').should('exist');
    cy.get('.swiper-slide-active').should('not.exist');
  });

  it('slideBlankClass & loopFillGroupWithBlank', () => {
    cy.initSwiper({
      slideBlankClass: 'unique-test-invisible-blank',
      loop: true,
      slidesPerGroup: 3,
      loopFillGroupWithBlank: true,
    });
    cy.get('.unique-test-invisible-blank').should('exist');
    cy.get('.swiper-slide-invisible-blank').should('not.exist');
  });

  it('slideDuplicateActiveClass', () => {
    cy.initSwiper({
      loop: true,
      slideDuplicateActiveClass: 'uniqueTestClass',
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-slide-duplicate-active').should('not.exist');
  });

  it('slideDuplicateNextClass', () => {
    cy.initSwiper({
      loop: true,
      slidesPerView: 2,
      slideDuplicateNextClass: 'uniqueTestClass',
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-slide-duplicate-next').should('not.exist');
  });

  it('slideDuplicatePrevClass', () => {
    cy.initSwiper({
      loop: true,
      slidesPerView: 2,
      slideDuplicatePrevClass: 'uniqueTestClass',
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-slide-duplicate-prev').should('not.exist');
  });

  it('slideNextClass', () => {
    cy.initSwiper({
      slidesPerView: 2,
      slideNextClass: 'uniqueTestClass',
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-slide-next').should('not.exist');
  });

  it('slidePrevClass', () => {
    cy.initSwiper({
      slidesPerView: 2,
      initialSlide: 2,
      slidePrevClass: 'uniqueTestClass',
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-slide-prev').should('not.exist');
  });

  it('slideVisibleClass', () => {
    cy.initSwiper({
      slidesPerView: 2,
      watchSlidesVisibility: true,
      slideVisibleClass: 'uniqueTestClass',
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-slide-visible').should('not.exist');
  });

  it('slideToClickedSlide', () => {
    cy.initSwiper({
      slideToClickedSlide: true,
      slidesPerView: 5,
    });
    cy.getSlide(3).click().expectToBeActiveSlide();
    cy.getSlide(4).click().expectToBeActiveSlide();
  });

  it('grabCursor', () => {
    cy.initSwiper({
      grabCursor: true,
    });
    cy.getSliderContainer()
      .should('have.attr', 'style')
      .and('match', /cursor:\s+grab/);
  });

  it('allowSlideNext', () => {
    cy.initSwiper({
      initialSlide: 2,
      allowSlideNext: false,
    });
    cy.swipeRight();
    cy.swipeLeft();
    cy.getSlide(1).expectToBeActiveSlide();
  });

  it('allowSlidePrev', () => {
    cy.initSwiper({
      initialSlide: 2,
      allowSlidePrev: false,
    });
    cy.swipeLeft();
    cy.swipeRight();
    cy.getSlide(3).expectToBeActiveSlide();
  });

  it('direction horizontal', () => {
    cy.initSwiper(); // check default
    cy.get('.swiper-container-horizontal').should('exist');
    cy.get('.swiper-container-vertical').should('not.exist');
    cy.reinitSwiper({
      direction: 'horizontal',
    });
    cy.get('.swiper-container-horizontal').should('exist');
    cy.get('.swiper-container-vertical').should('not.exist');
    cy.getSlide(2).should(($el) => {
      expect($el[0].getBoundingClientRect().x).to.be.greaterThan(100);
    });
    cy.getSlide(2).should(($el) => {
      expect($el[0].getBoundingClientRect().y).to.be.not.greaterThan(100);
    });
  });

  it('direction vertical', () => {
    cy.initSwiper({
      direction: 'vertical',
    });
    cy.get('.swiper-container-vertical').should('exist');
    cy.get('.swiper-container-horizontal').should('not.exist');
    cy.getSlide(2).should(($el) => {
      expect($el[0].getBoundingClientRect().y).to.be.greaterThan(100);
    });
    cy.getSlide(2).should(($el) => {
      expect($el[0].getBoundingClientRect().x).to.be.not.greaterThan(100);
    });
  });

  it('loopAdditionalSlides', () => {
    cy.initSwiper({
      loop: true,
    });
    cy.getSlides().its('length').should('be.eq', 12);
    cy.reinitSwiper({
      loop: true,
      loopAdditionalSlides: 2,
    });
    cy.getSlides().its('length').should('be.eq', 16);
    cy.reinitSwiper({
      loop: true,
      loopAdditionalSlides: 4,
    });
    cy.getSlides().its('length').should('be.eq', 20);
    cy.reinitSwiper({
      loop: true,
      loopAdditionalSlides: 7,
    });
    cy.getSlides().its('length').should('be.eq', 26);
    cy.reinitSwiper({
      loop: true,
      loopAdditionalSlides: 9,
    });
    cy.getSlides().its('length').should('be.eq', 30);
    cy.reinitSwiper({
      loop: true,
      loopAdditionalSlides: 11,
    });
    cy.getSlides().its('length').should('be.eq', 30);
    cy.reinitSwiper({
      loop: true,
      loopAdditionalSlides: 15,
    });
    cy.getSlides().its('length').should('be.eq', 30);
  });

  it('loop', () => {
    cy.initSwiper({
      loop: true,
    });
    cy.getSlide(0).should('contain', 'Slide 10');
    cy.swipeRight();
    cy.getSlideContains('Slide 10').expectToBeActiveSlide();
  });

  it('Swipe left & right', () => {
    cy.initSwiper({
      speed: 0,
    });
    cy.swipeLeft();
    cy.getSlide(1).expectToBeActiveSlide();
    cy.swipeLeft();
    cy.swipeLeft();
    cy.getSlide(3).expectToBeActiveSlide();
    cy.swipeRight();
    cy.getSlide(2).expectToBeActiveSlide();
    cy.swipeRight();
    cy.swipeRight();
    cy.getSlide(0).expectToBeActiveSlide();
  });

  it('should not work as createElements false', () => {
    cy.window().then((_window) => {
      _window.document.body.innerHTML = `
      <div class="swiper-container">
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
      `;
      _window.swiperRef = new _window.Swiper('.swiper-container', {
        slidesPerView: 2,
        scrollbar: true,
        createElements: false,
        pagination: true,
        navigation: true,
      });
      return _window.swiperRef;
    });
    cy.get(`.swiper-button-next`).should('not.exist');
    cy.get(`.swiper-button-prev`).should('not.exist');
    cy.get(`.swiper-wrapper`).should('not.exist');
    cy.get(`.swiper-scrollbar`).should('not.exist');
    cy.get(`.swiper-pagination`).should('not.exist');
  });

  it('should not work as createElements false', () => {
    cy.window().then((_window) => {
      _window.document.body.innerHTML = `
      <div class="swiper-container">
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
      `;
      _window.swiperRef = new _window.Swiper('.swiper-container', {
        slidesPerView: 2,
        scrollbar: true,
        createElements: true,
        pagination: true,
        navigation: true,
      });
      return _window.swiperRef;
    });
    cy.get(`.swiper-wrapper`).should('exist');
    cy.get(`.swiper-button-next`).should('exist');
    cy.get(`.swiper-button-prev`).should('exist');
    cy.get(`.swiper-scrollbar`).should('exist');
    cy.get(`.swiper-pagination`).should('exist');
  });
});
