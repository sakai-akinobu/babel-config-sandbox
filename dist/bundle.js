/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/icepick/icepick.js":
/*!*****************************************!*\
  !*** ./node_modules/icepick/icepick.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * This allows you to work with object hierarchies that have been frozen\n * with Object.freeze().  \"get\" operations can use the normal JS syntax,\n * but operations that modify the data will have to return partial copies of\n * the structure. The portions of the structure that did not change will\n * === their previous values.\n *\n * Inspired by clojure/mori and Immutable.js\n */\n\n\nconst i = exports;\n\nconst identity = coll => coll; // we only care about objects or arrays for now\n\n\nconst weCareAbout = val => val !== null && (Array.isArray(val) || // This will skip objects created with `new Foo()`\n// and objects created with `Object.create(proto)`\n// The benefit is ignoring DOM elements and event emitters,\n// which are often circular.\nisObjectLike(val));\n\nconst isObjectLike = val => typeof val === 'object' && val.constructor === Object && Object.getPrototypeOf(val) === Object.prototype;\n\nconst forKeys = (obj, iter) => {\n  let idx, keys;\n\n  if (Array.isArray(obj)) {\n    idx = obj.length;\n\n    while (idx--) {\n      iter(idx);\n    }\n\n    return;\n  }\n\n  keys = Object.keys(obj);\n  idx = keys.length;\n\n  while (idx--) {\n    iter(keys[idx]);\n  }\n};\n\nconst cloneObj = obj => {\n  const newObj = {};\n  const keys = Object.keys(obj);\n  let idx = keys.length;\n  let key;\n\n  while (idx--) {\n    key = keys[idx];\n    newObj[key] = obj[key];\n  }\n\n  return newObj;\n};\n\nconst clone = coll => {\n  if (Array.isArray(coll)) {\n    return coll.slice();\n  } else {\n    return cloneObj(coll);\n  }\n};\n\nconst freezeIfNeeded =  false ? undefined : coll => {\n  if (weCareAbout(coll) && !Object.isFrozen(coll)) {\n    return baseFreeze(coll);\n  }\n\n  return coll;\n};\n\nconst _freeze =  false ? undefined : coll => {\n  if (typeof coll === 'object') {\n    return Object.freeze(coll);\n  } else {\n    return coll;\n  }\n};\n\nconst prevNodes = [];\n\nconst baseFreeze = coll => {\n  if (prevNodes.some(val => val === coll)) {\n    throw new Error('object has a reference cycle');\n  }\n\n  prevNodes.push(coll);\n  forKeys(coll, key => {\n    const prop = coll[key];\n\n    if (weCareAbout(prop)) {\n      baseFreeze(prop);\n    }\n  });\n  prevNodes.pop();\n  Object.freeze(coll);\n  return coll;\n};\n/**\n * recrursively freeze an object and all its child objects\n * @param  {Object|Array} coll\n * @return {Object|Array}\n */\n\n\nexports.freeze =  false ? undefined : baseFreeze;\n/**\n * recursively un-freeze an object, by cloning frozen collections\n * @param  {[type]} coll [description]\n * @return {[type]}      [description]\n */\n\nexports.thaw = function thaw(coll) {\n  if (!weCareAbout(coll) || !Object.isFrozen(coll)) return coll;\n  const newColl = Array.isArray(coll) ? new Array(coll.length) : {};\n  forKeys(coll, key => {\n    newColl[key] = thaw(coll[key]);\n  });\n  return newColl;\n};\n/**\n * set a value on an object or array\n * @param  {Object|Array}  coll\n * @param  {String|Number} key   Key or index\n * @param  {Object}        value\n * @return {Object|Array}        new object hierarchy with modifications\n */\n\n\nexports.assoc = function assoc(coll, key, value) {\n  if (coll[key] === value) {\n    return _freeze(coll);\n  }\n\n  const newObj = clone(coll);\n  newObj[key] = freezeIfNeeded(value);\n  return _freeze(newObj);\n};\n\nexports.set = exports.assoc;\n/**\n * un-set a value on an object or array\n * @param  {Object|Array}  coll\n * @param  {String|Number} key  Key or Index\n * @return {Object|Array}       New object or array\n */\n\nexports.dissoc = function dissoc(coll, key) {\n  const newObj = clone(coll);\n  delete newObj[key];\n  return _freeze(newObj);\n};\n\nexports.unset = exports.dissoc;\n/**\n * set a value deep in a hierarchical structure\n * @param  {Object|Array} coll\n * @param  {Array}        path    A list of keys to traverse\n * @param  {Object}       value\n * @return {Object|Array}       new object hierarchy with modifications\n */\n\nexports.assocIn = function assocIn(coll, path, value) {\n  const key0 = path[0];\n\n  if (path.length === 1) {\n    // simplest case is a 1-element array.  Just a simple assoc.\n    return i.assoc(coll, key0, value);\n  } else {\n    // break the problem down.  Assoc this object with the first key\n    // and the result of assocIn with the rest of the keys\n    return i.assoc(coll, key0, assocIn(coll[key0] || {}, path.slice(1), value));\n  }\n};\n\nexports.setIn = exports.assocIn;\n/**\n * un-set a value on an object or array\n * @param  {Object|Array}  coll\n * @param  {Array} path  A list of keys to traverse\n * @return {Object|Array}       New object or array\n */\n\nexports.dissocIn = function dissocIn(coll, path) {\n  const key0 = path[0];\n\n  if (!coll.hasOwnProperty(key0)) {\n    return coll;\n  }\n\n  if (path.length === 1) {\n    // simplest case is a 1-element array.  Just a simple dissoc.\n    return i.dissoc(coll, key0);\n  } else {\n    // break the problem down.  Assoc this object with the first key\n    // and the result of dissocIn with the rest of the keys\n    return i.assoc(coll, key0, dissocIn(coll[key0], path.slice(1)));\n  }\n};\n\nexports.unsetIn = exports.dissocIn;\n/**\n * get an object from a hierachy based on an array of keys\n * @param  {Object|Array} coll\n * @param  {Array}        path    list of keys\n * @return {Object}       value, or undefined\n */\n\nfunction baseGet(coll, path) {\n  return (path || []).reduce((curr, key) => {\n    if (!curr) {\n      return;\n    }\n\n    return curr[key];\n  }, coll);\n}\n\nexports.getIn = baseGet;\n/**\n * Update a value in a hierarchy\n * @param  {Object|Array}   coll\n * @param  {Array}          path     list of keys\n * @param  {Function} callback The existing value with be passed to this.\n *                             Return the new value to set\n * @return {Object|Array}      new object hierarchy with modifications\n */\n\nexports.updateIn = function updateIn(coll, path, callback) {\n  const existingVal = baseGet(coll, path);\n  return i.assocIn(coll, path, callback(existingVal));\n}; // generate wrappers for the mutative array methods\n\n\n['push', 'unshift', 'pop', 'shift', 'reverse', 'sort'].forEach(methodName => {\n  exports[methodName] = function (arr, val) {\n    const newArr = [...arr];\n    newArr[methodName](freezeIfNeeded(val));\n    return _freeze(newArr);\n  };\n\n  exports[methodName].displayName = 'icepick.' + methodName;\n}); // splice is special because it is variadic\n\nexports.splice = function splice(arr, ..._args) {\n  const newArr = [...arr];\n\n  const args = _args.map(freezeIfNeeded);\n\n  newArr.splice.apply(newArr, args);\n  return _freeze(newArr);\n}; // slice is non-mutative\n\n\nexports.slice = function slice(arr, arg1, arg2) {\n  const newArr = arr.slice(arg1, arg2);\n  return _freeze(newArr);\n};\n\n['map', 'filter'].forEach(methodName => {\n  exports[methodName] = function (fn, arr) {\n    const newArr = arr[methodName](fn);\n    return _freeze(newArr);\n  };\n\n  exports[methodName].displayName = 'icepick.' + methodName;\n});\n\nexports.extend = exports.assign = function assign(obj, ...objs) {\n  const newObj = objs.reduce(singleAssign, obj);\n  return _freeze(newObj);\n};\n\nfunction singleAssign(obj1, obj2) {\n  return Object.keys(obj2).reduce((obj, key) => {\n    return i.assoc(obj, key, obj2[key]);\n  }, obj1);\n}\n\nexports.merge = merge;\n\nfunction merge(target, source, resolver) {\n  if (target == null || source == null) {\n    return target;\n  }\n\n  return Object.keys(source).reduce((obj, key) => {\n    const sourceVal = source[key];\n    const targetVal = obj[key];\n    const resolvedSourceVal = resolver ? resolver(targetVal, sourceVal, key) : sourceVal;\n\n    if (weCareAbout(sourceVal) && weCareAbout(targetVal)) {\n      // if they are both frozen and reference equal, assume they are deep equal\n      if (resolvedSourceVal === targetVal && (\"development\" === 'production' || Object.isFrozen(resolvedSourceVal) && Object.isFrozen(targetVal))) {\n        return obj;\n      }\n\n      if (Array.isArray(sourceVal)) {\n        return i.assoc(obj, key, resolvedSourceVal);\n      } // recursively merge pairs of objects\n\n\n      return assocIfDifferent(obj, key, merge(targetVal, resolvedSourceVal, resolver));\n    } // primitive values, stuff with prototypes\n\n\n    return assocIfDifferent(obj, key, resolvedSourceVal);\n  }, target);\n}\n\nfunction assocIfDifferent(target, key, value) {\n  if (target[key] === value) {\n    return target;\n  }\n\n  return i.assoc(target, key, value);\n}\n\nconst chainProto = {\n  value: function value() {\n    return this.val;\n  },\n  thru: function thru(fn) {\n    this.val = freezeIfNeeded(fn(this.val));\n    return this;\n  }\n};\nObject.keys(exports).forEach(methodName => {\n  if (methodName.match(/^(map|filter)$/)) {\n    chainProto[methodName] = function (fn) {\n      this.val = exports[methodName](fn, this.val);\n      return this;\n    };\n\n    return;\n  }\n\n  chainProto[methodName] = function (...args) {\n    this.val = exports[methodName](this.val, ...args);\n    return this;\n  };\n});\n\nexports.chain = function chain(val) {\n  const wrapped = Object.create(chainProto);\n  wrapped.val = val;\n  return wrapped;\n}; // for testing\n\n\nif (false) {}\n\n//# sourceURL=webpack:///./node_modules/icepick/icepick.js?");

/***/ }),

/***/ "./src/included-package-json/index.js":
/*!********************************************!*\
  !*** ./src/included-package-json/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => 'included-package-json');\n\n//# sourceURL=webpack:///./src/included-package-json/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var icepick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! icepick */ \"./node_modules/icepick/icepick.js\");\n/* harmony import */ var icepick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(icepick__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _included_package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./included-package-json */ \"./src/included-package-json/index.js\");\n/* harmony import */ var _not_included_package_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./not-included-package-json */ \"./src/not-included-package-json/index.js\");\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/not-included-package-json/index.js":
/*!************************************************!*\
  !*** ./src/not-included-package-json/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return 'not-included-package-json';\n});\n\n//# sourceURL=webpack:///./src/not-included-package-json/index.js?");

/***/ })

/******/ });