import $ from '../../utils/dom';
import { bindModuleMethods } from '../../utils/utils';

const A11y = {
  getRandomNumber(size = 16) {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(size).replace(/x/g, randomChar);
  },
  makeElFocusable($el) {
    $el.attr('tabIndex', '0');
    return $el;
  },
  makeElNotFocusable($el) {
    $el.attr('tabIndex', '-1');
    return $el;
  },
  addElRole($el, role) {
    $el.attr('role', role);
    return $el;
  },
  addElRoleDescription($el, description) {
    $el.attr('aria-role-description', description);
    return $el;
  },
  addElControls($el, controls) {
    $el.attr('aria-controls', controls);
    return $el;
  },
  addElLabel($el, label) {
    $el.attr('aria-label', label);
    return $el;
  },
  addElId($el, id) {
    $el.attr('id', id);
    return $el;
  },
  addElLive($el, live) {
    $el.attr('aria-live', live);
    return $el;
  },
  disableEl($el) {
    $el.attr('aria-disabled', true);
    return $el;
  },
  enableEl($el) {
    $el.attr('aria-disabled', false);
    return $el;
  },
  onEnterKey(e) {
    const swiper = this;
    const params = swiper.params.a11y;
    if (e.keyCode !== 13) return;
    const $targetEl = $(e.target);
    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        swiper.a11y.notify(params.lastSlideMessage);
      } else {
        swiper.a11y.notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        swiper.a11y.notify(params.firstSlideMessage);
      } else {
        swiper.a11y.notify(params.prevSlideMessage);
      }
    }
    if (
      swiper.pagination &&
      $targetEl.is(`.${swiper.params.pagination.bulletClass.replace(/ /g, '.')}`)
    ) {
      $targetEl[0].click();
    }
  },
  notify(message) {
    const swiper = this;
    const notification = swiper.a11y.liveRegion;
    if (notification.length === 0) return;
    notification.html('');
    notification.html(message);
  },
  updateNavigation() {
    const swiper = this;

    if (swiper.params.loop || !swiper.navigation) return;
    const { $nextEl, $prevEl } = swiper.navigation;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        swiper.a11y.disableEl($prevEl);
        swiper.a11y.makeElNotFocusable($prevEl);
      } else {
        swiper.a11y.enableEl($prevEl);
        swiper.a11y.makeElFocusable($prevEl);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        swiper.a11y.disableEl($nextEl);
        swiper.a11y.makeElNotFocusable($nextEl);
      } else {
        swiper.a11y.enableEl($nextEl);
        swiper.a11y.makeElFocusable($nextEl);
      }
    }
  },
  updatePagination() {
    const swiper = this;
    const params = swiper.params.a11y;
    if (
      swiper.pagination &&
      swiper.params.pagination.clickable &&
      swiper.pagination.bullets &&
      swiper.pagination.bullets.length
    ) {
      swiper.pagination.bullets.each((bulletEl) => {
        const $bulletEl = $(bulletEl);
        swiper.a11y.makeElFocusable($bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel(
            $bulletEl,
            params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1),
          );
        }
      });
    }
  },
  init() {
    const swiper = this;
    const params = swiper.params.a11y;

    swiper.$el.append(swiper.a11y.liveRegion);

    // Container
    const $containerEl = swiper.$el;
    if (params.containerRoleDescriptionMessage) {
      swiper.a11y.addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      swiper.a11y.addElLabel($containerEl, params.containerMessage);
    }

    // Wrapper
    const $wrapperEl = swiper.$wrapperEl;
    const wrapperId = $wrapperEl.attr('id') || `swiper-wrapper-${swiper.a11y.getRandomNumber(16)}`;
    let live;
    swiper.a11y.addElId($wrapperEl, wrapperId);

    if (swiper.params.autoplay && swiper.params.autoplay.enabled) {
      live = 'off';
    } else {
      live = 'polite';
    }
    swiper.a11y.addElLive($wrapperEl, live);

    // Slide
    if (params.itemRoleDescriptionMessage) {
      swiper.a11y.addElRoleDescription($(swiper.slides), params.itemRoleDescriptionMessage);
    }
    swiper.a11y.addElRole($(swiper.slides), 'group');
    swiper.slides.each((slideEl) => {
      const $slideEl = $(slideEl);
      swiper.a11y.addElLabel($slideEl, `${$slideEl.index() + 1} / ${swiper.slides.length}`);
    });

    // Navigation
    let $nextEl;
    let $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }

    if ($nextEl && $nextEl.length) {
      swiper.a11y.makeElFocusable($nextEl);
      if ($nextEl[0].tagName !== 'BUTTON') {
        swiper.a11y.addElRole($nextEl, 'button');
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
      swiper.a11y.addElControls($nextEl, wrapperId);
    }
    if ($prevEl && $prevEl.length) {
      swiper.a11y.makeElFocusable($prevEl);
      if ($prevEl[0].tagName !== 'BUTTON') {
        swiper.a11y.addElRole($prevEl, 'button');
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }
      swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
      swiper.a11y.addElControls($prevEl, wrapperId);
    }

    // Pagination
    if (
      swiper.pagination &&
      swiper.params.pagination.clickable &&
      swiper.pagination.bullets &&
      swiper.pagination.bullets.length
    ) {
      swiper.pagination.$el.on(
        'keydown',
        `.${swiper.params.pagination.bulletClass.replace(/ /g, '.')}`,
        swiper.a11y.onEnterKey,
      );
    }
  },
  destroy() {
    const swiper = this;
    if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0)
      swiper.a11y.liveRegion.remove();

    let $nextEl;
    let $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      $nextEl.off('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      $prevEl.off('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (
      swiper.pagination &&
      swiper.params.pagination.clickable &&
      swiper.pagination.bullets &&
      swiper.pagination.bullets.length
    ) {
      swiper.pagination.$el.off(
        'keydown',
        `.${swiper.params.pagination.bulletClass.replace(/ /g, '.')}`,
        swiper.a11y.onEnterKey,
      );
    }
  },
};
export default {
  name: 'a11y',
  params: {
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
    },
  },
  create() {
    const swiper = this;
    bindModuleMethods(swiper, {
      a11y: {
        ...A11y,
        liveRegion: $(
          `<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`,
        ),
      },
    });
  },
  on: {
    afterInit(swiper) {
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.init();
      swiper.a11y.updateNavigation();
    },
    toEdge(swiper) {
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.updateNavigation();
    },
    fromEdge(swiper) {
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.updateNavigation();
    },
    paginationUpdate(swiper) {
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.updatePagination();
    },
    destroy(swiper) {
      if (!swiper.params.a11y.enabled) return;
      swiper.a11y.destroy();
    },
  },
};
