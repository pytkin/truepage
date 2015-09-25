/* global renderIcons */
$(function () {
	'use strict';

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
				url = 'modals/cases-gallery-all.html';
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
				});
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
			gallery.previous(true);
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
	});

	// Clients modal
	$('.js-clients-blocks').on('click', '.icon-review', function () {
		var modalTarget = $(this).data('target');
		var targetID = $(this).closest('.js-clients-blocks').find('.block').index($(this));
		$(modalTarget).data('flickityShowID', targetID);
		getReviewsModal($(modalTarget));
	});
});
