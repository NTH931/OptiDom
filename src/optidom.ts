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

function toArray(collection: HTMLCollectionOf<Element> | NodeListOf<Element>): Element[] {
  return Array.from(collection);
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

const fromTime = function (this: Date, time: Time, year: number, monthIndex: number, date?: number | undefined): Date {
  return new Date(year, monthIndex, date, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};

const ready = function (callback: (this: Document, ev: Event) => any) {
  document.addEventListener("DOMContentLoaded", callback);
};

const leaving = function (callback: (this: Document, ev: Event) => any): void {
  document.addEventListener("unload", (e) => callback.call(document, e));
};

const addEventListenerEnum = function <T extends EventTarget>(
  this: Iterable<T>,
  type: keyof EventMapOf<T>,
  listener: (this: T, e: EventMapOf<T>[keyof EventMapOf<T>]) => any,
  options?: boolean | AddEventListenerOptions
): void {
  for (const el of this) {
    if (el instanceof Element) {
      el.addEventListener(type as string, listener as EventListener, options);
    }
  }
};

const addBoundListener = function <T extends EventTarget, K extends keyof EventMapOf<T>>(
  this: T,
  type: K,
  listener: (this: T, e: EventMapOf<T>[K]) => void,
  timesOrCondition: number | ((this: T) => boolean),
  options?: boolean | AddEventListenerOptions
): void {
  if (typeof timesOrCondition === "number") {
    if (timesOrCondition <= 0) return;

    let repeatCount = timesOrCondition; // Default to 1 if no repeat option provided

    const onceListener = (event: EventMapOf<T>[K]) => {
      listener.call(this, event);
      repeatCount--;

      if (repeatCount <= 0) {
        this.removeEventListener(type as string, onceListener as EventListener, options);
      }
    };

    this.addEventListener(type as string, onceListener as EventListener, options);
  } else {
    if (timesOrCondition.call(this)) return;

    const onceListener = (event: EventMapOf<T>[K]) => {
      if (timesOrCondition.call(this)) {
        this.removeEventListener(type as string, onceListener as EventListener, options);
        return;
      }
      listener.call(this, event);
    };

    this.addEventListener(type as string, onceListener as EventListener, options);
  }
};

const hasText = function (this: Element, text: string | RegExp): boolean {
  if (typeof text === "string") {
    return this.text().includes(text);
  } else {
    return text.test(this.text());
  }
};

const addClassList = function <T extends Element>(this: Iterable<T>, elClass: string): void {
  for (const el of this) {
    el.addClass(elClass);
  }
};

const removeClassList = function <T extends Element>(this: Iterable<T>, elClass: string): void {
  for (const el of this) {
    el.removeClass(elClass);
  }
};

const toggleClassList = function <T extends Element>(this: Iterable<T>, elClass: string): void {
  for (const el of this) {
    el.toggleClass(elClass);
  }
};

const addClass = function (this: Element, elClass: string): void {
  this.classList.add(elClass);
};

const removeClass = function (this: Element, elClass: string): void {
  this.classList.remove(elClass);
};

const toggleClass = function (this: Element, elClass: string): void {
  this.classList.toggle(elClass);
};

const hasClass = function (this: Element, elClass: string): boolean {
  return this.classList.contains(elClass);
};

const atDate = (year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number => {
  return new Date(year, monthIndex, date, hours, minutes, seconds, ms).getTime();
};

function addEventListeners<T extends EventTarget>(
  this: T,
  listenersOrTypes: (keyof EventMapOf<T>)[] | {
    [K in keyof EventMapOf<T>]?: (this: T, e: EventMapOf<T>[K]) => any
  },
  callback?: (e: Event) => any,
  options?: AddEventListenerOptions | boolean
): void {
  if (Array.isArray(listenersOrTypes)) {
    for (const type of listenersOrTypes) {
      this.addEventListener(String(type), callback as EventListener, options);
    }
  } else {
    for (const [event, listener] of Object.entries(listenersOrTypes) as [keyof EventMapOf<T>, ((e: EventMapOf<T>[keyof EventMapOf<T>]) => any)][]) {
      if (listener) {
        this.addEventListener(String(event), listener as EventListener, options);
      }
    }
  }
};

const css = function (
  this: HTMLElement,
  key?: keyof CSSStyleDeclaration | Partial<Record<keyof CSSStyleDeclaration, string | number>>,
  value?: string | number
): any {
  const css = this.style;

  if (!key) {
    // Return all styles
    const result: Partial<Record<keyof CSSStyleDeclaration, string>> = {};
    for (let i = 0; i < css.length; i++) {
      const prop = css[i];
      if (prop) {
        result[prop as keyof CSSStyleDeclaration] = css.getPropertyValue(prop).trim();
      }
    }
    return result;
  }

  if (typeof key === "string") {
    if (value === undefined) {
      // Get one value
      return css.getPropertyValue(key).trim();
    } else {
      // Set one value
      if (key in css) {
        css.setProperty(key, value.toString());
      }
    }
  } else {
    // Set multiple
    for (const [prop, val] of Object.entries(key)) {
      if (prop in css && val !== null && val !== undefined) {
        css.setProperty(prop, val.toString());
      }
    }
  }
};

const documentCss = function (
  element: string,
  object?: Partial<Record<keyof CSSStyleDeclaration, string | number>>
): any {
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
  let ruleIndex = -1;
  const existingStyles: StringRecord<string> = {};

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
  const newStyles: StringRecord<string> = {};
  for (const [prop, val] of Object.entries(object)) {
    if (val !== null && val !== undefined) {
      const kebab = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
      newStyles[kebab] = val.toString();
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

const getAncestor = function (this: Node, level: number): Node | null {
  let ancestor: Node = this;

  for (let i = 0; i < level; i++) {
    if (ancestor.parentNode === null) return null;

    ancestor = ancestor.parentNode;
  }

  return ancestor;
};

const querySelectAncestor = function <T extends Element>(this: Element, selector: string): T | null {
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

const tag = function <T extends keyof HTMLElementTagNameMap>(
  this: HTMLElement,
  newTag?: T
): HTMLElementOf<T> | keyof HTMLElementTagNameMap {
  if (!newTag) {
    return this.tagName.toLowerCase() as keyof HTMLElementTagNameMap;
  }

  const newElement = document.createElement(newTag) as HTMLElementOf<T>;

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
  if ((this as any)._eventListeners instanceof Map) {
    const listeners = (this as any)._eventListeners as Map<string, EventListenerOrEventListenerObject[]>;
    listeners.forEach((fns, type) => {
      fns.forEach(fn => newElement.addEventListener(type, fn));
    });
    (newElement as any)._eventListeners = new Map(listeners);
  }

  // Optional: Copy properties (if you have custom prototype extensions)
  for (const key in this) {
    // Skip built-in DOM properties and functions
    if (
      !(key in newElement) &&
      typeof (this as any)[key] !== "function"
    ) {
      try {
        (newElement as any)[key] = (this as any)[key];
      } catch {
        // Some props might be readonly — safely ignore
      }
    }
  }

  this.replaceWith(newElement);
  return newElement;
};

const html = function (this: HTMLElement, input?: string): string {
  return input !== undefined ? (this.innerHTML = input) : this.innerHTML;
};

const text = function (this: Element, text?: string, ...input: string[]): string {
  // If text is provided, update the textContent
  if (text !== undefined) {
    input.unshift(text); // Add the text parameter to the beginning of the input array
    const joined = input.join(" "); // Join all the strings with a space

    // Replace "textContent" if it's found in the joined string (optional logic)
    this.textContent = joined.includes("textContent")
      ? joined.replace("textContent", this.textContent ?? "")
      : joined;
  }

  // Return the current textContent if no arguments are passed
  return this.textContent ?? "";
};

const $ = function (selector: string) {
  return document.querySelector(selector);
};

const $$ = function (selector: string) {
  return document.querySelectorAll(selector);
};

const origionalRandom = Math.random;
const random = (max?: number) => {
  if (max) {
    return origionalRandom() * max;
  } else return origionalRandom();
};

const show = function (this: HTMLElement) {
  this.css("visibility", "visible");
};

const hide = function (this: HTMLElement) {
  this.css("visibility", "hidden");
};

const toggle = function (this: HTMLElement) {
  if (this.css("visibility") === "visible" || this.css("visibility") === "") {
    this.hide();
  } else {
    this.show();
  }
};

const find = function (this: Node, selector: string): Node | null {
  return this.querySelector(selector); // Returns a single Element or null
};

const findAll = function (this: Node, selector: string): NodeListOf<Element> {
  return this.querySelectorAll(selector); // Returns a single Element or null
};

const getChildren = function (this: Node): NodeListOf<ChildNode> {
  return this.childNodes;
};

const getSiblings = function (this: Node, inclusive?: boolean): Node[] {
  const siblings = Array.from(this.parentNode!.childNodes as NodeListOf<Node>);
  if (inclusive) {
    return siblings; // Include current node as part of siblings
  } else {
    return siblings.filter(node => !node.isSameNode(this));
  }
};

const serialize = function (this: HTMLFormElement): string {
  const formData = new FormData(this); // Create a FormData object from the form

  // Create an array to hold key-value pairs
  const entries: [string, string][] = [];

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

const clone = function <T>(object: T, deep?: boolean): T {
  const shallowClone = (): T =>
    Object.assign(Object.create(Object.getPrototypeOf(object)), object);

  const deepClone = (obj: any, seen = new WeakMap()): any => {
    if (obj === null || typeof obj !== "object") return obj;

    if (seen.has(obj)) return seen.get(obj);

    // Preserve prototype
    const cloned = Array.isArray(obj)
      ? []
      : Object.create(Object.getPrototypeOf(obj));

    seen.set(obj, cloned);

    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Map) {
      obj.forEach((v, k) =>
        cloned.set(deepClone(k, seen), deepClone(v, seen))
      );
      return cloned;
    }
    if (obj instanceof Set) {
      obj.forEach(v => cloned.add(deepClone(v, seen)));
      return cloned;
    }
    if (ArrayBuffer.isView(obj)) return new (obj.constructor as any)(obj);
    if (obj instanceof ArrayBuffer) return obj.slice(0);

    for (const key of Reflect.ownKeys(obj)) {
      cloned[key] = deepClone(obj[key], seen);
    }

    return cloned;
  };

  return deep ? deepClone(object) : shallowClone();
};

const repeat = function (this: number, iterator: (i: number) => any): void {
  for (let i = 0; i < this; i++) {
    iterator(i);
  }
};

const unique = function <T>(this: T[]): T[] {
  return [...new Set(this)];
};

const chunk = function <T>(this: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) throw new TypeError("`chunkSize` cannot be a number below 1");

  const newArr: T[][] = [];
  let tempArr: T[] = [];

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

const remove = function (this: string, finder: string | RegExp): string {
  return this.replace(finder, "");
};

const removeAll = function (this: string, finder: string | RegExp): string {
  if (finder instanceof RegExp) {
    if (!finder.flags.includes("g")) {
      finder = new RegExp(finder.source, finder.flags + "g");
    }
  }
  return this.replaceAll(finder, "");
};

const elementCreator = function (this: HTMLElement) {
  return new HTMLElementCreator(this);
};

const elementCreatorDocument = function (superEl: keyof HTMLElementTagNameMap, attrs: HTMLAttrs) {
  return new HTMLElementCreator(superEl, attrs);
};

const type = function (val: any): string {
  if (val === null) return "null";
  if (val === undefined) return "undefined";

  const typeOf = typeof val;
  if (typeOf === "function") {
    return `Function:${val.name || "<anonymous>"}(${val.length})`;
  }

  let typeName = capitalize.call(Object.prototype.toString.call(val).slice(8, -1));

  const ctor = val.constructor?.name;
  if (ctor && ctor !== typeName) {
    typeName = ctor;
  }

  const len = (val as any).length;
  if (typeof len === "number" && Number.isFinite(len)) {
    typeName += `(${len})`;
  } else if (val instanceof Map || val instanceof Set) {
    typeName += `(${val.size})`;
  } else if (val instanceof Date && !isNaN(val.getTime())) {
    typeName += `:${val.toISOString().split("T")[0]}`;
  } else if (typeName === "Object") {
    typeName += `(${Object.keys(val).length})`;
  }

  return typeName;
};

function isEmpty(val: string): val is "";
function isEmpty(val: number): val is 0 | typeof NaN;
function isEmpty(val: boolean): val is false;
function isEmpty(val: null | undefined): true;
function isEmpty(val: Array<any>): val is [];
function isEmpty(val: Record<any, unknown>): val is Record<any, never>;
function isEmpty(val: Map<any, any>): val is Map<any, never>;
function isEmpty(val: Set<any>): val is Set<never>;
function isEmpty(val: WeakMap<object, any>): val is WeakMap<object, any>;
function isEmpty(val: WeakSet<object>): val is WeakSet<object>;
function isEmpty(val: any): boolean {
  // Generic type checking
  // eslint-disable-next-line eqeqeq
  if (val == null || val === false || val === "") return true;

  // Number checking
  if (typeof val === "number") return val === 0 || Number.isNaN(val);

  // Array checking
  if (Array.isArray(val) && val.length === 0) return true;

  // Map, Set, and weak variant checks
  if (val instanceof Map || val instanceof Set || val instanceof WeakMap || val instanceof WeakSet) {
    return (val as any).size === 0; // size check works for these types
  }

  // Object checking
  if (typeof val === 'object') {
    const proto = Object.getPrototypeOf(val);
    const isPlain = proto === Object.prototype || proto === null;
    return isPlain && Object.keys(val).length === 0;
  }

  return false;
}

function createEventListener<T extends AnyFunc[]>(
  triggers: T,
  callback: (...results: CallbackResult<T>) => void
): void {
  const originals = triggers.map(fn => fn);

  triggers.forEach((originalFn, i) => {
    const wrapper = function (this: any, ...args: any[]) {
      const result = originals[i].apply(this, args);
      callback(...triggers.map((_, j) =>
        j === i ? result : undefined
      ) as any);
      return result;
    };

    // Replace global function by matching the actual function object
    if (typeof window !== "undefined") {
      for (const key in window) {
        if ((window as any)[key] === originalFn) {
          (window as any)[key] = wrapper;
          return; // stop after replacement
        }
      }
    }

    console.warn("Cannot replace function:", originalFn);
  });
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const forEach = function <T>(object: T, iterator: (key: keyof T, value: T[keyof T]) => any): void {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      iterator(key, object[key]);
    }
  }
};

function createElementTree(node: ElementNode): HTMLElementOf<typeof node.tag> {
  const el = document.createElement(node.tag);

  // Add class if provided
  if (node.class) el.className = node.class;

  // Add text content if provided
  if (node.text) el.textContent = node.text;

  // Add inner HTML if provided
  if (node.html) el.innerHTML = node.html;

  // Handle styles, ensure it’s an object
  if (node.style && typeof node.style === 'object') {
    for (const [prop, val] of Object.entries(node.style)) {
      el.style.setProperty(prop, val);
    }
  }

  // Handle other attributes (excluding known keys)
  for (const [key, val] of Object.entries(node)) {
    if (
      key !== 'tag' &&
      key !== 'class' &&
      key !== 'text' &&
      key !== 'html' &&
      key !== 'style' &&
      key !== 'children'
    ) {
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
    } else {
      el.appendChild(createElementTree(node.children)); // Support for a single child node
    }
  }

  return el;
}

const capitalize = function(this: string): string {
  const i = this.search(/\S/);
  return i === -1 ? this : this.slice(0, i) + this.charAt(i).toUpperCase() + this.slice(i + 1);
};

const parseFile = async function <R = any, T = R>(
  file: string,
  receiver?: (content: T) => R
): Promise<R> {
  const fileContent = await fetch(file).then(res => res.json() as Promise<T>);

  if (!receiver) {
    return fileContent as unknown as R;
  }

  return receiver(fileContent);
};


//? Classes
class OptiDOM {
  private readonly deprecatedMigration = {
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
  private readonly objectMap = {
    Node: Node.prototype,
    Document: Document.prototype,
    Window: Window.prototype,
    HTMLElement: HTMLElement.prototype
  };

  // Automatically deprecate a function and recommend a replacement
  deprecate(funcName: keyof typeof this.deprecatedMigration, force: boolean = false): void {
    const migration = this.deprecatedMigration[funcName];

    if (migration) {
      // Loop over all objects in the registry and deprecate the function if it's found
      for (const [objName, baseObj] of Object.entries(this.objectMap)) {
        if (typeof baseObj[funcName as keyof typeof baseObj] === 'function') {
          const original: Function = baseObj[funcName as keyof typeof baseObj];

          // Replace function with a deprecation warning and call the original
          baseObj[funcName as keyof typeof baseObj] = function (...args: any[]) {
            console.warn(`[OptiDOM] ${funcName} is deprecated. Use ${migration} instead.`);
            if (!force) {
              return original.apply(this, args);
            } else throw new NotImplementedError(`[OptiDOM] ${funcName} is deprecated. Use ${migration} instead.`);
          };

          console.info(`[OptiDOM] Deprecated function: ${funcName} on ${objName}. Use ${migration} instead.`);
          break; // Stop once deprecated
        }
      }
    }
  }

  // Automatically apply multiple patches at once
  deprecateAll(force: boolean = false): void {
    for (const funcName in this.deprecatedMigration) {
      this.deprecate(funcName as keyof typeof this.deprecatedMigration, force); // Apply deprecation
    }
  }
}

class Cookie<T = string> {
  private name: string;
  private value: T | null;
  private expiry: number;
  private path: string;

  public constructor(name: string, valueIfNotExist: T | null = null, days: number = 7, path: string = '/') {
    this.name = name;
    this.expiry = days;
    this.path = path;

    const existingValue = Cookie.get<T>(name);
    if (existingValue === null && valueIfNotExist !== null) {
      Cookie.set(name, valueIfNotExist, days, path);
      this.value = valueIfNotExist;
    } else {
      this.value = existingValue;
    }
  }

  public static set<T = string>(name: string, value: T, days: number = 7, path: string = '/'): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=${path}`;
  }

  public static get<T = string>(name: string): T | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (!match) return null;

    try {
      return JSON.parse(decodeURIComponent(match[2])) as T;
    } catch {
      return null;
    }
  }

  public static delete(name: string, path: string = '/'): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
  }

  /** Instance methods */
  public update(value: T, days: number = this.expiry, path: string = this.path): void {
    this.value = value;
    Cookie.set<T>(this.name, value, days, path);
  }

  public delete(): void {
    this.value = null;
    Cookie.delete(this.name, this.path);
  }

  public getValue(): T | null { return this.value; }
  public getName(): string { return this.name; }
  public getExpiry(): number { return this.expiry; }
  public getPath(): string { return this.path; }
}

class LocalStorage<T> {
  private name: string;
  private value: T | null;

  public constructor(name: string, valueIfNotExist: T | null = null) {
    this.name = name;

    const existingValue = LocalStorage.get<T>(name);
    if (existingValue === null && valueIfNotExist !== null) {
      LocalStorage.set(name, valueIfNotExist);
      this.value = valueIfNotExist;
    } else {
      this.value = existingValue;
    }
  }

  static set<T = string>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T = string>(key: string): T | null {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) as T : null;
    } catch {
      return null;
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  /** Instance methods to interact with this specific cookie */
  public update(value: T) {
    this.value = value;
    LocalStorage.set(this.name, value);
  }

  public delete() {
    this.value = null;
    LocalStorage.remove(this.name);
  }

  public getValue(): T | null { return this.value; }
  public getName(): string { return this.name; }
}

class SessionStorage<T> {
  private name: string;
  private value: T | null;

  public constructor(name: string, valueIfNotExist: T | null = null) {
    this.name = name;

    const existingValue = SessionStorage.get<T>(name);
    if (existingValue === null && valueIfNotExist !== null) {
      SessionStorage.set(name, valueIfNotExist);
      this.value = valueIfNotExist;
    } else {
      this.value = existingValue;
    }
  }

  static set<T = string>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static get<T = string>(key: string): T | null {
    const value = sessionStorage.getItem(key);
    try {
      return value ? JSON.parse(value) as T : null;
    } catch {
      return null;
    }
  }

  static remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  static clear(): void {
    sessionStorage.clear();
  }

  /** Instance methods to interact with this specific cookie */
  public update(value: T) {
    this.value = value;
    SessionStorage.set(this.name, value);
  }

  public delete() {
    this.value = null;
    SessionStorage.remove(this.name);
  }

  public getValue(): T | null { return this.value; }
  public getName(): string { return this.name; }
}

class HTMLElementCreator {
  private superEl: DocumentFragment;
  private currContainer: HTMLElement;
  private parentStack: HTMLElement[] = [];

  constructor(tag: HTMLElement | keyof HTMLElementTagNameMap, attrsOrPosition: HTMLAttrs = {}) {
    this.superEl = document.createDocumentFragment();

    if (tag instanceof HTMLElement) {
      this.currContainer = tag;
      this.superEl.append(tag);
    } else {
      const el = document.createElement(tag);
      this.makeElement(el as HTMLElement, attrsOrPosition);
      this.currContainer = el as HTMLElement;
      this.superEl.append(el);
    }
  }

  private makeElement(el: HTMLElement, attrs: HTMLAttrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "text") {
        el.textContent = value as string;
      } else if (key === "html") {
        el.innerHTML = value as string;
      } else if (key === "class") {
        if (typeof value === "string") {
          el.classList.add(value);
        } else if (Array.isArray(value)) {
          el.classList.add(...value.filter(c => typeof c === 'string' && c.trim()));
        }
      } else if (key === "style") {
        let styles = "";
        Object.entries(value as object).forEach(([styleKey, styleValue]) => {
          styles += `${toKebabCase(styleKey)}: ${styleValue}; `;
        });
        el.setAttribute("style", styles.trim());
      } else if (typeof value === "boolean") {
        if (value) el.setAttribute(key, "");
        else el.removeAttribute(key);
      } else if (value !== undefined && value !== null) {
        el.setAttribute(key, value as string);
      }
    });
  }

  public el(tag: keyof HTMLElementTagNameMap, attrs: HTMLAttrs = {}): HTMLElementCreator {
    const child = document.createElement(tag);
    this.makeElement(child as HTMLElement, attrs);
    this.currContainer.appendChild(child);
    return this;
  }

  public container(tag: keyof HTMLElementTagNameMap, attrs: HTMLAttrs = {}): HTMLElementCreator {
    const wrapper = document.createElement(tag);
    this.makeElement(wrapper as HTMLElement, attrs);
    this.parentStack.push(this.currContainer);
    this.currContainer.appendChild(wrapper);
    this.currContainer = wrapper as HTMLElement;
    return this;
  }

  public up(): HTMLElementCreator {
    const prev = this.parentStack.pop();
    if (prev) {
      this.currContainer = prev;
    }
    return this;
  }

  public append(to: HTMLElement | string) {
    const target = typeof to === "string" ? document.querySelector(to) : to;
    if (target instanceof HTMLElement) {
      target.append(this.superEl);
    }
  }

  public prepend(to: HTMLElement | string) {
    const target = typeof to === "string" ? document.querySelector(to) : to;
    if (target instanceof HTMLElement) {
      target.prepend(this.superEl);
    }
  }

  public get element(): HTMLElement {
    return this.currContainer;
  }
}

class Time {
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
    return new Time(hours, minutes, seconds, milliseconds).getTime();
  }

  public sync() {
    return new Time();
  }

  // Static: Return current time as a Time object
  public static now(): number {
    return new Time().getTime();
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
    return new Time(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  }

  // Arithmetic operations
  public addMilliseconds(ms: number): Time {
    const totalMilliseconds = this.getTime() + ms;
    return Time.fromMilliseconds(totalMilliseconds);
  }

  public subtractMilliseconds(ms: number): Time {
    const totalMilliseconds = this.getTime() - ms;
    return Time.fromMilliseconds(totalMilliseconds);
  }

  public addSeconds(seconds: number): Time {
    return this.addMilliseconds(seconds * 1000);
  }

  public addMinutes(minutes: number): Time {
    return this.addMilliseconds(minutes * 60000);
  }

  public addHours(hours: number): Time {
    return this.addMilliseconds(hours * 3600000);
  }

  // Static: Create a Time object from total milliseconds
  public static fromMilliseconds(ms: number): Time {
    const hours = Math.floor(ms / 3600000) % 24;
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    const milliseconds = ms % 1000;
    return new Time(hours, minutes, seconds, milliseconds);
  }

  // Parsing
  public static fromString(timeString: string): Time {
    const match = timeString.match(/^(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?$/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const seconds = parseInt(match[3] ?? "0", 10);
      const milliseconds = parseInt(match[4] ?? "0", 10);
      return new Time(hours, minutes, seconds, milliseconds);
    }
    throw new Error("Invalid time string format.");
  }

  public static fromISOString(isoString: string): Time {
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
  public compare(other: Time): number {
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

  public isBefore(other: Time): boolean {
    return this.compare(other) === -1;
  }

  public isAfter(other: Time): boolean {
    return this.compare(other) === 1;
  }

  public equals(other: Time): boolean {
    return this.compare(other) === 0;
  }

  public static equals(first: Time, other: Time): boolean {
    return first.compare(other) === 0;
  }
}

class Sequence {
  private tasks: ((...args: any[]) => any)[];
  private finalResult: any;
  private errorHandler: (error: any) => void = (error) => { throw new Error(error); };

  private constructor(tasks: ((...args: any[]) => any)[] = []) {
    this.tasks = tasks;
  }

  // Executes the sequence, passing up to 3 initial arguments to the first task
  async execute(...args: any[]): Promise<any> {
    try {
      const result = await this.tasks.reduce(
        (prev, task) => prev.then((result) => task(result)),
        Promise.resolve(args)
      );
      return this.finalResult = result;
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  result(): any;
  result(callback: (result: unknown) => any): any;
  result(callback?: (result: unknown) => any): typeof this.finalResult {
    if (callback) {
      return callback(this.finalResult);
    }
    return this.finalResult;
  }

  error(callback: (error: any) => any): this {
    this.errorHandler = callback;
    return this;
  }

  // Static methods to create new sequences

  // Executes all tasks with the same arguments
  static of(...functions: (((...args: any[]) => any) | Sequence)[]): Sequence {
    const tasks: ((...args: any[]) => any)[] = [];

    for (const fn of functions) {
      if (fn instanceof Sequence) {
        // Add the sequence's tasks
        tasks.push(...fn.tasks);
      } else if (typeof fn === "function") {
        // Add standalone functions
        tasks.push(fn);
      } else {
        throw new Error("Invalid argument: Must be a function or Sequence");
      }
    }

    return new Sequence(tasks);
  }

  // Executes tasks sequentially, passing the result of one to the next
  static chain(...functions: ((input: any) => any)[]): Sequence {
    return new Sequence(functions);
  }

  static parallel(...functions: (() => any)[]): Sequence {
    return new Sequence([() => Promise.all(functions.map((fn) => fn()))]);
  }

  static race(...functions: (() => any)[]): Sequence {
    return new Sequence([() => Promise.race(functions.map((fn) => fn()))]);
  }

  static retry(retries: number, task: () => Promise<any>, delay = 0): Sequence {
    return new Sequence([
      () =>
        new Promise((resolve, reject) => {
          const attempt = (attemptNumber: number) => {
            task()
              .then(resolve)
              .catch((error) => {
                if (attemptNumber < retries) {
                  setTimeout(() => attempt(attemptNumber + 1), delay);
                } else {
                  reject(error);
                }
              });
          };
          attempt(0);
        }),
    ]);
  }

  // Instance methods for chaining
  add(...functions: ((...args: any[]) => any)[]): this {
    this.tasks.push(...functions);
    return this;
  }
}

class ID {
  private static usedIds: Set<string> = new Set();
  public id: string;

  // Helper function to generate a random string of characters
  private static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Constructor that generates a unique ID when the instance is created
  constructor(prefix: string = '', length: number = 30) {
    let newId: string;
    do {
      const randomStr = ID.generateRandomString(length);
      newId = `${prefix}${randomStr}`;
    } while (ID.usedIds.has(newId));

    ID.usedIds.add(newId);
    this.id = newId;
  }

  // Helper function to get the instance's unique ID
  public getId(): string {
    return this.id;
  }

  // Helper function to validate if an ID exists
  public static isValidId(id: string): boolean {
    return ID.usedIds.has(id);
  }

  // Helper function to remove an ID from the set of used IDs
  public static removeId(id: string): void {
    ID.usedIds.delete(id);
  }
}


// -------------------------------------------------------------------------------------------------

//! Prototypes
globalThis.f = (iife: () => void) => iife();
globalThis.createEventListener = createEventListener;
(globalThis as any).LocalStorage = LocalStorage;
(globalThis as any).SessionStorage = SessionStorage;
(globalThis as any).Cookie = Cookie;
(globalThis as any).Time = Time;
/*! Unchecked */ (globalThis as any).Sequence = Sequence;
/*! Unchecked */ globalThis.optidom = new OptiDOM();
globalThis.isEmpty = isEmpty;
globalThis.type = type;
globalThis.UnknownError = class extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnknownError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
globalThis.NotImplementedError = class extends Error {
  constructor(message?: string) {
    super(message ?? "Function not implimented yet.");
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

defineGetter(HTMLElement.prototype, "visible", function (this: HTMLElement) {
  return this.css("visibility") !== "hidden"
    ? this.css("display") !== "none"
    : Number(this.css("opacity")) > 0;
});