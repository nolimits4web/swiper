import { $, addClass, removeClass, hasClass, toggleClass, attr, removeAttr, transform, transition, on, off, trigger, transitionEnd, outerWidth, outerHeight, offset, css, each, html, text, is, index, eq, append, prepend, next, nextAll, prev, prevAll, parent, parents, closest, find, children, filter, remove } from 'dom7';
var Methods = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  toggleClass: toggleClass,
  attr: attr,
  removeAttr: removeAttr,
  transform: transform,
  transition: transition,
  on: on,
  off: off,
  trigger: trigger,
  transitionEnd: transitionEnd,
  outerWidth: outerWidth,
  outerHeight: outerHeight,
  offset: offset,
  css: css,
  each: each,
  html: html,
  text: text,
  is: is,
  index: index,
  eq: eq,
  append: append,
  prepend: prepend,
  next: next,
  nextAll: nextAll,
  prev: prev,
  prevAll: prevAll,
  parent: parent,
  parents: parents,
  closest: closest,
  find: find,
  children: children,
  filter: filter,
  remove: remove
};
Object.keys(Methods).forEach(function (methodName) {
  $.fn[methodName] = Methods[methodName];
});
export default $;