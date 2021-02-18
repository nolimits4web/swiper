/// <reference types="cypress" />

context('Core', () => {
  describe('centeredSlides & slidesPerView', () => {
    beforeEach(() => {
      cy.swiperPage();
      cy.initSwiper({
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: true,
      });
    });
    it('should have slide with active class', () => {
      cy.getSlide(0).should('have.class', 'swiper-slide-active').and('be.visible');
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
        cy.nextSlide();
        cy.getSlides().filter(':visible').its('length').should('be.eq', 2);
      });
    });

    it('should have 10px margin on slides', () => {
      cy.getSlides()
        .should('have.attr', 'style')
        .and('match', /margin-right:\s+10px/);
    });

    it('should slide next with swiping the left', () => {
      cy.getSliderContainer()
        .trigger('pointerdown', { which: 1, pageX: 100, pageY: 100, force: true })
        .trigger('pointermove', { pageX: 50, pageY: 100, force: true })
        .trigger('pointerup', { force: true });
      cy.getSlide(1).should('have.class', 'swiper-slide-active');
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      cy.swiperPage();
      cy.initSwiper({
        loop: true,
      }).as('swiper');
    });
    it('should slide next', function () {
      this.swiper.slideNext();
      cy.getSlideContains('Slide 2').should('have.class', 'swiper-slide-active');
    });
    it('should slide prev', function () {
      this.swiper.slidePrev();
      cy.getSlideContains('Slide 10').should('have.class', 'swiper-slide-active');
    });
    it('should slide to slide 3', function () {
      this.swiper.slideTo(3);
      cy.getSlideContains('Slide 3').should('have.class', 'swiper-slide-active');
    });
    // it('should slide to first slide when slideTo called with number bigger then slides amount', function () {
    //   this.swiper.slideTo(14);
    //   cy.getSlideContains('Slide 1').should('have.class', 'swiper-slide-active');
    // });
    it('Add slide at index', function () {
      this.swiper.addSlide(1, '<div class="swiper-slide">Add slide</div>');
      cy.getSlide(2).should('contain', 'Add slide');
      this.swiper.addSlide(4, '<div class="swiper-slide">Add slide 4</div>');
      cy.getSlide(5).should('contain', 'Add slide 4');
    });

    it('Add multiple slides at index', function () {
      this.swiper.addSlide(0, [
        '<div class="swiper-slide">Add slide 0</div>',
        '<div class="swiper-slide">Add slide 1</div>',
        '<div class="swiper-slide">Add slide 2</div>',
      ]);
      cy.getSlide(2).should('contain', 'Add slide 0');
      cy.getSlide(1).should('contain', 'Add slide 1');
      cy.getSlide(0).should('contain', 'Add slide 2');
    });

    it('Add slide to the end', function () {
      this.swiper.appendSlide('<div class="swiper-slide">Add slide at the end</div>');
      cy.getSlide(11).should('contain', 'Add slide at the end');
      this.swiper.appendSlide([
        '<div class="swiper-slide">END 1</div>',
        '<div class="swiper-slide">END 2</div>',
      ]);
      cy.getSlide(12).should('contain', 'END 1');
      cy.getSlide(13).should('contain', 'END 2');
    });
  });

  // TODO: swipe
  // describe('Slide', () => {
  //   it('Should slide next on slide click', () => {
  //     cy.get('.swiper-slide-next').click('left');
  //     cy.get('.swiper-slide:nth-child(3)').should('have.class', 'swiper-slide-prev');
  //     cy.get('.swiper-slide:nth-child(4)').should('have.class', 'swiper-slide-active');
  //     cy.get('.swiper-slide:nth-child(5)').should('have.class', 'swiper-slide-next');
  //   });

  //   it('Should slide prev on slide click', () => {
  //     cy.get('.swiper-slide-prev').click('right');
  //     cy.get('.swiper-slide:nth-child(1)').should('have.class', 'swiper-slide-prev');
  //     cy.get('.swiper-slide:nth-child(2)').should('have.class', 'swiper-slide-active');
  //     cy.get('.swiper-slide:nth-child(3)').should('have.class', 'swiper-slide-next');
  //   });

  //   it('Should slide next', () => {
  //     cy.get('.swiper-button-next').click();
  //     cy.get('.swiper-slide:nth-child(3)').should('have.class', 'swiper-slide-prev');
  //     cy.get('.swiper-slide:nth-child(4)').should('have.class', 'swiper-slide-active');
  //     cy.get('.swiper-slide:nth-child(5)').should('have.class', 'swiper-slide-next');
  //   });

  //   it('Should slide next twice', () => {
  //     cy.get('.swiper-button-next').click();
  //     cy.get('.swiper-button-next').click();
  //     cy.get('.swiper-slide:nth-child(4)').should('have.class', 'swiper-slide-prev');
  //     cy.get('.swiper-slide:nth-child(5)').should('have.class', 'swiper-slide-active');
  //     cy.get('.swiper-slide:nth-child(6)').should('have.class', 'swiper-slide-next');
  //   });

  //   it('Should slide prev', () => {
  //     cy.get('.swiper-button-prev').click();
  //     cy.get('.swiper-slide:nth-child(1)').should('have.class', 'swiper-slide-prev');
  //     cy.get('.swiper-slide:nth-child(2)').should('have.class', 'swiper-slide-active');
  //     cy.get('.swiper-slide:nth-child(3)').should('have.class', 'swiper-slide-next');
  //   });
  // });
});
