(function () {
  'use strict';

  function windowPopup (width, height, url, title, win) {

    if (typeof width !== 'number' || typeof height !== 'number') {
      throw new TypeError('Width and height must be numbers');
    }

    if (typeof url !== 'string') {
      throw new TypeError('Url must be string');
    }

    if ( (typeof title !== 'string') && (typeof title !== 'undefined') ) {
      throw new TypeError('Title must be string');
    }

    win = win || window;
    title = title || '';

    var left = (win.outerWidth / 2) + (win.screenX || win.screenLeft || 0) - (width / 2);
    var top = (win.outerHeight / 2) + (win.screenY || win.screenTop || 0) - (height / 2);

    win.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

  }

  var root;
  if (typeof exports === 'object') {
    root = exports;
  } else if (typeof jQuery === 'function') {
    root = jQuery;
  } else {
    root = window;
  }

  root.windowPopup = windowPopup;
})();
