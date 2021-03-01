/// <reference types="cypress" />

context('Core methods', () => {
  beforeEach(() => {
    cy.swiperPage();
    cy.initSwiper().as('swiper');
  });

  it('slideNext', function slideNext() {
    this.swiper.slideNext();
    cy.getSlideContains('Slide 2').expectToBeActiveSlide();
  });

  it('slidePrev', function slidePrev() {
    this.swiper.slideNext();
    this.swiper.slidePrev();
    cy.getSlideContains('Slide 1').expectToBeActiveSlide();
  });

  it('slideTo', function slideTo() {
    this.swiper.slideTo(2);
    cy.getSlideContains('Slide 3')
      .expectToBeActiveSlide()
      .then(() => {
        this.swiper.slideTo(14);
        cy.getSlideContains('Slide 10').expectToBeActiveSlide();
      });
  });

  it('addSlide', function addSlide() {
    this.swiper.addSlide(1, '<div class="swiper-slide">Add slide</div>');
    cy.getSlide(1).should('contain', 'Add slide');
    this.swiper.addSlide(4, '<div class="swiper-slide">Add slide 4</div>');
    cy.getSlide(4)
      .should('contain', 'Add slide 4')
      .then(() => {
        this.swiper.addSlide(0, [
          '<div class="swiper-slide">Add slide 0</div>',
          '<div class="swiper-slide">Add slide 1</div>',
          '<div class="swiper-slide">Add slide 2</div>',
        ]);
        cy.getSlide(2).should('contain', 'Add slide 0');
        cy.getSlide(1).should('contain', 'Add slide 1');
        cy.getSlide(0).should('contain', 'Add slide 2');
      });
  });

  it('appendSlide', function appendSlide() {
    this.swiper.appendSlide('<div class="swiper-slide">Add slide at the end</div>');
    cy.getSlide(10).should('contain', 'Add slide at the end');
    this.swiper.appendSlide([
      '<div class="swiper-slide">END 1</div>',
      '<div class="swiper-slide">END 2</div>',
    ]);
    cy.getSlide(11).should('contain', 'END 1');
    cy.getSlide(12).should('contain', 'END 2');
  });

  it('prependSlide', function prependSlide() {
    this.swiper.prependSlide('<div class="swiper-slide">Add slide at the start</div>');
    cy.getSlide(0)
      .should('contain', 'Add slide at the start')
      .then(() => {
        this.swiper.prependSlide([
          '<div class="swiper-slide">START 1</div>',
          '<div class="swiper-slide">START 2</div>',
        ]);
        cy.getSlide(1).should('contain', 'START 1');
        cy.getSlide(0).should('contain', 'START 2');
      });
  });

  it('removeSlide', function removeSlide() {
    this.swiper.removeSlide(0); // remove first slide
    cy.getSlide(0)
      .should('contain', 'Slide 2')
      .then(() => {
        this.swiper.removeSlide([0, 1]); // remove first and second slides
        cy.getSlide(0).should('contain', 'Slide 4');
      });
  });

  it('removeAllSlides', function removeAllSlides() {
    this.swiper.removeAllSlides();
    cy.getSlides().should('not.exist');
  });

  it('setGrabCursor & unsetGrabCursor', function setGrabCursor() {
    this.swiper.setGrabCursor();
    cy.getSliderContainer()
      .should('have.attr', 'style')
      .and('match', /cursor:\s+grab/)
      .then(() => {
        this.swiper.unsetGrabCursor();
        cy.getSliderContainer()
          .should('have.attr', 'style')
          .and('not.match', /cursor:\s+grab/);
      });
  });

  describe('properties', () => {
    beforeEach(() => {
      cy.initSwiper({ speed: 0 }).as('swiper');
    });

    it('allowSlideNext', function allowSlideNext() {
      this.swiper.allowSlideNext = false;
      this.swiper.slideTo(3);
      cy.swipeLeft();
      cy.getSlide(0).expectToBeActiveSlide();
    });

    it('allowSlidePrev', function allowSlidePrev() {
      this.swiper.allowSlidePrev = false;
      this.swiper.slideTo(3);
      this.swiper.slideTo(0);
      cy.swipeRight();
      cy.getSlide(3).expectToBeActiveSlide();
    });

    it('activeIndex', function activeIndex() {
      expect(this.swiper.activeIndex).to.equal(0);
      this.swiper.slideTo(3);
      expect(this.swiper.activeIndex).to.equal(3);
      this.swiper.slideTo(-1);
      expect(this.swiper.activeIndex).to.equal(0);
      this.swiper.slideTo(200);
      expect(this.swiper.activeIndex).to.equal(9);
      cy.swipeRight().then(() => {
        expect(this.swiper.activeIndex).to.equal(8);
      });
    });

    it('allowTouchMove', function allowTouchMove() {
      this.swiper.allowTouchMove = false;
      cy.swipeRight();
      cy.swipeLeft();
      cy.getSlide(0)
        .expectToBeActiveSlide()
        .then(() => {
          this.swiper.slideTo(3);
          cy.getSlide(3).expectToBeActiveSlide();
        });
    });
  });
});
