declare class OptiDOM {
  deprecate(funcName: keyof typeof this.deprecatedMigration, force: boolean = false): void;
  deprecateAll(force: boolean = false): void;
}

declare class Cookie {
  constructor(name: string, valueIfNotExist: string | null = null, days: number = 7, path: string = '/')

  static set<T = string>(name: string, value: T, days: number = 7, path: string = '/'): void;
  static get<T = string>(name: string): T | null;
  static delete(name: string, path: string = '/'): void;

  update(value: string, days: number = this.expiry, path: string = this.path): void;
  delete(): void;

  getValue(): string | null;
  getName(): string;
  getExpiry(): number;
  getPath(): string;
}

declare class LocalStorage<T> {
  constructor(name: string, valueIfNotExist: T | null = null)

  static set<T = string>(key: string, value: T): void;
  static get<T = string>(key: string): T | null;
  static remove(key: string): void;
  static clear(): void;

  update(value: T): void
  delete(): void;
  getValue(): T | null;
  getName(): string;
}

declare class SessionStorage<T> {
  constructor(name: string, valueIfNotExist: T | null = null);

  static set<T = string>(key: string, value: T): void;
  static get<T = string>(key: string): T | null;
  static remove(key: string): void;
  static clear(): void;

  update(value: T): void;
  delete(): void;
  getValue(): T | null;
  getName(): string;
}

declare class Time {
  constructor();
  constructor(hours: Date);
  constructor(hours: number, minutes: number, seconds?: number, milliseconds?: number);
  constructor(hours?: number | Date, minutes?: number, seconds?: number, milliseconds?: number);

  static of(date: Date): Date;

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

  getTime(): number;

  static at(hours: number, minutes: number, seconds?: number, milliseconds?: number): number;

  sync(): Time;

  static now(): number;

  toString(): string;
  toISOString(): string;
  toJSON(): string;
  toDate(years: number, months: number, days: number): Date;

  static fromDate(date: Date): Time;

  addMilliseconds(ms: number): Time;
  subtractMilliseconds(ms: number): Time;
  addSeconds(seconds: number): Time;
  addMinutes(minutes: number): Time;
  addHours(hours: number): Time;

  static fromMilliseconds(ms: number): Time;

  // Parsing
  static fromString(timeString: string): Time;
  static fromISOString(isoString: string): Time;

  // Comparison
  compare(other: Time): number;
  isBefore(other: Time): boolean;
  isAfter(other: Time): boolean;
  equals(other: Time): boolean;
  static equals(first: Time, other: Time): boolean;
}

declare class Sequence {
  private constructor();

  async execute(...args: any[]): Promise<any>;

  result(): any;
  result(callback: (result: unknown) => any): any;
  result(callback?: (result: unknown) => any): typeof this.finalResult;
  error(callback: (error: any) => any): this;

  static of(...functions: (((...args: any[]) => any) | Sequence)[]): Sequence;
  static chain(...functions: ((input: any) => any)[]): Sequence;
  static parallel(...functions: (() => any)[]): Sequence;
  static race(...functions: (() => any)[]): Sequence;
  static retry(retries: number, task: () => Promise<any>, delay = 0): Sequence;

  add(...functions: ((...args: any[]) => any)[]): this;
}