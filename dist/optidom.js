"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var OptiDOM;
(function (OptiDOM) {
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
    OptiDOM.Cookie = Cookie;
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
    OptiDOM.LocalStorage = LocalStorage;
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
    OptiDOM.SessionStorage = SessionStorage;
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
    OptiDOM.HTMLElementCreator = HTMLElementCreator;
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
    OptiDOM.Time = Time;
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
    OptiDOM.Sequence = Sequence;
    class HTMLDefaultElement extends HTMLOptionElement {
        constructor() {
            super();
            super.hidden = true;
            this.selected = true;
        }
        set hidden(_) {
            throw new OptiDOM.AccessError("Cannot change the hidden property of a HTMLDefaultElement.");
        }
        get hidden() {
            return true;
        }
    }
    OptiDOM.HTMLDefaultElement = HTMLDefaultElement;
    class ShortcutEvent extends KeyboardEvent {
        constructor(keys, eventInit) {
            const lastKey = keys[keys.length - 1] || "";
            super("keydown", Object.assign(Object.assign({}, eventInit), { key: lastKey }));
            this.keys = keys;
        }
    }
    OptiDOM.ShortcutEvent = ShortcutEvent;
    class FNRegistry {
        constructor() {
            this._map = {};
        }
        set(key, fn) {
            this._map[key] = fn;
        }
        get(key) {
            return this._map[key];
        }
    }
    OptiDOM.FNRegistry = FNRegistry;
    class TypedMap {
        constructor() {
            this._map = {};
        }
        get size() {
            return Object.keys(this._map).length;
        }
        set(key, value) {
            this._map[key] = value;
        }
        get(key) {
            return this._map[key];
        }
        notNull(key) {
            return this._map[key] !== null || this._map[key] !== undefined;
        }
        delete(key) {
            delete this._map[key];
        }
        keys() {
            return Object.keys(this._map);
        }
        entries() {
            return Object.entries(this._map);
        }
        clear() {
            for (const key in this._map)
                delete this._map[key];
        }
        *[Symbol.iterator]() {
            for (const key in this._map) {
                yield [key, this._map[key]];
            }
        }
        get [Symbol.toStringTag]() {
            return "[object TypedMap]";
        }
        forEach(callback) {
            for (const key in this._map) {
                const val = this._map[key];
                callback(val, key);
            }
        }
    }
    OptiDOM.TypedMap = TypedMap;
    let Crafty;
    (function (Crafty) {
        class Element {
            constructor(tag, props, children) {
                this.tag = tag;
                this.props = props !== null && props !== void 0 ? props : {};
                this.children = children !== null && children !== void 0 ? children : [];
            }
            getProp(prop) {
                return this.props[prop];
            }
            setProp(prop, value) {
                this.props[prop] = value;
            }
            getChildren() {
                return this.children;
            }
            append(child) {
                this.children = [...this.children, child];
            }
            prepend(child) {
                this.children = [child, ...this.children];
            }
            remove(child) {
                this.children = this.children.filter(c => c !== child);
            }
            render() {
                // your render implementation here
                throw new Error("Not implemented");
            }
        }
        Crafty.Element = Element;
        class Fragment extends Element {
        }
        Crafty.Fragment = Fragment;
    })(Crafty = OptiDOM.Crafty || (OptiDOM.Crafty = {}));
})(OptiDOM || (OptiDOM = {}));
var OptiDOM;
(function (OptiDOM) {
    function atDate(year, monthIndex, date, hours, minutes, seconds, ms) {
        return new Date(year, monthIndex, date, hours, minutes, seconds, ms).getTime();
    }
    OptiDOM.atDate = atDate;
    function fromTime(time, year, monthIndex, date) {
        return new Date(year, monthIndex, date, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    }
    OptiDOM.fromTime = fromTime;
    function clone(object, deep = true) {
        if (object === null || typeof object === "undefined") {
            return object;
        }
        else if (typeof object !== "object" && typeof object !== "symbol" && typeof object !== "function") {
            return object;
        }
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
    }
    OptiDOM.clone = clone;
    ;
    function repeat(iterator) {
        for (let i = 0; i < this; i++) {
            iterator(i);
        }
    }
    OptiDOM.repeat = repeat;
    ;
    function unique() {
        return [...new Set(this)];
    }
    OptiDOM.unique = unique;
    ;
    function chunk(chunkSize) {
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
    }
    OptiDOM.chunk = chunk;
    ;
    function remove(finder) {
        return this.replace(finder, "");
    }
    OptiDOM.remove = remove;
    ;
    function removeAll(finder) {
        if (finder instanceof RegExp) {
            if (!finder.flags.includes("g")) {
                finder = new RegExp(finder.source, finder.flags + "g");
            }
        }
        return this.replaceAll(finder, "");
    }
    OptiDOM.removeAll = removeAll;
    ;
    const origionalRandom = Math.random;
    OptiDOM.random = (minOrMax, max) => {
        if (isDefined(minOrMax) && isDefined(max)) {
            return origionalRandom() * (max - minOrMax) + minOrMax;
        }
        else if (isDefined(minOrMax)) {
            return origionalRandom() * minOrMax;
        }
        else
            return origionalRandom();
    };
    function isDefined(obj) {
        return typeof obj !== "undefined";
    }
    OptiDOM.isDefined = isDefined;
    function forEach(object, iterator) {
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                iterator(key, object[key]);
            }
        }
    }
    OptiDOM.forEach = forEach;
    ;
    function capitalize() {
        const i = this.search(/\S/);
        return i === -1 ? this : this.slice(0, i) + this.charAt(i).toUpperCase() + this.slice(i + 1);
    }
    OptiDOM.capitalize = capitalize;
    ;
    function parseFile(file, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileContent = yield fetch(file).then(res => res.json());
            if (!receiver) {
                return fileContent;
            }
            return receiver(fileContent);
        });
    }
    OptiDOM.parseFile = parseFile;
    ;
    const origionallog = console.log;
    function log(colorize, ...data) {
        const text = data.map(val => typeof val === "string" ? val : JSON.stringify(val)).join(" ");
        origionallog(OptiDOM.Colorize `${text}`);
    }
    OptiDOM.log = log;
})(OptiDOM || (OptiDOM = {}));
var OptiDOM;
(function (OptiDOM) {
    function addEventListenerEnum(type, listener, options) {
        for (const el of this) {
            if (el instanceof Element) {
                el.addEventListener(type, listener, options);
            }
        }
    }
    OptiDOM.addEventListenerEnum = addEventListenerEnum;
    function addClassList(elClass) {
        for (const el of this) {
            el.addClass(elClass);
        }
    }
    OptiDOM.addClassList = addClassList;
    ;
    function removeClassList(elClass) {
        for (const el of this) {
            el.removeClass(elClass);
        }
    }
    OptiDOM.removeClassList = removeClassList;
    ;
    function toggleClassList(elClass) {
        for (const el of this) {
            el.toggleClass(elClass);
        }
    }
    OptiDOM.toggleClassList = toggleClassList;
    ;
})(OptiDOM || (OptiDOM = {}));
var OptiDOM;
(function (OptiDOM) {
    function type(val) {
        var _a;
        if (val === null)
            return "null";
        if (val === undefined)
            return "undefined";
        const typeOf = typeof val;
        if (typeOf === "function") {
            return `Function:${val.name || "<anonymous>"}(${val.length})`;
        }
        let typeName = OptiDOM.capitalize.call(Object.prototype.toString.call(val).slice(8, -1));
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
    }
    OptiDOM.type = type;
    ;
    // Mapping of style keywords to ANSI escape codes for terminal formatting
    const styles = {
        red: "\x1b[31m",
        orange: "\x1b[38;5;208m", // extended ANSI orange
        yellow: "\x1b[33m",
        green: "\x1b[32m",
        cyan: "\x1b[36m",
        blue: "\x1b[34m",
        purple: "\x1b[35m",
        pink: "\x1b[38;5;205m", // extended ANSI pink
        underline: "\x1b[4m",
        bold: "\x1b[1m",
        strikethrough: "\x1b[9m",
        italic: "\x1b[3m",
        emphasis: "\x1b[3m", // alias for italic
        reset: "\x1b[0m",
    };
    function Colorize(strings, ...values) {
        // Combine all parts of the template string with interpolated values
        let input = strings.reduce((acc, str, i) => { var _a; return acc + str + ((_a = values[i]) !== null && _a !== void 0 ? _a : ""); }, "");
        // Replace shorthand syntax for bold and underline
        // Replace {_..._} and {*...*} with {underline:...}, and {**...**} with {bold:...}
        input = input
            .replace(/\{_([^{}]+)_\}/g, (_, content) => `{underline:${content}}`)
            .replace(/\{\*\*([^{}]+)\*\*\}/g, (_, content) => `{bold:${content}}`)
            .replace(/\{\*([^{}]+)\*\}/g, (_, content) => `{underline:${content}}`)
            .replace(/\\x1b/g, '\x1b');
        // Replace escaped braces \{ and \} with placeholders so they are not parsed as tags
        input = input.replace(/\\\{/g, "__ESCAPED_OPEN_BRACE__").replace(/\\\}/g, "__ESCAPED_CLOSE_BRACE__");
        let output = ""; // Final output string with ANSI codes
        const stack = []; // Stack to track open styles for proper nesting
        let i = 0; // Current index in input
        while (i < input.length) {
            // Match the start of a style tag like {red: or {(dynamic ANSI code):
            const openMatch = input.slice(i).match(/^\{([a-zA-Z]+|\([^)]+\)):/);
            if (openMatch) {
                let tag = openMatch[1];
                if (tag.startsWith("(") && tag.endsWith(")")) {
                    // Dynamic ANSI escape code inside parentheses
                    tag = tag.slice(1, -1); // remove surrounding parentheses
                    stack.push("__dynamic__");
                    output += tag; // Insert raw ANSI code directly
                }
                else {
                    if (!styles[tag]) {
                        throw new ColorizedSyntaxError(`Unknown style: ${tag}`);
                    }
                    stack.push(tag);
                    output += styles[tag];
                }
                i += openMatch[0].length; // Move index past the opening tag
                continue;
            }
            // Match closing tag '}'
            if (input[i] === "}") {
                if (!stack.length) {
                    // No corresponding opening tag
                    throw new ColorizedSyntaxError(`Unexpected closing tag at index ${i}`);
                }
                stack.pop(); // Close the last opened tag
                output += styles.reset; // Reset styles
                // Re-apply all remaining styles still on the stack
                for (const tag of stack) {
                    // Reapply dynamic codes as-is, else mapped styles
                    output += tag === "__dynamic__" ? "" : styles[tag];
                }
                i++; // Move past closing brace
                continue;
            }
            // Append normal character to output, but restore escaped braces if needed
            if (input.startsWith("__ESCAPED_OPEN_BRACE__", i)) {
                output += "{";
                i += "__ESCAPED_OPEN_BRACE__".length;
                continue;
            }
            if (input.startsWith("__ESCAPED_CLOSE_BRACE__", i)) {
                output += "}";
                i += "__ESCAPED_CLOSE_BRACE__".length;
                continue;
            }
            output += input[i++];
        }
        // If stack is not empty, we have unclosed tags
        if (stack.length) {
            const lastUnclosed = stack[stack.length - 1];
            throw new ColorizedSyntaxError(`Missing closing tag for: ${lastUnclosed}`);
        }
        // Ensure final reset for safety
        return output + styles.reset;
    }
    OptiDOM.Colorize = Colorize;
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
    OptiDOM.isEmpty = isEmpty;
    function assert(val, guard) {
        if (guard) {
            if (!guard(val))
                throw new Error("assertion failed: not U");
        }
        else {
            if (val === null || val === undefined)
                throw new Error("assertion failed: val is null/undefined");
        }
    }
    OptiDOM.assert = assert;
    function createEventListener(triggers, callback) {
        const originals = triggers.map(fn => fn);
        triggers.forEach((originalFn, i) => {
            function wrapper(...args) {
                const result = originals[i].apply(this, args);
                callback(...triggers.map((_, j) => j === i ? result : undefined));
                return result;
            }
            ;
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
    OptiDOM.createEventListener = createEventListener;
    class EventEmitter {
        constructor() {
            this.listeners = {};
        }
        on(event, callback) {
            var _a;
            const key = event;
            ((_a = this.listeners)[key] || (_a[key] = [])).push(callback);
        }
        off(event) {
            delete this.listeners[event];
        }
        emit(event, ...params) {
            const callbacks = this.listeners[event];
            if (callbacks) {
                callbacks.forEach(cb => cb(...params));
            }
        }
    }
    OptiDOM.emitter = new EventEmitter();
    function generateID() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*_-";
        let result = "";
        for (let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        // Type assertion to add the brand
        return result;
    }
    OptiDOM.generateID = generateID;
    OptiDOM.features = {
        buttonHrefs: {
            _isEnabled: false,
            // Store the reference to the listener so it can be removed
            _handler() {
                document.body.addEventListener("click", this._delegatedClickHandler);
            },
            _delegatedClickHandler(event) {
                var _a;
                const target = event.target;
                if ((target === null || target === void 0 ? void 0 : target.tagName) === "BUTTON" && !target.disabled) {
                    const href = target.getAttribute("href");
                    if (href)
                        window.open(href, (_a = target.getAttribute("target")) !== null && _a !== void 0 ? _a : "_self");
                }
            },
            enable() {
                if (!this._isEnabled) {
                    this._isEnabled = true;
                    document.addEventListener("DOMContentLoaded", this._handler);
                }
            },
            disable() {
                this._isEnabled = false;
                document.removeEventListener("DOMContentLoaded", this._handler);
                // Also remove click handlers from buttons (optional but safer for clean-up)
                const buttons = document.querySelectorAll("button");
                for (const button of Array.from(buttons)) {
                    button.removeEventListener("click", this._delegatedClickHandler);
                }
            }
        },
        enableAll() {
            Object.entries(this).forEach(([_, feature]) => {
                if (typeof feature === "object" && typeof feature.enable === "function") {
                    feature.enable();
                }
            });
        },
        disableAll() {
            Object.entries(this).forEach(([_, feature]) => {
                if (typeof feature === "object" && typeof feature.disable === "function") {
                    feature.disable();
                }
            });
        },
    };
    class ColorizedSyntaxError extends Error {
        constructor(message) {
            super(message);
            this.name = "ColorizedSyntaxError";
        }
    }
    OptiDOM.ColorizedSyntaxError = ColorizedSyntaxError;
    class UnknownError extends Error {
        constructor(message) {
            super(message);
            this.name = "UnknownError";
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }
    OptiDOM.UnknownError = UnknownError;
    ;
    class NotImplementedError extends Error {
        constructor(message) {
            super(message !== null && message !== void 0 ? message : "Function not implimented yet.");
            this.name = "NotImplementedError";
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }
    OptiDOM.NotImplementedError = NotImplementedError;
    ;
    class AccessError extends Error {
        constructor(message) {
            super(message);
            this.name = "AccessError";
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }
    OptiDOM.AccessError = AccessError;
    ;
    class CustomError extends Error {
        constructor(name, message) {
            super(message);
            this.name = name;
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }
    OptiDOM.CustomError = CustomError;
    ;
})(OptiDOM || (OptiDOM = {}));
var OptiDOM;
(function (OptiDOM) {
    function hasText(text) {
        if (typeof text === "string") {
            return this.txt().includes(text);
        }
        else {
            return text.test(this.txt());
        }
    }
    OptiDOM.hasText = hasText;
    function addClass(elClass) {
        this.classList.add(elClass);
    }
    OptiDOM.addClass = addClass;
    function removeClass(elClass) {
        this.classList.remove(elClass);
    }
    OptiDOM.removeClass = removeClass;
    function toggleClass(elClass) {
        this.classList.toggle(elClass);
    }
    OptiDOM.toggleClass = toggleClass;
    function hasClass(elClass) {
        return this.classList.contains(elClass);
    }
    OptiDOM.hasClass = hasClass;
    function css(key, value) {
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
                    css.setProperty(toKebabCase(key), value.toString());
                }
            }
        }
        else {
            // Set multiple
            for (const [prop, val] of Object.entries(key)) {
                if (val !== null && val !== undefined) {
                    css.setProperty(toKebabCase(prop), val.toString());
                }
            }
        }
    }
    OptiDOM.css = css;
    ;
    function getParent() {
        return this.parentElement;
    }
    OptiDOM.getParent = getParent;
    ;
    function getAncestor(arg) {
        // Case 1: numeric level
        if (typeof arg === "number") {
            let node = this;
            for (let i = 0; i < arg; i++) {
                if (!(node === null || node === void 0 ? void 0 : node.parentNode))
                    return null;
                node = node.parentNode;
            }
            return node;
        }
        // Case 2: selector string
        const selector = arg;
        let el = this instanceof Element ? this : this.parentElement;
        while (el) {
            if (el.matches(selector)) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    OptiDOM.getAncestor = getAncestor;
    function createChildren(elements) {
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
    }
    OptiDOM.createChildren = createChildren;
    ;
    function tag(newTag) {
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
    }
    OptiDOM.tag = tag;
    ;
    function html(input) {
        return input !== undefined ? (this.innerHTML = input) : this.innerHTML;
    }
    OptiDOM.html = html;
    ;
    function text(text, ...input) {
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
    }
    OptiDOM.text = text;
    ;
    function show() {
        this.css("visibility", "visible");
    }
    OptiDOM.show = show;
    ;
    function hide() {
        this.css("visibility", "hidden");
    }
    OptiDOM.hide = hide;
    ;
    function toggle() {
        if (this.css("visibility") === "visible" || this.css("visibility") === "") {
            this.hide();
        }
        else {
            this.show();
        }
    }
    OptiDOM.toggle = toggle;
    ;
    function find(selector) {
        return this.querySelector(selector); // Returns a single Element or null
    }
    OptiDOM.find = find;
    ;
    function findAll(selector) {
        return this.querySelectorAll(selector); // Returns a single Element or null
    }
    OptiDOM.findAll = findAll;
    ;
    function getChildren() {
        return this.childNodes;
    }
    OptiDOM.getChildren = getChildren;
    ;
    function getSiblings(inclusive) {
        const siblings = Array.from(this.parentNode.childNodes);
        if (inclusive) {
            return siblings; // Include current node as part of siblings
        }
        else {
            return siblings.filter(node => !node.isSameNode(this));
        }
    }
    OptiDOM.getSiblings = getSiblings;
    ;
    function serialize() {
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
    }
    OptiDOM.serialize = serialize;
    ;
    function elementCreator() {
        return new OptiDOM.HTMLElementCreator(this);
    }
    OptiDOM.elementCreator = elementCreator;
    ;
    function cut() {
        const clone = document.createElementNS(this.namespaceURI, this.tagName);
        // Copy all attributes
        for (const attr of Array.from(this.attributes)) {
            clone.setAttribute(attr.name, attr.value);
        }
        // Deep copy child nodes (preserves text, elements, etc.)
        for (const child of Array.from(this.childNodes)) {
            clone.appendChild(child.cloneNode(true));
        }
        // Optionally copy inline styles (not always needed if using setAttribute above)
        if (this instanceof HTMLElement && clone instanceof HTMLElement) {
            clone.style.cssText = this.style.cssText;
        }
        this.remove(); // Remove original from DOM
        return clone;
    }
    OptiDOM.cut = cut;
})(OptiDOM || (OptiDOM = {}));
var OptiDOM;
(function (OptiDOM) {
    function addBoundListener(type, listener, timesOrCondition, options) {
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
    }
    OptiDOM.addBoundListener = addBoundListener;
    ;
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
    OptiDOM.addEventListeners = addEventListeners;
    ;
    function delegateEventListener(type, delegator, listener, options) {
        this.addEventListener(type, function (e) {
            const target = e.target;
            if (!target)
                return;
            let selector;
            if (typeof delegator === "string") {
                selector = delegator;
            }
            else {
                selector = ""; // fallback
            }
            const matchedEl = target.closest(selector);
            if (matchedEl &&
                (!(this instanceof Element) || this.contains(matchedEl))) {
                listener.call(matchedEl, e);
            }
        }, options);
    }
    OptiDOM.delegateEventListener = delegateEventListener;
})(OptiDOM || (OptiDOM = {}));
var OptiDOM;
(function (OptiDOM) {
    function ready(callback) {
        document.addEventListener("DOMContentLoaded", callback);
    }
    OptiDOM.ready = ready;
    function leaving(callback) {
        document.addEventListener("unload", (e) => callback.call(document, e));
    }
    OptiDOM.leaving = leaving;
    function bindShortcut(shortcut, callback) {
        document.addEventListener('keydown', (event) => {
            const keyboardEvent = event;
            keyboardEvent.keys = shortcut.split("+");
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
    }
    OptiDOM.bindShortcut = bindShortcut;
    function documentCss(element, object) {
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
    }
    OptiDOM.documentCss = documentCss;
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
                el.style.setProperty(prop, val.toString());
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
                else
                    throw new OptiDOM.CustomError("ParameterError", "Custom parameters must be of type 'string'");
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
    OptiDOM.createElementTree = createElementTree;
    function $(selector) {
        return document.querySelector(selector);
    }
    OptiDOM.$ = $;
    ;
    function $$(selector) {
        return document.querySelectorAll(selector);
    }
    OptiDOM.$$ = $$;
    ;
})(OptiDOM || (OptiDOM = {}));
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
function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function isGlobal(val) {
    return val === globalThis;
}
function typedEntries(obj) {
    return Object.entries(obj);
}
var OptiDOM;
(function (OptiDOM) {
    class OptiDOMRemovedError extends Error {
        constructor(message) {
            super(message);
            this.name = "OptiDOMRemovedError";
        }
    }
    class optidom {
        constructor() {
            this._registry = {};
            this._setup = false;
        }
        register(clazz, methodName, method, prototype = true, options = {}) {
            const isGlobalTarget = isGlobal(clazz);
            const className = clazz.name || "global";
            const key = `${className}.${String(methodName)}`;
            const isAccessor = typeof method === "object" &&
                (typeof method.get === "function" || typeof method.set === "function");
            const descriptor = isAccessor
                ? Object.assign(Object.assign({ configurable: true, enumerable: false }, method), options) : Object.assign({ value: method, writable: true, configurable: true, enumerable: false }, options);
            const target = prototype && !isGlobalTarget ? clazz.prototype : clazz;
            if (!target)
                throw new Error("The class specified has no prototype");
            if (!options.overwrite && methodName in target) {
                console.warn(`[optidom] skipped ${className}${prototype ? ".prototype" : ""}.${String(methodName)} (already exists)`);
                return this;
            }
            Object.defineProperty(target, methodName, descriptor);
            this._registry[methodName] = method;
            return new optidom();
        }
        explicitRegister(key, value) {
            this._registry[key] = value;
            return new optidom();
        }
        get(key) {
            return this._registry[key];
        }
        getAll() {
            return this._registry;
        }
        debug() {
            console.group("[OptiDOM] registered methods:");
            for (const key in this._registry) {
                console.log(`- ${key}`);
            }
            console.groupEnd();
        }
        configure(config) {
            if (!this._setup) {
                this._setup = true;
                if (config.globalSelector) {
                    if (typeof globalThis.$ === "undefined")
                        globalThis.$ = OptiDOM.$;
                    if (typeof globalThis.$$ === "undefined")
                        globalThis.$$ = OptiDOM.$$;
                }
                else {
                    if (globalThis.$ === OptiDOM.$)
                        delete globalThis.$;
                    if (globalThis.$$ === OptiDOM.$$)
                        delete globalThis.$$;
                }
                if (config.allowDOMWrite === false) {
                    document.write = () => {
                        throw new OptiDOMRemovedError("Function document.write was removed");
                    };
                    document.writeln = () => {
                        throw new OptiDOMRemovedError("Function document.write was removed");
                    };
                }
                if (config.disableDeprecated) {
                    switch (config.disableDeprecated) {
                        case "All":
                            break;
                        case "JSBase":
                            break;
                        case "OptiDOMReplaced":
                            break;
                    }
                }
                if (config.htmlOnly) {
                    const originalCreateElement = document.createElement.bind(document);
                    const originalQuerySelector = document.querySelector.bind(document);
                    // Override createElement to block SVG, MathML, XML elements
                    document.createElement = function (tagName, options) {
                        const lowerTag = tagName.toLowerCase();
                        // Block SVG/MathML tags — adjust list as needed
                        const blockedTags = [
                            "svg", "circle", "rect", "path", "math", "maction", "mfrac", "msqrt" // etc
                        ];
                        if (blockedTags.includes(lowerTag)) {
                            throw new Error(`Creation of <${tagName}> is blocked by htmlOnly enforcement.`);
                        }
                        return originalCreateElement(tagName, options);
                    };
                    // Optionally override querySelector to check for SVG/MathML too
                    document.querySelector = function (selector) {
                        // Simple example: disallow selectors that match SVG or MathML tags
                        if (/^(svg|circle|rect|path|math|maction|mfrac|msqrt)/i.test(selector.trim())) {
                            throw new Error(`Querying for SVG/MathML elements is blocked by htmlOnly enforcement.`);
                        }
                        return originalQuerySelector(selector);
                    };
                    const originalCreateElementNS = document.createElementNS.bind(document);
                    document.createElementNS = (function (namespaceURI, qualifiedName, options) {
                        if (namespaceURI === "http://www.w3.org/2000/svg" || namespaceURI === "http://www.w3.org/1998/Math/MathML") {
                            throw new Error(`Creation of namespaced element ${qualifiedName} in ${namespaceURI} is blocked by htmlOnly enforcement.`);
                        }
                        return originalCreateElementNS(namespaceURI, qualifiedName, options);
                    });
                }
                if (config.apiRules) {
                    if (typeof config.apiRules === "string") {
                    }
                    else {
                        switch (config.apiRules) {
                        }
                    }
                }
            }
            else
                console.error("[OptiDOM]: OptiDOM settings are already configured");
            return config;
        }
        strict() {
            if (!this._setup) {
                this._setup = true;
                return this.configure({
                    version: "ESNext",
                    apiRules: "Check",
                    allowDOMWrite: false,
                    disableDeprecated: "All",
                    htmlOnly: true,
                    useFetchCORS: true
                });
            }
            else {
                console.error("[OptiDOM]: OptiDOM has already been configured.");
                return;
            }
        }
    }
    OptiDOM.optidom = optidom;
})(OptiDOM || (OptiDOM = {}));
const OptidomT = new OptiDOM.optidom()
    .register(globalThis, "f", (iife) => iife())
    .register(globalThis, "createEventListener", OptiDOM.createEventListener, false)
    .register(globalThis, "LocalStorage", OptiDOM.LocalStorage, false)
    .register(globalThis, "SessionStorage", OptiDOM.SessionStorage, false)
    .register(globalThis, "Cookie", OptiDOM.Cookie, false)
    .register(globalThis, "Time", OptiDOM.Time, false)
    .register(globalThis, "Sequence", OptiDOM.Sequence, false)
    .register(globalThis, "ShortcutEvent", OptiDOM.ShortcutEvent, false)
    .register(globalThis, "emitter", OptiDOM.emitter, false)
    .register(globalThis, "features", OptiDOM.features, false)
    .register(globalThis, "isEmpty", OptiDOM.isEmpty, false)
    .register(globalThis, "type", OptiDOM.type, false)
    .register(globalThis, "generateID", OptiDOM.generateID, false)
    .register(globalThis, "Colorize", OptiDOM.Colorize, false)
    .register(globalThis, "UnknownError", OptiDOM.UnknownError, false)
    .register(globalThis, "NotImplementedError", OptiDOM.NotImplementedError, false)
    .register(globalThis, "AccessError", OptiDOM.AccessError, false)
    .register(globalThis, "CustomError", OptiDOM.CustomError, false)
    .register(globalThis, "ColorizedSyntaxError", OptiDOM.ColorizedSyntaxError, false)
    .register(Document, "ready", OptiDOM.ready)
    /*! Not Working */ .register(Document, "leaving", OptiDOM.leaving)
    .register(Document, "bindShortcut", OptiDOM.bindShortcut)
    .register(Document, "css", OptiDOM.documentCss)
    .register(Document, "createElementTree", OptiDOM.createElementTree)
    .register(Date, "at", OptiDOM.atDate)
    .register(Date, "fromTime", OptiDOM.fromTime)
    .register(NodeList, "addEventListener", OptiDOM.addEventListenerEnum)
    .register(NodeList, "addClass", OptiDOM.addClassList)
    .register(NodeList, "removeClass", OptiDOM.removeClassList)
    .register(NodeList, "toggleClass", OptiDOM.toggleClassList)
    .register(NodeList, "single", function () {
    return this.length > 0 ? this[0] : null;
})
    .register(HTMLCollection, "addEventListener", OptiDOM.addEventListenerEnum)
    .register(HTMLCollection, "addClass", OptiDOM.addClassList)
    .register(HTMLCollection, "removeClass", OptiDOM.removeClassList)
    .register(HTMLCollection, "toggleClass", OptiDOM.toggleClassList)
    .register(HTMLCollection, "single", function () {
    return this.length > 0 ? this[0] : null;
})
    .register(EventTarget, "addBoundListener", OptiDOM.addBoundListener)
    .register(EventTarget, "addEventListeners", OptiDOM.addEventListeners)
    .register(EventTarget, "delegateEventListener", OptiDOM.delegateEventListener)
    .register(Element, "hasText", OptiDOM.hasText)
    .register(Element, "txt", OptiDOM.text)
    .register(Element, "addClass", OptiDOM.addClass)
    .register(Element, "removeClass", OptiDOM.removeClass)
    .register(Element, "toggleClass", OptiDOM.toggleClass)
    .register(Element, "hasClass", OptiDOM.hasClass)
    .register(HTMLElement, "css", OptiDOM.css)
    .register(HTMLElement, "elementCreator", OptiDOM.elementCreator)
    .register(HTMLElement, "tag", OptiDOM.tag)
    .register(HTMLElement, "html", OptiDOM.html)
    .register(HTMLElement, "show", OptiDOM.show)
    .register(HTMLElement, "hide", OptiDOM.hide)
    .register(HTMLElement, "toggle", OptiDOM.toggle)
    .register(HTMLFormElement, "serialize", OptiDOM.serialize)
    .register(Node, "getParent", OptiDOM.getParent)
    .register(Node, "getAncestor", OptiDOM.getAncestor)
    .register(Node, "getChildren", OptiDOM.getChildren)
    .register(Node, "getSiblings", OptiDOM.getSiblings)
    .register(Node, "$", OptiDOM.find)
    .register(Node, "$$", OptiDOM.findAll)
    .register(Number, "repeat", OptiDOM.repeat)
    .register(Array, "unique", OptiDOM.unique)
    .register(Array, "chunk", OptiDOM.chunk)
    .register(String, "remove", OptiDOM.remove)
    .register(String, "removeAll", OptiDOM.removeAll)
    .register(String, "capitalize", OptiDOM.capitalize)
    .register(Math, "random", OptiDOM.random, false)
    .register(JSON, "parseFile", OptiDOM.parseFile, false)
    .register(Object, "clone", OptiDOM.clone, false)
    .register(Object, "forEach", OptiDOM.forEach, false)
    .register(Date, "at", OptiDOM.atDate, false)
    .register(Date, "fromTime", OptiDOM.fromTime, false)
    .register(Window, "width", {
    get: () => window.innerWidth || document.body.clientWidth
}, false)
    .register(Window, "height", {
    get: () => window.innerHeight || document.body.clientHeight
}, false)
    .register(HTMLElement, "visible", {
    get: function () {
        return this.css("visibility") !== "hidden"
            ? this.css("display") !== "none"
            : Number(this.css("opacity")) > 0;
    }
})
    .explicitRegister("HTMLDefaultElement", OptiDOM.HTMLDefaultElement);
customElements.define("default-option", OptiDOM.HTMLDefaultElement, { extends: "option" });
globalThis.Optidom = OptidomT;
/// <reference path="../types/optidom.lib.d.ts" />
/// <reference path="./classes.ts" />
/// <reference path="./misc.ts" />
/// <reference path="./lists.ts" />
/// <reference path="./globals.ts" />
/// <reference path="./elements.ts" />
/// <reference path="./events.ts" />
/// <reference path="./document.ts" />
/// HAS TO BE LAST
/// <reference path="./assignments.ts" />
