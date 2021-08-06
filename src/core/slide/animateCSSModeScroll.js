import { getWindow } from 'ssr-window';

export default function animateCSSModeScroll({ swiper, targetPosition, side }) {
  const window = getWindow();
  const currentPosition = -swiper.translate;
  const frameTime = 1000 / 60;
  const frames = swiper.params.speed / frameTime;
  const perFrame = (targetPosition - currentPosition) / frames;

  let progressPosition = currentPosition;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);

  const dir = targetPosition > currentPosition ? 'next' : 'prev';

  const isOutOfBound = (progress, target) => {
    return (dir === 'next' && progress >= target) || (dir === 'prev' && progress <= target);
  };

  const animate = () => {
    progressPosition += perFrame;
    if (isOutOfBound(progressPosition, targetPosition)) progressPosition = targetPosition;
    swiper.wrapperEl.scrollTo({
      [side]: progressPosition,
    });
    if (isOutOfBound(progressPosition, targetPosition)) {
      swiper.wrapperEl.style.scrollSnapType = '';
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}
