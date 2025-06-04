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

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function isGlobal(val: any): val is typeof globalThis {
  return val === globalThis;
}

namespace OptiDOM {
export class optidom<M extends Record<string, any> = {}> {
    private _registry: M = {} as M;

    register<T, K extends PropertyKey>(
      clazz: object,
      methodName: K,
      method: PropertyDescriptor,
      prototype?: boolean,
      options?: PropertyDescriptor & { overwrite?: boolean }
    ): optidom<M & { [P in `${string & K}`]: T }>;

    register<T, K extends PropertyKey>(
      clazz: (object & Partial<{ prototype: any }>) | (new (...args: any[]) => T),
      methodName: K,
      method: ((this: T, ...args: any[]) => any) | T,
      prototype?: boolean,
      options?: PropertyDescriptor & { overwrite?: boolean }
    ): optidom<M & { [P in `${string & K}`]: (this: T, ...args: any[]) => any }>;

    register<T, K extends PropertyKey>(
      clazz: (object & Partial<{ prototype: any }>) | (new (...args: any[]) => T),
      methodName: K,
      method: any,
      prototype: boolean = true,
      options: PropertyDescriptor & { overwrite?: boolean } = {}
    ): optidom<M & { [P in `${string & K}`]: any }> {
      const isGlobalTarget = isGlobal(clazz);
      const className: string = (clazz as any).name || "global";
      const key = `${className}.${String(methodName)}` as const;

      const isAccessor =
        typeof method === "object" &&
        (typeof method.get === "function" || typeof method.set === "function");

      const descriptor: PropertyDescriptor = isAccessor
        ? { configurable: true, enumerable: false, ...method, ...options }
        : {
            value: method,
            writable: true,
            configurable: true,
            enumerable: false,
            ...options,
          };

      const target =
        prototype && !isGlobalTarget ? (clazz as any).prototype : clazz;

      if (!target) throw new Error("The class specified has no prototype");

      if (!options.overwrite && methodName in target) {
        console.warn(
          `[optidom] skipped ${className}${prototype ? ".prototype" : ""}.${String(
            methodName
          )} (already exists)`
        );
        return this;
      }

      Object.defineProperty(target, methodName, descriptor);

      (this._registry as any)[methodName] = method;

      return new optidom<M & { [P in typeof key]: typeof method }>();
    }

    explicitRegister<K extends string, V>(
      key: K,
      value: V
    ): optidom<M & { [P in K]: V }> {
      (this._registry as any)[key] = value;
      return new optidom<M & { [P in K]: V }>();
    }

    get<K extends keyof M>(key: K): M[K] {
      return this._registry[key];
    }

    getAll(): M {
      return this._registry;
    }

    debug(): void {
      console.group("[OptiDOM] registered methods:");
      for (const key in this._registry) {
        console.log(`- ${key}`);
      }
      console.groupEnd();
    }

    es(version: placeholder): void {
      switch(version) {

      }
    }

    flags(...flag: placeholder[]): void {

    }

    globalQs(): placeholder {

    }

    strict(): void {
      
    }
  }
}

const OptidomT = new OptiDOM.optidom()
  .register(globalThis, "f", (iife: () => void) => iife())
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
  /*! Not Working */.register(Document, "leaving", OptiDOM.leaving)
  /*! Deprecated */.register(Document, "elementCreator", OptiDOM.elementCreatorDocument)
  .register(Document, "bindShortcut", OptiDOM.bindShortcut)
  .register(Document, "css", OptiDOM.documentCss)
  .register(Document, "createElementTree", OptiDOM.createElementTree)
  .register(Document, "$", OptiDOM.$)
  .register(Document, "$$", OptiDOM.$$)

  .register(Date, "at", OptiDOM.atDate)
  .register(Date, "fromTime", OptiDOM.fromTime)

  .register(NodeList, "addEventListener", OptiDOM.addEventListenerEnum as any)
  .register(NodeList, "addClass", OptiDOM.addClassList as any)
  .register(NodeList, "removeClass", OptiDOM.removeClassList as any)
  .register(NodeList, "toggleClass", OptiDOM.toggleClassList as any)
  .register(NodeList, "single", function (this: NodeList) {
    return this.length > 0 ? this[0] : null;
  })

  .register(HTMLCollection, "addEventListener", OptiDOM.addEventListenerEnum as any)
  .register(HTMLCollection, "addClass", OptiDOM.addClassList as any)
  .register(HTMLCollection, "removeClass", OptiDOM.removeClassList as any)
  .register(HTMLCollection, "toggleClass", OptiDOM.toggleClassList as any)
  .register(HTMLCollection, "single", function (this: HTMLCollection) {
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
    get: function (this: HTMLElement) {
      return this.css("visibility") !== "hidden"
        ? this.css("display") !== "none"
        : Number(this.css("opacity")) > 0;
    }
  })
  .explicitRegister("HTMLDefaultElement", OptiDOM.HTMLDefaultElement);

customElements.define("default-option", OptiDOM.HTMLDefaultElement, { extends: "option" });

globalThis.Optidom = OptidomT;