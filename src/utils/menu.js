import $ from 'jquery';

export class Menu {
  constructor(matchMedia) {
    this.mobile = window.matchMedia(`(max-width: ${matchMedia}px)`);

    this.start();
  }

  start() {
    let self = this;

    self.checkResponsive(self);
    $(window).resize(() => {
      self.checkResponsive(self);
    });
  }

  detectTouch(e) {
    if (!$(e.target).is('.site-navbar__menu-trigger') && !$(e.target).is('.site-navbar__menu-container') && !$(e.target).closest('.site-navbar__menu-container').length && $('.site-navbar__menu-container').hasClass('site-navbar__menu-container--show-menu')) {
      e.preventDefault();
      $('.site-navbar__menu-container').removeClass('site-navbar__menu-container--show-menu');
      $('body').removeClass('noscroll');
    }
  }

  detectClick() {
    if ($('.site-navbar__menu-container').hasClass('site-navbar__menu-container--show-menu')) {
      $('.site-navbar__menu-container').removeClass('site-navbar__menu-container--show-menu');
      $('body').removeClass('noscroll');
    } else {
      $('.site-navbar__menu-container').addClass('site-navbar__menu-container--show-menu');
      $('body').addClass('noscroll');
    }
  }

  onSearch(e) {
    if (!$(this).parent().hasClass('site-navbar__search--show-input')) {
      e.preventDefault();
      $('.site-navbar__menu').addClass('transparent');
      $(this).parent().addClass('site-navbar__search--show-input');
      $('#navbar-search-input').focus();
    }
  }

  onFocusout(e) {
    if (!$(e.relatedTarget).is('.site-navbar__search-button')) {
      $(this).parent().removeClass('site-navbar__search--show-input');
      $('.site-navbar__menu').removeClass('transparent');
    }
  }

  checkResponsive(self) {

    $('body').removeClass('noscroll');
    $('body')[0].removeEventListener('touchstart', self.detectTouch, {passive: false});
    $('.site-navbar__menu-container').removeClass('site-navbar__menu-container--show-menu');
    $('.site-navbar__menu-trigger').off('click');
    $('.site-navbar__search-button').off('click');
    $('#navbar-search-input').off('focusout');

    if (self.mobile.matches) {
      $('body')[0].addEventListener('touchstart', self.detectTouch, {passive: false});
      $('.site-navbar__menu-trigger').click(self.detectClick);
      $('#navbar-search-form').addClass('site-navbar__search--show-input');
    } else {
      $('.site-navbar__search-button').click(self.onSearch);
      $('#navbar-search-input').focusout(self.onFocusout);
      $('#navbar-search-form').removeClass('site-navbar__search--show-input');
    }
  }
}