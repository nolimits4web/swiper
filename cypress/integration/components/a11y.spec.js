/// <reference types="cypress" />

context('Core', () => {
  beforeEach(() => {
    cy.visit('../../../playground/core/'); // TODO: make demo
  });

  describe('a11y', () => {
    it('swiper-wrapper should have aria-live="polite"', () => {
      cy.getSliderWrapper().should('have.attr', 'aria-live', 'polite');
    });

    it('swiper-slide should have aria-role-description="slide"', () => {
      cy.getSlides().should('have.attr', 'aria-role-description', 'slide');
    });

    it('swiper-slide should have role="group"', () => {
      cy.getSlides().should('have.attr', 'role', 'group');
    });

    it('swiper-slide should have aria-lalbel', () => {
      const count = Cypress.$('.swiper-slide').length;
      cy.getSlide(1).should('have.attr', 'aria-label', `1 / ${count}`);
      cy.getSlide(3).should('have.attr', 'aria-label', `3 / ${count}`);
      cy.getSlide(5).should('have.attr', 'aria-label', `5 / ${count}`);
      cy.getSlide(10).should('have.attr', 'aria-label', `10 / ${count}`);
    });
  });
});
