parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"mAbx":[function(require,module,exports) {

},{"./../fonts/FiraSans-Regular.woff2":[["FiraSans-Regular.3c8383f5.woff2","WGkC"],"WGkC"],"./../fonts/FiraSans-Bold.woff2":[["FiraSans-Bold.80b685ee.woff2","KVtD"],"KVtD"],"./../fonts/FiraSans-Italic.woff2":[["FiraSans-Italic.160f352f.woff2","9hQv"],"9hQv"],"./../fonts/FiraSans-BoldItalic.woff2":[["FiraSans-BoldItalic.b7dedb72.woff2","+5pt"],"+5pt"]}],"QvaY":[function(require,module,exports) {
"use strict";function e(e){try{var r=window[e],n="__storage_test__";return r.setItem(n,n),r.removeItem(n),!0}catch(o){return o instanceof DOMException&&(22===o.code||1014===o.code||"QuotaExceededError"===o.name||"NS_ERROR_DOM_QUOTA_REACHED"===o.name)&&0!==r.length}}require("../scss/styles.scss"),function(e,r,n){n=n||window;var o=!1;n.addEventListener(e,function(){o||(o=!0,requestAnimationFrame(function(){n.dispatchEvent(new CustomEvent(r)),o=!1}))})}("resize","optimizedResize");var r={currentPanel:0,panels:0,localStorage:!1,isNarrow:!1,isSuperNarrow:!1,isSuperWide:!1},n={setup:function(){var o=document.querySelectorAll("article");r.panels=o.length;var t=document.querySelector("#mainnav #numbers");for(e("localStorage")&&(r.localStorage=!0,localStorage.getItem("currentPage")&&(r.currentPanel=parseInt(localStorage.getItem("currentPage"),10)));t.firstChild;)t.removeChild(t.firstChild);for(var i=0;i<r.panels;i++){var a=document.createElement("a");a.href="#",a.id="go_".concat(i),a.innerHTML=i+1,t.appendChild(a),a.onclick=function(){n.goToPanel(parseInt(this.id.substring(3),10))}}document.querySelector("#goleft").onclick=function(){r.currentPanel>0&&n.goToPanel(r.currentPanel-1)},document.querySelector("#goright").onclick=function(){r.currentPanel+1<r.panels&&n.goToPanel(r.currentPanel+1)},window.addEventListener("keydown",function(e){37===e.keyCode&&r.currentPanel>0&&n.goToPanel(r.currentPanel-1),39===e.keyCode&&r.currentPanel+1<r.panels&&n.goToPanel(r.currentPanel+1)}),this.goToPanel(r.currentPanel),window.addEventListener("optimizedResize",function(){n.goToPanel(r.currentPanel)})},goToPanel:function(e){var o=document.querySelector("main section"),t=o.clientWidth;o.scrollLeft=t*e,o.querySelector("article#panel_".concat(r.currentPanel)).style.opacity=0,o.querySelector("article#panel_".concat(e)).style.opacity=1,r.currentPanel=e;var i=document.querySelectorAll("#numbers a");document.querySelector("#goleft").classList=0===e?"off":"",document.querySelector("#goright").classList=e===r.panels-1?"off":"";for(var a=0;a<i.length;a++)i[a].classList="",a===e&&(i[a].classList="on");if(document.querySelector("article#panel_".concat(e," .demoresize"))){for(var c=document.getElementsByClassName("resizearrow");c[0];)c[0].parentNode.removeChild(c[0]);n.setupDemoResize(document.querySelector("article#panel_".concat(e," .demoresize")))}r.localStorage&&localStorage.setItem("currentPage",e)},setupDemoResize:function(e){var r=document.createElement("div");function n(r){e.style.width=r.clientX-e.getBoundingClientRect().x+"px",e.style.height=r.clientY-e.offsetTop+"px"}function o(r){window.removeEventListener("mousemove",n,!1),window.removeEventListener("mouseup",o,!1),e.style.width="100%",e.style.height="100%"}r.innerHTML="⇲",r.classList="resizearrow",e.appendChild(r),r.addEventListener("mousedown",function(e){window.addEventListener("mousemove",n,!1),window.addEventListener("mouseup",o,!1)},!1)}};n.setup(),document.querySelector("a#narrow").onclick=function(){r.isSuperNarrow=!1,r.isSuperWide=!1,document.querySelector("a#supernarrow").innerHTML="supernarrow version",document.querySelector("a#superwide").innerHTML="superwide version",document.querySelector("#panel_6 #example1").classList=r.isNarrow?"demo_document":"demo_document narrow",document.querySelector("a#narrow").innerHTML=r.isNarrow?"narrow version":"normal version",r.isNarrow=!r.isNarrow},document.querySelector("a#supernarrow").onclick=function(){r.isNarrow=!1,r.isSuperWide=!1,document.querySelector("a#narrow").innerHTML="narrow version",document.querySelector("a#superwide").innerHTML="superwide version",document.querySelector("#panel_6 #example1").classList=r.isSuperNarrow?"demo_document":"demo_document supernarrow",document.querySelector("a#supernarrow").innerHTML=r.isSuperNarrow?"supernarrow version":"normal version",r.isSuperNarrow=!r.isSuperNarrow},document.querySelector("a#superwide").onclick=function(){r.isNarrow=!1,r.isSuperNarrow=!1,document.querySelector("a#narrow").innerHTML="narrow version",document.querySelector("a#supernarrow").innerHTML="supernarrow version",document.querySelector("#panel_6 #example1").classList=r.isSuperWide?"demo_document":"demo_document superwide",document.querySelector("a#superwide").innerHTML=r.isSuperWide?"superwide version":"normal version",r.isSuperWide=!r.isSuperWide};
},{"../scss/styles.scss":"mAbx"}]},{},["QvaY"], null)
//# sourceMappingURL=/js.fce0d900.map