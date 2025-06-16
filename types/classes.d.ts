interface CookieConstructor {
  new(name: string, valueIfNotExist?: string | null, days?: number, path?: string): Cookie;
  set<T = string>(name: string, value: T, days?: number, path?: string): void;
  get<T = string>(name: string): T | null;
  delete(name: string, path?: string): void;
}

interface  Cookie {
  update(value: string, days?: number, path?: string): void;
  delete(): void;
  getValue(): string | null;
  getName(): string;
  getExpiry(): number;
  getPath(): string;
}

interface OptiDOMStorageConstructor {
  new<T>(name: string, valueIfNotExist?: T | null): OptiDOMStorage<T>

  set<T = string>(key: string, value: T): void;
  get<T = string>(key: string): T | null;
  remove(key: string): void;
  clear(): void;
}

interface OptiDOMStorage<T> {
  update(value: T): void
  delete(): void;
  getValue(): T | null;
  getName(): string;
}

interface TimeConstructor {
  new();
  new(hours: Date);
  new(hours: number, minutes: number, seconds?: number, milliseconds?: number);
  new(hours?: number | Date, minutes?: number, seconds?: number, milliseconds?: number);

  of(date: Date): Date;
  at(hours: number, minutes: number, seconds?: number, milliseconds?: number): number;
  now(): number;

  fromDate(date: Date): Time;
  fromMilliseconds(ms: number): Time;
  fromString(timeString: string): Time;
  fromISOString(isoString: string): Time;

  equals(first: Time, other: Time): boolean;
}

interface Time {
  getHours(): number;
  getMinutes(): number;
  getSeconds(): number;
  getMilliseconds(): number;
  getTime(): number;

  setHours(hours: number): void;
  setMinutes(minutes: number): void;
  setSeconds(seconds: number): void;
  setMilliseconds(milliseconds: number): void;

  sync(): Time;

  toString(): string;
  toISOString(): string;
  toJSON(): string;
  toDate(years: number, months: number, days: number): Date;

  addMilliseconds(ms: number): Time;
  subtractMilliseconds(ms: number): Time;
  addSeconds(seconds: number): Time;
  addMinutes(minutes: number): Time;
  addHours(hours: number): Time;

  // Comparison
  compare(other: Time): number;
  isBefore(other: Time): boolean;
  isAfter(other: Time): boolean;
  equals(other: Time): boolean;
}

interface SequenceConstructor {
  of(...functions: (((...args: any[]) => any) | Sequence)[]): Sequence;
  chain(...functions: ((input: any) => any)[]): Sequence;
  parallel(...functions: (() => any)[]): Sequence;
  race(...functions: (() => any)[]): Sequence;
  retry(retries: number, task: () => Promise<any>, delay?: number): Sequence;
}

interface Sequence {
  execute(...args: any[]): Promise<any>;

  result(): any;
  result(callback: (result: unknown) => any): any;
  result(callback?: (result: unknown) => any): typeof this.finalResult;
  error(callback: (error: any) => any): this;

  add(...functions: ((...args: any[]) => any)[]): this;
}

declare class ShortcutEvent extends KeyboardEvent {
  keys: [KeyboardEventKey, KeyboardEventKey, KeyboardEventKey?, KeyboardEventKey?];
  constructor(
    keys: [KeyboardEventKey, KeyboardEventKey?, KeyboardEventKey?, KeyboardEventKey?, KeyboardEventKey?],
    eventInit?: ShortcutEventInit
  )
}

interface TypedMap<R extends Record<string | number, any> = {}> {
  readonly size: number;

  set<K extends string, F>(
    key: K,
    value: F
  ): asserts this is TypedMap<R & { [P in K]: F }>;

  get<K extends keyof R>(key: K): R[K];

  notNull<K extends keyof R>(key: K): boolean;

  delete<K extends keyof R>(key: K): asserts this is TypedMap<Omit<R, K>>;

  keys(): (keyof R)[];

  entries(): [keyof R, R[keyof R]][];

  clear(): void;

  [Symbol.iterator](): IterableIterator<[keyof R, R[keyof R]]>;

  readonly [Symbol.toStringTag]: string;

  forEach(callback: <K extends keyof R>(value: R[K], key: K) => void): void;
}