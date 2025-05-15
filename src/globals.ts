namespace OptiDOM {

export function type (val: any): string {
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

export function isEmpty(val: string): val is "";
export function isEmpty(val: number): val is 0 | typeof NaN;
export function isEmpty(val: boolean): val is false;
export function isEmpty(val: null | undefined): true;
export function isEmpty(val: Array<any>): val is [];
export function isEmpty(val: Record<any, unknown>): val is Record<any, never>;
export function isEmpty(val: Map<any, any>): val is Map<any, never>;
export function isEmpty(val: Set<any>): val is Set<never>;
export function isEmpty(val: WeakMap<object, any>): val is WeakMap<object, any>;
export function isEmpty(val: WeakSet<object>): val is WeakSet<object>;
export function isEmpty(val: any): boolean {
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

export function createEventListener<T extends AnyFunc[]>(
  triggers: T,
  callback: (...results: CallbackResult<T>) => void
): void {
  const originals = triggers.map(fn => fn);

  triggers.forEach((originalFn, i) => {
    function wrapper (this: any, ...args: any[]) {
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

export const emitter: EventEmitter = new class {
  private listeners: { [event: string]: Function[] } = {};
  
  on<T extends string, P extends any[]>(event: T, callback: (...args: P) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  off<T extends string, P extends any[]>(event: T, callback: (...args: P) => void) {
    const listeners = this.listeners[event];
    if (listeners) {
      this.listeners[event] = listeners.filter(fn => fn !== callback);
    }
  }

  emit<T extends string, P extends any[]>(event: T, ...params: P) {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach((callback) => callback(...params));
    }
  }
};

export function generateID(): ID {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*_-";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Type assertion to add the brand
  return result as unknown as ID;
}

export const features: typeof globalThis.features = {
  buttonHrefs: {
    _isEnabled: false,

    // Store the reference to the listener so it can be removed
    _handler() {
      document.body.addEventListener("click", this._delegatedClickHandler);
    },

    _delegatedClickHandler(event: MouseEvent) {
      const target = event.target as HTMLButtonElement;
      if (target?.tagName === "BUTTON" && !target.disabled) {
        const href = target.getAttribute("href");
        if (href) window.open(href, target.getAttribute("target") ?? "_self");
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
      const buttons = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      for (const button of Array.from(buttons)) {
        button.removeEventListener("click", this._delegatedClickHandler);
      }
    }
  },

  enableAll(): void {
    Object.entries(this).forEach(([_, feature]) => {
      if (typeof feature === "object" && typeof feature.enable === "function") {
        feature.enable();
      }
    });
  },

  disableAll(): void {
    Object.entries(this).forEach(([_, feature]) => {
      if (typeof feature === "object" && typeof feature.disable === "function") {
        feature.disable();
      }
    });
  },
};

}