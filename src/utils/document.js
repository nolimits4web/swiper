let d;
if (typeof document === 'undefined') {
  d = {
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
      blur() {},
      nodeName: '',
    },
    querySelector() {
      return {};
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return {
        style: {},
        setAttribute() {},
        getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  };
} else {
  d = document;
}

const doc = d;

export default doc;
