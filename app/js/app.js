$(function () {
	'use strict';

	// Галереи клиенты и отзывы
	$('[data-type="review-gallery"], [data-type="clients-gallery"], [data-type="cases-gallery"], [data-type="clients-gallery"], [data-type="mobile-clients-gallery"]').flickity({
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true
	});

	// Стрелочки для галерей
	$('.block.is-reviews, .block.is-clients, .block.is-cases-videos, .block.is-cases-photos, .block.is-clients-photos').on('click', '[data-type="gallery-prev-handler"], [data-type="gallery-next-handler"]', function (event) {
		event.preventDefault();
		var gallery = $(this).closest('.block').find('.flickity-enabled').data('flickity');
		switch ($(this).data('type')) {
			case 'gallery-prev-handler':
				gallery.previous(true);
				break;
			case 'gallery-next-handler':
				gallery.next(true);
				break;
		}
	});

	$('.mobile-nav-handler').on('click', function () {
		$(this).toggleClass('active');
	});
});
