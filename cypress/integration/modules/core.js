/// <reference types="cypress" />

context('Core', () => {
  describe('centeredSlides & slidesPerView', () => {
    beforeEach(() => {
      cy.swiperPage();
      cy.initSwiper({
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
    it('should have slide with active class', () => {
      cy.getSlide(1).should('have.class', 'swiper-slide-active').and('be.visible');
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
      cy.getSlide(2).should('have.class', 'swiper-slide-next').and('be.visible');
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
