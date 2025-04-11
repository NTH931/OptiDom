/* eslint-disable no-var */
/* eslint-disable func-style */
const bindShortcutSource = (shortcut, callback) => {
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
const addEventListenerEnumSource = function (type, listener, options) {
    this.forEach(el => {
        if (el instanceof HTMLElement) {
            el.addEventListener(type, listener, options);
        }
    });
    return this; // Enable method chaining
};
const addOnceListenerSource = function (type, listener, options) {
    let repeatCount = 1; // Default to 1 if no repeat option provided
    // If options is a number, treat it as the repeat count
    if (typeof options === 'number') {
        repeatCount = options;
        options = undefined; // Reset options to undefined so that AddEventListenerOptions is not mixed
    }
    const onceListener = (event) => {
        listener.call(this, event);
        repeatCount--;
        if (repeatCount <= 0) {
            this.removeEventListener(type, onceListener, options);
        }
    };
    this.addEventListener(type, onceListener, options);
};
const atDateSource = (year, monthIndex, date, hours, minutes, seconds, ms) => {
    return new Date(year, monthIndex, date, hours, minutes, seconds, ms).getTime();
};
const addEventListenersSource = function (listeners, options) {
    for (const listener of listeners) {
        this.addEventListener(listener.key, listener.value, options);
    }
};
const cssSource = function (key, value) {
    const css = this.style;
    if (typeof key === "string") {
        if (key in css && value !== undefined) {
            css[key] = value;
        }
    }
    else {
        Object.entries(key).forEach(([prop, val]) => {
            if (prop in css) {
                css[prop] = val;
            }
        });
    }
};
const documentCssSource = function (element, object) {
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
    if (!object || Object.keys(object).length === 0) {
        // Remove rule
        for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
            const rule = sheet.cssRules[i];
            if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
                sheet.deleteRule(i);
                break;
            }
        }
        return;
    }
    // Convert camelCase to kebab-case
    const newStyles = {};
    for (const [prop, val] of Object.entries(object)) {
        if (val !== null && val !== undefined) {
            const kebab = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
            newStyles[kebab] = val;
        }
    }
    let ruleIndex = -1;
    const existingStyles = {};
    for (let i = 0; i < sheet.cssRules.length; i++) {
        const rule = sheet.cssRules[i];
        if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
            ruleIndex = i;
            const declarations = rule.style;
            for (let j = 0; j < declarations.length; j++) {
                const name = declarations.item(j);
                existingStyles[name] = declarations.getPropertyValue(name).trim();
            }
            break;
        }
    }
    const mergedStyles = { ...existingStyles, ...newStyles };
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
const getParentSource = function () {
    return this.parentElement;
};
const getAncestorSource = function (level) {
    let ancestor = this;
    for (let i = 0; i < level; i++) {
        if (ancestor.parentElement === null)
            return null;
        ancestor = ancestor.parentElement;
    }
    return ancestor;
};
const getAncestorQuerySource = function (selector) {
    const element = document.querySelector(selector);
    if (element?.contains(this)) {
        return element;
    }
    return null;
};
const createChildrenSource = function (elements) {
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
const changeSource = function (newTag) {
    const newElement = document.createElement(newTag);
    // Copy attributes
    Array.from(this.attributes).forEach(attr => {
        newElement.setAttribute(attr.name, attr.value);
    });
    // Move children
    while (this.firstChild) {
        newElement.appendChild(this.firstChild);
    }
    // Replace the current element with the new one
    this.replaceWith(newElement);
    return newElement;
};
const htmlSource = function (input) {
    return input !== undefined ? (this.innerHTML = input) : this.innerHTML;
};
const textSource = function (input) {
    return input !== undefined ? (this.textContent = input) : this.textContent || '';
};
const $ = function (selector) {
    return document.querySelector(selector);
};
const elementCreatorSource = function (el, attrs) {
    return new HTMLElementCreator(el, attrs);
};
function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
// -------------------------------------------------------------------------------------------------
// Cookie Class
class CookieInternal {
    name;
    value;
    expiry;
    path;
    constructor(name, valueIfNotExist = null, days = 7, path = '/') {
        this.name = name;
        this.expiry = days;
        this.path = path;
        const existingValue = CookieInternal.get(name);
        if (existingValue === null && valueIfNotExist !== null) {
            CookieInternal.set(name, valueIfNotExist, days, path);
            this.value = valueIfNotExist;
        }
        else {
            this.value = existingValue;
        }
    }
    static set(name, value, days = 7, path = '/') {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=${path}`;
    }
    static get(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }
    static delete(name, path = '/') {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
    }
    /** Instance methods to interact with this specific cookie */
    update(value, days = this.expiry, path = this.path) {
        this.value = value;
        CookieInternal.set(this.name, value, days, path);
    }
    delete() {
        this.value = null;
        CookieInternal.delete(this.name, this.path);
    }
    getValue() { return this.value; }
    getName() { return this.name; }
    getExpiry() { return this.expiry; }
    getPath() { return this.path; }
}
// Storage Class
class LocalStorageInternal {
    name;
    value;
    _isSession;
    constructor(name, valueIfNotExist = null, isSession = false) {
        this.name = name;
        this._isSession = isSession;
        const existingValue = LocalStorageInternal.get(name);
        if (existingValue === null && valueIfNotExist !== null) {
            LocalStorageInternal.set(name, valueIfNotExist, isSession);
            this.value = valueIfNotExist;
        }
        else {
            this.value = existingValue;
        }
    }
    static set(key, value, isSession = false) {
        const storage = isSession ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
    }
    static get(key, isSession = false) {
        const storage = isSession ? sessionStorage : localStorage;
        const value = storage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    static remove(key, isSession = false) {
        const storage = isSession ? sessionStorage : localStorage;
        storage.removeItem(key);
    }
    static clear(isSession = false) {
        const storage = isSession ? sessionStorage : localStorage;
        storage.clear();
    }
    /** Instance methods to interact with this specific cookie */
    update(value) {
        this.value = value;
        LocalStorageInternal.set(this.name, value);
    }
    delete() {
        this.value = null;
        LocalStorageInternal.remove(this.name);
    }
    getValue() { return this.value; }
    getName() { return this.name; }
    isSession() { return this._isSession; }
}
class HTMLElementCreator {
    superEl;
    currContainer;
    parentStack = [];
    constructor(tag, attrs = {}) {
        // If the tag is an HTMLElement, use it directly
        if (tag instanceof HTMLElement) {
            this.superEl = tag;
            this.currContainer = tag;
        }
        else {
            // Otherwise, create a new element using the tag name
            this.superEl = document.createElement(tag);
            this.makeElement(this.superEl, attrs);
            this.currContainer = this.superEl;
        }
    }
    makeElement(el, attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === "text") {
                el.innerText = value;
            }
            else if (key === "html") {
                el.innerHTML = value;
            }
            else if (key === "class") {
                if (typeof value === "string") {
                    el.classList.add(value);
                }
                else if (Array.isArray(value)) {
                    el.classList.add(...value);
                }
            }
            else if (key === "style") {
                let styles = "";
                Object.entries(value).forEach(([key, value]) => {
                    styles += `${toKebabCase(key)}: ${value}; `;
                });
                el.setAttribute("style", styles);
            }
            else if (typeof value === "boolean") {
                if (value)
                    el.setAttribute(key, "");
                else
                    el.removeAttribute(key);
            }
            else if (value !== undefined) {
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
        this.currContainer = prev ?? this.superEl;
        return this;
    }
    append(to) {
        to.appendChild(this.superEl);
    }
    get element() {
        return this.superEl;
    }
}
class TimeInternal {
    hours;
    minutes;
    seconds;
    milliseconds;
    constructor(hours, minutes, seconds, milliseconds) {
        if (hours instanceof Date) {
            this.hours = hours.getHours();
            this.minutes = hours.getMinutes();
            this.seconds = hours.getSeconds();
            this.milliseconds = hours.getMilliseconds();
        }
        else {
            const now = new Date();
            this.hours = hours ?? now.getHours();
            this.minutes = minutes ?? now.getMinutes();
            this.seconds = seconds ?? now.getSeconds();
            this.milliseconds = milliseconds ?? now.getMilliseconds();
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
        return new TimeInternal(hours, minutes, seconds, milliseconds).getTime();
    }
    sync() {
        return new TimeInternal();
    }
    // Static: Return current time as a Time object
    static now() {
        return new TimeInternal().getTime();
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
        return new TimeInternal(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    // Arithmetic operations
    addMilliseconds(ms) {
        const totalMilliseconds = this.getTime() + ms;
        return TimeInternal.fromMilliseconds(totalMilliseconds);
    }
    subtractMilliseconds(ms) {
        const totalMilliseconds = this.getTime() - ms;
        return TimeInternal.fromMilliseconds(totalMilliseconds);
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
        return new TimeInternal(hours, minutes, seconds, milliseconds);
    }
    // Parsing
    static fromString(timeString) {
        const match = timeString.match(/^(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?$/);
        if (match) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt(match[3] ?? "0", 10);
            const milliseconds = parseInt(match[4] ?? "0", 10);
            return new TimeInternal(hours, minutes, seconds, milliseconds);
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
            return new TimeInternal(hours, minutes, seconds, milliseconds);
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
globalThis.bindShortcut = bindShortcutSource;
globalThis.f = (iife) => iife();
globalThis.LocalStorage = LocalStorageInternal;
globalThis.Cookie = CookieInternal;
globalThis.Time = TimeInternal;
globalThis.UnknownError = class extends Error {
    constructor(message) {
        super(message);
        this.name = "UnknownError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
};
document.LocalStorage = LocalStorageInternal;
document.Cookie = CookieInternal;
document.elementCreator = elementCreatorSource;
document.bindShortcut = bindShortcutSource;
document.css = documentCssSource;
document.$ = $;
Date.at = atDateSource;
NodeList.prototype.addEventListener = addEventListenerEnumSource;
EventTarget.prototype.addOnceListener = addOnceListenerSource;
EventTarget.prototype.addEventListeners = addEventListenersSource;
HTMLElement.prototype.css = cssSource;
HTMLElement.prototype.getParent = getParentSource;
HTMLElement.prototype.getAncestor = getAncestorSource;
HTMLElement.prototype.getAncestorQuery = getAncestorQuerySource;
HTMLElement.prototype.createChildren = createChildrenSource;
HTMLElement.prototype.elementCreator = function () {
    return new HTMLElementCreator(this);
};
HTMLElement.prototype.change = changeSource;
HTMLElement.prototype.html = htmlSource;
HTMLElement.prototype.text = textSource;
export {};
