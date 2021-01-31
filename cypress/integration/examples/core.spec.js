/// <reference types="cypress" />

context('Core', () => {
  beforeEach(() => {
    cy.visit('../../../playground/core/');
  });

  describe('Init', () => {
    it('Active class', () => {
      cy.get('.swiper-container').contains('Slide 3').should('have.class', 'swiper-slide-active');
    });

    it('Prev class', () => {
      cy.get('.swiper-container').contains('Slide 2').should('have.class', 'swiper-slide-prev');
    });

    it('Next class', () => {
      cy.get('.swiper-container').contains('Slide 4').should('have.class', 'swiper-slide-next');
    });

    it('a11y', () => {
      cy.get('.swiper-container')
        .find('.swiper-slide')
        .should('have.attr', 'aria-role-description', 'slide');
      cy.get('.swiper-container').find('.swiper-slide').should('have.attr', 'role', 'group');
      // cy.get('.swiper-container').find('.swiper-slide').should('have.attr', 'aria-lalbel');
    });
  });

  describe('Slide', () => {
    it('Should slide next on slide click', () => {
      cy.get('.swiper-slide-next').click();
      cy.get('.swiper-container').contains('Slide 3').should('have.class', 'swiper-slide-prev');
      cy.get('.swiper-container').contains('Slide 4').should('have.class', 'swiper-slide-active');
      cy.get('.swiper-container').contains('Slide 5').should('have.class', 'swiper-slide-next');
    });

    it('Should slide prev on slide click', () => {
      cy.get('.swiper-slide-prev').click();
      cy.get('.swiper-container').contains('Slide 1').should('have.class', 'swiper-slide-prev');
      cy.get('.swiper-container').contains('Slide 2').should('have.class', 'swiper-slide-active');
      cy.get('.swiper-container').contains('Slide 3').should('have.class', 'swiper-slide-next');
    });

    it('Should slide next', () => {
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-container').contains('Slide 3').should('have.class', 'swiper-slide-prev');
      cy.get('.swiper-container').contains('Slide 4').should('have.class', 'swiper-slide-active');
      cy.get('.swiper-container').contains('Slide 5').should('have.class', 'swiper-slide-next');
    });

    it('Should slide prev', () => {
      cy.get('.swiper-button-prev').click();
      cy.get('.swiper-container').contains('Slide 1').should('have.class', 'swiper-slide-prev');
      cy.get('.swiper-container').contains('Slide 2').should('have.class', 'swiper-slide-active');
      cy.get('.swiper-container').contains('Slide 3').should('have.class', 'swiper-slide-next');
    });
  });
});
