!function(e){"use strict";function t(e,t){var i=t||{},a=i.size?"is-"+i.size:"",r="icon "+e+" "+a+(i["class"]||""),o='<svg class="icon__cnt"><use xlink:href="#'+e+'" /></svg>',s='<div class="'+r+'">'+n(o,r)+"</div>";return s}function n(e,t){return t.indexOf("spinner")>-1?'<div class="icon__spinner">'+e+"</div>":e}function i(t){var n=""!==t&&"undefined"!=typeof t?t:"img/sprites/svg_sprite.svg",i=1443426265;e.createElementNS&&e.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||(e.createElement("svg"),e.createElement("use"));var a,r,o="localStorage"in window&&null!==window.localStorage,s=function(){var t='<div style="display: none">'+r+"</div>";e.body.insertAdjacentHTML("afterbegin",t)},c=function(){e.body?s():e.addEventListener("DOMContentLoaded",s)};if(o&&parseInt(localStorage.getItem("inlineSVGrev"),10)===i&&(r=localStorage.getItem("inlineSVGdata")))return c(),!0;try{a=new XMLHttpRequest,a.open("GET",n,!0),a.onload=function(){a.status>=200&&a.status<400&&(r=a.responseText,c(),o&&(localStorage.setItem("inlineSVGdata",r),localStorage.setItem("inlineSVGrev",i)))},a.send()}catch(l){}}var a=function(n){for(var i=n?n.querySelectorAll("[data-icon]"):e.querySelectorAll("[data-icon]"),a=0;a<i.length;a++){var r=i[a],o=r.getAttribute("data-icon"),s={"class":r.className,size:r.getAttribute("data-size")};r.insertAdjacentHTML("beforebegin",t(o,s)),r.parentNode.removeChild(r)}};e.addEventListener("DOMContentLoaded",function(){i(),a()}),window.renderIcons=a}(window.document);