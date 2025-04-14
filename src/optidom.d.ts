type ErrorType = (new (message: string) => Error & { name: string });
type ModifierKey = 'ctrl' | 'alt' | 'shift' | 'meta' | 'control' | 'windows' | 'command' | 'search';
type RegularKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12' | 'escape' | 'enter' | 'tab' | 'backspace' | 'delete' | 'insert' | 'home' | 'end' | 'pageup' | 'pagedown' | 'arrowup' | 'arrowdown' | 'arrowleft' | 'arrowright' | 'space' | 'plus' | 'minus' | 'equal' | 'bracketleft' | 'bracketright' | 'backslash' | 'semicolon' | 'quote' | 'comma' | 'period' | 'slash';
type Shortcut = `${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${ModifierKey}+${RegularKey}`
type StringRecord<T> = Record<string, T>;

type EventListenerMap = { [K in keyof HTMLElementEventMap]?: (this: EventTarget, ev: HTMLElementEventMap[K]) => any; }

type EventMapOf<T> = T extends {
  addEventListener<K extends keyof infer M>(
    type: K,
    listener: (this: T, ev: M[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}
  ? M
  : Record<string, Event>;

/**
 * @optidom
 * @deprecated
 */
interface HTMLElementCascade {
  element: keyof HTMLElementTagNameMap;
  id?: string;
  className?: string | string[];
  children?: HTMLElementCascade[] | HTMLElementCascade;
  [key: string]: any
}


/* New Classes */
/**
 * @optidom
 */
type HTMLAttrs = {
  text?: string,
  html?: string,
  id?: string;
  class?: string | string[];
  style?: { [key: string]: string };
  [key: string]: any 
};

/**
 * @optidom
 */
interface HTMLElementCreator {
  el(tag: keyof HTMLElementTagNameMap, attrs?: HTMLAttrs): HTMLElementCreator;
  container(tag: keyof HTMLElementTagNameMap, attrs?: HTMLAttrs): HTMLElementCreator;
  up(): HTMLElementCreator;
  append(element: HTMLElement): void;
  get element(): HTMLElement;
}

/**
 * @optidom
 */
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