/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateData": () => (/* binding */ updateData)
/* harmony export */ });
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_classes_Customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _src_classes_Rooms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _src_classes_Bookings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _src_classes_Hotel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
// Import files









// Login Selectors
const loginContainer = document.getElementById('loginContainer');
const loginError = document.getElementById('loginError');
const loginError2 = document.getElementById('loginError2');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');


// User & Navigation Selectors
const userInfoContainer = document.getElementById('userInfoContainer');
const userWelcome = document.getElementById('userWelcome');
const userTotalSpent = document.getElementById('userTotalSpent');
const navigation = document.getElementById('navigation');
const dateError = document.getElementById('dateError');
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');
const searchRoomsBtn = document.getElementById('searchRoomsBtn');
const roomTypeForm = document.getElementById('roomTypeForm');
const roomType = document.getElementById('roomType');


// Room & Stay Information Selectors
const roomDisplayHeading = document.getElementById('roomDisplayHeading');
const roomDisplayArea = document.getElementById('roomDisplayArea');
const backToResults = document.getElementById('backToResults');
const upcomingStaysBtn = document.getElementById('upcomingStaysBtn');
const pastStaysBtn = document.getElementById('pastStaysBtn');
const noResultsMsg = document.getElementById('noResultsMsg');
const indRoom = document.getElementById('indRoom');


// Global variables/ Data Model
let separatedData;
let roomsOnDashboard;
let customer;
let hotel;


// Event Listeners
searchRoomsBtn.addEventListener('click', function() {
  hotel.filterAvailableRooms(checkinDate, checkoutDate, roomType.value, gridContainer, roomDisplayHeading, upcomingStaysBtn, noResultsMsg, dateError, pastStaysBtn)
});
gridContainer.addEventListener('click', findRoom);
backToResults.addEventListener('click', hideView);
indRoom.addEventListener('click', bookRoom);
upcomingStaysBtn.addEventListener('click', hideView);
pastStaysBtn.addEventListener('click', function() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event)
});
loginBtn.addEventListener('click', checkLoginInfo);


// Data Aquisition & Organization
function getData(singleCustomer, event) {
  let updateSignal = null;
  gatherData(singleCustomer, updateSignal, event);
};


const updateData = (event) => {
  let updateSignal = 1;
  gatherData(customer.id, updateSignal, event);
  hideView(event);
};


function gatherData(singleCustomer, updateSignal, event) {
  let apiRoomInfo = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.roomPromise)()
  .then(data => data)
  .catch(error => console.log(`API room error: ${error.message}`))
  let apiBookingInfo = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.bookingsPromise)()
  .then(data => data)
  .catch(error => console.log(`API bookings error: ${error.message}`))

  if (updateSignal === null) {
    let apiCustomerInfo = singleCustomer;
    Promise.all([apiRoomInfo, apiBookingInfo])
    .then(data => organizeData(data, apiCustomerInfo, event))

  } else {
    let apiCustomerInfo = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.singleCustomerPromise)(singleCustomer)
    .then(data => data)
    .catch(error => console.log(`API customer error: ${error.message}`))
    Promise.all([apiCustomerInfo, apiRoomInfo, apiBookingInfo])
    .then(data => organizeData(data))
  };
};


function organizeData(data, apiCustomerInfo, event) {
  if (!apiCustomerInfo) {
    let customerInfo = data[0];
    let roomInfo = data[1];
    let bookingInfo = data[2];

    initializeData(customerInfo, roomInfo, bookingInfo);

  } else if (apiCustomerInfo) {
    let customerInfo = apiCustomerInfo;
    let roomInfo = data[0];
    let bookingInfo = data[1];

    initializeData(customerInfo, roomInfo, bookingInfo, event);
  };
};


// Create Objects/ Data Model
function instantiateClasses(customerInfo, roomInfo, bookingInfo) {
  let currentDate = getCurrentDate();

  let instantiatedRooms = [];
  roomInfo.rooms.forEach((rm) => {
    let room = new _src_classes_Rooms__WEBPACK_IMPORTED_MODULE_2__.default(rm);
    instantiatedRooms.push(room)
  });


  let instantiatedBookings = [];
  bookingInfo.bookings.forEach((bookedStay) => {
    let booking = new _src_classes_Bookings__WEBPACK_IMPORTED_MODULE_3__.default(bookedStay);
    instantiatedBookings.push(booking)
  });

  customer = new _src_classes_Customer__WEBPACK_IMPORTED_MODULE_1__.default(customerInfo, instantiatedBookings, instantiatedRooms, currentDate);
  hotel = new _src_classes_Hotel__WEBPACK_IMPORTED_MODULE_4__.default(instantiatedBookings, instantiatedRooms);
};


function getCurrentDate() {
  let date = new Date()
  let day = String(date.getDate()+1).padStart(2, "0");
  let year = date.getFullYear();
  let month = String(date.getMonth()+1).padStart(2, "0");


  let completeDate = `${year}${month}${day}`;
  return parseInt(completeDate);
};


function initializeData(customerInfo, roomInfo, bookingInfo, event) {
  separatedData = [customerInfo, roomInfo, bookingInfo];

  instantiateClasses(customerInfo, roomInfo, bookingInfo);

  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.populateUserInfo(customer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.populateRoomTypeDropDwn(roomInfo);
};


// Customer Login Verification
function checkLoginInfo(event) {
  if (username.value && password.value) {
    event.preventDefault();
    collectUserInfo(username.value, password.value, event);

  } else if (!username.value || !password.value) {
    event.preventDefault();
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(loginError);
  };
};


async function collectUserInfo(customerUsername, customerPassword, event) {
  if (customerPassword !== 'overlook2021') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(loginError2);
  } else if (customerPassword === 'overlook2021') {
      customerUsername = customerUsername.replace(/\D/g, '');
      let custPromise = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.singleCustomerPromise)(customerUsername);
      let result = await custPromise;

      verifyUser(result, customerUsername, event);
  };
};


function verifyUser(result, customerUsername, event) {
  if (result.id === parseInt(customerUsername)) {
    getData(result, event);
    hideView(event);

  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(loginError2);
  }
};


// Navigate DOM
function findRoom(event) {
  if (event.target.id !== 'gridContainer' && roomDisplayHeading.innerText === 'Available Rooms') {
    let roomId = event.target.parentNode.id;
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.populateIndividualRoom(roomId, gridContainer, indRoom, hotel.allRooms, backToResults);
  };
};


function hideView(event) {
  if (event.target.id === 'upcomingStaysBtn') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(backToResults);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(indRoom);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(upcomingStaysBtn);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(pastStaysBtn);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(gridContainer);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event);

  } else if (event.target.id === 'loginBtn') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(upcomingStaysBtn);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(pastStaysBtn);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(loginContainer);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(gridContainer);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(userInfoContainer);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(navigation);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(roomDisplayHeading);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(roomDisplayArea);

  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(indRoom);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.hide(backToResults);
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.show(gridContainer);
  };
};


// Update Data Model/ API
function bookRoom(event) {
  if (event.target.id === 'bookNow') {
    let newDate = checkinDate.value.replaceAll('-', '/')
    let parsedRoomNumber = parseInt(event.target.value);

     let newBooking = {
       userID: customer.id,
       date: newDate,
       roomNumber: parsedRoomNumber
     };
     (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.bookUserStay)(newBooking, event);
  };
};


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* This is an example of how to import a partial scss file*/\n* {\n  background-color: black;\n  color: white;\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  height: 100%;\n}\n\nmain {\n  height: 100%;\n}\n\n.login-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: 2px solid white;\n  height: 80%;\n  width: 100%;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  border: 2px solid white;\n  height: 60%;\n  width: 60%;\n}\n\n.login-input-fields {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 40%;\n}\n\n.login-info {\n  margin: 1em;\n  width: 60%;\n}\n\n.login-btn-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 25%;\n  width: 33%;\n}\n\n.user-info {\n  display: flex;\n  justify-content: space-between;\n  height: 5%;\n}\n\n.date-entry {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n}\n\nheader {\n  height: 20%;\n}\n\nnav {\n  display: flex;\n  justify-content: flex-end;\n  height: 10%;\n}\n\nh1 {\n  height: 100%;\n  font-size: 7em;\n}\n\n.room-disp-heading {\n  display: flex;\n  justify-content: space-between;\n  height: 8%;\n  border: solid thin aqua;\n}\n\n.upcoming-stays {\n  font-size: 2em;\n}\n\n.room-navigation-buttons {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  width: 75%;\n}\n\n.all-search-options {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.search-option {\n  display: flex;\n  align-items: center;\n  margin: 5px 25px 5px 25px;\n}\n\n.room-type-dropdown {\n  display: flex;\n  flex-direction: column;\n}\n\n.room-display-area {\n  display: flex;\n  justify-content: space-evenly;\n  margin-top: 1em;\n  height: 100%;\n}\n\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 2em;\n  width: 75%;\n  margin-top: 1em;\n}\n\n.grid-item {\n  height: 100%;\n  border: 2px solid white;\n}\n\n.individual-room {\n  border: 2px solid white;\n  height: 30%;\n  width: 20%;\n}\n\n.room-info-container,\n.ind-room-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n}\n\n.ind-card-head {\n  display: flex;\n  justify-content: space-between;\n}\n\n.login-button {\n  border-radius: 0.75em;\n  background-color: transparent;\n  border-color: white;\n  height: 40%;\n  width: 80%;\n}\n\n.login-button:hover {\n  background-color: white;\n  color: black;\n}\n\n.login-button:focus {\n  border-color: #00FFFF;\n  background-color: transparent;\n  color: white;\n}\n\nbutton {\n  border-radius: 0.75em;\n  background-color: transparent;\n  border-color: white;\n  height: 40%;\n}\n\nbutton:hover {\n  background-color: white;\n  color: black;\n}\n\nbutton:focus {\n  border-color: #00FFFF;\n  background-color: transparent;\n  color: white;\n}\n\ninput:hover,\nselect:hover {\n  cursor: pointer;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss","webpack://./src/css/mixins.scss","webpack://./src/css/_variables.scss"],"names":[],"mappings":"AAAA,2DAAA;AAIA;EACE,uBAAA;EACA,YAAA;AAFF;;AAKA;EACE,YAAA;AAFF;;AAKA;EACE,YAAA;AAFF;;AAKA;EACE,YAAA;AAFF;;AAKA;ECpBE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EDmBA,uBErBY;EFsBZ,WAAA;EACA,WAAA;AACF;;AAEA;ECrBE,aAAA;EACA,sBAAA;EACA,6BAAA;EACA,mBAAA;EDoBA,uBE5BY;EF6BZ,WAAA;EACA,UAAA;AAIF;;AADA;EClCE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EDiCA,UAAA;AAOF;;AAJA;EACE,WAAA;EACA,UAAA;AAOF;;AAJA;EC5CE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;ED2CA,WAAA;EACA,UAAA;AAUF;;AAPA;EACE,aAAA;EACA,8BAAA;EACA,UAAA;AAUF;;AAPA;EACE,aAAA;EACA,sBAAA;EACA,yBAAA;AAUF;;AAPA;EACE,WAAA;AAUF;;AAPA;EACE,aAAA;EACA,yBAAA;EACA,WAAA;AAUF;;AAPA;EACE,YAAA;EACA,cAAA;AAUF;;AAPA;EACE,aAAA;EACA,8BAAA;EACA,UAAA;EACA,uBAAA;AAUF;;AAPA;EACE,cAAA;AAUF;;AAPA;EACE,aAAA;EACA,mBAAA;EACA,6BAAA;EACA,UAAA;AAUF;;AAPA;EACE,aAAA;EACA,8BAAA;EACA,mBAAA;AAUF;;AAPA;EACE,aAAA;EACA,mBAAA;EACA,yBAAA;AAUF;;AAPA;EACE,aAAA;EACA,sBAAA;AAUF;;AAPA;EACE,aAAA;EACA,6BAAA;EACA,eAAA;EACA,YAAA;AAUF;;AAPA;EACC,aAAA;EACA,qCAAA;EACA,aAAA;EACC,UAAA;EACA,eAAA;AAUF;;AAPA;EACE,YAAA;EACA,uBEhIY;AF0Id;;AAPA;EACE,uBEpIY;EFqIZ,WAAA;EACA,UAAA;AAUF;;AAPA;;EAEE,aAAA;EACA,sBAAA;EACA,6BAAA;AAUF;;AAPA;EACE,aAAA;EACA,8BAAA;AAUF;;AAPA;EC1IE,qBAAA;EACA,6BAAA;EACA,mBAAA;EACA,WAAA;EDyIA,UAAA;AAaF;;AAVA;EACE,uBEzJmB;EF0JnB,YEzJkB;AFsKpB;;AAVA;EACE,qBE3JoB;EF4JpB,6BE3JwB;EF4JxB,YE3JkB;AFwKpB;;AAVA;EC1JE,qBAAA;EACA,6BAAA;EACA,mBAAA;EACA,WAAA;ADwKF;;AAbA;EACE,uBExKmB;EFyKnB,YExKkB;AFwLpB;;AAbA;EACE,qBE1KoB;EF2KpB,6BE1KwB;EF2KxB,YE1KkB;AF0LpB;;AAbA;;EAEE,eAAA;AAgBF;;AAbA;EACE,aAAA;AAgBF","sourcesContent":["/* This is an example of how to import a partial scss file*/\n@import '_variables';\n@import 'mixins';\n\n* {\n  background-color: black;\n  color: white;\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  height: 100%;\n}\n\nmain {\n  height: 100%;\n}\n\n.login-container {\n  @include centered-column();\n  border: $item-border;\n  height:80%;\n  width: 100%;\n}\n\n.login-form {\n  @include even-space-column();\n  border: $item-border;\n  height: 60%;\n  width: 60%;\n}\n\n.login-input-fields {\n  @include centered-column();\n  width: 40%;\n}\n\n.login-info {\n  margin: 1em;\n  width: 60%;\n}\n\n.login-btn-container {\n  @include centered-column();\n  height: 25%;\n  width: 33%;\n}\n\n.user-info {\n  display: flex;\n  justify-content: space-between;\n  height: 5%;\n}\n\n.date-entry {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n}\n\nheader {\n  height: 20%;\n}\n\nnav {\n  display: flex;\n  justify-content: flex-end;\n  height: 10%;\n}\n\nh1 {\n  height: 100%;\n  font-size: 7em;\n}\n\n.room-disp-heading {\n  display: flex;\n  justify-content: space-between;\n  height: 8%;\n  border: solid thin aqua;\n}\n\n.upcoming-stays {\n  font-size: 2em;\n}\n\n.room-navigation-buttons {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  width: 75%;\n}\n\n.all-search-options {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.search-option {\n  display: flex;\n  align-items: center;\n  margin: 5px 25px 5px 25px;\n}\n\n.room-type-dropdown {\n  display: flex;\n  flex-direction: column;\n}\n\n.room-display-area {\n  display: flex;\n  justify-content: space-evenly;\n  margin-top: 1em;\n  height: 100%;\n}\n\n.grid-container {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(3, 1fr);\n\tgrid-gap: 2em;\n  width: 75%;\n  margin-top: 1em;\n}\n\n.grid-item {\n  height: 100%;\n  border: $item-border;\n}\n\n.individual-room {\n  border: $item-border;\n  height: 30%;\n  width: 20%;\n}\n\n.room-info-container,\n.ind-room-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n}\n\n.ind-card-head {\n  display: flex;\n  justify-content: space-between;\n}\n\n.login-button {\n  @include button-style;\n  width: 80%;\n}\n\n.login-button:hover {\n  background-color: $button-hover-color;\n  color: $button-hover-text;\n}\n\n.login-button:focus {\n  border-color: $button-focus-border;\n  background-color: $button-focus-background;\n  color: $button-focus-text;\n}\n\nbutton {\n  @include button-style;\n}\n\nbutton:hover {\n  background-color: $button-hover-color;\n  color: $button-hover-text;\n}\n\nbutton:focus {\n  border-color: $button-focus-border;\n  background-color: $button-focus-background;\n  color: $button-focus-text;\n}\n\ninput:hover,\nselect:hover {\n  cursor: pointer;\n}\n\n.hidden {\n  display: none;\n}\n","@mixin centered-column() {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n@mixin even-space-column() {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n@mixin button-style() {\n  border-radius: .75em;\n  background-color: transparent;\n  border-color: white;\n  height: 40%;\n}\n","$primary-background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);\n\n$item-border: 2px solid white;\n\n$button-hover-color: white;\n$button-hover-text: black;\n\n$button-focus-border: #00FFFF;\n$button-focus-background: transparent;\n$button-focus-text: white;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(customerInfo, bookingInfo, roomInfo, currentDate) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.allBookedStays = [];
    this.pastStays = [];
    this.upcomingStays = [];
    this.retrieveBookings = this.getCustomerBookings(bookingInfo, currentDate);
    this.totalSpent = 0;
    this.retrieveTotalSpent = this.calculateTotalSpent(roomInfo);
    // this.reformatDate = this.reformatDate();
  }

  getCustomerBookings(bookingInfo, currentDate) {
    this.allBookedStays = bookingInfo.filter((booking) => this.id === booking.userID);

    this.allBookedStays.forEach((booking) => {
      if (parseInt(booking.date) >= currentDate) {
        this.upcomingStays.push(booking);

      } else if (parseInt(booking.date) < currentDate){
        this.pastStays.push(booking);
      };
    });
  };


  calculateTotalSpent(roomInfo) {
    this.totalSpent = roomInfo.reduce((num, room) => {
      this.allBookedStays.forEach((stay) => {
        if (room.number === stay.roomNumber) {
          num += room.costPerNight;
        };
      });
      return Math.round(num * 100)/100;
    }, 0);
  };


  // reformatDate() {
  //   let formattedStays = [];
  //   let dash = '/';
  //   let position1 = 4;
  //   let position2 = 7;
  //
  //   this.upcomingStays.forEach((stay) => {
  //     let result1 = [stay.date.slice(0, position1), dash, stay.date.slice(position1)].join('');
  //     let result2 = [result1.slice(0, position2), dash, result1.slice(position2)].join('');
  //     stay.date = result2;
  //     formattedStays.push(stay);
  //   });
  //
  //   this.upcomingStays = formattedStays;
  // };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Rooms {
  constructor(roomInfo) {
    this.number = roomInfo.number;
    this.roomType = roomInfo.roomType;
    this.bidet = roomInfo.bidet;
    this.bedSize = roomInfo.bedSize;
    this.numBeds = roomInfo.numBeds;
    this.costPerNight = roomInfo.costPerNight;
    this.available = true;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rooms);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Bookings {
  constructor(bookedStay) {
    this.id = bookedStay.id;
    this.userID = bookedStay.userID;
    this.date = bookedStay.date.replaceAll('/', '');
    this.roomNumber = bookedStay.roomNumber;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bookings);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_domUpdates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);



class Hotel {
  constructor(instantiatedBookings, instantiatedRooms) {
    this.allBookings = instantiatedBookings;
    this.allRooms = instantiatedRooms;
    this.roomAvailability = instantiatedRooms;
  };


  filterAvailableRooms(checkinDate, checkoutDate, roomType, gridContainer, roomDisplayHeading, upcomingStaysBtn, noResultsMsg, dateError, pastStaysBtn) {
    if (!checkinDate.value || !checkoutDate.value) {
      return _src_domUpdates_js__WEBPACK_IMPORTED_MODULE_0__.default.show(dateError);
    };

    let date = checkinDate.value.replaceAll('-', '');
    this.roomAvailability = this.allRooms;

    this.allBookings.forEach((booking) => {
      if (booking.date === date) {
        let roomNum = booking.roomNumber;
        this.roomAvailability.forEach((room) => {
          if (room.number === roomNum) {
            let index = this.roomAvailability.indexOf(room);
            this.roomAvailability.splice(index, 1);
          };
        });
      };
    });

    if (roomType !== 'all-room-types') {
      return this.filterByRoomType(roomType, noResultsMsg, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn);
    };
      _src_domUpdates_js__WEBPACK_IMPORTED_MODULE_0__.default.populateFilteredRooms(this.roomAvailability, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn);
  };


  filterByRoomType(type, noResultsMsg, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn) {
    let availableTypes = this.roomAvailability.filter((room) => room.roomType === type);

    if (!availableTypes.length) {
      return _src_domUpdates_js__WEBPACK_IMPORTED_MODULE_0__.default.show(noResultsMsg);
    };
    _src_domUpdates_js__WEBPACK_IMPORTED_MODULE_0__.default.populateFilteredRooms(availableTypes,  gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn);
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_classes_Bookings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _src_classes_Rooms_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _src_classes_Hotel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _src_classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





let domUpdates = {
  populateUserInfo(customer) {
    userWelcome.innerText = `Welcome ${customer.name}!`;
    userTotalSpent.innerText = `Total Spent: ${customer.totalSpent}`;
  },


  determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event) {
    if (event === undefined || event.target.id !== 'pastStaysBtn') {
      domUpdates.show(pastStaysBtn);
      domUpdates.hide(upcomingStaysBtn);
      gridContainer.innerHTML = ``;
      roomDisplayHeading.innerText = 'Upcoming Stays';
      let stayType = customer.upcomingStays;
      domUpdates.populateUpcomingStays(stayType);

    }else if (event.target.id === 'pastStaysBtn') {
      domUpdates.hide(pastStaysBtn);
      domUpdates.show(upcomingStaysBtn);
      gridContainer.innerHTML = ``;
      roomDisplayHeading.innerText = 'Past Stays';
      let stayType = customer.pastStays;
      domUpdates.populateUpcomingStays(stayType);
    };
  },


  populateUpcomingStays(stayType) {
    stayType.forEach((stay) => {
      gridContainer.innerHTML += `
        <section class="grid-item" tabindex="0" name="upcoming-stay" id="${stay.id}">
          <p>Date of Stay: ${stay.date}</p>
          <p>Room: ${stay.roomNumber}</p>
        </section>
      `;
    });
  },


  populateRoomTypeDropDwn(roomInfo) {
    let filteredRoomTypes = roomInfo.rooms.reduce((arr, room) => {
      if (!arr.includes(room.roomType)) {
        arr.push(room.roomType);
      }
      return arr;
    }, []);

    filteredRoomTypes.forEach((type) => {
      roomType.innerHTML += `
      <option value="${type}" id="${type}">${type}</option>
      `;
    });
  },


  populateFilteredRooms(roomsToDisplay, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn) {
    domUpdates.hide(dateError);
    domUpdates.hide(pastStaysBtn);
    domUpdates.show(upcomingStaysBtn);
    roomDisplayHeading.innerText = 'Available Rooms';
    gridContainer.innerHTML = '';

    roomsToDisplay.forEach((room) => {
      gridContainer.innerHTML += `
      <section class="grid-item" tabindex="0">
        <div class="room-info-container" id="${room.number}">
          <div class="ind-card-head" id="${room.number}">
            <p>Room Number: ${room.number}</p>
            <p>Room Type: ${room.roomType}</p>
          </div>
          <p>Has bidet: ${room.bidet}</p>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost Per Night: ${room.costPerNight}</p>
        </div>
      </section>
      `;
    });
  },


  populateIndividualRoom(roomId, gridContainer, indRoom, allRooms, backToResults) {
    domUpdates.hide(gridContainer);
    domUpdates.show(indRoom);
    domUpdates.show(backToResults);
    indRoom.innerHTML = ``;

    allRooms.forEach((room) => {
      if (room.number === parseInt(roomId)) {
        indRoom.innerHTML += `
        <h3>${room.roomType} ${room.number}</h3>
        <div class="ind-room-info">
          <p>Has bidet: ${room.bidet}</p>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost Per Night: ${room.costPerNight}</p>
          <button type="button" value="${room.number}" name="${room.number}" id="bookNow">Book Now</button>
        </div>
        `;
      };
    });
  },


  show(element) {
    element.classList.remove('hidden');
  },


  hide(element) {
    element.classList.add('hidden');
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allCustomersPromise": () => (/* binding */ allCustomersPromise),
/* harmony export */   "singleCustomerPromise": () => (/* binding */ singleCustomerPromise),
/* harmony export */   "roomPromise": () => (/* binding */ roomPromise),
/* harmony export */   "bookingsPromise": () => (/* binding */ bookingsPromise),
/* harmony export */   "bookUserStay": () => (/* binding */ bookUserStay)
/* harmony export */ });
/* harmony import */ var _scripts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

// import Hotel from './src/classes/Hotel.js';
// import Bookings from './src/classes/Bookings.js';

const allCustomersPromise = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
};


const singleCustomerPromise = (customerUsername) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerUsername}`)
  .then(response => response.json())
};


const roomPromise = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => response.json())
};


const bookingsPromise = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json())
};


const bookUserStay = (newStay, event) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStay),
  })
  .then(response => response.json())
  .then(stay => (0,_scripts_js__WEBPACK_IMPORTED_MODULE_0__.updateData)(event))
  .catch(err => console.log(`POST ERROR ${err}`))
}


/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/************************************************************************/
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map