/// <reference types="cypress" />

context('Core', () => {
  describe('a11y', () => {
    beforeEach(() => {
      cy.swiperPage();
      cy.initSwiper();
    });
    it('should add aria-live="polite" to swiper-wrapper', () => {
      cy.getSliderWrapper().should('have.attr', 'aria-live', 'polite');
    });

    it('should add aria-role-description="slide" to swiper-slide', () => {
      cy.initSwiper({
        a11y: { itemRoleDescriptionMessage: 'test' },
      });
      cy.getSlides().should('have.attr', 'aria-role-description', 'test');
    });

    it('should add aria-role-description="slide" to swiper-container', () => {
      cy.initSwiper({
        a11y: { containerRoleDescriptionMessage: 'test' },
      });
      cy.getSliderContainer().should('have.attr', 'aria-role-description', 'test');
    });

    it('should add role="group" to swiper-slide', () => {
      cy.getSlides().should('have.attr', 'role', 'group');
    });

    it('should add aria-lalbel to swiper-slide', () => {
      const count = Cypress.$('.swiper-slide').length;
      cy.getSlide(1).should('have.attr', 'aria-label', `1 / ${count}`);
      cy.getSlide(3).should('have.attr', 'aria-label', `3 / ${count}`);
      cy.getSlide(5).should('have.attr', 'aria-label', `5 / ${count}`);
      cy.getSlide(10).should('have.attr', 'aria-label', `10 / ${count}`);
    });
  });
});
