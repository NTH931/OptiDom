namespace OptiDOM {

export function addBoundListener <T extends EventTarget, K extends keyof EventMapOf<T>>(
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

export function addEventListeners<T extends EventTarget>(
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

export function delegateEventListener<
  T extends EventTarget,
  U extends Element,
  K extends keyof EventMapOf<T>
>(
  this: T,
  type: K,
  delegator: HTMLTag | string,
  listener: (this: U, e: EventMapOf<T>[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  this.addEventListener(
    type as string,
    function (this: T, e: Event) {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      let selector: string;
      if (typeof delegator === "string") {
        selector = delegator;
      } else {
        selector = ""; // fallback
      }

      const matchedEl = target.closest(selector) as U | null;

      if (
        matchedEl && 
        (!(this instanceof Element) || this.contains(matchedEl))
      ) {
        listener.call(matchedEl, e as EventMapOf<T>[K]);
      }
    },
    options
  );
}

}