import Utils from '../../../utils/utils';

export default {
  isTouched: undefined,
  isMoved: undefined,
  allowTouchCallbacks: undefined,
  touchStartTime: undefined,
  isScrolling: undefined,
  currentTranslate: undefined,
  startTranslate: undefined,
  allowThresholdMove: undefined,
  // Form elements to match
  formElements: 'input, select, textarea, button, video',
  // Last click time
  lastClickTime: Utils.now(),
  clickTimeout: undefined,
  // Velocities
  velocities: [],
  allowMomentumBounce: undefined,
  isTouchEvent: undefined,
  startMoving: undefined,
};
