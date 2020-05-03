import { window } from 'ssr-window';

export default function (imageEl, src, srcset, sizes, checkForComplete, callback) {
  let image;
  function onReady() {
    if (callback) callback();
  }
  const picture = $(imageEl).parent();
  if (!imageEl.complete || !checkForComplete && (picture[0].tagName !== 'PICTURE')) {
    if (src) {
      image = new window.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
}
