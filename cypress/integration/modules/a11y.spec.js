/// <reference types="cypress" />

context('Core', () => {
  describe('a11y', () => {
    beforeEach(() => {
      cy.swiperPage();
      cy.initSwiper();
    });
    it('swiper-wrapper should have aria-live="polite"', () => {
      cy.getSliderWrapper().should('have.attr', 'aria-live', 'polite');
    });

    it('swiper-slide should have aria-role-description="slide"', () => {
      cy.initSwiper({
        a11y: { itemRoleDescriptionMessage: 'test' },
      });
      cy.getSlides().should('have.attr', 'aria-role-description', 'test');
    });

    it('swiper-container should have aria-role-description="slide"', () => {
      cy.initSwiper({
        a11y: { containerRoleDescriptionMessage: 'test' },
      });
      cy.getSliderContainer().should('have.attr', 'aria-role-description', 'test');
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
