function contactsMapInit(){var e={zoom:14,center:new google.maps.LatLng(55.72198,37.6509183),mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0,draggable:!1,scrollwheel:!1};map=new google.maps.Map(document.getElementById("contacts-map"),e),image="img/static/crown.png",beachMarker=new google.maps.Marker({position:{lat:55.7234457,lng:37.6509298},map:map,icon:image})}$(function(){"use strict";$('[data-type="review-gallery"], [data-type="clients-gallery"], [data-type="cases-gallery"], [data-type="clients-gallery"], [data-type="mobile-clients-gallery"]').flickity({pageDots:!1,prevNextButtons:!1,wrapAround:!0}),$(".block.is-reviews, .block.is-clients, .block.is-cases-videos, .block.is-cases-photos, .block.is-clients-photos").on("click",'[data-type="gallery-prev-handler"], [data-type="gallery-next-handler"]',function(e){e.preventDefault();var a=$(this).closest(".block").find(".flickity-enabled").data("flickity");switch($(this).data("type")){case"gallery-prev-handler":a.previous(!0);break;case"gallery-next-handler":a.next(!0)}}),$(".mobile-nav-handler").on("click",function(){$(this).toggleClass("active")})});var map,image,beachMarker;google.maps.event.addDomListener(window,"load",contactsMapInit),google.maps.event.addDomListener(window,"resize",function(){var e=map.getCenter();google.maps.event.trigger(map,"resize"),map.setCenter(e)});