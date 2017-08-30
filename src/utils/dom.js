import $ from 'dom7/src/$';
import Methods from 'dom7/src/methods';

// Methods
Object.keys(Methods).forEach((key) => {
  if ($.fn[key]) return;
  $.fn[key] = Methods[key];
});

export default $;
