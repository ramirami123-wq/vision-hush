/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4028:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/lazysizes/lazysizes.js
var lazysizes = __webpack_require__(7090);
var lazysizes_default = /*#__PURE__*/__webpack_require__.n(lazysizes);
// EXTERNAL MODULE: ./node_modules/lazysizes/plugins/rias/ls.rias.js
var ls_rias = __webpack_require__(1035);
;// CONCATENATED MODULE: ./src/js/utils/lazysizes.js



// https://github.com/imgix/imgix.js/blob/7b58445832ec520b7d115b107290dfd55223166f/src/targetWidths.js
(lazysizes_default()).cfg.rias.widths = [100, 116, 134, 156, 182, 210, 244, 282, 328, 380, 442, 512, 594, 688, 798, 926, 1074, 1246, 1446, 1678, 1946, 2258, 2618, 3038, 3524, 4088, 4742, 5500, 6380, 7400];
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.esm.js + 88 modules
var swiper_esm = __webpack_require__(7099);
;// CONCATENATED MODULE: ./src/js/utils/swiper.js

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var matcher = window.matchMedia("(pointer: fine)");
swiper_esm/* default.extendDefaults */.ZP.extendDefaults(_objectSpread({
  preventClicks: false,
  preventClicksPropagation: false
}, matcher.matches && {
  longSwipesMs: 100,
  longSwipesRatio: 0.2,
  shortSwipes: false
}));

// https://github.com/nolimits4web/swiper/blob/d68a71bea14361010ef201b15359ed6a64c37f4c/src/core/core.js#L91-L98
var BetterClickHandler = function BetterClickHandler(_ref) {
  var swiper = _ref.swiper,
    on = _ref.on,
    emit = _ref.emit;
  var allowClick = false;
  var onClick = function onClick(e) {
    if (allowClick) {
      emit('ppClick', e);
    } else {
      e.preventDefault();

      // https://github.com/nolimits4web/swiper/blob/d68a71bea14361010ef201b15359ed6a64c37f4c/src/core/events/onClick.js
      if (swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  };
  var onTouchStart = function onTouchStart() {
    allowClick = false;
  };
  var onTouchEnd = function onTouchEnd() {
    var data = swiper.touchEventsData;
    var touchEndTime = Date.now();
    var timeDiff = touchEndTime - data.touchStartTime;
    var moveDiff = data.isMoved ? Math.abs(data.currentTranslate - data.startTranslate) : 0;
    // console.log(`touch end details ${timeDiff} ${moveDiff}`);
    allowClick = timeDiff < 200 && moveDiff < 5;
  };
  var onInit = function onInit() {
    swiper.el.addEventListener('click', onClick);
  };
  var onDestroy = function onDestroy() {
    swiper.el.removeEventListener('click', onClick);
  };
  on('init', onInit);
  on('destroy', onDestroy);
  on('touchStart', onTouchStart);
  on('touchEnd', onTouchEnd);
};
swiper_esm/* default.use */.ZP.use(BetterClickHandler);
// EXTERNAL MODULE: ./node_modules/alpinejs/dist/module.esm.js
var module_esm = __webpack_require__(4306);
// EXTERNAL MODULE: ./src/js/bundles/snippets/navigation.js
var navigation = __webpack_require__(4084);
// EXTERNAL MODULE: ./src/js/utils/index.js
var utils = __webpack_require__(2575);
;// CONCATENATED MODULE: ./src/js/alpine-plugins/x-on-shopify.js
/**
 * A custom directive that allows Alpine components to subscribe to Shopify theme editor events.
 * `x-on-shopify` requires a modifier and a value.
 *
 * Example: x-on-shopify:block-select="onShopifyBlockSelect"
 *
 * Modifier:
 * The modifier should be the name of the Shopify event you want to subscribe to in kebab case
 * e.g. shopify:section:select => x-on-shopify:section-select
 * For a list of all events see:
 * https://shopify.dev/docs/themes/architecture/sections/integrate-sections-with-the-theme-editor#javascript-events
 *
 * Value:
 * The value should be the name of the callback function you want to run when the event is emitted.
 * This should be a method on your Alpine component.
 *
 *
 * IMPORTANT:
 * Ensure you add `data-section-id` and `data-block-id` attributes to your elements where appropriate.
 * These are needed to scope events to specific section instances.
 *
 * You should also add {{ block.shopify_attributes }} to any blocks used. This is required by Shopify's
 * theme editor to correctly identify the target when emitting block events.
 *
 * e.g:
 *  <div data-section-id="{{ section.id }}">
 *    ...
 *    {% for block in section.blocks %}
 *      <div data-block-id="{{ block.id }}" {{ block.shopify_attributes }}>
 *        ...
 *      </div>
 *    {% endfor %}
 *  </div>
 */

var eventNames = ['shopify:inspector:activate', 'shopify:inspector:deactivate', 'shopify:section:load', 'shopify:section:unload', 'shopify:section:select', 'shopify:section:deselect', 'shopify:section:reorder', 'shopify:block:select', 'shopify:block:deselect'];

/**
 * Pub/sub implementation to allow Alpine components to subscribe to
 * scoped Shopify theme events.
 */
var shopifyThemeEvents = {
  events: {},
  subscribe: function subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe: function unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  publish: function publish(eventName, payload) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(payload);
      });
    }
  },
  setEventListeners: function setEventListeners() {
    var _this = this;
    eventNames.forEach(function (eventName) {
      document.addEventListener(eventName, function (event) {
        return _this.emitEvent(event);
      });
    });
  },
  emitEvent: function emitEvent(event) {
    var _this2 = this;
    var sectionId = event.detail.sectionId;
    var normalizedEventName = (0,utils/* convertToCamelCase */.yJ)(event.type);
    var container = document.querySelector("[data-section-id=\"".concat(sectionId, "\"]"));
    if (container !== null) {
      // Include the Shopify event object and the section container node in the payload
      var payload = {
        event: event,
        container: container
      };

      // After editing section content Shopify will re-render the entire section
      // setTimeout is needed to prevent the event from firing before this change
      setTimeout(function () {
        // Scope the event to the section id so we can subscribe to it
        // from each instance of a section
        _this2.publish("".concat(normalizedEventName, ":").concat(sectionId), payload);
      }, 0);
    }
  },
  init: function init() {
    // Only set event listeners in the theme editor
    if (window.Shopify.designMode) {
      this.setEventListeners();
    }
  }
};
/* harmony default export */ function x_on_shopify(Alpine) {
  shopifyThemeEvents.init();
  Alpine.directive('on-shopify', function (el, _ref, _ref2) {
    var _el$dataset;
    var value = _ref.value,
      expression = _ref.expression;
    var evaluate = _ref2.evaluate,
      cleanup = _ref2.cleanup;
    // Early return if not in the theme editor
    if (!window.Shopify.designMode) {
      return;
    }
    var sectionId = el === null || el === void 0 ? void 0 : (_el$dataset = el.dataset) === null || _el$dataset === void 0 ? void 0 : _el$dataset.sectionId;
    var normalizedEventName = (0,utils/* convertToCamelCase */.yJ)("shopify-".concat(value));
    var scopedEventName = "".concat(normalizedEventName, ":").concat(sectionId);
    var callback = function callback() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return evaluate(expression, {
        params: [].concat(args)
      });
    };
    if (sectionId) {
      shopifyThemeEvents.subscribe(scopedEventName, callback);
      cleanup(function () {
        shopifyThemeEvents.unsubscribe('scopedEventName', callback);
      });
    }
  });
}
// EXTERNAL MODULE: ./src/js/bundles/snippets/drawer.js
var drawer = __webpack_require__(704);
// EXTERNAL MODULE: ./src/js/bundles/sections/header.js
var header = __webpack_require__(7420);
// EXTERNAL MODULE: ./src/js/bundles/snippets/faq.js
var faq = __webpack_require__(185);
// EXTERNAL MODULE: ./src/js/bundles/snippets/product-card.js
var product_card = __webpack_require__(8609);
// EXTERNAL MODULE: ./src/js/bundles/sections/product-browser.js
var product_browser = __webpack_require__(7036);
// EXTERNAL MODULE: ./src/js/bundles/snippets/quick-view-drawer.js
var quick_view_drawer = __webpack_require__(6688);
// EXTERNAL MODULE: ./src/js/bundles/snippets/cart.js
var cart = __webpack_require__(1625);
// EXTERNAL MODULE: ./src/js/bundles/snippets/line-item.js
var line_item = __webpack_require__(3519);
// EXTERNAL MODULE: ./src/js/bundles/snippets/quantity-selector.js
var quantity_selector = __webpack_require__(2887);
// EXTERNAL MODULE: ./src/js/bundles/snippets/product-variant-selection.js
var product_variant_selection = __webpack_require__(9781);
// EXTERNAL MODULE: ./src/js/bundles/snippets/quick-add-drawer.js
var quick_add_drawer = __webpack_require__(3776);
// EXTERNAL MODULE: ./src/js/bundles/snippets/quick-add-drawer-wrapper.js
var quick_add_drawer_wrapper = __webpack_require__(8529);
// EXTERNAL MODULE: ./src/js/bundles/snippets/cart-drawer.js
var cart_drawer = __webpack_require__(2854);
// EXTERNAL MODULE: ./src/js/bundles/sections/cart-section.js
var cart_section = __webpack_require__(1594);
// EXTERNAL MODULE: ./src/js/bundles/sections/hero-product.js
var hero_product = __webpack_require__(6465);
// EXTERNAL MODULE: ./src/js/bundles/snippets/hero-product-gallery.js
var hero_product_gallery = __webpack_require__(5246);
// EXTERNAL MODULE: ./src/js/bundles/snippets/hero-product-add.js
var hero_product_add = __webpack_require__(6590);
// EXTERNAL MODULE: ./src/js/bundles/snippets/hero-product-info.js
var hero_product_info = __webpack_require__(1842);
// EXTERNAL MODULE: ./src/js/bundles/snippets/hero-product-accordion.js
var hero_product_accordion = __webpack_require__(1745);
// EXTERNAL MODULE: ./src/js/bundles/sections/construction.js
var construction = __webpack_require__(4480);
// EXTERNAL MODULE: ./src/js/bundles/snippets/product-card-quick-add.js
var product_card_quick_add = __webpack_require__(3189);
// EXTERNAL MODULE: ./src/js/bundles/sections/guidance-steps.js
var guidance_steps = __webpack_require__(809);
// EXTERNAL MODULE: ./src/js/bundles/sections/product-explorer.js
var product_explorer = __webpack_require__(1185);
// EXTERNAL MODULE: ./src/js/bundles/sections/instagram-slider.js
var instagram_slider = __webpack_require__(3465);
// EXTERNAL MODULE: ./src/js/bundles/snippets/video-observer.js
var video_observer = __webpack_require__(7531);
// EXTERNAL MODULE: ./src/js/bundles/sections/animated-accordions.js
var animated_accordions = __webpack_require__(4612);
// EXTERNAL MODULE: ./src/js/bundles/sections/reviews-carousel.js
var reviews_carousel = __webpack_require__(4962);
// EXTERNAL MODULE: ./src/js/bundles/sections/animated-paragraph.js
var animated_paragraph = __webpack_require__(8630);
// EXTERNAL MODULE: ./src/js/bundles/snippets/pdp-add-ons.js
var pdp_add_ons = __webpack_require__(4955);
// EXTERNAL MODULE: ./src/js/bundles/sections/testimonials.js
var testimonials = __webpack_require__(7616);
// EXTERNAL MODULE: ./src/js/bundles/sections/benefits-carousal.js
var benefits_carousal = __webpack_require__(5531);
// EXTERNAL MODULE: ./src/js/bundles/sections/best-seller-cards.js
var best_seller_cards = __webpack_require__(2981);
// EXTERNAL MODULE: ./src/js/bundles/sections/customer-address-form.js
var customer_address_form = __webpack_require__(795);
;// CONCATENATED MODULE: ./src/js/bundles/layout/theme.js
/*
 * Basic file with global javascript.
 * Files imported here will be available on every page.
 */







/** Global Scripts */






/** Collection Scripts */




/** Cart Scripts */









/** Product Detail Page Scripts */







/** Components */













/** Customer */


// create an event listener here
document.addEventListener('cart-updated', function (_ref) {
  var detail = _ref.detail;
  var cartCountSelector = document.querySelector('.notification-badge');
  cartCountSelector.innerHTML = detail.cart.item_count;
});

/** Global Components */
module_esm/* default.data */.Z.data('navMobile', navigation/* navMobileComponent */.Kh);
module_esm/* default.data */.Z.data('drawer', drawer/* default */.Z);
module_esm/* default.data */.Z.data('headerSection', header/* default */.Z);

/** Collection Components */
module_esm/* default.data */.Z.data('productCard', product_card/* default */.Z);
module_esm/* default.data */.Z.data('productBrowser', product_browser/* default */.Z);
module_esm/* default.data */.Z.data('quickViewDrawer', quick_view_drawer/* default */.Z);

/**Load Cart Components */
module_esm/* default.data */.Z.data('cartComponent', cart/* cartComponent */.i5);
module_esm/* default.data */.Z.data('productData', product_variant_selection/* productData */.J);
module_esm/* default.data */.Z.data('lineItemComponent', line_item/* default */.Z);
module_esm/* default.data */.Z.data('quantitySelector', quantity_selector/* default */.Z);
module_esm/* default.data */.Z.data('quickAddDrawer', quick_add_drawer/* default */.Z);
module_esm/* default.data */.Z.data('quickAddDrawerWrapper', quick_add_drawer_wrapper/* default */.Z);
module_esm/* default.data */.Z.data('cartDrawer', cart_drawer/* default */.Z);
module_esm/* default.data */.Z.data('cartSection', cart_section/* default */.Z);

/** Load Product Detail Page Components */
module_esm/* default.data */.Z.data('heroProduct', hero_product/* default */.Z);
module_esm/* default.data */.Z.data('heroProductGallery', hero_product_gallery/* default */.Z);
module_esm/* default.data */.Z.data('heroProductAdd', hero_product_add/* default */.Z);
module_esm/* default.data */.Z.data('heroProductInfo', hero_product_info/* default */.Z);
module_esm/* default.data */.Z.data('heroProductAccordion', hero_product_accordion/* default */.Z);
module_esm/* default.data */.Z.data('productCardQuickAdd', product_card_quick_add/* default */.Z);
module_esm/* default.data */.Z.data('testimonialsCarousel', testimonials/* default */.Z);
module_esm/* default.data */.Z.data('benefitsCarousel', benefits_carousal/* default */.Z);

/** Customer Section */
module_esm/* default.data */.Z.data('customerAddressForm', customer_address_form/* default */.Z);

/** Extra Components */
module_esm/* default.data */.Z.data('guidanceStepsSection', guidance_steps/* default */.Z);
module_esm/* default.data */.Z.data('productExplorer', product_explorer/* default */.Z);
module_esm/* default.data */.Z.data('instagramCarousel', instagram_slider/* default */.Z);
module_esm/* default.data */.Z.data('videoObserver', video_observer/* default */.Z);
module_esm/* default.data */.Z.data('animatedAccordions', animated_accordions/* default */.Z);
module_esm/* default.data */.Z.data('reviewsCarousel', reviews_carousel/* default */.Z);
module_esm/* default.data */.Z.data('animatedPara', animated_paragraph/* default */.Z);
module_esm/* default.data */.Z.data('productAddOns', pdp_add_ons/* default */.Z);
module_esm/* default.data */.Z.data('construction', construction/* default */.Z);
module_esm/* default.data */.Z.data('bundleCard', best_seller_cards/* default */.Z);
var cartStoreInstance = (0,cart/* cartStore */.i8)();
module_esm/* default.store */.Z.store('cart', cartStoreInstance);
window.cartStore = cartStoreInstance;
module_esm/* default.plugin */.Z.plugin(x_on_shopify);
(0,faq/* default */.Z)();
window.Alpine = module_esm/* default */.Z;
module_esm/* default.start */.Z.start();

// // BUGHERD
// if (window.location.hostname !== '127.0.0.1' && !window.Shopify.designMode && window.Shopify.theme.role !== 'main') {
//   const script = document.createElement('script');
//   script.src = 'https://www.bugherd.com/sidebarv2.js?apikey=sdhp7plyvroqvcyjxal6zq';
//   document.head.append(script);
// }

/***/ }),

/***/ 4612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var animatedAccordions = function animatedAccordions() {
  return {
    init: function init() {
      this.buildAccordions();
    },
    buildAccordions: function buildAccordions() {
      var _this = this;
      // to toggle accordion animations
      var accordionWrapper = document.querySelector('.accordionsAnimate__copy');
      var myAccordions = document.querySelectorAll('.js-animate-accordion');
      var delayTime = document.querySelector('.accordionsAnimate__accordions').dataset.delay;
      var counter = 1;
      var performAsyncTask = /*#__PURE__*/function () {
        var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(item) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  item.setAttribute('open', '');
                  if (counter !== myAccordions.length) {
                    setTimeout(function () {
                      item.removeAttribute('open');
                      resolve();
                    }, delayTime);
                  }
                }));
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function performAsyncTask(_x) {
          return _ref.apply(this, arguments);
        };
      }();
      var processArray = /*#__PURE__*/function () {
        var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(array) {
          var _iterator, _step, item;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(array);
                _context2.prev = 1;
                _iterator.s();
              case 3:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 10;
                  break;
                }
                item = _step.value;
                _context2.next = 7;
                return performAsyncTask(item);
              case 7:
                counter++;
              case 8:
                _context2.next = 3;
                break;
              case 10:
                _context2.next = 15;
                break;
              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                _iterator.e(_context2.t0);
              case 15:
                _context2.prev = 15;
                _iterator.f();
                return _context2.finish(15);
              case 18:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[1, 12, 15, 18]]);
        }));
        return function processArray(_x2) {
          return _ref2.apply(this, arguments);
        };
      }();
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            processArray(myAccordions)["catch"](function (error) {
              console.error('An error occurred:', error);
            });
            if (window.innerWidth < 1024) {
              _this.scrollElementIntoView(document.querySelector('details[open].accordionsAnimate__accordionWrapper'));
            }
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.01
      });
      observer.observe(accordionWrapper);
      myAccordions.forEach(function (detailsTag) {
        detailsTag.addEventListener('toggle', function (e) {
          if (e.target.open) {
            var accordionIndex = e.target.dataset.index;
            document.querySelectorAll('.accordionsAnimate__imageWrap').forEach(function (imageWrap) {
              imageWrap.dataset.index === accordionIndex ? imageWrap.classList.remove('hide') : imageWrap.classList.add('hide');
            });
            e.target.querySelector('.accordionsAnimate__accordionContent').style.height = e.target.querySelector('.accordionsAnimate__accordionContent').scrollHeight + 'px';
          } else {
            e.target.querySelector('.accordionsAnimate__accordionContent').style.height = '0px';
          }
        });
      });
      document.querySelectorAll('.accordionsAnimate__accordionHeader').forEach(function (summaryTag) {
        summaryTag.addEventListener('click', function () {
          myAccordions.forEach(function (item) {
            item.removeAttribute('open');
          });
          document.querySelectorAll(".accordionsAnimate__progressBorder span").forEach(function (span) {
            span.style.width = '0px';
          });
        });
      });
    },
    scrollElementIntoView: function scrollElementIntoView(element) {
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animatedAccordions);

/***/ }),

/***/ 8630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var animatedPara = function animatedPara() {
  return {
    percentagePassed: 0,
    activeSentenceIndex: 0,
    init: function init() {
      this.calculatePercentagePassed = this.calculatePercentagePassed.bind(this);
      window.addEventListener('scroll', this.calculatePercentagePassed);
    },
    calculatePercentagePassed: function calculatePercentagePassed() {
      var section = document.querySelector('.animePara');
      var sectionTop = section.getBoundingClientRect().top;
      var sectionHeight = section.offsetHeight;
      var screenCenter = window.innerHeight / 2;

      // Calculate how much of the section has passed the screen center
      var passedCenter = screenCenter - sectionTop;
      if (passedCenter > 0) {
        // Calculate percentage passed of section's total height
        this.percentagePassed = Math.min(100, (passedCenter / sectionHeight * 100).toFixed(2));

        // Determine which sentence should be active based on percentage
        var totalSentences = document.querySelector('.js-anime-headingWrap').dataset.items;
        this.activeSentenceIndex = Math.min(totalSentences - 1, Math.floor(this.percentagePassed / (100 / totalSentences)));
      } else {
        this.percentagePassed = 0;
        this.activeSentenceIndex = 0;
      }
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animatedPara);

/***/ }),

/***/ 5531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var benefitsCarousel = function benefitsCarousel() {
  return {
    swiper: null,
    playing: false,
    init: function init() {
      this.cacheNodes();
      this.buildSwiper();
    },
    cacheNodes: function cacheNodes() {
      this.swiperContainer = document.querySelector('.benefits__content-container');
    },
    buildSwiper: function buildSwiper() {
      if (this.swiper || !this.swiperContainer) {
        return;
      }
      this.swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(this.swiperContainer, {
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        spaceBetween: 32,
        navigation: {
          nextEl: this.swiperContainer.querySelector('.swiper-button-next-benefits'),
          prevEl: this.swiperContainer.querySelector('.swiper-button-prev-benefits'),
          disabledClass: 'swiper-button-hidden'
        },
        breakpoints: {
          320: {
            slidesPerView: 'auto',
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
            spaceBetween: 20
          },
          520: {
            slidesPerView: 'auto',
            slidesOffsetAfter: 20
          },
          1023: {
            slidesPerView: 2.15
          },
          1200: {
            slidesPerView: 'auto',
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 32
          }
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (benefitsCarousel);

/***/ }),

/***/ 2981:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);
/* harmony import */ var _js_utils_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1986);


var bundleCard = function bundleCard() {
  return {
    init: function init() {
      this.buildBundleSlider();
    },
    buildBundleSlider: function buildBundleSlider() {
      if (document.querySelector('.js-bundle-cards') != null) {
        var bundleCarousel = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP('.js-bundle-cards', {
          slidesPerView: 1.2,
          centeredSlides: true,
          spaceBetween: 16,
          breakpoints: {
            1024: {
              slidesPerView: 3,
              centeredSlides: false
            }
          }
        });
      }
    },
    bundleAddtoCart: function bundleAddtoCart(variantId) {
      (0,_js_utils_product__WEBPACK_IMPORTED_MODULE_1__/* .quickAddToCart */ .GJ)(variantId);
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bundleCard);

/***/ }),

/***/ 1594:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var cartSection = function cartSection() {
  return {
    init: function init() {
      this.loadTemplate();
    },
    loadTemplate: function loadTemplate() {
      var content = document.querySelector('.js-cart-template').content.cloneNode(true);
      content.querySelector('.cart').classList.add('cart--section');
      this.$refs.target.replaceChildren(content);
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cartSection);

/***/ }),

/***/ 4480:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var construction = function construction() {
  return {
    init: function init() {
      this.updateImage();
      this.observeUrlChanges();
    },
    updateImage: function updateImage() {
      var variantId = this.getParameterByName('variant');
      var maleImageElement = document.getElementById('layered-male-image');
      var femaleImageElement = document.getElementById('layered-female-image');
      if (variantId === '44801904312487') {
        maleImageElement.style.display = 'none';
        femaleImageElement.style.display = 'block';
      } else {
        maleImageElement.style.display = 'block';
        femaleImageElement.style.display = 'none';
      }
    },
    getParameterByName: function getParameterByName(name) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
      name = name.replace(/[[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    observeUrlChanges: function observeUrlChanges() {
      var _this = this;
      window.addEventListener('popstate', function () {
        _this.updateImage();
      });
      var observer = new MutationObserver(function () {
        _this.updateImage();
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (construction);

/***/ }),

/***/ 795:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var customerAddressForm = function customerAddressForm() {
  return {
    setDefaultCountry: function setDefaultCountry() {
      var countrySelect = this.$refs.countrySelect;
      var defaultCountry = countrySelect.dataset["default"];
      if (defaultCountry) {
        countrySelect.value = defaultCountry;
      }
    },
    setDefaultProvince: function setDefaultProvince() {
      var provinceSelect = this.$refs.provinceSelect;
      var defaultProvince = provinceSelect.dataset["default"];
      if (defaultProvince) {
        provinceSelect.value = defaultProvince;
      }
    },
    /**
     * Update provinces options based on selected country
     */
    updateProvinces: function updateProvinces() {
      var _this$$refs = this.$refs,
        countrySelect = _this$$refs.countrySelect,
        provinceSelect = _this$$refs.provinceSelect,
        provinceField = _this$$refs.provinceField;
      var country = countrySelect[countrySelect.selectedIndex];
      if (!country) {
        return;
      }
      var provinces = JSON.parse(country.dataset.provinces);
      provinceSelect.innerHTML = '';
      provinceSelect.value = '';
      if (!provinces.length) {
        provinceField.classList.add('is-hidden');
        return;
      }
      provinceField.classList.remove('is-hidden');
      provinceSelect.innerHTML = provinces.map(function (province) {
        return "<option value=\"".concat(province[0], "\">").concat(province[1], "</option>");
      }).join('');
    },
    init: function init() {
      this.setDefaultCountry();
      this.updateProvinces();
      this.setDefaultProvince();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (customerAddressForm);

/***/ }),

/***/ 809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var guidanceStepsSection = function guidanceStepsSection() {
  return {
    activeSlideStep: 1,
    swiperInstance: null,
    init: function init() {
      this.loadTemplate();
      window.addEventListener('resize', this.handleResize.bind(this));
      this.handleResize(); // Initial check on load
    },
    loadTemplate: function loadTemplate() {
      if (window.innerWidth < 1024) {
        this.initSwiper();
      } else if (this.swiperInstance) {
        this.destroySwiper();
      }
    },
    initSwiper: function initSwiper() {
      var _this = this;
      if (!this.swiperInstance) {
        this.swiperInstance = new swiper__WEBPACK_IMPORTED_MODULE_0__/* .Swiper */ .tq('.js-guidanceStep-slider', {
          slidesPerView: 1.15,
          spaceBetween: 20,
          centeredSlides: true,
          grabCursor: true,
          slidesOffsetAfter: 18,
          on: {
            slideChange: function slideChange(swiper) {
              _this.activeSlideStep = swiper.activeIndex + 1;
            }
          }
        });
      }
    },
    destroySwiper: function destroySwiper() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy();
        this.swiperInstance = null;
      }
    },
    handleResize: function handleResize() {
      this.loadTemplate();
    },
    handleStepCircleClick: function handleStepCircleClick(index) {
      if (this.swiperInstance) {
        this.swiperInstance.slideTo(index);
      }
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (guidanceStepsSection);

/***/ }),

/***/ 7420:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var headerSection = function headerSection() {
  return {
    init: function init() {
      this.loadTemplate();
    },
    loadTemplate: function loadTemplate() {
      var headerDiv = document.querySelector('#shopify-section-header');
      window.addEventListener('scroll', function () {
        if (window.scrollY > headerDiv.offsetHeight) {
          headerDiv.classList.add('bg-white');
        } else {
          headerDiv.classList.remove('bg-white');
        }
      });
      if (document.body.classList.contains('template-product') && document.querySelector('.js-header-cta') != null) {
        document.querySelector('.js-header-cta').addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector('.hero-product').scrollIntoView({
            behavior: 'smooth'
          });
        });
      }
      document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.js-nav-list').forEach(function (item) {
          var view = item.dataset.view;
          item.querySelectorAll('.navListItem').forEach(function (linkItem) {
            var itemName = linkItem.dataset.item;
            var navLink = linkItem.querySelector('.navLink');
            if (view == 'mobile') {
              navLink.dataset.htCategory = 'nav_hamburger-menu';
              navLink.dataset.htLabel = "nav2_".concat(itemName);
            } else if (view == 'desktop') {
              navLink.dataset.htCategory = 'nav_primary-level';
              navLink.dataset.htLabel = "nav_".concat(itemName);
            }
          });
        });
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (headerSection);

/***/ }),

/***/ 6465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5072);
/* harmony import */ var _js_utils_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1986);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);



var heroProduct = function heroProduct(id, variantsSkus, images) {
  return {
    id: id,
    variantsSkus: variantsSkus,
    loading: true,
    shopifyData: null,
    parentSelectedVariants: [],
    images: images,
    error: '',
    init: function init() {
      window.heroProduct = this;
      this.fetchProduct();
      this.buildAddOnsSwiper();
    },
    get ready() {
      return Boolean(!this.loading && this.shopifyData);
    },
    get badges() {
      return this.shopifyData ? (0,_js_utils_product__WEBPACK_IMPORTED_MODULE_1__/* .getProductBadges */ .hh)(this.shopifyData) : [];
    },
    fetchProduct: function fetchProduct() {
      var _this = this;
      (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__/* .fetchProducts */ .t2)([id]).then(function (products) {
        _this.loading = false;
        _this.shopifyData = products[id];
      })["catch"](function (e) {
        _this.error = e.message;
      });
    },
    buildAddOnsSwiper: function buildAddOnsSwiper() {
      if (document.querySelector('.hero-product__upsell') != null) {
        var swiperContainer = document.querySelector('.js-pdp-upsells');
        new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(swiperContainer, {
          modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
          slidesPerView: 'auto',
          spaceBetween: 12,
          slidesOffsetBefore: 16,
          slidesOffsetAfter: 16,
          navigation: {
            nextEl: document.querySelector('.hero-product__upsell-next'),
            prevEl: document.querySelector('.hero-product__upsell-prev')
          },
          breakpoints: {
            1023: {
              spaceBetween: 20,
              slidesOffsetAfter: 0
            }
          }
        });
      }
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroProduct);

/***/ }),

/***/ 3465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var instagramCarousel = function instagramCarousel() {
  return {
    swiper: null,
    init: function init() {
      this.cacheNodes();
      this.buildSwiper();
    },
    cacheNodes: function cacheNodes() {
      this.swiperContainer = document.querySelector('.instagram-carousel__slide-container');
    },
    buildSwiper: function buildSwiper() {
      if (this.swiper || !this.swiperContainer) {
        return;
      }
      this.swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(this.swiperContainer, {
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        navigation: {
          nextEl: this.swiperContainer.querySelector('.swiper-button-next-insta'),
          prevEl: this.swiperContainer.querySelector('.swiper-button-prev-insta')
        },
        breakpoints: {
          1023: {
            centeredSlides: false
          }
        },
        on: {
          init: function init() {
            setTimeout(function () {}, 100);
          }
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instagramCarousel);

/***/ }),

/***/ 7036:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var productBrowser = function productBrowser() {
  return {
    init: function init() {
      this.loadTemplate();
    },
    loadTemplate: function loadTemplate() {
      window.addEventListener('load', function () {
        if (window.innerWidth < 1024) {
          var container = document.querySelector('.productBrowser__collectionList');
          var activeItem = document.querySelector('.productBrowser__collectionListItem.is-active');
          if (activeItem) {
            var containerWidth = container.offsetWidth;
            var itemLeftPosition = activeItem.offsetLeft;
            var itemWidth = activeItem.offsetWidth;
            var scrollPosition = itemLeftPosition - containerWidth / 2 + itemWidth / 2;
            container.scrollTo({
              left: scrollPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productBrowser);

/***/ }),

/***/ 1185:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var productExplorer = function productExplorer() {
  return {
    init: function init() {
      this.buildSwipers();
    },
    buildSwipers: function buildSwipers() {
      var productsCarousel = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP('.js-product-explorer-swiper', {
        slidesPerView: 1.18,
        spaceBetween: 20,
        slidesOffsetAfter: 16,
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        breakpoints: {
          1024: {
            slidesPerView: 2.15,
            spaceBetween: 26,
            slidesOffsetAfter: 32
          },
          1200: {
            slidesPerView: 'auto',
            spaceBetween: 32,
            slidesOffsetAfter: 64
          }
        },
        navigation: {
          prevEl: '.product-explorer__swiper-prev',
          nextEl: '.product-explorer__swiper-next',
          disabledClass: 'swiper-button-hidden'
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productExplorer);

/***/ }),

/***/ 4962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var reviewsCarousel = function reviewsCarousel() {
  return {
    swiper: null,
    playing: false,
    init: function init() {
      this.cacheNodes();
      this.buildSwiper();
      this.customJS();
    },
    cacheNodes: function cacheNodes() {
      this.swiperContainer = document.querySelector('.reviewsCarousel__slide-container');
    },
    buildSwiper: function buildSwiper() {
      if (this.swiper || !this.swiperContainer) {
        return;
      }
      this.swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(this.swiperContainer, {
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        slidesPerView: 'auto',
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 16,
        navigation: {
          nextEl: this.swiperContainer.querySelector('.swiper-button-next-reviews'),
          prevEl: this.swiperContainer.querySelector('.swiper-button-prev-reviews'),
          disabledClass: 'swiper-button-hidden'
        },
        breakpoints: {
          1023: {
            slidesPerView: 2.15,
            spaceBetween: 26
          },
          1200: {
            slidesPerView: 'auto',
            spaceBetween: 32,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 64
          }
        }
      });
    },
    customJS: function customJS() {
      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('reviewsCarousel__slide-media-wrapper')) {
          e.target.querySelector('.reviewsCarousel__slide-media-btn').click();
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reviewsCarousel);

/***/ }),

/***/ 7616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var testimonialsCarousel = function testimonialsCarousel() {
  return {
    swiper: null,
    playing: false,
    init: function init() {
      this.cacheNodes();
      this.buildSwiper();
    },
    cacheNodes: function cacheNodes() {
      this.swiperContainer = document.querySelector('.testimonials__content-container');
    },
    buildSwiper: function buildSwiper() {
      if (this.swiper || !this.swiperContainer) {
        return;
      }
      this.swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(this.swiperContainer, {
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        slidesPerView: 'auto',
        spaceBetween: 24,
        slidesOffsetBefore: 16,
        navigation: {
          nextEl: this.swiperContainer.querySelector('.swiper-button-next-testimonials'),
          prevEl: this.swiperContainer.querySelector('.swiper-button-prev-testimonials'),
          disabledClass: 'swiper-button-hidden'
        },
        breakpoints: {
          320: {
            slidesPerView: 'auto',
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
            spaceBetween: 20
          },
          1023: {
            slidesPerView: 2.15,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 'auto',
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 100,
            spaceBetween: 24
          }
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (testimonialsCarousel);

/***/ }),

/***/ 2854:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var cartDrawer = function cartDrawer() {
  return {
    init: function init() {
      this.loadTemplate();
    },
    loadTemplate: function loadTemplate() {
      var content = document.querySelector('.js-cart-template').content.cloneNode(true);
      content.querySelector('.cart').classList.add('cart--drawer');
      this.$root.replaceChildren(content);
    },
    openCart: function openCart() {
      this.$root.closest('dialog').showModal();
    },
    closeCart: function closeCart() {
      this.closeOpenDrawers();
    },
    updateAndOpenCart: function updateAndOpenCart(_ref) {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var detail;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              detail = _ref.detail;
              _context.next = 3;
              return _this.$store.cart.fetchCart();
            case 3:
              if (!(detail !== null && detail !== void 0 && detail.noOpenAfterUpdate)) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return");
            case 5:
              _this.$root.closest('dialog').showModal();
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    updateCartDrawer: function updateCartDrawer(_ref2) {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var detail;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              detail = _ref2.detail;
              _context2.next = 3;
              return _this2.$store.cart.fetchCart();
            case 3:
              if (!(detail !== null && detail !== void 0 && detail.noOpenAfterUpdate)) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return");
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cartDrawer);

/***/ }),

/***/ 1625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i5": () => (/* binding */ cartComponent),
/* harmony export */   "i8": () => (/* binding */ cartStore)
/* harmony export */ });
/* unused harmony export cartDataInitial */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9062);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4942);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2575);
/* harmony import */ var _js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5072);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var CART_GET_URL = window.Shopify.routes.root + 'cart.js';
var CART_ADD_URL = window.Shopify.routes.root + 'cart/add.js';
var CART_UPDATE_URL = window.Shopify.routes.root + 'cart/update.js';
var CART_CHANGE_URL = window.Shopify.routes.root + 'cart/change.js';
var cartDataInitial = (0,_js_utils__WEBPACK_IMPORTED_MODULE_2__/* .pDefer */ .a)();
var cartStore = function cartStore() {
  return {
    cartData: null,
    init: function init() {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
        var productData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.fetchCart();
            case 2:
              cartDataInitial.resolve(_this.cartData);
              _context.next = 5;
              return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_4__/* .fetchProducts */ .t2)([window.GIFT_BOX_PRODUCT_ID]);
            case 5:
              productData = _context.sent;
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    /**
     * START: FIRST-CLASS ACTIONS
     * These interact with AJAX API and must set cartData
     * consequentially.
     */
    fetchCart: function fetchCart() {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
        var url, params, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              url = new URL(window.location.href);
              url.pathname = CART_GET_URL;
              url.search = new URLSearchParams({
                t: Date.now()
              });
              params = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              _context2.next = 6;
              return (0,_js_utils__WEBPACK_IMPORTED_MODULE_2__/* .request */ .WY)(url, params);
            case 6:
              data = _context2.sent;
              _this2.cartData = data;
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    addToCart: function addToCart(body) {
      var _this3 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0,_js_utils__WEBPACK_IMPORTED_MODULE_2__/* .request */ .WY)(CART_ADD_URL, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                  'content-type': 'application/json'
                }
              });
            case 2:
              _this3.fetchCart();
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    updateCart: function updateCart(body) {
      var _this4 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4() {
        var url, params, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              url = CART_UPDATE_URL;
              params = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              };
              _context4.next = 4;
              return (0,_js_utils__WEBPACK_IMPORTED_MODULE_2__/* .request */ .WY)(url, params);
            case 4:
              data = _context4.sent;
              _this4.cartData = data;
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    changeLineItem: function changeLineItem(body) {
      var _this5 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee5() {
        var url, params, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              url = CART_CHANGE_URL;
              params = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              };
              _context5.next = 4;
              return (0,_js_utils__WEBPACK_IMPORTED_MODULE_2__/* .request */ .WY)(url, params);
            case 4:
              data = _context5.sent;
              _this5.cartData = data;
              if (data.items.length > 0) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'remove_from_cart',
                  item_name: data.items[0].product_title
                });
              }
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    /**
     * SECOND-CLASS ACTIONS
     * These call POST method FIRST-CLASS ACTIONS with predetermined bodies
     * They should not handle response data, but do return awaitable promises.
     */
    removeLineItem: function removeLineItem(key) {
      var _this6 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this6.changeLineItem({
                id: key,
                quantity: 0
              });
            case 2:
              return _context6.abrupt("return", _context6.sent);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    clearGiftBoxAttributes: function clearGiftBoxAttributes() {
      var _this7 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee7() {
        var cartAttributes;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              cartAttributes = _objectSpread({}, _this7.cartData.attributes);
              cartAttributes['gift-wrapping'] = null;
              cartAttributes['gift-note'] = null;
              _context7.next = 5;
              return _this7.updateCart({
                attributes: cartAttributes
              });
            case 5:
              return _context7.abrupt("return", _context7.sent);
            case 6:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    },
    get normalizedCartQty() {
      return this.cartData.items.filter(function (item) {
        return item.product_id !== window.GIFT_BOX_PRODUCT_ID;
      }).reduce(function (acc, item) {
        return acc + item.quantity;
      }, 0);
    },
    get lineItemsNormalized() {
      // currently normalization consists only of ensuring
      // that any gift box product is last in order

      return (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(this.cartData.items).sort(function (a, b) {
        return a.product_id === window.GIFT_BOX_PRODUCT_ID ? 1 : b.product_id === window.GIFT_BOX_PRODUCT_ID ? -1 : 0;
      });
    },
    get giftBoxItemOnCart() {
      return this.cartData.items.find(function (item) {
        return item.product_id === window.GIFT_BOX_PRODUCT_ID;
      });
    },
    get giftBoxPrice() {
      var giftBoxProductData = this.giftBoxProductData;
      if (giftBoxProductData) {
        return giftBoxProductData.variants[0].priceFormatted;
      }
      return '';
    }
  };
};
var cartComponent = function cartComponent() {
  return {
    maxPriceGift: 0,
    allMilestonesComplete: false,
    giftProgressText: null,
    cartHeader: function cartHeader() {
      return "Cart ".concat(this.$store.cart.cartData ? " (".concat(this.$store.cart.normalizedCartQty, ")") : '');
    },
    get cartTotalPrice() {
      return this.$store.cart.cartData.total_price / 100;
    },
    get giftCartProgress() {
      var _this8 = this;
      var priceStepArray = [];
      if (document.querySelectorAll('.js-cart-gift-step').length > 0) {
        document.querySelectorAll('.js-cart-gift-step').forEach(function (item) {
          priceStepArray.push(Number(item.dataset.price));
        });
        this.maxPriceGift = Math.max.apply(Math, priceStepArray);
        var progressPercentage = this.cartTotalPrice / this.maxPriceGift * 100;
        progressPercentage = progressPercentage >= 100 ? 100 : parseInt(progressPercentage);
        this.$nextTick(function () {
          return _this8.giftProgressTextMethod();
        });
        return progressPercentage;
      } else return '';
    },
    giftProgressTextMethod: function giftProgressTextMethod() {
      var activeSteps = document.querySelectorAll('.js-cart-gift-step.active');
      var lastActiveStep = activeSteps[activeSteps.length - 1];
      var nextStep = lastActiveStep.nextElementSibling;
      if (nextStep != null) {
        var priceDifference = nextStep.dataset.price - this.cartTotalPrice;
        this.allMilestonesComplete = false;
        return this.giftProgressText = "You're <b>$".concat(priceDifference.toFixed(2), "</b> away from a <b>").concat(nextStep.dataset.product, "!</b>");
      } else {
        this.allMilestonesComplete = true;
        return this.giftProgressText = "<img class='confetti-icon' src='https://cdn.shopify.com/s/files/1/0586/6520/5927/files/Confetti_Cape_1.gif'/><b>Wohoo! All gifts have been successfully added to your cart!</b>";
      }
    },
    get cartHasDiscounts() {
      return this.$store.cart.cartData.total_discount > 0;
    },
    get discountTotal() {
      if (this.$store.cart.cartData.currency && this.$store.cart.cartData.total_discount) {
        return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_4__/* .formatPrice */ .T4)({
          currencyCode: this.$store.cart.cartData.currency,
          amount: this.$store.cart.cartData.total_discount ? this.$store.cart.cartData.total_discount / -100 : 0
        });
      } else return '';
    },
    get subtotal() {
      if (this.$store.cart.cartData.currency) {
        return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_4__/* .formatPrice */ .T4)({
          currencyCode: this.$store.cart.cartData.currency,
          amount: this.$store.cart.cartData.total_price ? this.$store.cart.cartData.total_price / 100 : 0
        });
      } else return '';
    },
    init: function init() {
      document.addEventListener('rebuy:cart.change', function () {
        var checkoutButton = document.querySelector('.cart__checkout-cta');
        checkoutButton.style.pointerEvents = 'none';
        setTimeout(function () {
          checkoutButton.style.pointerEvents = 'auto';
        }, 3000);
        setTimeout(function () {
          window.dispatchEvent(new CustomEvent('cart-drawer-load'));
        }, 200);
      });
    }
  };
};

/***/ }),

/***/ 704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
// inherits "side": left, right, bottom


var openDrawers = new Set();
var drawer = function drawer(passedSide, passedTitle, contentPadding, forceBackdrop) {
  return {
    open: false,
    isClosing: false,
    isFirstDrawer: undefined,
    isScrollable: false,
    get sideNormalized() {
      // TODO: when nothing is passed consider auto switching based on screen size
      return passedSide || this.drawerSide || 'right';
    },
    get titleNormalized() {
      return passedTitle !== null && passedTitle !== void 0 ? passedTitle : this.drawerTitle;
    },
    get hasBackdrop() {
      return this.isFirstDrawer || forceBackdrop;
    },
    init: function init() {
      this.mutationObserver = new MutationObserver(this.handleMutation.bind(this));
      this.mutationObserver.observe(this.$el, {
        attributes: true,
        attributeFilter: ['open']
      });
      if (contentPadding) {
        this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
        this.resizeObserver.observe(this.$refs.middle);
      }
    },
    destroy: function destroy() {
      var _this$resizeObserver;
      this.mutationObserver.disconnect();
      (_this$resizeObserver = this.resizeObserver) === null || _this$resizeObserver === void 0 ? void 0 : _this$resizeObserver.disconnect();
      openDrawers["delete"](this);
      if (openDrawers.size === 0) {
        (0,_js_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .enableBodyScroll */ .t)();
      }
    },
    close: function close() {
      this.$root.closest('dialog').close();
    },
    handleMutation: function handleMutation() {
      var _this = this;
      if (this.isClosing) return;
      var newOpen = this.$el.open;
      this.open = newOpen;
      if (newOpen) {
        this.isFirstDrawer = openDrawers.size === 0;
        openDrawers.add(this);
        (0,_js_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .disableBodyScroll */ .Q)();
      } else {
        openDrawers["delete"](this);
        if (openDrawers.size === 0) {
          (0,_js_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .enableBodyScroll */ .t)();
        }
      }
      if (!newOpen) {
        this.isClosing = true;
        this.$el.showModal();

        // TODO: use transitionend event instead?
        setTimeout(function () {
          _this.$dispatch('drawer-close-complete', {
            drawer: _this
          });
          _this.$el.close();
          Promise.resolve().then(function () {
            _this.isClosing = false;
          });
        }, 300);
      }
      this.$dispatch(this.open ? 'drawer-open' : 'drawer-close', {
        drawer: this
      });
    },
    handleResize: function handleResize() {
      var middle = this.$refs.middle;
      if (middle) {
        this.isScrollable = middle.scrollHeight > middle.clientHeight;
      }
    },
    closeOpenDrawers: function closeOpenDrawers() {
      if (forceBackdrop) {
        this.close();
        return;
      }
      openDrawers.forEach(function (drawer) {
        drawer.close();
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (drawer);

/***/ }),

/***/ 185:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ faqAccordion)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9062);

function faqAccordion() {
  'use strict';

  var accordions = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(document.querySelectorAll('.js-faq__accordion'));
  accordions === null || accordions === void 0 ? void 0 : accordions.forEach(function (accordion) {
    accordion.addEventListener('click', function (e) {
      var accordionParent = e.target.closest('.js-faq__accordionItem');
      var accordionDescription = accordionParent.querySelector('.js-faq__accordionAnswer');
      if (accordionParent.classList.contains('isExpanded')) {
        collapseAccordions(accordion);
      } else {
        collapseAccordions(accordion);
        accordionParent.classList.add('isExpanded');
        accordionDescription.style.height = accordionDescription.scrollHeight + 'px';
      }
    });
  });
  function collapseAccordions(accordion) {
    var expandedAccordion = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(accordion.querySelectorAll('.isExpanded'));
    expandedAccordion.forEach(function (accordion) {
      accordion.classList.remove('isExpanded');
      var accordionDescription = accordion.querySelector('.js-faq__accordionAnswer');
      accordionDescription.style.height = '0';
    });
  }
}

/***/ }),

/***/ 1745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var heroProductAccordion = function heroProductAccordion() {
  return {
    open: '',
    toggle: function toggle(id) {
      if (this.open === id) {
        this.open = '';
        return;
      }
      this.open = id;
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroProductAccordion);

/***/ }),

/***/ 6590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3324);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);



var matcher = window.matchMedia("(min-width: 1024px)");
var heroProductAdd = function heroProductAdd() {
  return {
    drawerSide: '',
    stickyButtonVisible: false,
    get selectedVariantsIds() {
      return this.selectedVariants.map(function (variant) {
        return variant.id;
      }).join(',');
    },
    init: function init() {
      var _this = this;
      this.setupStickyButton();
      this.parentSelectedVariants = this.selectedVariants;
      this.$watch('selectedVariantsIds', function (val) {
        _this.parentSelectedVariants = _this.selectedVariants;
        if (_this.selectedVariants.length === 1) {
          var id = val.replace('gid://shopify/ProductVariant/', '');
          var url = new URL(window.location.href);
          if (url.searchParams.get('variant') !== id) {
            url.searchParams.set('variant', id);
            window.history.pushState({}, '', url.toString());
          }
        }
      });
      this.loadVariantFromUrl();
    },
    destroy: function destroy() {
      var _this$intersectionObs;
      (_this$intersectionObs = this.intersectionObserver) === null || _this$intersectionObs === void 0 ? void 0 : _this$intersectionObs.disconnect();
    },
    handleButtonClick: function handleButtonClick() {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var stateBase, _Object$entries$find, missingOption;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              stateBase = _this2.stateBase;
              if (!(stateBase === 'available')) {
                _context.next = 5;
                break;
              }
              _context.next = 4;
              return _this2.addToCart();
            case 4:
              _this2.isWorking = false;
            case 5:
              if (stateBase === 'sold-out-notify' || stateBase === 'coming-soon') {
                _this2.$dispatch('open-quick-add-drawer', {
                  product: _this2.shopifyData,
                  selectedOptions: _this2.selectedOptions
                });
              }
              if (stateBase === 'many-variants') {
                missingOption = (_Object$entries$find = Object.entries(_this2.selectedOptions).find(function (_ref) {
                  var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(_ref, 2),
                    value = _ref2[1];
                  return value === '';
                })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0];
                _this2.$root.querySelector("[data-option-name=\"".concat(missingOption, "\"]")).scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    handleDrawerOpen: function handleDrawerOpen(e) {
      this.drawerSide = matcher.matches ? 'right' : 'bottom';
      e.target.closest('button').parentElement.querySelector('dialog').showModal();
    },
    loadVariantFromUrl: function loadVariantFromUrl() {
      var url = new URL(window.location.href);
      var variantId = url.searchParams.get('variant');
      if (variantId) {
        var variant = this.product.variants.find(function (variant) {
          return variant.id === "gid://shopify/ProductVariant/".concat(variantId);
        });
        if (variant) {
          Object.assign(this.selectedOptions, Object.fromEntries(variant.selectedOptions.map(function (_ref3) {
            var name = _ref3.name,
              value = _ref3.value;
            return [name, value];
          })));
          this.normalizeOptionsAndVariants(Object.entries(this.selectedOptions));
        }
      }
    },
    handlePopstate: function handlePopstate() {
      this.loadVariantFromUrl();
    },
    setupStickyButton: function setupStickyButton() {
      var _this3 = this;
      this.intersectionObserver = new IntersectionObserver(function (_ref4) {
        var _ref5 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(_ref4, 1),
          entry = _ref5[0];
        _this3.stickyButtonVisible = !entry.isIntersecting;
      }, {});
      this.intersectionObserver.observe(this.$refs.button);
    },
    selectSubscribeCheckbox: function selectSubscribeCheckbox(type) {
      type == 'subsave' ? document.querySelector('.js-subscription-radio').checked = true : document.querySelector('.js-onetime-radio').checked = true;
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroProductAdd);

/***/ }),

/***/ 5246:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var extractInfoFromAlt = function extractInfoFromAlt(alt) {
  var val1 = /Model is wearing size: [\w- "/]+/.exec(alt);
  if (val1) return val1[0];
  return '';
};
var heroProductGallery = function heroProductGallery(isInline) {
  return {
    activeThumbnail: 0,
    currentStyle: 'Mens',
    init: function init() {
      var _this = this;
      this.$nextTick(function () {
        _this.initializeThumbnails();
        _this.initializeGallery();
      });
    },
    get imagesInfo() {
      return this.images.map(function (image) {
        var altText = image.altText;
        if (!altText) return '';
        return extractInfoFromAlt(altText);
      });
    },
    onStyleChange: function onStyleChange(e) {
      this.currentStyle = e;
    },
    get currentStyleImages() {
      if (this.images[0].altText == 'men-tape' || this.images[0].altText == 'women-tape') {
        var currentStyle = this.currentStyle;
        var imageTypeMap = {
          Mens: 'men-tape',
          Womens: 'women-tape'
        };
        return this.images.filter(function (image) {
          return imageTypeMap[currentStyle] === image.altText;
        });
      } else {
        return this.images;
      }
    },
    initializeThumbnails: function initializeThumbnails() {
      var el = this.$root.querySelector('.js-gallery-thumbnails-swiper');
      if (!el) return;
      this.swiperThumbnailsEl = el;
      this.swiperThumbnails = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(el, {
        slidesPerView: 5.3,
        spaceBetween: 12,
        direction: 'horizontal',
        slidesOffsetAfter: 10,
        observer: true,
        observeParents: true,
        breakpoints: {
          768: {
            spaceBetween: 16
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 20
          }
        }
      });
      window.productThumbsInstance = this.swiperThumbnails;
    },
    initializeGallery: function initializeGallery() {
      var _this2 = this;
      var el = this.$root.querySelector('.js-gallery-swiper');
      if (!el) return;
      this.swiperEl = el;
      this.swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(el, {
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        preloadImages: true,
        navigation: {
          nextEl: document.querySelector('.hero-product-gallery__arrow-next'),
          prevEl: document.querySelector('.hero-product-gallery__arrow-prev')
        },
        on: {
          slideChange: function slideChange(swiper) {
            _this2.swiperThumbnails.slideTo(swiper.activeIndex);
            _this2.activeThumbnail = swiper.activeIndex;
          }
        }
      });
      window.productGalleryInstance = this.swiper;
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroProductGallery);

/***/ }),

/***/ 1842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9062);
/* harmony import */ var _js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5072);


var computePrice = function computePrice(variants, field, ignoreZeros) {
  var _variants$0$field;
  if (variants.length === 0) {
    return "\u200B";
  }
  if (variants.length === 1) {
    var price = variants[0][field];
    if (!price) return '';
    return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_0__/* .formatPrice */ .T4)(price, ignoreZeros);
  }
  var minPrice = Math.min.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(variants.map(function (variant) {
    var _variant$field;
    return Number((_variant$field = variant[field]) === null || _variant$field === void 0 ? void 0 : _variant$field.amount);
  })));
  var maxPrice = Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(variants.map(function (variant) {
    var _variant$field2;
    return Number((_variant$field2 = variant[field]) === null || _variant$field2 === void 0 ? void 0 : _variant$field2.amount);
  })));
  var currencyCode = (_variants$0$field = variants[0][field]) === null || _variants$0$field === void 0 ? void 0 : _variants$0$field.currencyCode;
  if (isNaN(minPrice) || isNaN(maxPrice)) return '';
  if (!currencyCode) return '';
  return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_0__/* .formatPriceRange */ .NO)({
    amount: minPrice,
    currencyCode: currencyCode
  }, {
    amount: maxPrice,
    currencyCode: currencyCode
  }, ignoreZeros);
};
var heroProductInfo = function heroProductInfo() {
  return {
    get price() {
      return computePrice(this.parentSelectedVariants, 'price', false);
    },
    get priceRegular() {
      return computePrice(this.parentSelectedVariants, 'compareAtPrice', true);
    },
    get variantBundleMetafield() {
      if (this.parentSelectedVariants.length > 0) {
        var _this$parentSelectedV, _this$parentSelectedV2;
        return (_this$parentSelectedV = this.parentSelectedVariants[0]) === null || _this$parentSelectedV === void 0 ? void 0 : (_this$parentSelectedV2 = _this$parentSelectedV.bundle_info) === null || _this$parentSelectedV2 === void 0 ? void 0 : _this$parentSelectedV2.value;
      }
      return '';
    },
    get hasReducedPrice() {
      var priceRegular = this.priceRegular,
        price = this.price;
      return priceRegular && priceRegular !== price;
    },
    get pricingText() {
      return "reduced price: ".concat(this.price, ", regular price: ").concat(this.priceRegular);
    },
    scrollToReviews: function scrollToReviews() {
      if (document.querySelector('.looxWidget') != null) {
        document.querySelector('.looxWidget__heading').scrollIntoView({
          behavior: 'smooth'
        });
      }
    },
    init: function init() {}
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroProductInfo);

/***/ }),

/***/ 3519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5072);




// INHERITS cartItem in scope

var lineItemComponent = function lineItemComponent(lowStockThreshold, lowStockMessage, normalStockMessage) {
  return {
    lowStockThreshold: lowStockThreshold,
    lowStockMessage: lowStockMessage,
    normalStockMessage: normalStockMessage,
    isRemoving: false,
    subscriptionProduct: false,
    fullVariantData: {},
    checkoutBtn: document.querySelector('.cart__checkout-cta'),
    init: function init() {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var currentAllProducts, cartItemProductData, cartItemVariantData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__/* .fetchProducts */ .t2)([_this.cartItem.product_id]);
            case 2:
              currentAllProducts = _context.sent;
              cartItemProductData = currentAllProducts[_this.cartItem.product_id];
              cartItemVariantData = cartItemProductData.variants.find(function (variant) {
                return variant.id.replace('gid://shopify/ProductVariant/', '') === _this.cartItem.variant_id.toString();
              });
              _this.fullVariantData = cartItemVariantData;
              if (_this.cartItem.selling_plan_allocation != undefined) {
                _this.subscriptionProduct = true;
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    removeItem: function removeItem(key) {
      var _arguments = arguments,
        _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var isGiftBox, $store;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              isGiftBox = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
              $store = _this2.$store;
              _context2.prev = 2;
              _this2.isRemoving = true;
              _this2.checkoutBtn.style.pointerEvents = 'none';
              if (!isGiftBox) {
                _context2.next = 8;
                break;
              }
              _context2.next = 8;
              return $store.cart.clearGiftBoxAttributes();
            case 8:
              _context2.next = 10;
              return $store.cart.removeLineItem(key);
            case 10:
              _context2.next = 15;
              break;
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](2);
              alert('sorry, there was an error removing this item from your cart');
            case 15:
              _context2.prev = 15;
              _this2.isRemoving = false;
              _this2.checkoutBtn.style.pointerEvents = 'auto';
              return _context2.finish(15);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 12, 15, 19]]);
      }))();
    },
    get imageUrl() {
      return this.cartItem.featured_image.url;
    },
    get imageAlt() {
      return this.cartItem.featured_image.alt;
    },
    get imageWidth() {
      return this.cartItem.featured_image.width;
    },
    get imageHeight() {
      return this.cartItem.featured_image.height;
    },
    get subscriptionFrequency() {
      var _this$cartItem, _this$cartItem$sellin;
      return (_this$cartItem = this.cartItem) === null || _this$cartItem === void 0 ? void 0 : (_this$cartItem$sellin = _this$cartItem.selling_plan_allocation) === null || _this$cartItem$sellin === void 0 ? void 0 : _this$cartItem$sellin.selling_plan.name;
    },
    get isLowStock() {
      var fullVariantData = this.fullVariantData,
        lowStockThreshold = this.lowStockThreshold;
      if (fullVariantData.quantityAvailable) {
        return fullVariantData.quantityAvailable <= lowStockThreshold;
      } else return true;
    },
    get discountStatus() {
      var fullVariantData = this.fullVariantData,
        cartItem = this.cartItem;
      if (cartItem.discounts.length) {
        return 'APPLIED';
      } else if (fullVariantData.compareAtPrice && parseFloat(fullVariantData.compareAtPrice.amount) > parseFloat(fullVariantData.price.amount)) {
        return 'MARKDOWN';
      }
      return null;
    },
    get originalPrice() {
      var discountStatus = this.discountStatus,
        fullVariantData = this.fullVariantData,
        $store = this.$store,
        cartItem = this.cartItem;
      if (discountStatus === 'MARKDOWN') {
        var compareAtPrice = parseFloat(fullVariantData.compareAtPrice.amount);
        var quantity = cartItem.quantity;
        return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__/* .formatPrice */ .T4)({
          currencyCode: $store.cart.cartData.currency,
          amount: compareAtPrice
        });
      } else if (discountStatus === 'APPLIED') {
        return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__/* .formatPrice */ .T4)({
          currencyCode: $store.cart.cartData.currency,
          amount: cartItem.original_line_price / 100
        });
      }
      return '';
    },
    get finalPrice() {
      var $store = this.$store,
        cartItem = this.cartItem;
      return (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_2__/* .formatPrice */ .T4)({
        currencyCode: $store.cart.cartData.currency,
        amount: cartItem.final_price / 100
      });
    },
    get rebuyLineItemProperty() {
      return this.cartItem.properties._attribution == 'Rebuy Gift with Purchase';
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lineItemComponent);

/***/ }),

/***/ 4084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kh": () => (/* binding */ navMobileComponent)
/* harmony export */ });
/* unused harmony exports navStore, navDesktopComponent */
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var swiperConfig = {
  slidesPerView: 'auto',
  spaceBetween: 16,
  slidesOffsetBefore: 24,
  slidesOffsetAfter: 24
};
var navStore = function navStore() {
  return {
    navData: [],
    init: function init() {
      this.setData();
    },
    setData: function setData() {
      var menus = document.querySelectorAll('.nav-menu-data');
      this.navData = Array.from(menus).map(function (menu) {
        return JSON.parse(menu.textContent);
      });
    }
  };
};
var navDesktopComponent = function navDesktopComponent() {
  return {
    selectedSubmenuIdx: null,
    init: function init() {
      var _this = this;
      this.$watch('selectedSubmenuIdx', function (val) {
        if (val === null) {
          document.querySelector('header.page-header').classList.remove('submenu-open');
          _this.$dispatch('close-desktop-nav');
        } else if (val >= 0) {
          document.querySelector('header.page-header').classList.add('submenu-open');
          _this.$dispatch('open-desktop-nav');
        }
      });
    },
    handleTopCategoryClick: function handleTopCategoryClick(idx) {
      /**
       * If in Theme Editor, pin this submenu open
       */
      if (window.Shopify.designMode) {
        if (!this.isDesignPinned) {
          this.selectedSubmenuIdx = idx;
          this.isDesignPinned = true;
        } else if (this.isDesignPinned) {
          // Closing pin
          this.selectedSubmenuIdx = null;
          this.isDesignPinned = false;
        }
      }
    },
    handleTopCategoryMouseenter: function handleTopCategoryMouseenter(idx) {
      if (this.isDesignPinned) {
        return;
      }
      this.selectedSubmenuIdx = idx;
    },
    handleTopCategoryMouseleave: function handleTopCategoryMouseleave() {
      if (this.isDesignPinned) {
        return;
      }
      this.selectedSubmenuIdx = null;
    }
  };
};
var navMobileComponent = function navMobileComponent() {
  return {
    selectedSubmenuIdx: null,
    init: function init() {
      var _this2 = this;
      this.$watch('selectedSubmenuIdx', function (val) {
        if (!Number.isNaN(val) && val !== null) {
          var secondTierDialog = _this2.$root.querySelector('dialog');
          secondTierDialog.showModal();
        }
      });
      this.initFirstTierSwiper();
    },
    get mobileNavStyles() {
      var _this$$store$nav$mobi;
      return ((_this$$store$nav$mobi = this.$store.nav.mobileNavFooterData) === null || _this$$store$nav$mobi === void 0 ? void 0 : _this$$store$nav$mobi.settings) || {};
    },
    openMobileNav: function openMobileNav() {
      this.$el.closest('dialog').showModal();
    },
    openSecondTier: function openSecondTier(idx) {
      this.selectedSubmenuIdx = idx;
    },
    closeMobileNav: function closeMobileNav() {
      this.$el.closest('dialog').close();
      this.selectedSubmenuIdx = null;
    },
    detect2ndTierClose: function detect2ndTierClose(e) {
      if (this.$root.contains(e.target)) {
        this.selectedSubmenuIdx = null;
      }
    },
    initFirstTierSwiper: function initFirstTierSwiper() {
      var swiperEl = this.$root.querySelector('.mobile-nav--tier-1 .swiper');
      new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(swiperEl, swiperConfig);
    },
    initSecondaryFeatureSwiper: function initSecondaryFeatureSwiper() {
      var swiperEl = this.$root.querySelector('.mobile-nav--tier-2 .swiper');
      new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(swiperEl, swiperConfig);
    }
  };
};

/***/ }),

/***/ 4955:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_utils_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1986);



var productAddOns = function productAddOns(variantId) {
  return {
    variantId: variantId,
    addOnBtnLabel: '+Add',
    addOnInCart: false,
    cartLoaded: false,
    init: function init() {
      this.loadCart();
    },
    loadCart: function loadCart() {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('/cart.js').then(function (response) {
                return response.json();
              }).then(function (data) {
                var productInCart = data.items.some(function (item) {
                  return item.variant_id === variantId;
                });
                if (productInCart) {
                  _this.addOnInCart = true;
                  _this.updateButtonLable();
                }
              })["catch"](function (error) {
                console.error('Error fetching cart data:', error);
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    upsellAddtoCart: function upsellAddtoCart() {
      (0,_js_utils_product__WEBPACK_IMPORTED_MODULE_2__/* .quickAddToCart */ .GJ)(variantId);
      this.addOnInCart = true;
      this.updateButtonLable();
    },
    updateButtonLable: function updateButtonLable() {
      this.addOnBtnLabel = this.addOnInCart ? 'Added' : '+Add';
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productAddOns);

/***/ }),

/***/ 3189:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var productCardQuickAdd = function productCardQuickAdd() {
  return {
    init: function init() {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this.shopifyData.variants.length === 1 && _this.shopifyData.variants[0].availableForSale) {
                _this.$root.style.display = 'none';
                try {
                  // await this.addToCart();
                } catch (e) {
                  //
                }
                _this.close();
              }
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    close: function close() {
      this.quickAddOpen = false;
    },
    handleVariantClick: function handleVariantClick(variant) {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.normalizeOptionsAndVariants(variant.selectedOptions.map(function (option) {
                return [option.name, option.value];
              }));
              _context2.next = 3;
              return _this2.addToCart();
            case 3:
              _this2.close();
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productCardQuickAdd);

/***/ }),

/***/ 8609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5072);



var productCard = function productCard(productId) {
  return {
    loading: false,
    error: '',
    productId: productId,
    quickAddOpen: false,
    selectedVariant: {},
    get shopifyData() {
      if (!this.productId) return null;
      if (this.loading) return null;
      return _js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_1__/* .productsData */ .Zc[this.productId];
    },
    get link() {
      if (!this.shopifyData) return '/';
      return "".concat(window.Shopify.routes.root, "products/").concat(this.shopifyData.handle);
    },
    get images() {
      var _this$shopifyData;
      return ((_this$shopifyData = this.shopifyData) === null || _this$shopifyData === void 0 ? void 0 : _this$shopifyData.images) || [];
    },
    get gridPreviewImages() {
      var _this$shopifyData2;
      return (_this$shopifyData2 = this.shopifyData) !== null && _this$shopifyData2 !== void 0 && _this$shopifyData2.images ? this.shopifyData.images.slice(0, 2) : [];
    },
    get description() {
      return this.shopifyData.description;
    },
    get productReviewCount() {
      var _this$shopifyData$rat;
      var rating = (_this$shopifyData$rat = this.shopifyData.ratingCount) === null || _this$shopifyData$rat === void 0 ? void 0 : _this$shopifyData$rat.value;
      var ratingNormalized = Number(rating) || 0;
      return "".concat(ratingNormalized, " Review").concat(ratingNormalized === 1 ? '' : 's');
    },
    get qualifiersParsed() {
      var qualifiers = this.shopifyData.qualifiers;
      if (!(qualifiers !== null && qualifiers !== void 0 && qualifiers.value)) return '';
      try {
        return JSON.parse(qualifiers.value).join(' ');
      } catch (e) {
        return '';
      }
    },
    get title() {
      var description = this.shopifyData.description;
      if (description !== null && description !== void 0 && description.value) return description.value;
      return "".concat(this.qualifiersParsed, " ").concat(this.shopifyData.type.value);
    },
    get legacyTitle() {
      return this.shopifyData.title;
    },
    get price() {
      return this.shopifyData.priceRangeFormatted;
    },
    get priceRegular() {
      return this.shopifyData.compareAtPriceRangeFormatted;
    },
    get hasReducedPrice() {
      var priceRegular = this.priceRegular,
        price = this.price;
      return priceRegular && priceRegular !== price;
    },
    get pricingText() {
      return "reduced price: ".concat(this.price, ", regular price: ").concat(this.priceRegular);
    },
    get pricingExtraText() {
      var tags = this.shopifyData.tags;
      var tag = tags.find(function (tag) {
        return tag.startsWith('Off:');
      });
      if (!tag) return '';
      var pct = tag.replace('Off:', '');
      return "Extra ".concat(pct, "% off on Checkout");
    },
    get quickAddTitle() {
      var _shopifyData$seasonal;
      var shopifyData = this.shopifyData;
      if (shopifyData.availableForSale) {
        return 'Add to cart';
      }
      if (shopifyData.tags.includes('Coming Soon') || ((_shopifyData$seasonal = shopifyData.seasonalCore) === null || _shopifyData$seasonal === void 0 ? void 0 : _shopifyData$seasonal.value) === 'Core') {
        return 'Notify Me';
      }
      return 'Sold Out';
    },
    get isSoldOut() {
      return this.quickAddTitle === 'Sold Out';
    },
    init: function init() {
      var _this = this;
      if (!this.shopifyData) {
        this.loading = true;
        (0,_js_utils_products_and_collections__WEBPACK_IMPORTED_MODULE_1__/* .fetchProducts */ .t2)([this.productId]).then(function () {
          _this.loading = false;
        })["catch"](function (e) {
          _this.error = "Error: ".concat(e.message || 'Unknown error');
        });
      }
    },
    handleQuickAdd: function handleQuickAdd(defaultVariantId) {
      var _arguments = arguments,
        _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var openCart, jsonBodyData, res, description, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              openCart = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
              _context.prev = 1;
              if (_this2.selectedVariant.id == null) {
                _this2.selectedVariant.id = defaultVariantId;
              }
              jsonBodyData = {
                items: [{
                  id: _this2.selectedVariant.id,
                  quantity: 1
                }]
              };
              _context.next = 6;
              return fetch("".concat(window.Shopify.routes.root, "cart/add.js"), {
                method: 'post',
                body: JSON.stringify(jsonBodyData),
                headers: {
                  'content-type': 'application/json'
                }
              });
            case 6:
              res = _context.sent;
              if (res.ok) {
                _context.next = 19;
                break;
              }
              description = '';
              _context.prev = 9;
              _context.next = 12;
              return res.json();
            case 12:
              data = _context.sent;
              description = data === null || data === void 0 ? void 0 : data.description;
              _context.next = 18;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](9);
            case 18:
              throw new Error(["Failed to add to cart!", description, "(status: ".concat(res.status, ")")].filter(Boolean).join('\n'));
            case 19:
              if (openCart) {
                _this2.$dispatch('update-and-open-cart', {
                  noOpenAfterUpdate: window.CURRENT_TEMPLATE === 'cart'
                });
              }
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: 'add_to_cart',
                item_name: _this2.legacyTitle
              });
              _context.next = 29;
              break;
            case 24:
              _context.prev = 24;
              _context.t1 = _context["catch"](1);
              alert(_context.t1.message);
              _this2.isWorking = false;
              throw _context.t1;
            case 29:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 24], [9, 16]]);
      }))();
    },
    selectVariantFromList: function selectVariantFromList(variantTitle, pieces, price, variantId) {
      this.selectedVariant.title = variantTitle;
      this.selectedVariant.pieces = pieces;
      this.selectedVariant.price = price;
      this.selectedVariant.id = variantId;
      this.quickAddOpen = false;
    },
    plpQuickAdd: function plpQuickAdd() {
      if (this.$root.closest('.cart__upsells') === null) {
        if (window.innerWidth < 1024) {
          this.$dispatch('open-quick-add-drawer', {
            product: this.shopifyData,
            selectSecondVariant: this.displaySecondVariant || null
          });
        } else {
          this.quickAddOpen = true;
        }
      } else {
        this.$dispatch('open-quick-add-drawer', {
          product: this.shopifyData,
          selectSecondVariant: this.displaySecondVariant || null
        });
      }
    },
    quickView: function quickView() {
      this.$dispatch('open-quick-view-drawer', {
        product: this.shopifyData
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productCard);

/***/ }),

/***/ 9781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ productData)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3324);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9062);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4942);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);





function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var optionsToHide = Object.freeze(['Color', 'Set', 'Title']);
var forceManualOption = Object.freeze(['Size']);
var _window = window,
  PRODUCT_STATES_CONFIG = _window.PRODUCT_STATES_CONFIG;
var matcher = window.matchMedia("(min-width: 1024px)");
var productData = function productData(product) {
  return {
    product: product,
    options: product.options,
    selectedVariants: product.variants,
    selectedOptions: Object.fromEntries(product.options.map(function (option) {
      return [option.name, ''];
    })),
    isWorking: false,
    multipleOptions: false,
    drawerSide: '',
    get optionsToHide() {
      var _this = this;
      var totalVariants = product.variants.length;
      return Object.fromEntries(this.options.filter(function (option) {
        return totalVariants === 1 && !forceManualOption.includes(option.name) || optionsToHide.includes(option.name) && option.values.length === 1 && _this.selectedOptions[option.name] === option.values[0];
      }).map(function (option) {
        return [option.name, true];
      }));
    },
    get visibleOptions() {
      var options = this.options,
        optionsToHide = this.optionsToHide;
      var optionsToHideKeys = Object.keys(optionsToHide);
      return options.filter(function (option) {
        return !optionsToHideKeys.includes(option.name);
      });
    },
    get optionsWithState() {
      var _this2 = this;
      var options = this.options,
        selectedOptions = this.selectedOptions;
      this.multipleOptions = options.length > 1 ? true : false;
      this.$dispatch('on-style-change', selectedOptions.Style);
      return options.map(function (option) {
        var name = option.name,
          values = option.values;
        return {
          name: name,
          values: values.map(function (value) {
            var newSelectedOptions = _objectSpread({}, selectedOptions);
            delete newSelectedOptions[name];
            var newSelectedOptionsArray = [[name, value]].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(Object.entries(newSelectedOptions)));
            var _this2$calculateOptio = _this2.calculateOptionsAndVariants(newSelectedOptionsArray),
              availableVariants = _this2$calculateOptio.availableVariants;
            var price = 0;
            var comparePrice = 0;
            product.variants.map(function (variant) {
              if (variant.title.includes(value)) {
                price = variant.priceFormatted;
                comparePrice = variant.compareAtPriceFormatted;
              }
            });
            return {
              value: value,
              variants: availableVariants.length,
              variantsData: product.variants,
              variantsInStock: availableVariants.filter(function (variant) {
                return variant.availableForSale;
              }).length,
              price: price,
              comparePrice: comparePrice
            };
          })
        };
      });
    },
    get optionToHideMetafield() {
      if (product.optionToHideMetafield != null) {
        return product.optionToHideMetafield.value;
      }
      return '';
    },
    get isCore() {
      var _product$seasonalCore;
      return ((_product$seasonalCore = product.seasonalCore) === null || _product$seasonalCore === void 0 ? void 0 : _product$seasonalCore.value) === 'Core';
    },
    get isComingSoon() {
      return product.tags.includes('Coming Soon');
    },
    get fit() {
      var _product$fit;
      return (_product$fit = product.fit) === null || _product$fit === void 0 ? void 0 : _product$fit.value;
    },
    // coming-soon, many-variants, sold-out-permanently, sold-out-notify, available
    get stateBase() {
      var availableForSale = product.availableForSale;
      if (!availableForSale && this.isComingSoon) {
        return 'coming-soon';
      }
      var isCore = this.isCore;
      if (!availableForSale && !isCore) {
        return "sold-out-permanently";
      }
      var selectedVariants = this.selectedVariants;
      var _selectedVariants = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(selectedVariants, 1),
        selectedVariant = _selectedVariants[0];
      if (!selectedVariant.availableForSale) {
        return "sold-out-".concat(isCore ? 'notify' : 'permanently');
      }
      return 'available';
    },
    get buttonLabelBase() {
      if (this.isWorking) return 'Adding...';
      var stateBase = this.stateBase;
      switch (stateBase) {
        case 'coming-soon':
        case 'sold-out-notify':
          return PRODUCT_STATES_CONFIG[stateBase].buttonLabel;
        case 'sold-out-permanently':
          return 'Sold Out';
        case 'available':
          return 'Add to Cart';
        default:
          return 'Add to Cart';
      }
    },
    get isButtonDisabled() {
      return this.stateBase === 'sold-out-permanently';
    },
    get division() {
      var _product$division;
      return (_product$division = product.division) === null || _product$division === void 0 ? void 0 : _product$division.value;
    },
    get productHandle() {
      return product.handle;
    },
    init: function init() {
      this.normalizeOptionsAndVariants(Object.entries(this.selectedOptions));
    },
    calculateOptionsAndVariants: function calculateOptionsAndVariants(selectedOptionsArray) {
      var availableVariants = product.variants;
      var correctSelectedOptions = {};
      var _iterator = _createForOfIteratorHelper(selectedOptionsArray),
        _step;
      try {
        var _loop = function _loop() {
          var _step$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(_step.value, 2),
            name = _step$value[0],
            value = _step$value[1];
          var previousVariants = availableVariants;
          availableVariants = availableVariants.filter(function (variant) {
            return variant.selectedOptions.some(function (option) {
              return option.name === name && option.value === value;
            });
          });
          if (availableVariants.length === 0) {
            availableVariants = previousVariants;
            if (forceManualOption.includes(name) && availableVariants.length > 1) {
              correctSelectedOptions[name] = '';
            } else {
              var newValue = availableVariants[0].selectedOptions.find(function (option) {
                return option.name === name;
              }).value;
              correctSelectedOptions[name] = newValue;
              availableVariants = availableVariants.filter(function (variant) {
                return variant.selectedOptions.some(function (option) {
                  return option.name === name && option.value === newValue;
                });
              });
            }
          } else {
            correctSelectedOptions[name] = value;
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return {
        availableVariants: availableVariants,
        correctSelectedOptions: correctSelectedOptions
      };
    },
    normalizeOptionsAndVariants: function normalizeOptionsAndVariants(selectedOptionsArray) {
      var _this$calculateOption = this.calculateOptionsAndVariants(selectedOptionsArray),
        availableVariants = _this$calculateOption.availableVariants,
        correctSelectedOptions = _this$calculateOption.correctSelectedOptions;
      this.selectedOptions = correctSelectedOptions;
      this.selectedVariants = availableVariants;
    },
    handleOptionChange: function handleOptionChange(name, value) {
      var newSelectedOptions = _objectSpread({}, this.selectedOptions);
      delete newSelectedOptions[name];
      var newSelectedOptionsArray = [[name, value]].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(Object.entries(newSelectedOptions)));
      this.normalizeOptionsAndVariants(newSelectedOptionsArray);
      if (name === 'Style') {
        if (window.productGalleryInstance != undefined || window.productThumbsInstance != undefined) {
          this.$dispatch('on-style-change', value);
          window.productGalleryInstance.update();
          window.productThumbsInstance.update();
          document.querySelector('.hero-product-gallery__thumbnail-image').parentElement.click();
        }
      }
    },
    get currentVariant() {
      if (this.selectedVariants[0]) {
        return this.selectedVariants[0];
      }
      return null;
    },
    handleSubcriptionOptionChange: function handleSubcriptionOptionChange(optionsSelected, price) {
      document.querySelector('.hero-product-info__price--current').innerText = price;
    },
    addToCart: function addToCart() {
      var _this3 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var selectedVariants, _selectedVariants2, selectedVariant, simpleId, jsonBodyData, subscribeOption, res, description, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!_this3.isWorking) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              selectedVariants = _this3.selectedVariants;
              _selectedVariants2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(selectedVariants, 1), selectedVariant = _selectedVariants2[0];
              simpleId = selectedVariant.id.replace('gid://shopify/ProductVariant/', '');
              jsonBodyData = {
                items: [{
                  id: simpleId
                }]
              };
              if (document.querySelector('.js-subscription-radio') != null) {
                subscribeOption = document.querySelector('.js-subscription-radio');
                if (subscribeOption.checked) {
                  jsonBodyData = {
                    items: [{
                      id: simpleId,
                      selling_plan: subscribeOption.value
                    }]
                  };
                }
              }
              _context.prev = 7;
              _this3.isWorking = true;
              _context.next = 11;
              return fetch("".concat(window.Shopify.routes.root, "cart/add.js"), {
                method: 'post',
                body: JSON.stringify(jsonBodyData),
                headers: {
                  'content-type': 'application/json'
                }
              });
            case 11:
              res = _context.sent;
              if (res.ok) {
                _context.next = 24;
                break;
              }
              description = '';
              _context.prev = 14;
              _context.next = 17;
              return res.json();
            case 17:
              data = _context.sent;
              description = data === null || data === void 0 ? void 0 : data.description;
              _context.next = 23;
              break;
            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](14);
            case 23:
              throw new Error(["Failed to add to cart!", description, "(status: ".concat(res.status, ")")].filter(Boolean).join('\n'));
            case 24:
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: 'add_to_cart',
                item_name: _this3.product.title
              });
              _this3.$dispatch('update-and-open-cart', {
                noOpenAfterUpdate: window.CURRENT_TEMPLATE === 'cart'
              });
              _context.next = 34;
              break;
            case 29:
              _context.prev = 29;
              _context.t1 = _context["catch"](7);
              alert(_context.t1.message);
              _this3.isWorking = false;
              throw _context.t1;
            case 34:
              _this3.isWorking = false;
            case 35:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[7, 29], [14, 21]]);
      }))();
    },
    handleSizeGuideClick: function handleSizeGuideClick(e) {
      this.drawerSide = matcher.matches ? 'right' : 'bottom';
      e.target.closest('button').parentElement.querySelector('dialog').showModal();
    }
  };
};

/***/ }),

/***/ 2887:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var STATES = {
  IDLE: 'idle',
  POSTING_INCREMENT: 'posting-increment',
  POSTING_DECREMENT: 'posting-decrement'
};
var quantitySelector = function quantitySelector() {
  return {
    max: 20,
    states: STATES,
    state: STATES.IDLE,
    postNewQuantity: function postNewQuantity(newQty) {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var checkoutBtn;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              checkoutBtn = document.querySelector('.cart__checkout-cta');
              _context.prev = 1;
              checkoutBtn.style.pointerEvents = 'none';
              _context.next = 5;
              return _this.$store.cart.changeLineItem({
                id: _this.cartItem.key,
                quantity: newQty
              });
            case 5:
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              alert(_context.t0.message);
            case 10:
              _context.prev = 10;
              _this.state = STATES.IDLE;
              checkoutBtn.style.pointerEvents = 'auto';
              return _context.finish(10);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 7, 10, 14]]);
      }))();
    },
    increment: function increment() {
      if (this.state !== STATES.IDLE) return;
      if (this.cartItem.quantity === this.max) return;
      var newQty = this.cartItem.quantity + 1;
      this.state = STATES.POSTING_INCREMENT;
      this.postNewQuantity(newQty);
    },
    decrement: function decrement() {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var newQty;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this2.state !== STATES.IDLE)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              newQty = _this2.cartItem.quantity - 1;
              _this2.state = STATES.POSTING_DECREMENT;
              _this2.postNewQuantity(newQty);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (quantitySelector);

/***/ }),

/***/ 8529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var matcher = window.matchMedia("(min-width: 1024px)");
var quickAddDrawerWrapper = function quickAddDrawerWrapper() {
  return {
    quickAddDrawerProduct: null,
    quickAddDrawerSelectedOptions: null,
    quickAddDrawer: false,
    drawerTitle: '',
    drawerSide: '',
    open: function open(_ref) {
      var _this = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var product, selectedOptions;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              product = _ref.product, selectedOptions = _ref.selectedOptions;
              // always create new component instance
              _this.quickAddDrawer = false;
              _context.next = 4;
              return _this.$nextTick();
            case 4:
              _this.drawerTitle = '';
              _this.drawerSide = matcher.matches ? 'right' : 'bottom';
              _this.quickAddDrawerProduct = product;
              _this.quickAddDrawerSelectedOptions = selectedOptions || null;
              _this.quickAddDrawer = true;
              _this.$el.querySelector('dialog').showModal();
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    handleOpenAddDrawer: function handleOpenAddDrawer(event) {
      this.open(event.detail);
    },
    handleUpdateAddDrawerTitle: function handleUpdateAddDrawerTitle(event) {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.$nextTick();
            case 2:
              // some weird race condition
              _this2.drawerTitle = event.detail;
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (quickAddDrawerWrapper);

/***/ }),

/***/ 3776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var _window = window,
  PRODUCT_STATES_CONFIG = _window.PRODUCT_STATES_CONFIG;
var quickAddDrawer = function quickAddDrawer() {
  return {
    email: '',
    // TODO: default to logged in user's email
    success: null,
    // coming-soon, many-variants, sold-out-permanently, sold-out-notify, available, success
    get state() {
      if (this.success) {
        return 'success';
      }
      return this.stateBase;
    },
    get buttonLabel() {
      var state = this.state;
      if (state === 'success') return this.success.buttonLabel;
      return this.buttonLabelBase;
    },
    get drawerTitle() {
      var state = this.state;
      if (state === 'success') return '';
      var visibleOptions = this.visibleOptions;
      return 'select quantity';
    },
    get showEmailInput() {
      var state = this.state;
      return state === 'coming-soon' || state === 'sold-out-notify';
    },
    init: function init() {
      var _this = this;
      window.quickAddDrawer = this;
      if (this.quickAddDrawerSelectedOptions) {
        Object.assign(this.selectedOptions, this.quickAddDrawerSelectedOptions);
        this.normalizeOptionsAndVariants(Object.entries(this.selectedOptions));
      }

      // don't show drawer if there are no options to select
      if (this.visibleOptions.length === 0 && this.state === 'available') {
        this.handleBottomButtonClick();
        this.$el.closest('dialog').close();
        return;
      }
      this.$dispatch('update-quick-add-drawer-title', this.drawerTitle);
      this.$watch('drawerTitle', function (newTitle, oldTitle) {
        if (newTitle === oldTitle) return;
        _this.$dispatch('update-quick-add-drawer-title', newTitle);
      });
    },
    get klaviyoComingSoonListIdNormalized() {
      var _this$product$comingS;
      return ((_this$product$comingS = this.product.comingSoonListId) === null || _this$product$comingS === void 0 ? void 0 : _this$product$comingS.value) || this.klaviyoComingSoonListId;
    },
    handleBottomButtonClick: function handleBottomButtonClick() {
      var _this2 = this;
      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var state;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!_this2.isWorking) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              state = _this2.state;
              if (!(state === 'available')) {
                _context.next = 9;
                break;
              }
              _context.next = 6;
              return _this2.addToCart();
            case 6:
              _this2.$el.closest('dialog').close();
              _context.next = 10;
              break;
            case 9:
              if (state === 'success') {
                _this2.$el.closest('dialog').close();
              }
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (quickAddDrawer);

/***/ }),

/***/ 6688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7099);

var quickViewDrawer = function quickViewDrawer() {
  return {
    success: null,
    init: function init() {
      var _this = this;
      window.quickViewDrawer = this;
      this.$nextTick(function () {
        _this.buildProductImageSlider();
      });
      if (this.quickViewDrawerSelectedOptions) {
        Object.assign(this.selectedOptions, this.quickViewDrawerSelectedOptions);
        this.normalizeOptionsAndVariants(Object.entries(this.selectedOptions));
      }
      this.$dispatch('update-quick-add-drawer-title', this.drawerTitle);
      this.$watch('drawerTitle', function (newTitle, oldTitle) {
        if (newTitle === oldTitle) return;
        _this.$dispatch('update-quick-add-drawer-title', newTitle);
      });
    },
    // coming-soon, many-variants, sold-out-permanently, sold-out-notify, available, success
    get state() {
      if (this.success) {
        return 'success';
      }
      return this.stateBase;
    },
    get buttonLabel() {
      var state = this.state;
      if (state === 'success') return this.success.buttonLabel;
      return this.buttonLabelBase;
    },
    buildProductImageSlider: function buildProductImageSlider() {
      var el = this.$root.querySelector('.js-quick-view-slider');
      if (!el) return;
      new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(el, {
        modules: [swiper__WEBPACK_IMPORTED_MODULE_0__/* .Navigation */ .W_],
        preloadImages: true,
        navigation: {
          nextEl: document.querySelector('.js-quickView-arrow-next'),
          prevEl: document.querySelector('.js-quickView-arrow-prev')
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (quickViewDrawer);

/***/ }),

/***/ 7531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var videoObserver = function videoObserver() {
  var playThreshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
  return {
    playVideo: false,
    videoElement: null,
    init: function init() {
      var _this = this;
      this.videoElement = this.$el.querySelector('video');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          _this.playVideo = entry.isIntersecting;
          if (_this.playVideo) {
            _this.videoElement.play();
          } else {
            _this.videoElement.pause();
          }
        });
      }, {
        threshold: playThreshold
      });
      observer.observe(this.videoElement);
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (videoObserver);

/***/ }),

/***/ 2090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ disableBodyScroll),
/* harmony export */   "t": () => (/* binding */ enableBodyScroll)
/* harmony export */ });
var disableScrollClass = 'disable-body-scroll';
var html = document.documentElement;
function disableBodyScroll() {
  if (html.classList.contains(disableScrollClass)) return;
  var scrollBarWidth = "".concat(window.innerWidth - document.documentElement.clientWidth, "px");
  html.style.paddingRight = scrollBarWidth;
  html.style.setProperty('--scroll-bar-width', scrollBarWidth);
  html.classList.add(disableScrollClass);
}
function enableBodyScroll() {
  html.classList.remove(disableScrollClass);
  html.style.setProperty('--scroll-bar-width', '');
  html.style.paddingRight = '';
}

/***/ }),

/***/ 2575:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ot": () => (/* binding */ createDebouncer),
/* harmony export */   "WY": () => (/* binding */ request),
/* harmony export */   "Zq": () => (/* binding */ arrayChunk),
/* harmony export */   "a": () => (/* binding */ pDefer),
/* harmony export */   "yJ": () => (/* binding */ convertToCamelCase)
/* harmony export */ });
/* unused harmony export remToPixel */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1002);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(136);
/* harmony import */ var _babel_runtime_helpers_setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9611);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, void 0, groups); }; var _super = RegExp.prototype, _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); return _groups.set(_this, groups || _groups.get(re)), (0,_babel_runtime_helpers_setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(_this, BabelRegExp.prototype); } function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { var i = g[name]; if ("number" == typeof i) groups[name] = result[i];else { for (var k = 0; void 0 === result[i[k]] && k + 1 < i.length;) k++; groups[name] = result[i[k]]; } return groups; }, Object.create(null)); } return (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) { result.groups = buildGroups(result, this); var indices = result.indices; indices && (indices.groups = buildGroups(indices, this)); } return result; }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if ("string" == typeof substitution) { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { var group = groups[name]; return "$" + (Array.isArray(group) ? group.join("$") : group); })); } if ("function" == typeof substitution) { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; return "object" != (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(args[args.length - 1]) && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args); }); } return _super[Symbol.replace].call(this, str, substitution); }, _wrapRegExp.apply(this, arguments); }

var remToPixel = function remToPixel(rem) {
  var rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  var pixels = rem * rootFontSize;
  return pixels;
};
var createDebouncer = function createDebouncer(wait) {
  return function (fn) {
    var i = 0;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var currentI = ++i;
      wait(function () {
        if (currentI === i) {
          fn.apply(void 0, args);
        }
      });
    };
  };
};

// https://stackoverflow.com/questions/8495687/split-array-into-chunks#comment84212474_8495740
var arrayChunk = function arrayChunk(array, chunkSize) {
  return Array(Math.ceil(array.length / chunkSize)).fill().map(function (_, index) {
    return index * chunkSize;
  }).map(function (begin) {
    return array.slice(begin, begin + chunkSize);
  });
};
var request = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(url, params) {
    var res, responseError;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(url, params);
        case 2:
          res = _context.sent;
          if (res.ok) {
            _context.next = 9;
            break;
          }
          _context.next = 6;
          return res.json();
        case 6:
          responseError = _context.sent;
          console.error("NETWORK RESPONSE ERROR -- ".concat(responseError.status, ": "), responseError);
          throw responseError;
        case 9:
          return _context.abrupt("return", res.json());
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function request(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var convertToCamelCase = function convertToCamelCase(string) {
  if (!string) {
    return '';
  }
  return string.replace( /*#__PURE__*/_wrapRegExp(/.\b(\w)/g, {
    word: 1
  }), function (_, $1) {
    return $1.toUpperCase();
  }).replace(/[\s:'"]/g, '').replace( /*#__PURE__*/_wrapRegExp(/^((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/, {
    rest: 1
  }), function (_, $1) {
    return $1.toLowerCase();
  });
};

// https://github.com/sindresorhus/p-defer/blob/0abf7f56337a450cbff45074dd8c83f8ace4726c/index.js
var pDefer = function pDefer() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

/***/ }),

/***/ 1986:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GJ": () => (/* binding */ quickAddToCart),
/* harmony export */   "hh": () => (/* binding */ getProductBadges)
/* harmony export */ });
/* unused harmony exports getHighestDiscountPercentage, isNew */
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3324);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);



var getHighestDiscountPercentage = function getHighestDiscountPercentage(product) {
  var _product$variants;
  return (product === null || product === void 0 ? void 0 : (_product$variants = product.variants) === null || _product$variants === void 0 ? void 0 : _product$variants.reduce(function (highest, variant) {
    var _variant$compareAtPri, _variant$price, _variant$compareAtPri2;
    var discount = Math.round((((_variant$compareAtPri = variant.compareAtPrice) === null || _variant$compareAtPri === void 0 ? void 0 : _variant$compareAtPri.amount) - ((_variant$price = variant.price) === null || _variant$price === void 0 ? void 0 : _variant$price.amount)) * 100 / ((_variant$compareAtPri2 = variant.compareAtPrice) === null || _variant$compareAtPri2 === void 0 ? void 0 : _variant$compareAtPri2.amount));
    return discount && discount > highest ? discount : highest;
  }, 0)) || 0;
};
var isNew = function isNew(product) {
  var _product$launchDate;
  var launchDateISO = product === null || product === void 0 ? void 0 : (_product$launchDate = product.launchDate) === null || _product$launchDate === void 0 ? void 0 : _product$launchDate.value;
  if (!launchDateISO) {
    return false;
  }
  var now = new Date();
  var launch = new Date(launchDateISO);
  var thirtyDaysAgo = new Date(new Date().setDate(now.getDate() - 30));

  // Product is considered new if it was launched within the last 30 days
  return launch > thirtyDaysAgo;
};
var getProductBadges = function getProductBadges(product) {
  var _product$tags;
  if (!product) return [];
  var BADGE_LIMIT = 1;
  var tags = product === null || product === void 0 ? void 0 : (_product$tags = product.tags) === null || _product$tags === void 0 ? void 0 : _product$tags.map(function (tag) {
    return tag.toLowerCase();
  });
  var getBadge = {
    bundle: function bundle() {
      var regex = /^(\d+)for(\d+)$/;
      var tag = tags.find(function (tag) {
        return regex.test(tag);
      });
      if (tag) {
        var _tag$match = tag.match(regex),
          _tag$match2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(_tag$match, 3),
          qty = _tag$match2[1],
          price = _tag$match2[2];
        return {
          label: "Buy ".concat(qty, " for $").concat(price)
        };
      }
    },
    'bundle-pp': function bundlePp() {
      var regex = /^(\d+)for(\d+)pp$/;
      var tag = tags.find(function (tag) {
        return regex.test(tag);
      });
      if (tag) {
        var _tag$match3 = tag.match(regex),
          _tag$match4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(_tag$match3, 3),
          qty = _tag$match4[1],
          price = _tag$match4[2];
        return {
          label: "Buy ".concat(qty, " for $").concat(price)
        };
      }
    },
    'coming-soon': function comingSoon() {
      return tags.includes('coming soon') && {
        label: 'Coming Soon'
      };
    },
    core: function core() {
      var _product$seasonalCore, _product$seasonalCore2;
      return (product === null || product === void 0 ? void 0 : (_product$seasonalCore = product.seasonalCore) === null || _product$seasonalCore === void 0 ? void 0 : (_product$seasonalCore2 = _product$seasonalCore.value) === null || _product$seasonalCore2 === void 0 ? void 0 : _product$seasonalCore2.toLowerCase()) === 'core' && {
        label: 'Core'
      };
    },
    discount: function discount() {
      var discount = getHighestDiscountPercentage(product);
      return tags.includes('salemd') && discount > 0 && {
        label: "".concat(discount, "% off")
      };
    },
    'gold-foil': function goldFoil() {
      return tags.includes('gold foil') && {
        label: 'Gold Foil',
        shimmer: true
      };
    },
    "new": function _new() {
      return isNew(product) && {
        label: 'New'
      };
    },
    parz: function parz() {
      return tags.includes('parz') && {
        label: ''
      };
    },
    preorder: function preorder() {
      return tags.includes('preorder') && {
        label: 'Pre-Order'
      };
    },
    'silver-foil': function silverFoil() {
      return tags.includes('silver foil') && {
        label: 'Silver Foil',
        shimmer: true
      };
    },
    'sold-out': function soldOut() {
      return !(product !== null && product !== void 0 && product.availableForSale) && {
        label: 'Sold Out'
      };
    }
  };
  var badgePriority = ['bundle-pp', 'bundle', 'preorder', 'coming-soon', 'sold-out', 'discount', 'core', 'parz', 'gold-foil', 'silver-foil', 'new'];
  var allBadges = badgePriority.map(function (badge) {
    var badgeData = typeof getBadge[badge] === 'function' && getBadge[badge]();
    if (badgeData) {
      badgeData.type = badge;
      return badgeData;
    }
  }).filter(function (badge) {
    return !!badge;
  });
  return allBadges.slice(0, BADGE_LIMIT);
};
var quickAddToCart = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(variantId) {
    var openCart,
      jsonBodyData,
      res,
      description,
      data,
      responseData,
      _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          openCart = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
          _context.prev = 1;
          jsonBodyData = {
            items: [{
              id: variantId,
              quantity: 1
            }]
          };
          _context.next = 5;
          return fetch("".concat(window.Shopify.routes.root, "cart/add.js"), {
            method: 'post',
            body: JSON.stringify(jsonBodyData),
            headers: {
              'content-type': 'application/json'
            }
          });
        case 5:
          res = _context.sent;
          if (res.ok) {
            _context.next = 18;
            break;
          }
          description = '';
          _context.prev = 8;
          _context.next = 11;
          return res.json();
        case 11:
          data = _context.sent;
          description = data === null || data === void 0 ? void 0 : data.description;
          _context.next = 17;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](8);
        case 17:
          throw new Error(["Failed to add to cart!", description, "(status: ".concat(res.status, ")")].filter(Boolean).join('\n'));
        case 18:
          if (openCart) {
            window.dispatchEvent(new CustomEvent('update-and-open-cart', {
              noOpenAfterUpdate: window.CURRENT_TEMPLATE === 'cart'
            }));
          }
          _context.next = 21;
          return res.json();
        case 21:
          responseData = _context.sent;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'add_to_cart',
            item_name: responseData.items[0].product_title
          });
          _context.next = 30;
          break;
        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](1);
          console.error(_context.t1.message);
          throw _context.t1;
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 26], [8, 15]]);
  }));
  return function quickAddToCart(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ 5072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NO": () => (/* binding */ formatPriceRange),
/* harmony export */   "T4": () => (/* binding */ formatPrice),
/* harmony export */   "Zc": () => (/* binding */ productsData),
/* harmony export */   "t2": () => (/* binding */ fetchProducts)
/* harmony export */ });
/* unused harmony exports variantsData, fetchCollection, fetchSearch, fetchRecommendedProducts */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9062);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5861);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4687);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2575);




var _window = window,
  STOREFRONT_ACCESS_TOKEN = _window.STOREFRONT_ACCESS_TOKEN;

// https://github.com/sindresorhus/p-defer/blob/0abf7f56337a450cbff45074dd8c83f8ace4726c/index.js
var pDefer = function pDefer() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};
var STOREFRONT_PRODUCT_QUERY = /* GraphQL */"\n  fragment ProductFields on Product {\n    id\n    title\n    handle\n    tags\n    description\n    onlineStoreUrl\n    availableForSale\n    productType\n\n    options {\n      id\n      name\n      values\n    }\n\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n\n    category: metafield(namespace: \"custom\", key: \"category\") {\n      value\n    }\n\n    color: metafield(namespace: \"custom\", key: \"color\") {\n      value\n    }\n\n    optionToHideMetafield: metafield(namespace: \"custom\", key: \"hide_variant\") {\n      value\n    }\n\n    shortDescription: metafield(namespace: \"custom\", key: \"short_description\") {\n      value\n    }\n\n    images(first: 20) {\n      nodes {\n        id\n        altText\n        url\n      }\n    }\n\n    variants(first: 250) {\n      nodes {\n        id\n        sku\n        quantityAvailable\n        availableForSale\n        title\n\n        price {\n          amount\n          currencyCode\n        }\n\n        compareAtPrice {\n          amount\n          currencyCode\n        }\n\n        selectedOptions {\n          name\n          value\n        }\n\n        bundle_info: metafield(namespace: \"custom\", key: \"bundle_items\") {\n          value\n          type\n        }\n      }\n    }\n  }\n";
var STOREFRONT_PRODUCTS_QUERY = /* GraphQL */"\n  ".concat(STOREFRONT_PRODUCT_QUERY, "\n  query Products(\n    $country: CountryCode!\n    $id1: ID!\n    $include2: Boolean!\n    $id2: ID\n    $include3: Boolean!\n    $id3: ID\n    $include4: Boolean!\n    $id4: ID\n    $include5: Boolean!\n    $id5: ID\n    $include6: Boolean!\n    $id6: ID\n    $include7: Boolean!\n    $id7: ID\n    $include8: Boolean!\n    $id8: ID\n    $include9: Boolean!\n    $id9: ID\n    $include10: Boolean!\n    $id10: ID\n  ) @inContext(country: $country) {\n    p1: product(id: $id1) {\n      ...ProductFields\n    }\n    p2: product(id: $id2) @include(if: $include2) {\n      ...ProductFields\n    }\n    p3: product(id: $id3) @include(if: $include3) {\n      ...ProductFields\n    }\n    p4: product(id: $id4) @include(if: $include4) {\n      ...ProductFields\n    }\n    p5: product(id: $id5) @include(if: $include5) {\n      ...ProductFields\n    }\n    p6: product(id: $id6) @include(if: $include6) {\n      ...ProductFields\n    }\n    p7: product(id: $id7) @include(if: $include7) {\n      ...ProductFields\n    }\n    p8: product(id: $id8) @include(if: $include8) {\n      ...ProductFields\n    }\n    p9: product(id: $id9) @include(if: $include9) {\n      ...ProductFields\n    }\n    p10: product(id: $id10) @include(if: $include10) {\n      ...ProductFields\n    }\n  }\n");
var productsData = {};
var variantsData = {};
var productsToFetch = new Set();
var productsInProgress = {};
var fetchDataBackground = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(ids, query, dataObject, inProgressDataObject, processItemFunction) {
    var chunks;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(ids.size === 0)) {
            _context2.next = 3;
            break;
          }
          // eslint-disable-next-line no-console
          console.warn('No data to fetch');
          return _context2.abrupt("return");
        case 3:
          chunks = (0,___WEBPACK_IMPORTED_MODULE_2__/* .arrayChunk */ .Zq)((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(ids), 10);
          _context2.next = 6;
          return Promise.all(chunks.map( /*#__PURE__*/function () {
            var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(chunk) {
              var variables, data, error, res, _yield$res$json, d, errors;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    variables = new Array(10).fill().reduce(function (acc, _, index) {
                      var id = chunk[index];
                      acc["id".concat(index + 1)] = id;
                      acc["include".concat(index + 1)] = !!id;
                      return acc;
                    }, {});
                    variables.country = Shopify.country;
                    _context.prev = 2;
                    _context.next = 5;
                    return fetch("https://".concat(Shopify.shop, "/api/2023-07/graphql.json"), {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN
                      },
                      body: JSON.stringify({
                        query: query,
                        variables: variables
                      })
                    });
                  case 5:
                    res = _context.sent;
                    _context.next = 8;
                    return res.json();
                  case 8:
                    _yield$res$json = _context.sent;
                    d = _yield$res$json.data;
                    errors = _yield$res$json.errors;
                    data = d;
                    if (!errors) {
                      _context.next = 14;
                      break;
                    }
                    throw new Error("Failed to fetch: ".concat(errors.map(function (error) {
                      return error.message;
                    }).join(', ')));
                  case 14:
                    _context.next = 20;
                    break;
                  case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](2);
                    // eslint-disable-next-line no-console
                    console.error(error);
                    error = _context.t0;
                  case 20:
                    if (!error) {
                      Object.values(data).filter(Boolean).forEach(processItemFunction);
                    }
                    chunk.forEach(function (id) {
                      var product = dataObject[id];
                      if (product) {
                        inProgressDataObject[id].resolve(product);
                      } else {
                        var err = error || new Error("".concat(id, " not found"));
                        inProgressDataObject[id].reject(err);
                      }
                      delete inProgressDataObject[id];
                    });
                  case 22:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[2, 16]]);
            }));
            return function (_x6) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function fetchDataBackground(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var fetchData = /*#__PURE__*/function () {
  var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(ids, prefix, idsToFetchSet, dataObject, inProgressDataObject, fetchBackgroundFunction) {
    var normalizedIds, idsToFetch, idsInProgress;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          normalizedIds = ids.map(function (id) {
            if (typeof id === 'string' && id.startsWith(prefix)) {
              return id;
            }
            if (typeof id === 'number' || typeof id === 'string' && /^\d+$/.test(id)) {
              return "".concat(prefix).concat(id);
            }
          }).filter(Boolean);
          idsToFetch = normalizedIds.filter(function (id) {
            return !dataObject[id] && !inProgressDataObject[id];
          });
          idsToFetch.forEach(function (id) {
            idsToFetchSet.add(id);
            inProgressDataObject[id] = pDefer();
          });
          idsInProgress = normalizedIds.filter(function (id) {
            return inProgressDataObject[id];
          });
          if (idsToFetch.length > 0) {
            fetchBackgroundFunction();
          }
          if (!(idsInProgress.length > 0)) {
            _context3.next = 8;
            break;
          }
          _context3.next = 8;
          return Promise.all(idsInProgress.map(function (id) {
            return inProgressDataObject[id].promise;
          }));
        case 8:
          return _context3.abrupt("return", dataObject);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function fetchData(_x7, _x8, _x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();
var priceFormatters = {};
var getPriceFormatter = function getPriceFormatter(currency) {
  if (!priceFormatters[currency]) {
    priceFormatters[currency] = new Intl.NumberFormat(Shopify.locale, {
      style: 'currency',
      currency: currency
    });
  }
  return priceFormatters[currency];
};
var formatPrice = function formatPrice(price) {
  var ignoreZeros = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (ignoreZeros && Number(price.amount) === 0) {
    return '';
  }
  var priceFormatter = getPriceFormatter(price.currencyCode);
  return priceFormatter.format(price.amount);
};
var formatPriceRange = function formatPriceRange(min, max) {
  var ignoreZeros = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (min.amount === max.amount) {
    return formatPrice(min, ignoreZeros);
  }
  var priceFormatter = getPriceFormatter(min.currencyCode);
  if (priceFormatter.formatRange) {
    return priceFormatter.formatRange(min.amount, max.amount);
  }
  return "".concat(priceFormatter.format(min.amount), " - ").concat(priceFormatter.format(max.amount));
};
var formatProductPrices = function formatProductPrices(product) {
  product.priceRangeFormatted = formatPriceRange(product.priceRange.minVariantPrice, product.priceRange.maxVariantPrice);
  product.compareAtPriceRangeFormatted = formatPriceRange(product.compareAtPriceRange.minVariantPrice, product.compareAtPriceRange.maxVariantPrice, true);
  product.variants.forEach(function (variant) {
    variant.priceFormatted = formatPrice(variant.price);
    if (variant.compareAtPrice) {
      variant.compareAtPriceFormatted = formatPrice(variant.compareAtPrice, true);
    }
  });
};
var fetchProductsBackground = /*#__PURE__*/function () {
  var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
    var productsToFetchSet;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          productsToFetchSet = productsToFetch;
          productsToFetch = new Set();
          return _context4.abrupt("return", fetchDataBackground(productsToFetchSet, STOREFRONT_PRODUCTS_QUERY, productsData, productsInProgress, function (product) {
            product.variants = product.variants.nodes;
            formatProductPrices(product);
            product.images = product.images.nodes;
            productsData[product.id] = product;
            productsData[product.id.replace('gid://shopify/Product/', '')] = product;
            // product.variants.forEach((variant) => {
            //   variant.product = product;
            //   variantsData[variant.id] = variant;
            //   variantsData[variant.id.replace('gid://shopify/ProductVariant/', '')] = variant;
            // });
          }));
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function fetchProductsBackground() {
    return _ref4.apply(this, arguments);
  };
}();
var fetchProductsBackgroundDebounced = (0,___WEBPACK_IMPORTED_MODULE_2__/* .createDebouncer */ .Ot)(function (cb) {
  return setTimeout(cb, 0);
})(fetchProductsBackground);
var fetchProducts = /*#__PURE__*/function () {
  var _ref5 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5(ids) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", fetchData(ids, 'gid://shopify/Product/', productsToFetch, productsData, productsInProgress, fetchProductsBackgroundDebounced));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function fetchProducts(_x13) {
    return _ref5.apply(this, arguments);
  };
}();
var STOREFRONT_PRODUCTS_AND_FILTERS = /* GraphQL */"\n  ".concat(STOREFRONT_PRODUCT_QUERY, "\n\n  fragment FilterFields on Filter {\n    id\n    label\n    type\n    values {\n      id\n      label\n      count\n      input\n    }\n  }\n\n  fragment PageInfoFields on PageInfo {\n    hasPreviousPage\n    hasNextPage\n    endCursor\n  }\n");
var FETCH_COLLECTION_PRODUCTS_QUERY = /* GraphQL */"\n  ".concat(STOREFRONT_PRODUCTS_AND_FILTERS, "\n\n  query Collection(\n    $handle: String\n    $afterCursor: String\n    $noOfProducts: Int!\n    $filtersArray: [ProductFilter!]\n    $sortField: ProductCollectionSortKeys\n    $reverse: Boolean\n  ) {\n    collection(handle: $handle) {\n      handle\n      products(\n        first: $noOfProducts\n        after: $afterCursor\n        filters: $filtersArray\n        sortKey: $sortField\n        reverse: $reverse\n      ) {\n        nodes {\n          ...ProductFields\n        }\n        filters {\n          ...FilterFields\n        }\n        pageInfo {\n          ...PageInfoFields\n        }\n      }\n    }\n  }\n");
var FETCH_SEARCH_PRODUCTS_QUERY = /* GraphQL */"\n  ".concat(STOREFRONT_PRODUCTS_AND_FILTERS, "\n\n  query Search(\n    $query: String!\n    $afterCursor: String\n    $noOfProducts: Int!\n    $filtersArray: [ProductFilter!]\n    $sortField: SearchSortKeys\n    $reverse: Boolean\n  ) {\n    products: search(\n      query: $query\n      first: $noOfProducts\n      after: $afterCursor\n      productFilters: $filtersArray\n      sortKey: $sortField\n      reverse: $reverse\n      types: [PRODUCT]\n      prefix: LAST\n    ) {\n      nodes {\n        ...ProductFields\n      }\n      productFilters {\n        ...FilterFields\n      }\n      pageInfo {\n        ...PageInfoFields\n      }\n      totalCount\n    }\n  }\n");
var FETCH_RECOMMENDED_PRODUCTS_QUERY = /* GraphQL */"\n  ".concat(STOREFRONT_PRODUCT_QUERY, "\n\n  query ProductRecommendations($intent: ProductRecommendationIntent, $productId: ID!) {\n    productRecommendations(intent: $intent, productId: $productId) {\n      ...ProductFields\n    }\n  }\n");
var fetchProductsWithQuery = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(query, variables, getObjectWithProducts) {
    var normalize,
      response,
      data,
      objectWithProducts,
      products,
      _args6 = arguments;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          normalize = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : function () {};
          _context6.next = 3;
          return request("https://".concat(Shopify.shop, "/api/2023-07/graphql.json"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          });
        case 3:
          response = _context6.sent;
          data = response.data;
          objectWithProducts = getObjectWithProducts(data);
          normalize(objectWithProducts);
          products = objectWithProducts.products.nodes;
          products.forEach(function (product) {
            product.variants = product.variants.nodes;
            formatProductPrices(product);
            product.images = product.images.nodes;
            productsData[product.id] = product;
            productsData[product.id.replace('gid://shopify/Product/', '')] = product;
          });
          return _context6.abrupt("return", objectWithProducts);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function fetchProductsWithQuery(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}()));
var fetchCollection = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(collectionHandle) {
    var afterCursor,
      noOfProducts,
      filtersArray,
      sortField,
      reverse,
      _args7 = arguments;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          afterCursor = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : null;
          noOfProducts = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 12;
          filtersArray = _args7.length > 3 ? _args7[3] : undefined;
          sortField = _args7.length > 4 ? _args7[4] : undefined;
          reverse = _args7.length > 5 ? _args7[5] : undefined;
          return _context7.abrupt("return", fetchProductsWithQuery(FETCH_COLLECTION_PRODUCTS_QUERY, {
            handle: collectionHandle,
            afterCursor: afterCursor,
            noOfProducts: noOfProducts,
            filtersArray: filtersArray,
            sortField: sortField,
            reverse: reverse
          }, function (data) {
            return data.collection;
          }));
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function fetchCollection(_x17) {
    return _ref7.apply(this, arguments);
  };
}()));
var fetchSearch = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(query) {
    var afterCursor,
      noOfProducts,
      filtersArray,
      sortField,
      reverse,
      _args8 = arguments;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          afterCursor = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
          noOfProducts = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 12;
          filtersArray = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : [];
          sortField = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : 'RELEVANCE';
          reverse = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : false;
          return _context8.abrupt("return", fetchProductsWithQuery(FETCH_SEARCH_PRODUCTS_QUERY, {
            query: query,
            afterCursor: afterCursor,
            noOfProducts: noOfProducts,
            filtersArray: filtersArray,
            sortField: sortField,
            reverse: reverse
          }, function (data) {
            return data;
          }, function (search) {
            search.products.filters = search.products.productFilters;
            delete search.products.productFilters;
          }));
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function fetchSearch(_x18) {
    return _ref8.apply(this, arguments);
  };
}()));
var fetchRecommendedProducts = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(intent, productId) {
    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", fetchProductsWithQuery(FETCH_RECOMMENDED_PRODUCTS_QUERY, {
            intent: intent,
            productId: productId
          }, function (data) {
            return {
              products: {
                nodes: data.productRecommendations || []
              }
            };
          }));
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function fetchRecommendedProducts(_x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}()));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 505;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			505: 0,
/******/ 			21: 0,
/******/ 			643: 0,
/******/ 			937: 0,
/******/ 			638: 0,
/******/ 			860: 0,
/******/ 			61: 0,
/******/ 			872: 0,
/******/ 			964: 0,
/******/ 			19: 0,
/******/ 			308: 0,
/******/ 			416: 0,
/******/ 			625: 0,
/******/ 			429: 0,
/******/ 			635: 0,
/******/ 			845: 0,
/******/ 			391: 0,
/******/ 			511: 0,
/******/ 			174: 0,
/******/ 			720: 0,
/******/ 			346: 0,
/******/ 			903: 0,
/******/ 			813: 0,
/******/ 			487: 0,
/******/ 			830: 0,
/******/ 			384: 0,
/******/ 			319: 0,
/******/ 			137: 0,
/******/ 			290: 0,
/******/ 			213: 0,
/******/ 			325: 0,
/******/ 			335: 0,
/******/ 			172: 0,
/******/ 			529: 0,
/******/ 			948: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkHostageTape_Website"] = self["webpackChunkHostageTape_Website"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], () => (__webpack_require__(4028)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;