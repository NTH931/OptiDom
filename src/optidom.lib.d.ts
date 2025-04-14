/* eslint-disable no-var */
interface Document {
  /** 
   * Create a event listener for shortcuts
   * @optidom
   * @example
   *   document.bindShortcut("ctrl+s", (e) => e.preventDefault());
   */
  bindShortcut(shortcut: Shortcut, callback: (event: KeyboardEvent) => void): void;

  /** 
   * Adds inline css to an element in the document
   * @optidom
   * @example
   * document.css("body", {
   *   visibility: "visible",
   *   backgroundColor: "blue"
   * })
   */
  css(
    element: keyof HTMLElementTagNameMap,
    object?: Partial<Record<WritableCSSProperties, string>>
  ): void;
  css(
    element: string,
    object?: Partial<Record<WritableCSSProperties, string>>
  ): void;

  /**
   * Get an element based on a css selector provided 
   * @param selector The css selector used to find the element
   * @optidom
   * @example
   * document.$("#target").text("Changed!");
   */
  $<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
  $<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
  $<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
  /** @deprecated */
  $<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
  $<E extends Element = Element>(selectors: string): E | null;

  /**
   * Get a list of elements based on a css selector provided 
   * @param selector The css selector used to find the elements
   * @optidom
   * @example
   * document.$$("#target").forEach((el) => {
   *   el.text("Changed!"));
   * });
   */
  $$<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
  $$<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
  $$<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
  /** @deprecated */
  $$<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
  $$<E extends Element = Element>(selectors: string): NodeListOf<E>;

  /**
   * Calls the callback when the document is loaded
   * @optidom
   * @param callback the callback to run
   * @example
   */
  ready(callback: (this: Document, ev: Event) => any): void;

  /**
   * Starts up the element creator
   * @param superEl The parent element
   * @optidom
   */
  elementCreator(superEl: keyof HTMLElementTagNameMap, attrs: HTMLAttrs): HTMLElementCreator;
}

interface Window {
  readonly width: number;
  readonly height: number;
}

interface HTMLElement {
  /** 
   * Adds inline css to the element 
   * @optidom
   * @example
   * const el = document.getElementById("target");
   * 
   * el.css("display", "block");
   * el.css({
   *   visibility: "visible",
   *   backgroundColor: "blue"
   * })
   */
  css(key: Partial<StringRecord<string>>): void;
  css(key: string, value: string): void;

  /**
   * Creates children of the element
   * @param elements The elements to use, specified by the cascade. The cascade is a {@link HTMLElementCascade}
   * @deprecated use {@link document.elementCreator} or new {@link HTMLElementCreator}
   * @optidom
   */
  createChildren(elements: HTMLElementCascade): void;

  /**
   * Starts up the element creator
   * @optidom
   */
  elementCreator(this: HTMLElement): HTMLElementCreator;

  /**
   * Changing an elements tag name
   * @warning BE CAREFUL WITH THIS FUNCTION, AS IT MODIFIES TAG NAMES, WHICH ARE A MAJOR PART OF HTML.
   * @param type the new element type
   * @optidom
   */
  change<T extends keyof HTMLElementTagNameMap>(type: T): HTMLElementTagNameMap[T];

  /**
   * Modifys and/or returns the text of the element
   * @notice use HTMLElement.{@link text} instead if you are not insterting raw html
   * @param input The new text, if any
   * @optidom
   */
  html(input?: string): string;

  /**
   * Modifys and/or returns the text of the element
   * @param input The new text, if any
   * @optidom
   */
  text(input?: string): string;
}

interface Node {
  /** 
   * Gets the element's parent 
   * @returns The parent Element
   * @optidom
   */
    getParent(this: Node): Node | null;

  /** 
   * Gets the element's ancestor (ancestor selected is based on the amount of levels to navigate throught, as specified by level) 
   * @param level The amount of levels to navigate upwards throught to get to the ancestor
   * @returns The ancestor HTMLElement
   * @optidom
   */
  getAncestor<T extends Element = Element>(level: number): T | null;
  
  /** 
   * Gets the element's ancestor (ancestor selected is based on the css selector) 
   * @param selector The selector used to get the ancestor
   * @returns The parent HTMLElement
   * @optidom
   */
  getAncestorQuery<T extends Element>(this: Element, selector: string): T | null;
}

interface NodeList {
  /** 
   * Creates a common event listener for every single element in the NodeList 
   * @param type The type of listener to use
   * @param listener The callback of the listener
   * @param options Optional options to give the listener
   * @optidom
   */
  addEventListener<T extends EventTarget, K extends keyof EventMapOf<T>>(type: K, listener: (this: Element, ev: EventMapOf<T>[K]) => any, options?: boolean | AddEventListenerOptions): void
}

interface HTMLCollection {
  /** 
   * Creates a common event listener for every single element in the NodeList 
   * @param type The type of listener to use
   * @param listener The callback of the listener
   * @param options Optional options to give the listener
   * @optidom
   */
  addEventListener<T extends EventTarget, K extends keyof EventMapOf<T>>(type: K, listener: (this: Element, ev: EventMapOf<T>[K]) => any, options?: boolean | AddEventListenerOptions): void
}

interface EventTarget {
  /** 
   * Creates an event listener that, once triggererd, removes itself as a listener
   * @param type The type of listener to use
   * @param listener The callback of the listener
   * @param options Optional options to give the listener (if number, the thats the amount of times th event has to be trigeered before being removed)
   * @optidom
   */
  addOnceListener<T extends EventTarget, K extends keyof EventMapOf<T>>(
    type: K,
    listener: (event: EventMapOf<T>[K]) => void,
    options: boolean | AddEventListenerOptions | number
  ): void;

  /** 
   * Creates multiple event listeners for a element
   * @param listeners The listeners to apply
   * @param options The common options for the event listeners
   * @optidom
   */
  addEventListeners<T extends EventTarget, K extends keyof EventMapOf<T>>(
    this: EventTarget,
    ...listeners: Record<K, (e: EventMapOf<T>[K]) => any>[] // Spread of event listener objects
  ): void
}

interface DateConstructor {
  /** 
   * Returns an absolute number of time from January 1, 1970 
   * @optidom
   */
  at(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
}

declare const CookieInternal: any;
declare const LocalStorageInternal: any;
declare const SessionStorageInternal: any;

/** 
 * Create a event listener for shortcuts
 * @param shortcut The shortcut that triggers the callback
 * @param callback The callback triggered when the shortcut is triggered
 * @optidom
 */
function bindShortcut(shortcut: Shortcut, callback: (event: KeyboardEvent) => void): void;

/** 
 * Creates an iife (Immediately invoked function expression) that triggers on run 
 * @param iife The function to run the code in for the iife
 * @optidom
 */
function f(iife: () => void): void;

var Cookie: typeof CookieInternal;
var LocalStorage: typeof LocalStorageInternal;
var SessionStorage: typeof SessionStorageInternal;
var UnknownError: ErrorType;
var Time: any;