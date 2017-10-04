let w;
if (typeof window === 'undefined') {
  w = {
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
      return {};
    },
    Image() {},
    Date() {},
  };
} else {
  w = window;
}

const win = w;

export default win;
