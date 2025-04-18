/* eslint-disable func-style */
function defineProperty<T>(
  object: any,
  prop: PropertyKey,
  getter: () => T,
  setter?: (value: T) => void
): void {
  Object.defineProperty(object, prop, {
    get: getter,
    set: setter,
    enumerable: false,
    configurable: true
  });
}

function defineGetter<T>(object: any, prop: PropertyKey, getter: () => T): void {
  defineProperty(object, prop, getter);
}

function defineSetter<T>(object: any, prop: PropertyKey, setter: (value: T) => void): void {
  Object.defineProperty(object, prop, {
    set: setter,
    enumerable: false,
    configurable: true
  });
}

// Sources
const bindShortcut = function (
  shortcut: Shortcut,
  callback: (event: KeyboardEvent) => void
): void {
  document.addEventListener('keydown', (event: Event) => {
    const keyboardEvent = event as KeyboardEvent;
    const keys = shortcut
      .trim()
      .toLowerCase()
      .split("+");

    // Separate out the modifier keys and the actual key
    const modifiers = keys.slice(0, -1);
    const finalKey = keys[keys.length - 1];

    const modifierMatch = modifiers.every((key: any) => {
      if (key === 'ctrl' || key === 'control') return keyboardEvent.ctrlKey;
      if (key === 'alt') return keyboardEvent.altKey;
      if (key === 'shift') return keyboardEvent.shiftKey;
      if (key === 'meta' || key === 'windows' || key === 'command') return keyboardEvent.metaKey;
      return false;
    });

    // Check that the pressed key matches the final key
    const keyMatch = finalKey === keyboardEvent.key.toLowerCase();

    if (modifierMatch && keyMatch) {
      callback(keyboardEvent);
    }
  });
};

const ready = function (callback: (this: Document, ev: Event) => any) {
  document.addEventListener("DOMContentLoaded", callback);
};

const addEventListenerEnum = function<T extends EventTarget, K extends keyof EventMapOf<T>>(
  this: Iterable<Element>,
  type: K,
  listener: (this: Element, ev: EventMapOf<T>[K]) => any,
  options?: boolean | AddEventListenerOptions
): typeof this {
  for (const el of this) {
    if (el instanceof Element) {
      el.addEventListener(type as string, listener as EventListener, options);
    }
  }
  return this;
};

const addOnceListener = function<T extends EventTarget, K extends keyof EventMapOf<T>>(
  this: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: EventMapOf<T>[K]) => any,
  options?: boolean | AddEventListenerOptions | number
): void {
  let repeatCount = 1; // Default to 1 if no repeat option provided

  // If options is a number, treat it as the repeat count
  if (typeof options === 'number') {
    repeatCount = options;
    options = undefined; // Reset options to undefined so that AddEventListenerOptions is not mixed
  }

  const onceListener = (event: EventMapOf<T>[K]) => {
    listener.call(this, event);
    repeatCount--;

    if (repeatCount <= 0) {
      this.removeEventListener(type as string, onceListener as EventListener, options);
    }
  };

  this.addEventListener(type as string, onceListener as EventListener, options);
};

const atDate = (year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number => {
  return new Date(year, monthIndex, date, hours, minutes, seconds, ms).getTime();
};

const addEventListeners = function<T extends EventTarget, K extends keyof EventMapOf<T>>(
  this: EventTarget,
  ...listeners: Record<K, (e: EventMapOf<T>[K]) => any>[] // Spread of event listener objects
): void {
  for (const listenerObject of listeners) {
    for (const event in listenerObject) {
      const listener = listenerObject[event as K]; // Safely access listener by event key
      if (listener) {
        this.addEventListener(event, listener as EventListener);
      }
    }
  }
};

const css = function(
  this: HTMLElement,
  key: string | Partial<StringRecord<string>>,
  value?: string
): void { 
  const css = this.style;

  if (typeof key === "string") {
    if (key in css && value !== undefined) {
      (css as any)[key] = value;
    }
  } else {
    Object.entries(key).forEach(([prop, val]) => {
      if (prop in css) {
        (css as any)[prop] = val!;
      }
    });
  }
};

const documentCss = function (
  element: keyof HTMLElementTagNameMap | string,
  object?: Partial<Record<keyof CSSStyleDeclaration, string>>
): void {
  const selector = element.trim();
  if (!selector) {
    throw new Error("Selector cannot be empty.");
  }

  let styleTag = document.querySelector("style[js-styles]") as HTMLStyleElement | null;

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.setAttribute("js-styles", "");
    document.head.appendChild(styleTag);
  }

  const sheet = styleTag.sheet as CSSStyleSheet;

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
  const newStyles: StringRecord<string> = {};
  for (const [prop, val] of Object.entries(object)) {
    if (val !== null && val !==  undefined) {
      const kebab = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
      newStyles[kebab] = val;
    }
  }

  let ruleIndex = -1;
  const existingStyles: StringRecord<string> = {};

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
  } catch (err) {
    console.error("Failed to insert CSS rule:", err, { selector, styleString });
  }
};

const getParent = function (this: Node): Node | null {
  return this.parentElement;
};

const getAncestor = function <T extends Node = Node>(this: Node, level: number): T | null {
  let ancestor: Node = this;

  for (let i = 0; i < level; i++) {
    if (ancestor.parentElement === null) return null;

    ancestor = ancestor.parentElement;
  }

  return ancestor as T;
};

const getAncestorQuery = function <T extends Element>(this: Element, selector: string): T | null {
  const element = document.querySelector<T>(selector);

  if (element?.contains(this)) {
    return element;
  }

  return null;
};

const createChildren = function (this: HTMLElement, elements: HTMLElementCascade): void {
  const element = document.createElement(elements.element);

  if (elements.id) {
    element.id = elements.id;
  }

  if (elements.className) {
    if (Array.isArray(elements.className)) {
      element.classList.add(...elements.className);
    } else {
      element.classList.add(elements.className);
    }
  }

  // Assign additional attributes dynamically
  for (const key in elements) {
    if (!['element', 'id', 'className', 'children'].includes(key)) {
      const value = elements[key as keyof HTMLElementCascade];
      if (typeof value === 'string') {
        element.setAttribute(key, value);
      } else if (Array.isArray(value)) {
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
    } else {
      // Recursively create a single child element
      element.createChildren(elements.children);
    }
  }

  this.appendChild(element);
};

const change = function <T extends keyof HTMLElementTagNameMap>(this: HTMLElement, newTag: T): HTMLElementTagNameMap[T] {
  const newElement = document.createElement(newTag) as HTMLElementTagNameMap[T];

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

const html = function (this: HTMLElement, input?: string): string {
  return input !== undefined ? (this.innerHTML = input) : this.innerHTML;
};

const text = function (this: HTMLElement, input?: string): string {
  return input !== undefined ? (this.textContent = input) : this.textContent || '';
};

const $ = function(selector: string) {
  return document.querySelector(selector);
};

const $$ = function(selector: string) {
  return document.querySelectorAll(selector);
};

const elementCreator = function(el: keyof HTMLElementTagNameMap, attrs: HTMLAttrs) {
  return new HTMLElementCreator(el, attrs);
};

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// -------------------------------------------------------------------------------------------------

// Cookie Class
class CookieInternal {
  private name: string;
  private value: string | null;
  private expiry: number;
  private path: string;

  public constructor(name: string, valueIfNotExist: string | null = null, days: number = 7, path: string = '/') {
      this.name = name;
      this.expiry = days;
      this.path = path;

      const existingValue = CookieInternal.get(name);
      if (existingValue === null && valueIfNotExist !== null) {
          CookieInternal.set(name, valueIfNotExist, days, path);
          this.value = valueIfNotExist;
      } else {
          this.value = existingValue;
      }
  }

  public static set(name: string, value: string, days: number = 7, path: string = '/'): void {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=${path}`;
  }

  public static get(name: string): string | null {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
  }

  public static delete(name: string, path: string = '/'): void {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
  }

  /** Instance methods to interact with this specific cookie */
  public update(value: string, days: number = this.expiry, path: string = this.path) {
    this.value = value;
    CookieInternal.set(this.name, value, days, path);
  }

  public delete() {
    this.value = null;
    CookieInternal.delete(this.name, this.path);
  }

  public getValue(): string | null { return this.value; }
  public getName(): string { return this.name; }
  public getExpiry(): number { return this.expiry; }
  public getPath(): string { return this.path; }
}

// Storage Class
class LocalStorageInternal<T> {
  private name: string;
  private value: T | null;
  private _isSession: boolean;

  public constructor(name: string, valueIfNotExist: T | null = null, isSession: boolean = false) {
      this.name = name;
      this._isSession = isSession;

      const existingValue = LocalStorageInternal.get<T>(name);
      if (existingValue === null && valueIfNotExist !== null) {
          LocalStorageInternal.set(name, valueIfNotExist, isSession);
          this.value = valueIfNotExist;
      } else {
          this.value = existingValue;
      }
  }

  static set(key: string, value: any, isSession: boolean = false): void {
      const storage = isSession ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(value));
  }

  static get<T = string>(key: string, isSession: boolean = false): T | null {
      const storage = isSession ? sessionStorage : localStorage;
      const value = storage.getItem(key);
      return value ? JSON.parse(value) : null;
  }

  static remove(key: string, isSession: boolean = false): void {
      const storage = isSession ? sessionStorage : localStorage;
      storage.removeItem(key);
  }

  static clear(isSession: boolean = false): void {
      const storage = isSession ? sessionStorage : localStorage;
      storage.clear();
  }

  /** Instance methods to interact with this specific cookie */
  public update(value: T) {
    this.value = value;
    LocalStorageInternal.set(this.name, value);
  }

  public delete() {
    this.value = null;
    LocalStorageInternal.remove(this.name);
  }

  public getValue(): T | null { return this.value; }
  public getName(): string { return this.name; }
  public isSession(): boolean { return this._isSession; }
}

class HTMLElementCreator {
  private superEl: HTMLElement;
  private currContainer: HTMLElement;
  private parentStack: HTMLElement[] = [];

  constructor(tag: HTMLElement | keyof HTMLElementTagNameMap, attrs: HTMLAttrs = {}) {
    // If the tag is an HTMLElement, use it directly
    if (tag instanceof HTMLElement) {
      this.superEl = tag;
      this.currContainer = tag;
    } else {
      // Otherwise, create a new element using the tag name
      this.superEl = document.createElement(tag) as HTMLElement;
      this.makeElement(this.superEl, attrs);
      this.currContainer = this.superEl;
    }
  }

  private makeElement(el: HTMLElement, attrs: HTMLAttrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "text") {
        el.innerText = value as string;
      } else if (key === "html") {
        el.innerHTML = value as string;
      } else if (key === "class") {
        if (typeof value === "string") {
          el.classList.add(value);
        } else if (Array.isArray(value)) {
          el.classList.add(...value);
        }
      } else if (key === "style") {
        let styles= "";
        Object.entries(value as object).forEach(([key, value]) => {
          styles += `${toKebabCase(key)}: ${value}; `;
        });

        el.setAttribute("style", styles);
        
      } else if (typeof value === "boolean") {
        if (value) el.setAttribute(key, "");
        else el.removeAttribute(key);
      } else if (value !== undefined) {
        el.setAttribute(key, value as string);
      }
    });
  }

  public el(tag: keyof HTMLElementTagNameMap, attrs: HTMLAttrs = {}): HTMLElementCreator {
    const child = document.createElement(tag as string);
    this.makeElement(child, attrs);
    this.currContainer.appendChild(child);
    return this;
  }

  public container(tag: keyof HTMLElementTagNameMap, attrs: HTMLAttrs = {}): HTMLElementCreator {
    const wrapper = document.createElement(tag as string);
    this.makeElement(wrapper, attrs);
    this.parentStack.push(this.currContainer);
    this.currContainer.appendChild(wrapper);
    this.currContainer = wrapper;
    return this;
  }

  public up(): HTMLElementCreator {
    const prev = this.parentStack.pop();

    this.currContainer = prev ?? this.superEl;

    return this;
  }

  public append(to: HTMLElement): void {
    to.appendChild(this.superEl);
  }

  public get element(): HTMLElement {
    return this.superEl;
  }
}

class TimeInternal {
  private hours: number;
  private minutes: number;
  private seconds: number;
  private milliseconds: number;

  public constructor();
  public constructor(hours: Date);
  public constructor(hours: number, minutes: number, seconds?: number, milliseconds?: number);
  public constructor(hours?: number | Date, minutes?: number, seconds?: number, milliseconds?: number) {
    if (hours instanceof Date) {
      this.hours = hours.getHours();
      this.minutes = hours.getMinutes();
      this.seconds = hours.getSeconds();
      this.milliseconds = hours.getMilliseconds();
    } else {
      const now = new Date();
      this.hours = hours ?? now.getHours();
      this.minutes = minutes ?? now.getMinutes();
      this.seconds = seconds ?? now.getSeconds();
      this.milliseconds = milliseconds ?? now.getMilliseconds();
    }

    this.validateTime();
  }

  // Validation for time properties
  private validateTime(): void {
    if (this.hours < 0 || this.hours >= 24) throw new SyntaxError("Hours must be between 0 and 23.");
    if (this.minutes < 0 || this.minutes >= 60) throw new SyntaxError("Minutes must be between 0 and 59.");
    if (this.seconds < 0 || this.seconds >= 60) throw new SyntaxError("Seconds must be between 0 and 59.");
    if (this.milliseconds < 0 || this.milliseconds >= 1000) throw new SyntaxError("Milliseconds must be between 0 and 999.");
  }

  public static of(date: Date) {
    return new this(date);
  }

  // Getters
  public getHours(): number { return this.hours; }
  public getMinutes(): number { return this.minutes; }
  public getSeconds(): number { return this.seconds; }
  public getMilliseconds(): number { return this.milliseconds; }

  // Setters
  public setHours(hours: number): void {
    this.hours = hours;
    this.validateTime();
  }
  public setMinutes(minutes: number): void {
    this.minutes = minutes;
    this.validateTime();
  }
  public setSeconds(seconds: number): void {
    this.seconds = seconds;
    this.validateTime();
  }
  public setMilliseconds(milliseconds: number): void {
    this.milliseconds = milliseconds;
    this.validateTime();
  }

  // Returns the time in milliseconds since the start of the day
  public getTime(): number {
    return (
      this.hours * 3600000 + 
      this.minutes * 60000 + 
      this.seconds * 1000 + 
      this.milliseconds
    );
  }

  // Returns the time in milliseconds since the start of the day
  public static at(hours: number, minutes: number, seconds?: number, milliseconds?: number): number {
    return new TimeInternal(hours, minutes, seconds, milliseconds).getTime();
  }

  public sync() {
    return new TimeInternal();
  }

  // Static: Return current time as a Time object
  public static now(): number {
    return new TimeInternal().getTime();
  }

  public toString() {
    return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;;
  }

  public toISOString(): string {
    return `T${this.toString()}.${this.milliseconds.toString().padStart(3, '0')}Z`;
  }

  public toJSON(): string {
    return this.toISOString(); // Leverage the existing toISOString() method
  }

  public toDate(years: number, months: number, days: number): Date {
    return new Date(years, months, days, this.hours, this.minutes, this.seconds, this.milliseconds);
  }

  public static fromDate(date: Date) {
    return new TimeInternal(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  }

  // Arithmetic operations
  public addMilliseconds(ms: number): TimeInternal {
    const totalMilliseconds = this.getTime() + ms;
    return TimeInternal.fromMilliseconds(totalMilliseconds);
  }

  public subtractMilliseconds(ms: number): TimeInternal {
    const totalMilliseconds = this.getTime() - ms;
    return TimeInternal.fromMilliseconds(totalMilliseconds);
  }

  public addSeconds(seconds: number): TimeInternal {
    return this.addMilliseconds(seconds * 1000);
  }

  public addMinutes(minutes: number): TimeInternal {
    return this.addMilliseconds(minutes * 60000);
  }

  public addHours(hours: number): TimeInternal {
    return this.addMilliseconds(hours * 3600000);
  }

  // Static: Create a Time object from total milliseconds
  public static fromMilliseconds(ms: number): TimeInternal {
    const hours = Math.floor(ms / 3600000) % 24;
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    const milliseconds = ms % 1000;
    return new TimeInternal(hours, minutes, seconds, milliseconds);
  }

  // Parsing
  public static fromString(timeString: string): TimeInternal {
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

  public static fromISOString(isoString: string): TimeInternal {
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
  public compare(other: TimeInternal): number {
    const currentTime = this.getTime();
    const otherTime = other.getTime();
  
    if (currentTime < otherTime) {
      return -1;
    } else if (currentTime > otherTime) {
      return 1;
    } else {
      return 0;
    }
  }
  
  public isBefore(other: TimeInternal): boolean {
    return this.compare(other) === -1;
  }
  
  public isAfter(other: TimeInternal): boolean {
    return this.compare(other) === 1;
  }
  
  public equals(other: TimeInternal): boolean {
    return this.compare(other) === 0;
  }

  public static equals(first: TimeInternal, other: TimeInternal): boolean {
    return first.compare(other) === 0;
  }
}

//! Prototypes

globalThis.bindShortcut = bindShortcut;
globalThis.f = (iife: () => void) => iife();
globalThis.LocalStorage = LocalStorageInternal;
globalThis.Cookie = CookieInternal;
globalThis.Time = TimeInternal;
globalThis.UnknownError = class extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnknownError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

Document.prototype.ready = ready;
Document.prototype.elementCreator = elementCreator;
Document.prototype.bindShortcut = bindShortcut;
Document.prototype.css = documentCss;
Document.prototype.$ = $;
Document.prototype.$$ = $$;

Date.at = atDate;

NodeList.prototype.addEventListener = addEventListenerEnum;
HTMLCollection.prototype.addEventListener = addEventListenerEnum;
EventTarget.prototype.addOnceListener = addOnceListener;
EventTarget.prototype.addEventListeners = addEventListeners;

HTMLElement.prototype.css = css;
HTMLElement.prototype.createChildren = createChildren;
HTMLElement.prototype.elementCreator = function (this: HTMLElement) { return new HTMLElementCreator(this);};
HTMLElement.prototype.change = change;
HTMLElement.prototype.html = html;
HTMLElement.prototype.text = text;

Node.prototype.getParent = getParent;
Node.prototype.getAncestor = getAncestor;
Node.prototype.getAncestorQuery = getAncestorQuery;

//! Getters & Setters

defineGetter(Window.prototype, "width", () => window.innerWidth || document.body.clientWidth);
defineGetter(Window.prototype, "height", () => window.innerHeight || document.body.clientHeight);