type ErrorType = (new (message: string) => Error & { name: string });
type ModifierKey = 'ctrl' | 'alt' | 'shift' | 'meta' | 'control' | 'windows' | 'command' | 'search';
type WritableKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? never  // Exclude methods
  : T[K] extends Readonly<any> ? never        // Exclude readonly properties
  : K;
}[keyof T];
type WritableCSSProperties = Pick<CSSStyleDeclaration, WritableKeys<CSSStyleDeclaration>>;
type RegularKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12' | 'escape' | 'enter' | 'tab' | 'backspace' | 'delete' | 'insert' | 'home' | 'end' | 'pageup' | 'pagedown' | 'arrowup' | 'arrowdown' | 'arrowleft' | 'arrowright' | 'space' | 'plus' | 'minus' | 'equal' | 'bracketleft' | 'bracketright' | 'backslash' | 'semicolon' | 'quote' | 'comma' | 'period' | 'slash';
type Shortcut = `${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${ModifierKey}+${RegularKey}`

type FetchOptions = Omit<RequestInit, 'body'> & {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: Record<string, any> | FormData | string | Blob;
  json?: boolean;
};

interface HTMLElementCascade {
  element: keyof HTMLElementTagNameMap;
  id?: string;
  className?: string | string[];
  children?: HTMLElementCascade[] | HTMLElementCascade;
  [key: string]: any
}

interface Document {
  /** Create a event listener for shortcuts */
  bindShortcut(shortcut: Shortcut, callback: (event: KeyboardEvent) => void): void;
  getElementById<T extends HTMLElement>(this: Document, id: string): T | null;
  getElementsByClassName<T extends Element>(this: Document, classNames: string): HTMLCollectionOf<T>;
  getElementsByName<T extends HTMLElement>(this: Document, name: string): NodeListOf<T> | null;

  /** Adds inline css to the element */
  css(
    element: keyof HTMLElementTagNameMap,
    object?: Partial<Record<WritableCSSProperties, string>>
  ): void;

  /** Adds inline css to the element */
  css(
    element: string,
    object?: Partial<Record<WritableCSSProperties, string>>
  ): void;

  /**
   * Get an element based on a css selector provided 
   * @param selector The css selector used to find the element(s)
   */
  $(selector: string): Element | HTMLElement | null;

  /**
   * Starts up the element creator
   * @param superEl The parent element
   */
  elementCreator(superEl: keyof HTMLElementTagNameMap, attrs: HTMLAttrs): HTMLElementCreator;

  Cookie: typeof main.Cookie;
  LocalStorage: typeof main.LocalStorage;
}

interface HTMLElement {
  // Rebinds to add type parameters
  getElementsByClassName<T extends HTMLElement>(this: HTMLElement, classNames: string): NodeListOf<T>;
  getElementsByTagName<T extends HTMLElement>(this: HTMLElement, tagName: string): HTMLCollectionOf<T>;
  getElementsByTagNameNS<T extends HTMLElement>(this: HTMLElement, namespaceURI: string, localName: string): HTMLCollectionOf<T>;

  //? New
  /** Adds inline css to the element */
  css(key: Partial<Record<keyof WritableCSSProperties, string>>): void;

  /** Adds inline css to the element */
  css(key: keyof WritableCSSProperties, value: string): void;

  /** 
   * Gets the element's parent 
   * @returns The parent HTMLElement
   */
  getParent(): HTMLElement;

  /** 
   * Gets the element's ancestor (ancestor selected is based on the amount of levels to navigate throught, as specified by level) 
   * @param level The amount of levels to navigate upwards throught to get to the ancestor
   * @returns The ancestor HTMLElement
   */
  getAncestor<T extends HTMLElement = HTMLElement>(level: number): T | null;

  /** 
   * Gets the element's ancestor (ancestor selected is based on the css selector) 
   * @param selector The selector used to get the ancestor
   * @returns The parent HTMLElement
   */
  getAncestorQuery<T extends Element>(this: HTMLElement, selector: string): T | null;

  /**
   * Creates children of the element
   * @param elements The elements to use, specified by the cascade. The cascade is a {@link HTMLElementCascade}
   */
  createChildren(elements: HTMLElementCascade): void;

  /**
   * Changing an elements tag name
   * @warning BE CAREFUL WITH THIS FUNCTION, AS IT MODIFIES TAG NAMES, WHICH ARE A MAJOR PART OF HTML.
   * @param type 
   */
  change<T extends keyof HTMLElementTagNameMap>(type: T): HTMLElementTagNameMap[T];

  /**
   * Modifys and/or returns the text of the element
   * @notice use HTMLElement.{@link text} instead if you are not insterting raw html
   * @param input The new text, if any
   */
  html(input?: string): string;

  /**
   * Modifys and/or returns the text of the element
   * @param input The new text, if any
   */
  text(input?: string): string;
}

interface NodeList {
  /** 
   * Creates a common event listener for every single element in the NodeList 
   * @param type The type of listener to use
   * @param listener The callback of the listener
   * @param options Optional options to give the listener
   */
  addEventListener<K extends keyof HTMLElementEventMap>(this: NodeList, type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
}

interface EventTarget {
  /** 
   * Creates an event listener that, once triggererd, removes itself as a listener
   * @param type The type of listener to use
   * @param listener The callback of the listener
   * @param options Optional options to give the listener (if number, the thats the amount of times th event has to be trigeered before being removed)
   */
  addOnceListener<K extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: GlobalEventHandlersEventMap[T]) => void,
    options: boolean | AddEventListenerOptions | number
  ): void;

  /** 
   * Creates multiple event listeners for a element
   * @param listeners The listeners to apply
   * @param options The common options for the event listeners
   */
  addEventListeners<K extends keyof HTMLElementEventMap>(
    this: EventTarget,
    listeners: { key: K, value: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any }[],
    options?: boolean | AddEventListenerOptions
  ): void
}

interface JSON {
  parse<T = any>(text: string, reviver?: (this: T, key: string, value: any) => any): T | null
}

interface DateConstructor {
  /** Returns an absolute number of time from January 1, 1970 */
  at(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
}


/* New Classes */
type HTMLAttrs = {
  text?: string,
  html?: string,
  id?: string;
  class?: string | string[];
  style?: { [key: string]: string };
  [key: string]: any 
};

interface HTMLElementCreator {
  el(tag: keyof HTMLElementTagNameMap, attrs?: HTMLAttrs): HTMLElementCreator;
  container(tag: keyof HTMLElementTagNameMap, attrs?: HTMLAttrs): HTMLElementCreator;
  up(): HTMLElementCreator;
  append(element: HTMLElement): void;
  get element(): HTMLElement;
}

declare class TimeInternal {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;

  constructor();
  constructor(hours: Date);
  constructor(hours: number, minutes: number, seconds?: number, milliseconds?: number);
  constructor(hours?: number | Date, minutes?: number, seconds?: number, milliseconds?: number);

  // Getters
  getHours(): number;
  getMinutes(): number;
  getSeconds(): number;
  getMilliseconds(): number;

  // Setters
  setHours(hours: number): void;
  setMinutes(minutes: number): void;
  setSeconds(seconds: number): void;
  setMilliseconds(milliseconds: number): void;

  /** Returns the time in milliseconds since the start of the day */
  getTime(): number;

  sync(): TimeInternal;

  // Conversion methods
  ommitedString(): string;
  ommitedString(omit: "hours" | "minutes" | "seconds"): string;
  ommitedString(omit: ("hours" | "minutes" | "seconds")[]): string;
  ommitedString(omit?: ("hours" | "minutes" | "seconds") | ("hours" | "minutes" | "seconds")[]): string;

  toString(): string;

  toISOString(): string;

  toJSON(): string;

  toDate(years: number, months: number, days: number): Date;

  // Arithmetic operations
  addMilliseconds(ms: number): TimeInternal;

  subtractMilliseconds(ms: number): TimeInternal;

  addSeconds(seconds: number): TimeInternal;

  addMinutes(minutes: number): TimeInternal;

  addHours(hours: number): TimeInternal;

  // Comparison
  compare(other: TimeInternal): number;

  isBefore(other: TimeInternal): boolean;

  isAfter(other: TimeInternal): boolean;

  equals(other: TimeInternal): boolean;
}