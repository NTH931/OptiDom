var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable func-style */
function defineProperty(object, prop, getter, setter) {
    Object.defineProperty(object, prop, {
        get: getter,
        set: setter,
        enumerable: false,
        configurable: true
    });
}
function defineGetter(object, prop, getter) {
    defineProperty(object, prop, getter);
}
function defineSetter(object, prop, setter) {
    Object.defineProperty(object, prop, {
        set: setter,
        enumerable: false,
        configurable: true
    });
}
function toArray(collection) {
    return Array.from(collection);
}
// Sources
const bindShortcut = function (shortcut, callback) {
    document.addEventListener('keydown', (event) => {
        const keyboardEvent = event;
        const keys = shortcut
            .trim()
            .toLowerCase()
            .split("+");
        // Separate out the modifier keys and the actual key
        const modifiers = keys.slice(0, -1);
        const finalKey = keys[keys.length - 1];
        const modifierMatch = modifiers.every((key) => {
            if (key === 'ctrl' || key === 'control')
                return keyboardEvent.ctrlKey;
            if (key === 'alt')
                return keyboardEvent.altKey;
            if (key === 'shift')
                return keyboardEvent.shiftKey;
            if (key === 'meta' || key === 'windows' || key === 'command')
                return keyboardEvent.metaKey;
            return false;
        });
        // Check that the pressed key matches the final key
        const keyMatch = finalKey === keyboardEvent.key.toLowerCase();
        if (modifierMatch && keyMatch) {
            callback(keyboardEvent);
        }
    });
};
const fromTime = function (time, year, monthIndex, date) {
    return new Date(year, monthIndex, date, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};
const ready = function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
};
const leaving = function (callback) {
    document.addEventListener("unload", (e) => callback.call(document, e));
};
const addEventListenerEnum = function (type, listener, options) {
    for (const el of this) {
        if (el instanceof Element) {
            el.addEventListener(type, listener, options);
        }
    }
};
const addBoundListener = function (type, listener, timesOrCondition, options) {
    if (typeof timesOrCondition === "number") {
        if (timesOrCondition <= 0)
            return;
        let repeatCount = timesOrCondition; // Default to 1 if no repeat option provided
        const onceListener = (event) => {
            listener.call(this, event);
            repeatCount--;
            if (repeatCount <= 0) {
                this.removeEventListener(type, onceListener, options);
            }
        };
        this.addEventListener(type, onceListener, options);
    }
    else {
        if (timesOrCondition.call(this))
            return;
        const onceListener = (event) => {
            if (timesOrCondition.call(this)) {
                this.removeEventListener(type, onceListener, options);
                return;
            }
            listener.call(this, event);
        };
        this.addEventListener(type, onceListener, options);
    }
};
const hasText = function (text) {
    if (typeof text === "string") {
        return this.text().includes(text);
    }
    else {
        return text.test(this.text());
    }
};
const addClassList = function (elClass) {
    for (const el of this) {
        el.addClass(elClass);
    }
};
const removeClassList = function (elClass) {
    for (const el of this) {
        el.removeClass(elClass);
    }
};
const toggleClassList = function (elClass) {
    for (const el of this) {
        el.toggleClass(elClass);
    }
};
const addClass = function (elClass) {
    this.classList.add(elClass);
};
const removeClass = function (elClass) {
    this.classList.remove(elClass);
};
const toggleClass = function (elClass) {
    this.classList.toggle(elClass);
};
const hasClass = function (elClass) {
    return this.classList.contains(elClass);
};
const atDate = (year, monthIndex, date, hours, minutes, seconds, ms) => {
    return new Date(year, monthIndex, date, hours, minutes, seconds, ms).getTime();
};
function addEventListeners(listenersOrTypes, callback, options) {
    if (Array.isArray(listenersOrTypes)) {
        for (const type of listenersOrTypes) {
            this.addEventListener(String(type), callback, options);
        }
    }
    else {
        for (const [event, listener] of Object.entries(listenersOrTypes)) {
            if (listener) {
                this.addEventListener(String(event), listener, options);
            }
        }
    }
}
;
const css = function (key, value) {
    const css = this.style;
    if (!key) {
        // Return all styles
        const result = {};
        for (let i = 0; i < css.length; i++) {
            const prop = css[i];
            if (prop) {
                result[prop] = css.getPropertyValue(prop).trim();
            }
        }
        return result;
    }
    if (typeof key === "string") {
        if (value === undefined) {
            // Get one value
            return css.getPropertyValue(key).trim();
        }
        else {
            // Set one value
            if (key in css) {
                css.setProperty(key, value.toString());
            }
        }
    }
    else {
        // Set multiple
        for (const [prop, val] of Object.entries(key)) {
            if (prop in css && val !== null && val !== undefined) {
                css.setProperty(prop, val.toString());
            }
        }
    }
};
const documentCss = function (element, object) {
    const selector = element.trim();
    if (!selector) {
        throw new Error("Selector cannot be empty.");
    }
    let styleTag = document.querySelector("style[js-styles]");
    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.setAttribute("js-styles", "");
        document.head.appendChild(styleTag);
    }
    const sheet = styleTag.sheet;
    let ruleIndex = -1;
    const existingStyles = {};
    for (let i = 0; i < sheet.cssRules.length; i++) {
        const rule = sheet.cssRules[i];
        if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
            ruleIndex = i;
            const declarations = rule.style;
            for (let j = 0; j < declarations.length; j++) {
                const name = declarations[j];
                existingStyles[name] = declarations.getPropertyValue(name).trim();
            }
            break;
        }
    }
    if (!object || Object.keys(object).length === 0) {
        return existingStyles;
    }
    // Convert camelCase to kebab-case
    const newStyles = {};
    for (const [prop, val] of Object.entries(object)) {
        if (val !== null && val !== undefined) {
            const kebab = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
            newStyles[kebab] = val.toString();
        }
    }
    const mergedStyles = Object.assign(Object.assign({}, existingStyles), newStyles);
    const styleString = Object.entries(mergedStyles)
        .map(([prop, val]) => `${prop}: ${val};`)
        .join(" ");
    if (ruleIndex !== -1) {
        sheet.deleteRule(ruleIndex);
    }
    try {
        sheet.insertRule(`${selector} { ${styleString} }`, sheet.cssRules.length);
    }
    catch (err) {
        console.error("Failed to insert CSS rule:", err, { selector, styleString });
    }
};
const getParent = function () {
    return this.parentElement;
};
const getAncestor = function (level) {
    let ancestor = this;
    for (let i = 0; i < level; i++) {
        if (ancestor.parentNode === null)
            return null;
        ancestor = ancestor.parentNode;
    }
    return ancestor;
};
const querySelectAncestor = function (selector) {
    const element = document.querySelector(selector);
    if (element === null || element === void 0 ? void 0 : element.contains(this)) {
        return element;
    }
    return null;
};
const createChildren = function (elements) {
    const element = document.createElement(elements.element);
    if (elements.id) {
        element.id = elements.id;
    }
    if (elements.className) {
        if (Array.isArray(elements.className)) {
            element.classList.add(...elements.className);
        }
        else {
            element.classList.add(elements.className);
        }
    }
    // Assign additional attributes dynamically
    for (const key in elements) {
        if (!['element', 'id', 'className', 'children'].includes(key)) {
            const value = elements[key];
            if (typeof value === 'string') {
                element.setAttribute(key, value);
            }
            else if (Array.isArray(value)) {
                element.setAttribute(key, value.join(' ')); // Convert array to space-separated string
            }
        }
    }
    // Recursively create children
    if (elements.children) {
        if (Array.isArray(elements.children)) {
            elements.children.forEach(child => {
                // Recursively create child elements
                element.createChildren(child);
            });
        }
        else {
            // Recursively create a single child element
            element.createChildren(elements.children);
        }
    }
    this.appendChild(element);
};
const tag = function (newTag) {
    if (!newTag) {
        return this.tagName.toLowerCase();
    }
    const newElement = document.createElement(newTag);
    // Copy attributes
    Array.from(this.attributes).forEach(attr => {
        newElement.setAttribute(attr.name, attr.value);
    });
    // Copy dataset
    Object.entries(this.dataset).forEach(([key, value]) => {
        newElement.dataset[key] = value;
    });
    // Copy inline styles
    newElement.style.cssText = this.style.cssText;
    // Copy classes
    newElement.className = this.className;
    // Copy child nodes
    while (this.firstChild) {
        newElement.appendChild(this.firstChild);
    }
    // Transfer listeners (if you have a system for it)
    if (this._eventListeners instanceof Map) {
        const listeners = this._eventListeners;
        listeners.forEach((fns, type) => {
            fns.forEach(fn => newElement.addEventListener(type, fn));
        });
        newElement._eventListeners = new Map(listeners);
    }
    // Optional: Copy properties (if you have custom prototype extensions)
    for (const key in this) {
        // Skip built-in DOM properties and functions
        if (!(key in newElement) &&
            typeof this[key] !== "function") {
            try {
                newElement[key] = this[key];
            }
            catch (_a) {
                // Some props might be readonly — safely ignore
            }
        }
    }
    this.replaceWith(newElement);
    return newElement;
};
const html = function (input) {
    return input !== undefined ? (this.innerHTML = input) : this.innerHTML;
};
const text = function (text, ...input) {
    var _a, _b;
    // If text is provided, update the textContent
    if (text !== undefined) {
        input.unshift(text); // Add the text parameter to the beginning of the input array
        const joined = input.join(" "); // Join all the strings with a space
        // Replace "textContent" if it's found in the joined string (optional logic)
        this.textContent = joined.includes("textContent")
            ? joined.replace("textContent", (_a = this.textContent) !== null && _a !== void 0 ? _a : "")
            : joined;
    }
    // Return the current textContent if no arguments are passed
    return (_b = this.textContent) !== null && _b !== void 0 ? _b : "";
};
const $ = function (selector) {
    return document.querySelector(selector);
};
const $$ = function (selector) {
    return document.querySelectorAll(selector);
};
const origionalRandom = Math.random;
const random = (max) => {
    if (max) {
        return origionalRandom() * max;
    }
    else
        return origionalRandom();
};
const show = function () {
    this.css("visibility", "visible");
};
const hide = function () {
    this.css("visibility", "hidden");
};
const toggle = function () {
    if (this.css("visibility") === "visible" || this.css("visibility") === "") {
        this.hide();
    }
    else {
        this.show();
    }
};
const find = function (selector) {
    return this.querySelector(selector); // Returns a single Element or null
};
const findAll = function (selector) {
    return this.querySelectorAll(selector); // Returns a single Element or null
};
const getChildren = function () {
    return this.childNodes;
};
const getSiblings = function (inclusive) {
    const siblings = Array.from(this.parentNode.childNodes);
    if (inclusive) {
        return siblings; // Include current node as part of siblings
    }
    else {
        return siblings.filter(node => !node.isSameNode(this));
    }
};
const serialize = function () {
    const formData = new FormData(this); // Create a FormData object from the form
    // Create an array to hold key-value pairs
    const entries = [];
    // Use FormData's forEach method to collect form data
    formData.forEach((value, key) => {
        entries.push([key, value.toString()]);
    });
    // Convert the entries into a query string
    return entries
        .map(([key, value]) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    })
        .join('&'); // Join the array into a single string, separated by '&'
};
const clone = function (object, deep) {
    const shallowClone = () => Object.assign(Object.create(Object.getPrototypeOf(object)), object);
    const deepClone = (obj, seen = new WeakMap()) => {
        if (obj === null || typeof obj !== "object")
            return obj;
        if (seen.has(obj))
            return seen.get(obj);
        // Preserve prototype
        const cloned = Array.isArray(obj)
            ? []
            : Object.create(Object.getPrototypeOf(obj));
        seen.set(obj, cloned);
        if (obj instanceof Date)
            return new Date(obj.getTime());
        if (obj instanceof RegExp)
            return new RegExp(obj);
        if (obj instanceof Map) {
            obj.forEach((v, k) => cloned.set(deepClone(k, seen), deepClone(v, seen)));
            return cloned;
        }
        if (obj instanceof Set) {
            obj.forEach(v => cloned.add(deepClone(v, seen)));
            return cloned;
        }
        if (ArrayBuffer.isView(obj))
            return new obj.constructor(obj);
        if (obj instanceof ArrayBuffer)
            return obj.slice(0);
        for (const key of Reflect.ownKeys(obj)) {
            cloned[key] = deepClone(obj[key], seen);
        }
        return cloned;
    };
    return deep ? deepClone(object) : shallowClone();
};
const repeat = function (iterator) {
    for (let i = 0; i < this; i++) {
        iterator(i);
    }
};
const unique = function () {
    return [...new Set(this)];
};
const chunk = function (chunkSize) {
    if (chunkSize <= 0)
        throw new TypeError("`chunkSize` cannot be a number below 1");
    const newArr = [];
    let tempArr = [];
    this.forEach(val => {
        tempArr.push(val);
        if (tempArr.length === chunkSize) {
            newArr.push(tempArr);
            tempArr = []; // Reset tempArr for the next chunk
        }
    });
    // Add the remaining elements in tempArr if any
    if (tempArr.length) {
        newArr.push(tempArr);
    }
    return newArr;
};
const remove = function (finder) {
    return this.replace(finder, "");
};
const removeAll = function (finder) {
    if (finder instanceof RegExp) {
        if (!finder.flags.includes("g")) {
            finder = new RegExp(finder.source, finder.flags + "g");
        }
    }
    return this.replaceAll(finder, "");
};
const elementCreator = function () {
    return new HTMLElementCreator(this);
};
const elementCreatorDocument = function (superEl, attrs) {
    return new HTMLElementCreator(superEl, attrs);
};
const type = function (val) {
    var _a;
    if (val === null)
        return "null";
    if (val === undefined)
        return "undefined";
    const typeOf = typeof val;
    if (typeOf === "function") {
        return `Function:${val.name || "<anonymous>"}(${val.length})`;
    }
    let typeName = capitalize.call(Object.prototype.toString.call(val).slice(8, -1));
    const ctor = (_a = val.constructor) === null || _a === void 0 ? void 0 : _a.name;
    if (ctor && ctor !== typeName) {
        typeName = ctor;
    }
    const len = val.length;
    if (typeof len === "number" && Number.isFinite(len)) {
        typeName += `(${len})`;
    }
    else if (val instanceof Map || val instanceof Set) {
        typeName += `(${val.size})`;
    }
    else if (val instanceof Date && !isNaN(val.getTime())) {
        typeName += `:${val.toISOString().split("T")[0]}`;
    }
    else if (typeName === "Object") {
        typeName += `(${Object.keys(val).length})`;
    }
    return typeName;
};
function isEmpty(val) {
    // Generic type checking
    // eslint-disable-next-line eqeqeq
    if (val == null || val === false || val === "")
        return true;
    // Number checking
    if (typeof val === "number")
        return val === 0 || Number.isNaN(val);
    // Array checking
    if (Array.isArray(val) && val.length === 0)
        return true;
    // Map, Set, and weak variant checks
    if (val instanceof Map || val instanceof Set || val instanceof WeakMap || val instanceof WeakSet) {
        return val.size === 0; // size check works for these types
    }
    // Object checking
    if (typeof val === 'object') {
        const proto = Object.getPrototypeOf(val);
        const isPlain = proto === Object.prototype || proto === null;
        return isPlain && Object.keys(val).length === 0;
    }
    return false;
}
function createEventListener(triggers, callback) {
    const originals = triggers.map(fn => fn);
    triggers.forEach((originalFn, i) => {
        const wrapper = function (...args) {
            const result = originals[i].apply(this, args);
            callback(...triggers.map((_, j) => j === i ? result : undefined));
            return result;
        };
        // Replace global function by matching the actual function object
        if (typeof window !== "undefined") {
            for (const key in window) {
                if (window[key] === originalFn) {
                    window[key] = wrapper;
                    return; // stop after replacement
                }
            }
        }
        console.warn("Cannot replace function:", originalFn);
    });
}
function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
const forEach = function (object, iterator) {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            iterator(key, object[key]);
        }
    }
};
function createElementTree(node) {
    const el = document.createElement(node.tag);
    // Add class if provided
    if (node.class)
        el.className = node.class;
    // Add text content if provided
    if (node.text)
        el.textContent = node.text;
    // Add inner HTML if provided
    if (node.html)
        el.innerHTML = node.html;
    // Handle styles, ensure it’s an object
    if (node.style && typeof node.style === 'object') {
        for (const [prop, val] of Object.entries(node.style)) {
            el.style.setProperty(prop, val);
        }
    }
    // Handle other attributes (excluding known keys)
    for (const [key, val] of Object.entries(node)) {
        if (key !== 'tag' &&
            key !== 'class' &&
            key !== 'text' &&
            key !== 'html' &&
            key !== 'style' &&
            key !== 'children') {
            if (typeof val === 'string') {
                el.setAttribute(key, val);
            }
        }
    }
    // Handle children (ensure it's an array or a single child)
    if (node.children) {
        if (Array.isArray(node.children)) {
            node.children.forEach(child => {
                el.appendChild(createElementTree(child));
            });
        }
        else {
            el.appendChild(createElementTree(node.children)); // Support for a single child node
        }
    }
    return el;
}
const capitalize = function () {
    const i = this.search(/\S/);
    return i === -1 ? this : this.slice(0, i) + this.charAt(i).toUpperCase() + this.slice(i + 1);
};
const parseFile = function (file, receiver) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileContent = yield fetch(file).then(res => res.json());
        if (!receiver) {
            return fileContent;
        }
        return receiver(fileContent);
    });
};
//? Classes
class OptiDOM {
    constructor() {
        this.deprecatedMigration = {
            // Node interface
            "Node.parentElement": "Node.getParent",
            "Node.parentNode": "Node.getParent",
            "Node.querySelector": "Node.find",
            "Node.querySelectorAll": "Node.find",
            "Node.textContent": "Element.text",
            // Document interface
            "Document.cookie": "Cookie",
            "Document.addEventListener (DOMContentLoaded)": "document.ready",
            "Document.addEventListener (load)": "document.ready",
            "Document.addEventListener (unload)": "document.leaving",
            // Window interface
            "Window.innerHeight": "window.height",
            "Window.innerWidth": "window.width",
            "Window.addEventListener (DOMContentLoaded)": "document.ready",
            "Window.addEventListener (beforeunload)": "document.leaving",
            "Window.addEventListener (unload)": "document.leaving",
            // HTMLElement interface
            "HTMLElement.innerHTML": "HTMLElement.html",
            "HTMLElement.innerText": "Node.text",
            // Storage related
            "localStorage": "LocalStorage",
            "sessionStorage": "SessionStorage"
        };
        // Define the objects that will be patched (can be extended as needed)
        this.objectMap = {
            Node: Node.prototype,
            Document: Document.prototype,
            Window: Window.prototype,
            HTMLElement: HTMLElement.prototype
        };
    }
    // Automatically deprecate a function and recommend a replacement
    deprecate(funcName, force = false) {
        const migration = this.deprecatedMigration[funcName];
        if (migration) {
            // Loop over all objects in the registry and deprecate the function if it's found
            for (const [objName, baseObj] of Object.entries(this.objectMap)) {
                if (typeof baseObj[funcName] === 'function') {
                    const original = baseObj[funcName];
                    // Replace function with a deprecation warning and call the original
                    baseObj[funcName] = function (...args) {
                        console.warn(`[OptiDOM] ${funcName} is deprecated. Use ${migration} instead.`);
                        if (!force) {
                            return original.apply(this, args);
                        }
                        else
                            throw new NotImplementedError(`[OptiDOM] ${funcName} is deprecated. Use ${migration} instead.`);
                    };
                    console.info(`[OptiDOM] Deprecated function: ${funcName} on ${objName}. Use ${migration} instead.`);
                    break; // Stop once deprecated
                }
            }
        }
    }
    // Automatically apply multiple patches at once
    deprecateAll(force = false) {
        for (const funcName in this.deprecatedMigration) {
            this.deprecate(funcName, force); // Apply deprecation
        }
    }
}
class Cookie {
    constructor(name, valueIfNotExist = null, days = 7, path = '/') {
        this.name = name;
        this.expiry = days;
        this.path = path;
        const existingValue = Cookie.get(name);
        if (existingValue === null && valueIfNotExist !== null) {
            Cookie.set(name, valueIfNotExist, days, path);
            this.value = valueIfNotExist;
        }
        else {
            this.value = existingValue;
        }
    }
    static set(name, value, days = 7, path = '/') {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=${path}`;
    }
    static get(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (!match)
            return null;
        try {
            return JSON.parse(decodeURIComponent(match[2]));
        }
        catch (_a) {
            return null;
        }
    }
    static delete(name, path = '/') {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
    }
    /** Instance methods */
    update(value, days = this.expiry, path = this.path) {
        this.value = value;
        Cookie.set(this.name, value, days, path);
    }
    delete() {
        this.value = null;
        Cookie.delete(this.name, this.path);
    }
    getValue() { return this.value; }
    getName() { return this.name; }
    getExpiry() { return this.expiry; }
    getPath() { return this.path; }
}
class LocalStorage {
    constructor(name, valueIfNotExist = null) {
        this.name = name;
        const existingValue = LocalStorage.get(name);
        if (existingValue === null && valueIfNotExist !== null) {
            LocalStorage.set(name, valueIfNotExist);
            this.value = valueIfNotExist;
        }
        else {
            this.value = existingValue;
        }
    }
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static get(key) {
        const value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : null;
        }
        catch (_a) {
            return null;
        }
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
    /** Instance methods to interact with this specific cookie */
    update(value) {
        this.value = value;
        LocalStorage.set(this.name, value);
    }
    delete() {
        this.value = null;
        LocalStorage.remove(this.name);
    }
    getValue() { return this.value; }
    getName() { return this.name; }
}
class SessionStorage {
    constructor(name, valueIfNotExist = null) {
        this.name = name;
        const existingValue = SessionStorage.get(name);
        if (existingValue === null && valueIfNotExist !== null) {
            SessionStorage.set(name, valueIfNotExist);
            this.value = valueIfNotExist;
        }
        else {
            this.value = existingValue;
        }
    }
    static set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    static get(key) {
        const value = sessionStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : null;
        }
        catch (_a) {
            return null;
        }
    }
    static remove(key) {
        sessionStorage.removeItem(key);
    }
    static clear() {
        sessionStorage.clear();
    }
    /** Instance methods to interact with this specific cookie */
    update(value) {
        this.value = value;
        SessionStorage.set(this.name, value);
    }
    delete() {
        this.value = null;
        SessionStorage.remove(this.name);
    }
    getValue() { return this.value; }
    getName() { return this.name; }
}
class HTMLElementCreator {
    constructor(tag, attrsOrPosition = {}) {
        this.parentStack = [];
        this.superEl = document.createDocumentFragment();
        if (tag instanceof HTMLElement) {
            this.currContainer = tag;
            this.superEl.append(tag);
        }
        else {
            const el = document.createElement(tag);
            this.makeElement(el, attrsOrPosition);
            this.currContainer = el;
            this.superEl.append(el);
        }
    }
    makeElement(el, attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === "text") {
                el.textContent = value;
            }
            else if (key === "html") {
                el.innerHTML = value;
            }
            else if (key === "class") {
                if (typeof value === "string") {
                    el.classList.add(value);
                }
                else if (Array.isArray(value)) {
                    el.classList.add(...value.filter(c => typeof c === 'string' && c.trim()));
                }
            }
            else if (key === "style") {
                let styles = "";
                Object.entries(value).forEach(([styleKey, styleValue]) => {
                    styles += `${toKebabCase(styleKey)}: ${styleValue}; `;
                });
                el.setAttribute("style", styles.trim());
            }
            else if (typeof value === "boolean") {
                if (value)
                    el.setAttribute(key, "");
                else
                    el.removeAttribute(key);
            }
            else if (value !== undefined && value !== null) {
                el.setAttribute(key, value);
            }
        });
    }
    el(tag, attrs = {}) {
        const child = document.createElement(tag);
        this.makeElement(child, attrs);
        this.currContainer.appendChild(child);
        return this;
    }
    container(tag, attrs = {}) {
        const wrapper = document.createElement(tag);
        this.makeElement(wrapper, attrs);
        this.parentStack.push(this.currContainer);
        this.currContainer.appendChild(wrapper);
        this.currContainer = wrapper;
        return this;
    }
    up() {
        const prev = this.parentStack.pop();
        if (prev) {
            this.currContainer = prev;
        }
        return this;
    }
    append(to) {
        const target = typeof to === "string" ? document.querySelector(to) : to;
        if (target instanceof HTMLElement) {
            target.append(this.superEl);
        }
    }
    prepend(to) {
        const target = typeof to === "string" ? document.querySelector(to) : to;
        if (target instanceof HTMLElement) {
            target.prepend(this.superEl);
        }
    }
    get element() {
        return this.currContainer;
    }
}
class Time {
    constructor(hours, minutes, seconds, milliseconds) {
        if (hours instanceof Date) {
            this.hours = hours.getHours();
            this.minutes = hours.getMinutes();
            this.seconds = hours.getSeconds();
            this.milliseconds = hours.getMilliseconds();
        }
        else {
            const now = new Date();
            this.hours = hours !== null && hours !== void 0 ? hours : now.getHours();
            this.minutes = minutes !== null && minutes !== void 0 ? minutes : now.getMinutes();
            this.seconds = seconds !== null && seconds !== void 0 ? seconds : now.getSeconds();
            this.milliseconds = milliseconds !== null && milliseconds !== void 0 ? milliseconds : now.getMilliseconds();
        }
        this.validateTime();
    }
    // Validation for time properties
    validateTime() {
        if (this.hours < 0 || this.hours >= 24)
            throw new SyntaxError("Hours must be between 0 and 23.");
        if (this.minutes < 0 || this.minutes >= 60)
            throw new SyntaxError("Minutes must be between 0 and 59.");
        if (this.seconds < 0 || this.seconds >= 60)
            throw new SyntaxError("Seconds must be between 0 and 59.");
        if (this.milliseconds < 0 || this.milliseconds >= 1000)
            throw new SyntaxError("Milliseconds must be between 0 and 999.");
    }
    static of(date) {
        return new this(date);
    }
    // Getters
    getHours() { return this.hours; }
    getMinutes() { return this.minutes; }
    getSeconds() { return this.seconds; }
    getMilliseconds() { return this.milliseconds; }
    // Setters
    setHours(hours) {
        this.hours = hours;
        this.validateTime();
    }
    setMinutes(minutes) {
        this.minutes = minutes;
        this.validateTime();
    }
    setSeconds(seconds) {
        this.seconds = seconds;
        this.validateTime();
    }
    setMilliseconds(milliseconds) {
        this.milliseconds = milliseconds;
        this.validateTime();
    }
    // Returns the time in milliseconds since the start of the day
    getTime() {
        return (this.hours * 3600000 +
            this.minutes * 60000 +
            this.seconds * 1000 +
            this.milliseconds);
    }
    // Returns the time in milliseconds since the start of the day
    static at(hours, minutes, seconds, milliseconds) {
        return new Time(hours, minutes, seconds, milliseconds).getTime();
    }
    sync() {
        return new Time();
    }
    // Static: Return current time as a Time object
    static now() {
        return new Time().getTime();
    }
    toString() {
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        ;
    }
    toISOString() {
        return `T${this.toString()}.${this.milliseconds.toString().padStart(3, '0')}Z`;
    }
    toJSON() {
        return this.toISOString(); // Leverage the existing toISOString() method
    }
    toDate(years, months, days) {
        return new Date(years, months, days, this.hours, this.minutes, this.seconds, this.milliseconds);
    }
    static fromDate(date) {
        return new Time(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    // Arithmetic operations
    addMilliseconds(ms) {
        const totalMilliseconds = this.getTime() + ms;
        return Time.fromMilliseconds(totalMilliseconds);
    }
    subtractMilliseconds(ms) {
        const totalMilliseconds = this.getTime() - ms;
        return Time.fromMilliseconds(totalMilliseconds);
    }
    addSeconds(seconds) {
        return this.addMilliseconds(seconds * 1000);
    }
    addMinutes(minutes) {
        return this.addMilliseconds(minutes * 60000);
    }
    addHours(hours) {
        return this.addMilliseconds(hours * 3600000);
    }
    // Static: Create a Time object from total milliseconds
    static fromMilliseconds(ms) {
        const hours = Math.floor(ms / 3600000) % 24;
        const minutes = Math.floor(ms / 60000) % 60;
        const seconds = Math.floor(ms / 1000) % 60;
        const milliseconds = ms % 1000;
        return new Time(hours, minutes, seconds, milliseconds);
    }
    // Parsing
    static fromString(timeString) {
        var _a, _b;
        const match = timeString.match(/^(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?$/);
        if (match) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt((_a = match[3]) !== null && _a !== void 0 ? _a : "0", 10);
            const milliseconds = parseInt((_b = match[4]) !== null && _b !== void 0 ? _b : "0", 10);
            return new Time(hours, minutes, seconds, milliseconds);
        }
        throw new Error("Invalid time string format.");
    }
    static fromISOString(isoString) {
        const match = isoString.match(/T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/);
        if (match) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt(match[3], 10);
            const milliseconds = parseInt(match[4], 10);
            return new Time(hours, minutes, seconds, milliseconds);
        }
        throw new Error("Invalid ISO string format.");
    }
    // Comparison
    compare(other) {
        const currentTime = this.getTime();
        const otherTime = other.getTime();
        if (currentTime < otherTime) {
            return -1;
        }
        else if (currentTime > otherTime) {
            return 1;
        }
        else {
            return 0;
        }
    }
    isBefore(other) {
        return this.compare(other) === -1;
    }
    isAfter(other) {
        return this.compare(other) === 1;
    }
    equals(other) {
        return this.compare(other) === 0;
    }
    static equals(first, other) {
        return first.compare(other) === 0;
    }
}
class Sequence {
    constructor(tasks = []) {
        this.errorHandler = (error) => { throw new Error(error); };
        this.tasks = tasks;
    }
    // Executes the sequence, passing up to 3 initial arguments to the first task
    execute(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.tasks.reduce((prev, task) => prev.then((result) => task(result)), Promise.resolve(args));
                return this.finalResult = result;
            }
            catch (error) {
                return this.errorHandler(error);
            }
        });
    }
    result(callback) {
        if (callback) {
            return callback(this.finalResult);
        }
        return this.finalResult;
    }
    error(callback) {
        this.errorHandler = callback;
        return this;
    }
    // Static methods to create new sequences
    // Executes all tasks with the same arguments
    static of(...functions) {
        const tasks = [];
        for (const fn of functions) {
            if (fn instanceof Sequence) {
                // Add the sequence's tasks
                tasks.push(...fn.tasks);
            }
            else if (typeof fn === "function") {
                // Add standalone functions
                tasks.push(fn);
            }
            else {
                throw new Error("Invalid argument: Must be a function or Sequence");
            }
        }
        return new Sequence(tasks);
    }
    // Executes tasks sequentially, passing the result of one to the next
    static chain(...functions) {
        return new Sequence(functions);
    }
    static parallel(...functions) {
        return new Sequence([() => Promise.all(functions.map((fn) => fn()))]);
    }
    static race(...functions) {
        return new Sequence([() => Promise.race(functions.map((fn) => fn()))]);
    }
    static retry(retries, task, delay = 0) {
        return new Sequence([
            () => new Promise((resolve, reject) => {
                const attempt = (attemptNumber) => {
                    task()
                        .then(resolve)
                        .catch((error) => {
                        if (attemptNumber < retries) {
                            setTimeout(() => attempt(attemptNumber + 1), delay);
                        }
                        else {
                            reject(error);
                        }
                    });
                };
                attempt(0);
            }),
        ]);
    }
    // Instance methods for chaining
    add(...functions) {
        this.tasks.push(...functions);
        return this;
    }
}
class ID {
    // Helper function to generate a random string of characters
    static generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    // Constructor that generates a unique ID when the instance is created
    constructor(prefix = '', length = 30) {
        let newId;
        do {
            const randomStr = ID.generateRandomString(length);
            newId = `${prefix}${randomStr}`;
        } while (ID.usedIds.has(newId));
        ID.usedIds.add(newId);
        this.id = newId;
    }
    // Helper function to get the instance's unique ID
    getId() {
        return this.id;
    }
    // Helper function to validate if an ID exists
    static isValidId(id) {
        return ID.usedIds.has(id);
    }
    // Helper function to remove an ID from the set of used IDs
    static removeId(id) {
        ID.usedIds.delete(id);
    }
}
ID.usedIds = new Set();
// -------------------------------------------------------------------------------------------------
//! Prototypes
globalThis.f = (iife) => iife();
globalThis.createEventListener = createEventListener;
globalThis.LocalStorage = LocalStorage;
globalThis.SessionStorage = SessionStorage;
globalThis.Cookie = Cookie;
globalThis.Time = Time;
/*! Unchecked */ globalThis.Sequence = Sequence;
/*! Unchecked */ globalThis.optidom = new OptiDOM();
globalThis.isEmpty = isEmpty;
globalThis.type = type;
globalThis.UnknownError = class extends Error {
    constructor(message) {
        super(message);
        this.name = "UnknownError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
};
globalThis.NotImplementedError = class extends Error {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : "Function not implimented yet.");
        this.name = "NotImplementedError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
};
Document.prototype.ready = ready;
/*! Not Working */ Document.prototype.leaving = leaving;
Document.prototype.elementCreator = elementCreatorDocument;
Document.prototype.bindShortcut = bindShortcut;
Document.prototype.css = documentCss;
Document.prototype.createElementTree = createElementTree;
Document.prototype.$ = $;
Document.prototype.$$ = $$;
Date.at = atDate;
Date.fromTime = fromTime;
NodeList.prototype.addEventListener = addEventListenerEnum;
NodeList.prototype.addClass = addClassList;
NodeList.prototype.removeClass = removeClassList;
NodeList.prototype.toggleClass = toggleClassList;
NodeList.prototype.single = function () {
    // If the NodeList has elements, return the first one, otherwise return null
    return this.length > 0 ? this[0] : null;
};
HTMLCollection.prototype.addEventListener = addEventListenerEnum;
HTMLCollection.prototype.addClass = addClassList;
HTMLCollection.prototype.removeClass = removeClassList;
HTMLCollection.prototype.toggleClass = toggleClassList;
HTMLCollection.prototype.single = function () {
    // If the collection has elements, return the first one, otherwise return null
    return this.length > 0 ? this[0] : null;
};
EventTarget.prototype.addBoundListener = addBoundListener;
EventTarget.prototype.addEventListeners = addEventListeners;
Element.prototype.hasText = hasText;
Element.prototype.text = text;
Element.prototype.addClass = addClass;
Element.prototype.removeClass = removeClass;
Element.prototype.toggleClass = toggleClass;
Element.prototype.hasClass = hasClass;
HTMLElement.prototype.css = css;
HTMLElement.prototype.elementCreator = elementCreator;
HTMLElement.prototype.tag = tag;
HTMLElement.prototype.html = html;
HTMLElement.prototype.show = show;
HTMLElement.prototype.hide = hide;
/*! Not Working */ HTMLElement.prototype.toggle = toggle;
// /*! Unchecked */ HTMLElement.prototype.fadeIn;
// /*! Unchecked */ HTMLElement.prototype.fadeOut;
// /*! Unchecked */ HTMLElement.prototype.fadeToggle;
// /*! Unchecked */ HTMLElement.prototype.slideIn;
// /*! Unchecked */ HTMLElement.prototype.slideOut;
// /*! Unchecked */ HTMLElement.prototype.slideToggle;
// /*! Unchecked */ HTMLElement.prototype.animate;
/*! Unchecked */ HTMLFormElement.prototype.serialize = serialize;
Node.prototype.getParent = getParent;
Node.prototype.getAncestor = getAncestor;
Node.prototype.getChildren = getChildren;
Node.prototype.getSiblings = getSiblings;
Node.prototype.querySelectAncestor = querySelectAncestor;
Node.prototype.find = find;
Node.prototype.findAll = findAll;
Math.random = random;
Object.clone = clone;
Object.forEach = forEach;
Number.prototype.repeat = repeat;
JSON.parseFile = parseFile;
Array.prototype.unique = unique;
Array.prototype.chunk = chunk;
String.prototype.remove = remove;
String.prototype.removeAll = removeAll;
String.prototype.capitalize = capitalize;
defineGetter(Window.prototype, "width", () => window.innerWidth || document.body.clientWidth);
defineGetter(Window.prototype, "height", () => window.innerHeight || document.body.clientHeight);
defineGetter(HTMLElement.prototype, "visible", function () {
    return this.css("visibility") !== "hidden"
        ? this.css("display") !== "none"
        : Number(this.css("opacity")) > 0;
});
export {};
