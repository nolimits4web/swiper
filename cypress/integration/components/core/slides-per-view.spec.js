/// <reference types="cypress" />

context('Core', () => {
  beforeEach(() => {
    cy.visit('../../../demos/110-slides-per-view.html');
  });

  describe('Init', () => {
    it('Active class', () => {
      cy.getSlide(1).should('have.class', 'swiper-slide-active').and('be.visible');
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
});
