/// <reference types="cypress" />

context('Core', () => {
  describe('a11y', () => {
    beforeEach(() => {
      cy.swiperPage();
      cy.initSwiper({
        speed: 0,
        navigation: true,
        pagination: true,
      });
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

    it('should add aria-label to swiper-slide', () => {
      const count = Cypress.$('.swiper-slide').length;
      cy.getSlide(0).should('have.attr', 'aria-label', `1 / ${count}`);
      cy.getSlide(2).should('have.attr', 'aria-label', `3 / ${count}`);
      cy.getSlide(4).should('have.attr', 'aria-label', `5 / ${count}`);
      cy.getSlide(9).should('have.attr', 'aria-label', `10 / ${count}`);
    });

    it('should navigate with arrows on enter or space key', () => {
      cy.get('.swiper-button-next').trigger('keydown', { keyCode: 13 });
      cy.getSlide(1).should('have.class', 'swiper-slide-active');
      cy.get('.swiper-button-next').trigger('keydown', { keyCode: 32 });
      cy.getSlide(2).should('have.class', 'swiper-slide-active');
    });

    it('should navigate with pagination on enter or space key', () => {
      cy.get('.swiper-pagination-bullet:nth-child(2)').trigger('keydown', { keyCode: 13 });
      cy.getSlide(1).should('have.class', 'swiper-slide-active');
      cy.get('.swiper-pagination-bullet:nth-child(5)').trigger('keydown', { keyCode: 32 });
      cy.getSlide(4).should('have.class', 'swiper-slide-active');
    });
  });
});
