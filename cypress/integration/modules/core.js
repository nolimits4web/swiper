/// <reference types="cypress" />

context('Core', () => {
  beforeEach(() => {
    cy.swiperPage();
  });
  describe('centeredSlides & slidesPerView', () => {
    beforeEach(() => {
      cy.initSwiper({
        centeredSlides: true,
        slidesPerView: 3,
        speed: 0,
        spaceBetween: 10,
        navigation: true,
      });
    });
    it('should have slide with active class', () => {
      cy.getSlide(0).expectToBeActiveSlide().and('be.visible');
    });

    it('should position slides center', () => {
      cy.getActiveSlide().should(($el) => {
        expect($el[0].getBoundingClientRect().x).to.be.greaterThan(100);
      });
    });

    it('should not has slide with prev class', () => {
      cy.getSlides().should('not.have.class', 'swiper-slide-prev');
    });

    it('should have slide with next class', () => {
      cy.getSlide(1).should('have.class', 'swiper-slide-next').and('be.visible');
    });
    describe('visible slides', () => {
      it('should have 2 visible slides', () => {
        cy.getSlides().filter(':visible').its('length').should('be.eq', 2);
      });
      it('should have 3 visible slides after navigation', () => {
        cy.swipeLeft();
        cy.getSlides().filter(':visible').its('length').should('be.eq', 3);
      });
    });

    it('spaceBetween', () => {
      cy.getSlides()
        .should('have.attr', 'style')
        .and('match', /margin-right:\s+10px/);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      cy.initSwiper().as('swiper');
    });
    it('should slide next', function slideNext() {
      this.swiper.slideNext();
      cy.getSlideContains('Slide 2').expectToBeActiveSlide();
    });
    it('should slide prev', function slidePrev() {
      this.swiper.slideNext();
      this.swiper.slidePrev();
      cy.getSlideContains('Slide 1').expectToBeActiveSlide();
    });
    it('should slide to slide 3', function slideTo3() {
      this.swiper.slideTo(2);
      cy.getSlideContains('Slide 3').expectToBeActiveSlide();
    });
    // it('should slide to first slide when slideTo called with number bigger then slides amount', function () {
    //   this.swiper.slideTo(14);
    //   cy.getSlideContains('Slide 1').expectToBeActiveSlide();
    // });
    it('Add slide at index', function slideTo() {
      this.swiper.addSlide(1, '<div class="swiper-slide">Add slide</div>');
      cy.getSlide(1).should('contain', 'Add slide');
      this.swiper.addSlide(4, '<div class="swiper-slide">Add slide 4</div>');
      cy.getSlide(4).should('contain', 'Add slide 4');
    });

    // it('Add multiple slides at index', function () {
    //   this.swiper.addSlide(0, [
    //     '<div class="swiper-slide">Add slide 0</div>',
    //     '<div class="swiper-slide">Add slide 1</div>',
    //     '<div class="swiper-slide">Add slide 2</div>',
    //   ]);
    //   // cy.getSlide(2).should('contain', 'Add slide 0');
    //   // cy.getSlide(1).should('contain', 'Add slide 1');
    //   cy.getSlide(0).should('contain', 'Add slide 2');
    // });

    it('Add slide to the end', function slideToEnd() {
      this.swiper.appendSlide('<div class="swiper-slide">Add slide at the end</div>');
      cy.getSlide(10).should('contain', 'Add slide at the end');
      this.swiper.appendSlide([
        '<div class="swiper-slide">END 1</div>',
        '<div class="swiper-slide">END 2</div>',
      ]);
      cy.getSlide(11).should('contain', 'END 1');
      cy.getSlide(12).should('contain', 'END 2');
    });
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
