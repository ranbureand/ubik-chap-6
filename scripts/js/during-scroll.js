(function(window) {
  'use strict';
  /**
   * @module duringScroll
   * @param {Object} opts - a hash of optional overrides.
   * @returns {Number} - a reference to the interval invoked.
   */
  function duringScroll(opts) {
    var offset = [(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop, (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft],
        state = 'not scrolling',
        noop = function() {},
        default_options = {
          interval: 60,
          always: noop,
          scrollStart: noop,
          duringScroll: noop,
          afterScroll: noop
        },
        options = merge_hashes(default_options, opts);

    function handle_scrolling(scrollStart, duringScroll, afterScroll) {
      if(state === 'not scrolling' && offset[0] !== ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop) || state === 'not scrolling' && offset[1] !== ((document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft)) {
        // we've started scrolling
        offset[0] = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        offset[1] = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
        state = 'scrolling';
        scrollStart();

      } else if(state === 'scrolling' && offset[0] !== ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop) || state === 'scrolling' && offset[1] !== ((document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft)) {
        // we're still scrolling
        offset[0] = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        offset[1] = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
        duringScroll();

      } else if(state === 'scrolling' && offset[0] === ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop) || state === 'scrolling' && offset[1] !== ((document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft)) {
        // we've stopped scrolling
        state = 'not scrolling';
        afterScroll();
      }
    }

    return setInterval(function() {
      options.always();
      handle_scrolling(options.scrollStart, options.duringScroll, options.afterScroll);

    }, options.interval);
  }

  function merge_hashes() {
    var new_hash = {};

    Array.prototype.forEach.call(arguments, function(obj) {
      Object.keys(obj).forEach(function(property, index) {
        new_hash[property] = obj[property];
      });
    });

    return new_hash;
  }

  /**
   * @description export the module based on environment.
   */
  var hasDefine = typeof window.define === 'function' && window.define.amd,
      hasExports = typeof window.module !== 'undefined',
      hasJquery = typeof window.jQuery !== 'undefined';

  if( hasDefine ) {
    window.define(function() {
      return {
        duringScroll: duringScroll
      };
    });
  }

  if( hasExports ) {
    window.module.exports = duringScroll;
  }

  if( hasJquery ) {
    window.jQuery.duringScroll = duringScroll;
  }

  if( !hasDefine && !hasExports && !hasJquery ) {
    window.duringScroll = duringScroll;
  }

})(window);
