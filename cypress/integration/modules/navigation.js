/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.swiperPage();
  });

  it('disabledClass', () => {
    cy.initSwiper({
      navigation: {
        disabledClass: 'uniqueTestClass',
      },
    });
    cy.get('.uniqueTestClass').should('exist');
    cy.get('.swiper-button-disabled').should('not.exist');
  });

  // it('hiddenClass', () => {
  //   cy.initSwiper({
  //     watchOverflow: true,
  //     navigation: {
  //       hideOnClick: true,
  //       hiddenClass: 'uniqueTestClass',
  //     },
  //   });
  //   cy.get('.uniqueTestClass').should('exist');
  //   cy.get('.swiper-button-hidden').should('not.exist');
  // });

  // it('hideOnClick', () => {
  //   cy.initSwiper({
  //     navigation: {
  //       hideOnClick: true,
  //     },
  //   });
  // });

  // it('loop', () => {
  //   cy.initSwiper({
  //     navigation: {
  //       hideOnClick: true,
  //     },
  //   });
  // });

  // it('lockClass', () => {
  //   cy.initSwiper({
  //     navigation: {
  //       lockClass: 'swiper-button-lock',
  //     },
  //   });
  // });

  // it('nextEl', () => {
  //   cy.initSwiper({
  //     navigation: {
  //       nextEl: 'swiper-button-lock',
  //     },
  //   });
  // });

  // it('prevEl', () => {
  //   cy.initSwiper({
  //     navigation: {
  //       prevEl: 'swiper-button-lock',
  //     },
  //   });
  // });
});
