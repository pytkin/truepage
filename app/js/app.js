/* global renderIcons, FastClick */
$(function () {
	'use strict';

	// Attach fastclick for mobiles (https://github.com/ftlabs/fastclick)
	FastClick.attach(document.body);

	function getCasesModal(modal, modalFilter) {
		var url = '';
		switch (modalFilter) {
			case 'all':
				url = 'modals/cases-gallery-all.html';
				break;
			case 'photo':
				url = 'modals/cases-gallery-all.html';
				break;
			case 'video':
				url = 'modals/cases-gallery-video.html';
				break;
		}
		$.ajax({
			url: url,
			dataType: 'html',
			error: function () {
				console.warn('Проблема в получении данных для галереи');
			},
			success: function (data) {
				$(modal).find('.modal-content').html(data);
				renderIcons();
				$(modal).modal({
					backdropClass: 'modal-backdrop is-cases-modal-backdrop'
				}).modal('handleUpdate');

				if (modalFilter === 'video') {
					$(modal).on('hidden.bs.modal', function () {
						$(modal).find('.modal-content').empty();
					});
				}
			}
		});
	}

	function getReviewsModal(modal) {
		$.ajax({
			url: 'modals/reviews.html',
			dataType: 'html',
			error: function () {
				console.warn('Проблема в получении данных для модального окна');
			},
			success: function (data) {
				$(modal).find('.modal-content').html(data);
				renderIcons();
				$(modal).modal({
					backdropClass: 'modal-backdrop is-reviews-modal-backdrop'
				}).modal('handleUpdate');
			}
		});
	}

	function getCallbackModal(modal, modalFilter) {
		var url = '';
		switch (modalFilter) {
			case '#calc-form':
				url = 'modals/calc-form.html';
				break;
			case '#request-form':
				url = 'modals/request-form.html';
				break;
			case '#callback-form':
				url = 'modals/callback-form.html';
				break;
			case '#price-info':
				url = 'modals/price-info.html';
				break;
			case '#thank-notify':
				url = 'modals/thank-notify.html';
				break;
		}
		$.ajax({
			url: url,
			dataType: 'html',
			error: function () {
				console.warn('Проблема в получении данных для галереи');
			},
			success: function (data) {
				$(modal).find('.modal-content').html(data);
				renderIcons();
				$(modal).modal({
					backdropClass: 'modal-backdrop is-callback-backdrop'
				});
			}
		});
	}

	function attachModalGalleryesNavs(modal) {
		modal.on('click', '.gallery-prev-btn', function (event) {
			event.preventDefault();
			var gallery = $(this).closest('.modal-content').find('.flickity-enabled').data('flickity');
			gallery.previous(true);
		}).on('click', '.gallery-next-btn', function (event) {
			event.preventDefault();
			var gallery = $(this).closest('.modal-content').find('.flickity-enabled').data('flickity');
			gallery.next(true);
		});
	}

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

	// Mobile nav modal
	$('.mobile-nav-handler').on('click', function () {
		var modalTarget = $(this).data('target');
		$(this).toggleClass('active');
		$(modalTarget).modal({
			show: false,
			backdropClass: 'modal-backdrop is-mobile-nav-modal-backdrop'
		}).modal('toggle');
	});

	// Cases modal
	$('.js-cases-blocks').on('click', '.block', function (event) {
		event.preventDefault();
		var modalTarget = $(this).data('target');
		var targetID = $(this).closest('.js-cases-blocks').find('.block').index($(this));
		var modalType = $(this).data('modal-type');

		$(modalTarget).data('flickityShowID', targetID);
		getCasesModal($(modalTarget), modalType);
	});
	$(document).on('shown.bs.modal', function (event) {
		var targetID = $(event.target).data('flickityShowID');
		if ($(event.target).hasClass('cases-modal')) {
			$(event.target).find('.cases-gallery').flickity({
				initialIndex: targetID,
				prevNextButtons: false,
				pageDots: false
			});
		} else if ($(event.target).hasClass('reviews-modal')) {
			$(event.target).find('.reviews-modal-gallery').flickity({
				initialIndex: targetID,
				prevNextButtons: false,
				pageDots: false
			});
		}
		attachModalGalleryesNavs($(event.target));
	}).on('shown.bs.modal', function (event) {
		$(event.target).modal('handleUpdate');
	});

	// Clients modal
	$('.js-clients-blocks').on('click', '[data-toggle="review-modal"]', function (event) {
		event.preventDefault();
		var modalTarget = $(this).attr('href');
		var targetID = $(this).closest('.js-clients-blocks').find('.review-modal-link').index($(this).closest('.review-modal-link'));
		$(modalTarget).data('flickityShowID', targetID);
		getReviewsModal($(modalTarget));
	});

	// Collapsible video mobile sections
	$('[data-toggle="collapsible-section"]').on('click', function (event) {
		event.preventDefault();
		var tabIndex = $(this).closest('.tab-content').index($(this).closest('.tab-pane'));

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.collapse').collapse('hide');
			// make tab-content visible
			$(this).closest('.tab-pane').addClass('in active');
			if (tabIndex !== -1) {
				$('.videos-nav').find('li').removeClass('active').get(tabIndex).addClass('active');
			}
		} else {
			$('.inner-fullsize-context').find('.collapse').collapse('hide').end().find('[data-toggle="collapsible-section"].active').removeClass('active');
			$(this).addClass('active').next('.collapse').collapse('show');
			// make tab-content invisible
			$(this).closest('.tab-pane').removeClass('in active');
			if (tabIndex !== -1) {
				$('.videos-nav').find('li').removeClass('active').get(tabIndex).addClass('active');
			}
			// update flickity
			$(this).closest('.tab-pane').find('.flickity-enabled').flickity('resize');
		}
	});

	// Context modals
	$('[data-toggle="modal-callback"]').on('click', function (event) {
		event.preventDefault();
		var href = $(this).attr('href');
		var modal = $('#callback-modal');

		// hide mobile nav
		$('#mobile-nav-modal').modal('hide');
		$('.mobile-nav-handler').removeClass('active');

		getCallbackModal(modal, href);
	});

	// Isotope
	$('.js-cases-blocks, .js-clients-blocks').isotope({
		itemSelector: '.block'
	});
	$('.js-cases-grid-sort, .js-clients-grid-sort').on('click', 'a[data-sort]', function (event) {
		var sortFilter = $(this).data('sort');
		event.preventDefault();
		$(this).closest('ul').find('li').removeClass('active').end().end().closest('li').addClass('active');
		$('.js-cases-blocks, .js-clients-blocks').isotope({
			filter: sortFilter
		});
	});
	setTimeout(function () {
		$('.js-cases-blocks, .js-clients-blocks').isotope('layout');
	}, 100);
});
