/// <reference types="cypress" />

context('FreeMode', () => {
  beforeEach(() => {
    cy.swiperPage();
  });

  it('freeMode', () => {
    cy.initSwiper({
      freeMode: {
        enabled: true,
      },
    });
    cy.swipeLeft();
    cy.getActiveSlide().should(($el) => {
      expect($el[0].offsetLeft).to.be.greaterThan(800);
    });
  });
  // it('freeModeMinimumVelocity', () => {});
  // it('freeModeMomentum', () => {});
  // it('freeModeMomentumBounce', () => {});
  // it('freeModeMomentumBounceRatio', () => {});
  // it('freeModeMomentumRatio', () => {});
  // it('freeModeMomentumVelocityRatio', () => {});
  // it('freeModeSticky', () => {});
});
