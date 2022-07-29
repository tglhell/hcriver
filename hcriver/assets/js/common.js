$(function () {
	var itemLength = $('.list-array-box li'),
	liArrayBtn = $('.list-array-btn'),
	liArrayBox = $('.list-array-box li'),
	accorBtn = $('.btnAccordion'),
	showMainList = $('[ir] > li'),
	accorAll = $('.accordionAll'),
	toggleAccorItem = $('.accordion.toggle'),
	scrIdxLst = $('.scroll-idx-list a'),
	htmlBd = $('html, body'), winHgt = $(window).outerHeight(),
	aniItem = setTimeout, iNum = itemLength.length,
	scrItem = $('.scroll-item'), count = 3000,
	homeLink = $('.h-title a').attr('href'),
	prevLink = $('.btn-prev').attr('href'),
	nextLink = $('.btn-next').attr('href');

	htmlBd.stop().animate({scrollTop : 0}, 500, 'easeOutQuart');
	aniItem(function(){
		liArrayBtn.removeClass('on').find('span').text('view on');
		liArrayBox.removeClass('active');
	}, 1000);

	$('.background-box').css('transform', 'scale(1)');
	aniItem(function(){
		$('.background-desc').addClass('active');
	}, 800);

	// ir
	function irInsert() {
		$('[ir]').each(function(index){
			var iNum = showMainList.length, _this = $(this);
			if (_this.children().is('li')) {
				_this.removeAttr('ir').attr('ir-group-idx', (index + 1));
			} else {
				_this.removeAttr('ir').attr('ir-idx', (index + 1));
			}
			aniItem(function(){
				for (i = 0; i <= iNum ; i++) {
					$(function(i){
						aniItem(function(){
							showMainList.eq(i).addClass('active');
						}, 200 * i);
					}(i));
				}
			}, 800);
		});
	}
	irInsert();

	liArrayBtn.click(function(){
		if (!$(this).hasClass('on')) {
			for (i = 0; i <= iNum ; i++) {
				$(function(i){
					aniItem(function(){
						liArrayBox.eq(i).addClass('active');
					}, 100 * i);
				}(i));
			}
			$(this).addClass('on').find('span').text('view off');
		} else {
			for (i = iNum; i >= 0 ; i--) {
				$(function(i){
					aniItem(function(){
						liArrayBox.eq(iNum - i).removeClass('active');
					}, 50 * i);
				}(i));
			}
			$(this).removeClass('on').find('span').text('view on');
		}
	});

	$(window).resize(function(){
		scrHgt ();
	});

	// Scroll
	function scrHgt () {
		if (!$('.scroll-item').length == 0) {
			scrItem.css({'height':winHgt, 'padding-top':'40px'});
		} else {
			$('.container').css({'height':winHgt, 'padding-top':'40px'});
		}
	}
	scrHgt ();

	scrIdxLst.click(function(){
		event.preventDefault();
		var scrIdxNum = $(this).parent().index(),
		scrOffset = scrItem.eq(scrIdxNum).outerHeight();
		htmlBd.stop().animate({scrollTop:scrOffset * scrIdxNum}, 500);
		scrIdxLst.removeClass('on').parent().eq(scrIdxNum).find('a').addClass('on');
		scrItem.removeClass('active').eq(scrIdxNum).addClass('active');
		trgBtn ();
	});
	
	scrItem.on('mousewheel touchmove', function(e){
		var scrPos = $(window).scrollTop(),
		tScrNum = $('.scroll-item.active').index();
		
		if (!htmlBd.is(':animated') && $('[ir-group-idx] li.active').length == $('[ir-group-idx] li').length) {
			if (e.originalEvent.wheelDelta < 0) {
					htmlBd.stop().animate({scrollTop : scrPos + winHgt}, 800, 'easeOutQuart');
					if (tScrNum !== $(this.length)) {
						scrItem.eq(tScrNum + 1).addClass('active').siblings().removeClass('active');
						scrIdxLst.parent().eq(tScrNum + 1).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
					}
					trgBtn ();
					return false;
				} else {
					htmlBd.stop().animate({scrollTop : scrPos - winHgt}, 800, 'easeOutQuart');
					if (tScrNum !== 0) {
						scrItem.eq(tScrNum - 1).addClass('active').siblings().removeClass('active');
						scrIdxLst.parent().eq(tScrNum - 1).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
					}
					trgBtn ();
				return false;
			}
		} else {
			event.stopPropagation();
			return false;
		}
	});

	function trgBtn () {
		if (scrItem.eq(1).hasClass('active')) {
			aniItem(function(){
				if (liArrayBtn.is('.on') == false) {
					liArrayBtn.trigger('click');
				}
			}, 500);
		} else {
			aniItem(function(){
				liArrayBox.removeClass('active');
				liArrayBtn.removeClass('on');
			}, 500);
		}
		if (!scrItem.first().hasClass('active')) {
			scrItem.first().find('[ir-idx]').removeAttr('ir-idx').attr('ir', '');
			scrItem.first().find('[ir-group-idx]').children().removeClass('active').parent().removeAttr('ir-group-idx').attr('ir', '');
		} else {
			if (!scrItem.is(':animated')) {
				irInsert();
			}
		}
	}

	// Accordion
	accorBtn.click(function () {
		if (!htmlBd.is(':animated')) {
			var accorSpace = parseInt(accorBtn.parent().last().css('margin-top')),
			_this = $(this), btnHgt = _this.outerHeight(true) + accorSpace;
			if (!_this.closest('ul').hasClass('toggle')) {
				if (!_this.parent().hasClass('on')) {
					_this.parent().addClass('on').siblings().removeClass('on');
					_this.on('transitionend', function(){
						if (_this.parent().hasClass('on') && _this.is(':focus')) {
							htmlBd.stop().animate({scrollTop:_this.offset().top - btnHgt}, 700, 'easeInOutQuart');
						}
					});
				} else {
					htmlBd.stop().animate({scrollTop:_this.offset().top - btnHgt}, 700, 'easeInOutQuart');
				}
			} else {
				_this.parent().toggleClass('on');
				var offItemNum = toggleAccorItem.find('li').length,
				onItemNum = toggleAccorItem.find('li.on').length;
				if (onItemNum == offItemNum) {
					accorAll.addClass('active');
				} else {
					accorAll.removeClass('active');
				}
				_this.on('transitionend', function(){
					if (_this.parent().hasClass('on') && !accorAll.is(':focus') && _this.is(':focus')) {
						htmlBd.stop().animate({scrollTop:_this.offset().top - btnHgt}, 700, 'easeInOutQuart');
					}
				});
			}
		}
	});

	accorAll.click(function(){
		var ctrBoxHgt = $('.controlBox').outerHeight(true),
		_this = $(this);
		if (!_this.hasClass('active')) {
			_this.addClass('active');
			toggleAccorItem.find('li').addClass('on');
			_this.on('transitionend', function(){
				if (_this.hasClass('active') && _this.is(':focus')) {
					htmlBd.stop().animate({scrollTop:_this.offset().top - (ctrBoxHgt * 3)}, 700, 'easeInOutQuart');
				}	
			});
		} else {
			_this.removeClass('active');
			toggleAccorItem.find('li').removeClass('on');
		}
	});

	// Tab auto width
	var tabNav = $('.tab'),
	tabCnt = $('.tab-cont'),
	tabCntHgt = $('.tab-cont.on').outerHeight();
	$('.tab-outer-cont').css('height', tabCntHgt);
	$('.tab-cont.on').css('display', 'block');
	tabNav.find('a').click(function(e){
		e.preventDefault();
		if (!tabCnt.is(':animated')) {
			var tabIdx = $(this).parent().index();
			e.preventDefault();
			$(this).parent().addClass('on').siblings().removeClass('on');
			tabCnt.removeClass('on').eq(tabIdx).addClass('on');
			var tabHgt = $('.tab-cont.on').outerHeight();
			$('.tab-outer-cont').addClass('active').css({'height':tabHgt, 'transition':'height .7s ease-in-out'});
			tabCnt.slideUp(700);
			aniItem(function(){
				tabCnt.eq(tabIdx).slideDown(700);
			}, 700);
			aniItem(function(){
				$('.tab-outer-cont').removeClass('active');
			}, 1400);
		}
	});

	// Page Control Key Binding
	$(document).keyup(function(e) {
    switch(e.which) {
			case 37: // left
			location.href = prevLink;
			break;
			case 38: // up
				location.href = homeLink;
				break;
			case 39: // right
				location.href = nextLink;
				break;
			default:
				return;
    }
	});

	// Ajax html load
	$('.list-control-box button').click(function(){
		var lcIdx = $(this).index(),
		pgNum = $('.h-title a').attr('page-num');
		if ($(this).hasClass('control-btn-next')) {
			$(this).addClass('active');
			ajaxListOut ();
			aniItem(function(){
				$.ajax({
					type: 'get',
					url: '/hcriver/guide/ajax/main-list02.html',
					dataType : 'html',
					success: function(data) {
						$('.page-name-outer .page-name-list').html(data);
						ajaxListIn ();
					}
				});
			}, 1200);
			aniItem(function(){
				$('.list-control-box button').eq(lcIdx).siblings().removeClass('active');
				if (pgNum > 5) {
					$('.page-name-list li').eq(pgNum-6).addClass('on');
				}
			}, count);
		} else {
			$(this).addClass('active');
			ajaxListOut ();
			aniItem(function(){
				$.ajax({
					type: 'get',
					url: '/hcriver/guide/ajax/main-list01.html',
					dataType : 'html',
					success: function(data) {
						$('.page-name-outer .page-name-list').html(data);
						ajaxListIn ();
					}
				});
			}, 1200);
			aniItem(function(){
				$('.list-control-box button').eq(lcIdx).siblings().removeClass('active');
				if (pgNum < 6) {
					$('.page-name-list li').eq(pgNum).addClass('on');
				}
			}, count);
		}
	});

	function ajaxListOut () {
		for (i = 6; i >= 0 ; i--) {
			$(function(i){
				aniItem(function(){
					$('.page-name-list[ir-group-idx] li').eq(6 - i).removeClass('active');
				}, 100 * i);
			}(i));
		}
	}

	function ajaxListIn () {
		aniItem(function(){
			for (i = 0; i <= 6 ; i++) {
				$(function(i){
					aniItem(function(){
						$('.page-name-list[ir-group-idx] li').eq(i).addClass('active');
					}, 200 * i);
				}(i));
			}
		}, 200);
	}

	// Text-Change
	bkTxt = $('.btn-chg-txt span').text();
	$('.btn-chg-txt').click(function(){
		_this = $(this).find('span');
		_this.toggleClass('on');
		if (_this.hasClass('on')) {
			_this.text('Change Complete!!');
		} else {
			_this.text(bkTxt);
		}
	});

	// Pulldown Menu
	$('.pulldown-menu-list').find('> li').on('mouseenter mouseleave click', function(e){
		var _this = $(this),
		pOuterMt = parseInt($('.pulldown-menu-outer').css('margin-top')),
		pSubList = _this.find('.pulldown-sub-list');
		if (e.type == 'mouseenter') {
			itemHgt = pSubList.css('height', 'auto').height();
			pSubList.css('height', '0');
			if (!pSubList.is(':animated')) {
				_this.closest('.pulldown-menu-outer').css({'margin-bottom':itemHgt+pOuterMt, 'transition-delay':'0s'});
				pSubList.animate({'height':itemHgt}, 0);
			}
		} else if (e.type == 'click') {
			event.preventDefault();
		} else {
			_this.find('.pulldown-sub-list').css('height', '0');
			_this.closest('.pulldown-menu-outer').css({'margin-bottom':'0'});
		}
	});

	// Popup
	$('.popup').click((function () {
		var returnTar;
		return function (e) {
			var bodyWid = $('body').width();
			returnTar = $(e.target).closest('button'),
			wSize = $(window).width(),
			popIdx = $(this).attr('pop-idx');
			$('.layerPopupWrap' + '[pop-idx=' + popIdx + ']').fadeIn(500).css('display', 'table');
			$('.layerPopupCont').attr('tabindex', '0').fadeIn(500);
			if (wSize > 1024) {
				$('body').css({ 'overflow': 'hidden', 'width': bodyWid });
			}
			aniItem(function () {
				$('.layerPopupCont').focus().append('<a href="#" class="tarLoop"></a>');
				$('.tarLoop').focusin(function () {
					$('.layerPopupCont').focus();
				});
			}, 0);
			
			$('.popupClose, .layerPopupWrap').click(function (e) {
				var tarItem = $('.layerPopupCont > div, .layerTitle, .layerCont *');
				if (!$(e.target).is(tarItem)) {
					$('.layerPopupWrap').fadeOut(500);
					$('.layerPopupCont').removeAttr('tabindex').fadeOut(500);
					$('.tarLoop').remove();
					aniItem(function () {
						returnTar.focus();
					}, 0);
					aniItem(function(){
						if (wSize > 1024) {
							$('body').css({'overflow':'auto', 'width':'auto'});
						}
					}, 800);
				}
			});
		}
	})());

	// browser check useragent
	// var userAgent=navigator.userAgent.toLowerCase();
	// if (userAgent.indexOf('edge')>-1){
	// 	printGuideMsg ();
	// } else if (userAgent.indexOf('whale')>-1){
	// 	window.print();
	// } else if (userAgent.indexOf('chrome')>-1){
	// 	window.print();
	// } else if (userAgent.indexOf('firefox')>-1){
	// 	printGuideMsg ();
	// } else {
	// 	printGuideMsg ();
	// }
	// function printGuideMsg () {
	// 	alert('인쇄 기능은 크롬 브라우저를 이용해 주시기 바랍니다.');
	// }
});