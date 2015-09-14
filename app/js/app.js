$(function () {
	'use strict';
	$('[data-type="review-gallery"], [data-type="clients-gallery"]').flickity({
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true
	});
	$('.block.is-reviews, .block.is-clients').on('click', '[data-type="gallery-prev-handler"], [data-type="gallery-next-handler"]', function (event) {
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
});