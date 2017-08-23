import $ from '../../../utils/dom';

export default function (e, selector) {
  let $el = $(e.target);
  if (!$el.is(selector)) {
    if (typeof selector === 'string') {
      $el = $el.parents(selector);
    } else if (selector.nodeType) {
      let found;
      $el.parents().each((index, parentEl) => {
        if (parentEl === selector) found = selector;
      });
      if (!found) return undefined;
      return selector;
    }
  }
  if ($el.length === 0) {
    return undefined;
  }
  return $el[0];
}
