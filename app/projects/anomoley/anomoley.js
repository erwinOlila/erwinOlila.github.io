!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){function r(){f=[];for(let t=0;t<2e3;t++){const t=3*Math.random()+1,e=Math.random()*(innerWidth-2*t)+t,n=Math.random()*(innerHeight-2*t)+t,r=Math.random()-.5,i=Math.random()-.5;let o=new u(e,n,t,r,i);f.push(o)}}function i(){requestAnimationFrame(i),s.clearRect(0,0,innerWidth,innerHeight),f.forEach(t=>{t.draw()}),d.draw()}n(1);var o=document.getElementById("canvas");o.width=window.innerWidth,o.height=window.innerHeight;var s=o.getContext("2d");window.addEventListener("resize",()=>{o.width=window.innerWidth,o.height=window.innerHeight,r()});const a=["rgba(62,43,56,0.9)","rgba(115,45,65,0.9)","rgba(152,28,45,0.9)","rgba(218,124,7,0.9)","rgba(244,176,6,0.9)"];class u{constructor(t,e,n,r,i){this.x=t,this.y=e,this.dx=r,this.dy=i,this.radius=n,this.minRadius=n,this.color=a[Math.floor(Math.random()*a.length)]}draw(){s.beginPath(),s.fillStyle=this.color,s.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),s.fill(),this.update()}update(){this.dx=this.x+this.radius>innerWidth||this.x-this.radius<0?-this.dx:this.dx,this.dy=this.y+this.radius>innerHeight||this.y-this.radius<0?-this.dy:this.dy,this.x+=this.dx,this.y+=this.dy,d.getLoc().x-this.x<50&&d.getLoc().x-this.x>-50&&d.getLoc().y-this.y<50&&d.getLoc().y-this.y>-50&&this.radius<20?this.radius+=5:this.radius>this.minRadius&&(this.radius-=.2)}}class c extends u{constructor(t,e,n,r,i){super(t,e,n,r,i)}getLoc(){return{x:this.x,y:this.y}}}var f=[],d=new c(100,100,2,4,4);d.x,d.y;r(),i()},function(t,e,n){var r=n(2);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0};i.transform=void 0;n(4)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(3)(void 0)).push([t.i,"body,html{margin:0}canvas{border:1px solid #000;background:#f1e0b1}",""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),o=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(o).concat([i]).join("\n")}return[n].join("\n")}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=d[r.id];if(i){i.refs++;for(s=0;s<i.parts.length;s++)i.parts[s](r.parts[s]);for(;s<r.parts.length;s++)i.parts.push(c(r.parts[s],e))}else{for(var o=[],s=0;s<r.parts.length;s++)o.push(c(r.parts[s],e));d[r.id]={id:r.id,refs:1,parts:o}}}}function i(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],s=e.base?o[0]+e.base:o[0],a={css:o[1],media:o[2],sourceMap:o[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}function o(t,e){var n=l(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=b[b.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),b.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=l(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,i)}}function s(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=b.indexOf(t);e>=0&&b.splice(e,1)}function a(t){var e=document.createElement("style");return t.attrs.type="text/css",u(e,t.attrs),o(t,e),e}function u(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function c(t,e){var n,r,i,c;if(e.transform&&t.css){if(!(c=e.transform(t.css)))return function(){};t.css=c}if(e.singleton){var d=v++;n=p||(p=a(e)),r=f.bind(null,n,d,!1),i=f.bind(null,n,d,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",u(e,t.attrs),o(t,e),e}(e),r=function(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=y(r));i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,e),i=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),i=function(){s(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}function f(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}var d={},h=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),l=function(t){var e={};return function(t){if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),p=null,v=0,b=[],y=n(5);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=h()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=i(t,e);return r(n,e),function(t){for(var o=[],s=0;s<n.length;s++){var a=n[s];(u=d[a.id]).refs--,o.push(u)}if(t){r(i(t,e),e)}for(s=0;s<o.length;s++){var u=o[s];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete d[u.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return t;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}}]);