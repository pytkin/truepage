/* global google */
'use strict';

var map;
var image;
var beachMarker;

function contactsMapInit() {
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(55.72198, 37.6509183),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		draggable: false,
		scrollwheel: false
	};

	map = new google.maps.Map(document.getElementById('contacts-map'), mapOptions);
	image = 'img/static/crown.png';
	beachMarker = new google.maps.Marker({
		position: {
			lat: 55.7234457,
			lng: 37.6509298
		},
		map: map,
		icon: image
	});
}

if (typeof google !== 'undefined') {
	// Add event listeners
	google.maps.event.addDomListener(window, 'load', contactsMapInit);
	google.maps.event.addDomListener(window, 'resize', function () {
		var center = map.getCenter();
		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
	});
}
