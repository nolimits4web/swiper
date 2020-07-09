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
  return (
    params.navigation &&
    typeof params.navigation.nextEl === 'undefined' &&
    typeof params.navigation.prevEl === 'undefined'
  );
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === 'undefined';
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === 'undefined';
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
