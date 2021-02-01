/// <reference types="cypress" />

context('Core', () => {
  beforeEach(() => {
    cy.visit('../../../demos/130-centered.html');
  });

  describe('Init', () => {
    it('Active class', () => {
      cy.getSlide(1).should('have.class', 'swiper-slide-active').and('be.visible');
    });

    it('Position center', () => {
      cy.getActiveSlide().should(($el) => {
        expect($el[0].getBoundingClientRect().x).to.be.greaterThan(100);
      });
    });

    it('Prev class', () => {
      cy.getSlides().should('not.have.class', 'swiper-slide-prev');
    });

    it('Next class', () => {
      cy.getSlide(2).should('have.class', 'swiper-slide-next').and('be.visible');
    });

    it('Should have 3 visible slies', () => {
      cy.getSlides().filter(':visible').its('length').should('be.eq', 3);
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
