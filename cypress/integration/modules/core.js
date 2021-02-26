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
});
