// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/FiraSans-Regular.woff2":[["FiraSans-Regular.be14f96c.woff2","fonts/FiraSans-Regular.woff2"],"fonts/FiraSans-Regular.woff2"],"./../fonts/FiraSans-Bold.woff2":[["FiraSans-Bold.82d0fa2b.woff2","fonts/FiraSans-Bold.woff2"],"fonts/FiraSans-Bold.woff2"],"./../fonts/FiraSans-Italic.woff2":[["FiraSans-Italic.e1f3bdf2.woff2","fonts/FiraSans-Italic.woff2"],"fonts/FiraSans-Italic.woff2"],"./../fonts/FiraSans-BoldItalic.woff2":[["FiraSans-BoldItalic.e83e4a9e.woff2","fonts/FiraSans-BoldItalic.woff2"],"fonts/FiraSans-BoldItalic.woff2"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("../scss/styles.scss");

// throttle resize – from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function () {
  var throttle = function throttle(type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function func() {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})(); // test for localstorage


function storageAvailable(type) {
  try {
    var storage = window[type],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && ( // everything except Firefox
    e.code === 22 || // Firefox
    e.code === 1014 || // test name field too, because code might not be present
    // everything except Firefox
    e.name === 'QuotaExceededError' || // Firefox
    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && // acknowledge QuotaExceededError only if there's something already stored
    storage.length !== 0;
  }
}

var data = {
  currentPanel: 0,
  panels: 0,
  localStorage: false,
  isNarrow: false,
  isSuperNarrow: false
};
var navigation = {
  setup: function setup() {
    var panels = document.querySelectorAll('article');
    data.panels = panels.length;
    var numbers = document.querySelector('#mainnav #numbers');

    if (storageAvailable('localStorage')) {
      data.localStorage = true;

      if (localStorage.getItem('currentPage')) {
        data.currentPanel = parseInt(localStorage.getItem('currentPage'), 10);
      }
    }

    while (numbers.firstChild) {
      numbers.removeChild(numbers.firstChild);
    }

    for (var i = 0; i < data.panels; i++) {
      var newLink = document.createElement('a');
      newLink.href = '#';
      newLink.id = "go_".concat(i);
      newLink.innerHTML = i + 1;
      numbers.appendChild(newLink);

      newLink.onclick = function () {
        navigation.goToPanel(parseInt(this.id.substring(3), 10));
      };
    }

    document.querySelector('#goleft').onclick = function () {
      if (data.currentPanel > 0) {
        navigation.goToPanel(data.currentPanel - 1);
      }
    };

    document.querySelector('#goright').onclick = function () {
      if (data.currentPanel + 1 < data.panels) {
        navigation.goToPanel(data.currentPanel + 1);
      }
    };

    window.addEventListener('keydown', function (event) {
      // handle keyboard
      if (event.keyCode === 37 && data.currentPanel > 0) {
        navigation.goToPanel(data.currentPanel - 1);
      }

      if (event.keyCode === 39 && data.currentPanel + 1 < data.panels) {
        navigation.goToPanel(data.currentPanel + 1);
      }
    });
    this.goToPanel(data.currentPanel);
    window.addEventListener('optimizedResize', function () {
      // handle resize
      navigation.goToPanel(data.currentPanel);
    });
  },
  goToPanel: function goToPanel(wantedPanel) {
    var section = document.querySelector('main section');
    var myWidth = section.clientWidth;
    section.scrollLeft = myWidth * wantedPanel;
    section.querySelector("article#panel_".concat(data.currentPanel)).style.opacity = 0;
    section.querySelector("article#panel_".concat(wantedPanel)).style.opacity = 1;
    data.currentPanel = wantedPanel;
    var numbersLinks = document.querySelectorAll('#numbers a');
    document.querySelector('#goleft').classList = wantedPanel === 0 ? 'off' : '';
    document.querySelector('#goright').classList = wantedPanel === data.panels - 1 ? 'off' : '';

    for (var i = 0; i < numbersLinks.length; i++) {
      numbersLinks[i].classList = '';

      if (i === wantedPanel) {
        numbersLinks[i].classList = 'on';
      }
    }

    if (document.querySelector("article#panel_".concat(wantedPanel, " .demoresize"))) {
      // first, delete all existing resizearrow elements
      var resizeArrows = document.getElementsByClassName('resizearrow');

      while (resizeArrows[0]) {
        resizeArrows[0].parentNode.removeChild(resizeArrows[0]);
      }

      navigation.setupDemoResize(document.querySelector("article#panel_".concat(wantedPanel, " .demoresize")));
    }

    if (data.localStorage) {
      localStorage.setItem('currentPage', wantedPanel);
    }
  },
  setupDemoResize: function setupDemoResize(element) {
    // mostly from here: https://stackoverflow.com/questions/8960193/how-to-make-html-element-resizable-using-pure-javascript
    var resizer = document.createElement('div');
    resizer.innerHTML = '⇲';
    resizer.classList = 'resizearrow';
    element.appendChild(resizer);
    resizer.addEventListener('mousedown', initResize, false);

    function initResize(e) {
      window.addEventListener('mousemove', startResize, false);
      window.addEventListener('mouseup', stopResize, false);
    }

    function startResize(e) {
      element.style.width = e.clientX - element.getBoundingClientRect().x + 'px';
      element.style.height = e.clientY - element.offsetTop + 'px';
    }

    function stopResize(e) {
      window.removeEventListener('mousemove', startResize, false);
      window.removeEventListener('mouseup', stopResize, false);
      element.style.width = '100%';
      element.style.height = '100%';
    }
  }
};
navigation.setup();

document.querySelector('a#narrow').onclick = function () {
  data.isSuperNarrow = false;
  document.querySelector('a#supernarrow').innerHTML = 'show supernarrow version';
  document.querySelector('#panel_6 #example1').classList = data.isNarrow ? 'demo_document' : 'demo_document narrow';
  document.querySelector('a#narrow').innerHTML = data.isNarrow ? 'Show narrow version' : 'Show wide version';
  data.isNarrow = !data.isNarrow;
};

document.querySelector('a#supernarrow').onclick = function () {
  data.isNarrow = false;
  document.querySelector('a#narrow').innerHTML = 'Show narrow version';
  document.querySelector('#panel_6 #example1').classList = data.isSuperNarrow ? 'demo_document' : 'demo_document supernarrow';
  document.querySelector('a#supernarrow').innerHTML = data.isSuperNarrow ? 'show supernarrow version' : 'show wide version';
  data.isSuperNarrow = !data.isSuperNarrow;
};
},{"../scss/styles.scss":"scss/styles.scss"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61344" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.map