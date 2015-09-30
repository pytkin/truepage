function contactsMapInit(){var a={zoom:14,center:new google.maps.LatLng(55.72198,37.6509183),mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0,draggable:!1,scrollwheel:!1};map=new google.maps.Map(document.getElementById("contacts-map"),a),image="img/static/crown.png",beachMarker=new google.maps.Marker({position:{lat:55.7234457,lng:37.6509298},map:map,icon:image})}$(function(){"use strict";function a(a,e){var t="";switch(e){case"all":t="modals/cases-gallery-all.html";break;case"photo":t="modals/cases-gallery-all.html";break;case"video":t="modals/cases-gallery-all.html"}$.ajax({url:t,dataType:"html",error:function(){console.warn("Проблема в получении данных для галереи")},success:function(e){$(a).find(".modal-content").html(e),renderIcons(),$(a).modal({backdropClass:"modal-backdrop is-cases-modal-backdrop"})}})}function e(a){$.ajax({url:"modals/reviews.html",dataType:"html",error:function(){console.warn("Проблема в получении данных для модального окна")},success:function(e){$(a).find(".modal-content").html(e),renderIcons(),$(a).modal({backdropClass:"modal-backdrop is-reviews-modal-backdrop"})}})}function t(a,e){var t="";switch(e){case"#calc-form":t="modals/calc-form.html";break;case"#request-form":t="modals/request-form.html";break;case"#callback-form":t="modals/callback-form.html";break;case"#price-info":t="modals/price-info.html";break;case"#thank-notify":t="modals/thank-notify.html"}$.ajax({url:t,dataType:"html",error:function(){console.warn("Проблема в получении данных для галереи")},success:function(e){$(a).find(".modal-content").html(e),renderIcons(),$(a).modal({backdropClass:"modal-backdrop is-callback-backdrop"})}})}function l(a){a.on("click",".gallery-prev-btn",function(a){a.preventDefault();var e=$(this).closest(".modal-content").find(".flickity-enabled").data("flickity");e.previous(!0)}).on("click",".gallery-next-btn",function(a){a.preventDefault();var e=$(this).closest(".modal-content").find(".flickity-enabled").data("flickity");e.previous(!0)})}$('[data-type="review-gallery"], [data-type="clients-gallery"], [data-type="cases-gallery"], [data-type="clients-gallery"], [data-type="mobile-clients-gallery"]').flickity({pageDots:!1,prevNextButtons:!1,wrapAround:!0}),$(".block.is-reviews, .block.is-clients, .block.is-cases-videos, .block.is-cases-photos, .block.is-clients-photos").on("click",'[data-type="gallery-prev-handler"], [data-type="gallery-next-handler"]',function(a){a.preventDefault();var e=$(this).closest(".block").find(".flickity-enabled").data("flickity");switch($(this).data("type")){case"gallery-prev-handler":e.previous(!0);break;case"gallery-next-handler":e.next(!0)}}),$(".mobile-nav-handler").on("click",function(){var a=$(this).data("target");$(this).toggleClass("active"),$(a).modal({show:!1,backdropClass:"modal-backdrop is-mobile-nav-modal-backdrop"}).modal("toggle")}),$(".js-cases-blocks").on("click",".block",function(e){e.preventDefault();var t=$(this).data("target"),l=$(this).closest(".js-cases-blocks").find(".block").index($(this)),s=$(this).data("modal-type");$(t).data("flickityShowID",l),a($(t),s)}),$(document).on("shown.bs.modal",function(a){var e=$(a.target).data("flickityShowID");$(a.target).hasClass("cases-modal")?$(a.target).find(".cases-gallery").flickity({initialIndex:e,prevNextButtons:!1,pageDots:!1}):$(a.target).hasClass("reviews-modal")&&$(a.target).find(".reviews-modal-gallery").flickity({initialIndex:e,prevNextButtons:!1,pageDots:!1}),l($(a.target))}),$(".js-clients-blocks").on("click",".icon-review",function(){var a=$(this).data("target"),t=$(this).closest(".js-clients-blocks").find(".block").index($(this));$(a).data("flickityShowID",t),e($(a))}),$('[data-toggle="collapsible-section"]').on("click",function(a){a.preventDefault();var e=$(this).closest(".tab-content").index($(this).closest(".tab-pane"));$(this).hasClass("active")?($(this).removeClass("active").next(".collapse").collapse("hide"),$(this).closest(".tab-pane").addClass("in active"),-1!==e&&$(".videos-nav").find("li").removeClass("active").get(e).addClass("active")):($(".inner-fullsize-context").find(".collapse").collapse("hide").end().find('[data-toggle="collapsible-section"].active').removeClass("active"),$(this).addClass("active").next(".collapse").collapse("show"),$(this).closest(".tab-pane").removeClass("in active"),-1!==e&&$(".videos-nav").find("li").removeClass("active").get(e).addClass("active"),$(this).closest(".tab-pane").find(".flickity-enabled").flickity("resize"))}),$('[data-toggle="modal-callback"]').on("click",function(a){a.preventDefault();var e=$(this).attr("href"),l=$("#callback-modal");t(l,e)})});var map,image,beachMarker;"undefined"!=typeof google&&(google.maps.event.addDomListener(window,"load",contactsMapInit),google.maps.event.addDomListener(window,"resize",function(){var a=map.getCenter();google.maps.event.trigger(map,"resize"),map.setCenter(a)}));