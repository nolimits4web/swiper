function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}

function extend(target, src) {
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === 'undefined') target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}

function needsNavigation(params = {}) {
  return params.navigation && !params.navigation.nextEl && !params.navigation.prevEl;
}
function needsPagination(params = {}) {
  return params.pagination && !params.pagination.el && !params.pagination.el;
}
function needsScrollbar(params = {}) {
  return params.scrollbar && !params.scrollbar.el && !params.scrollbar.el;
}
function uniqueClasses(classNames = '') {
  const classes = classNames
    .split(' ')
    .map((c) => c.trim())
    .filter((c) => !!c);
  const unique = [];
  classes.forEach((c) => {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}

export { isObject, extend, needsNavigation, needsPagination, needsScrollbar, uniqueClasses };
