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
    private _registry = new Map<string, string[]>();
    private _registryFuncs: M = {} as M;

    register<T, K extends string>(
      clazz: (new(...args: any[]) => T) | (Function & { prototype: any }) | typeof globalThis,
      methodName: K,
      method: (this: T, ...args: any[]) => any,
      overwrite?: boolean
    ): asserts this is optidom<M & { [P in K]: (this: T, ...args: any[]) => any }> {
      if (isGlobal(clazz)) {
        (clazz as any)[methodName] = method;
      } else {
        if (!clazz.prototype) throw new Error("The class specified has no prototype");
        const name = clazz.name;

        if (!overwrite && methodName in clazz.prototype) {
          console.warn(`[optidom] skipped ${name}.${methodName.toString()} (already exists)`);
          return;
        }

        Object.defineProperty(clazz.prototype, methodName, {
          value: method,
          writable: true,
          configurable: true,
          enumerable: false
        });

        if (!this._registry.has(name)) this._registry.set(name, []);
        (this._registryFuncs as any)[methodName] = method;
        this._registry.get(name)!.push(methodName.toString());
      }
    }

    get<K extends keyof M>(key: K): M[K] {
      return this._registryFuncs[key];
    }

    debug(): void {
      console.group("[OptiDOM] registered methods:");
      for (const [className, methods] of this._registry.entries()) {
        console.log(`${className}: ${methods.join(", ")}`);
      }
      console.groupEnd();
    }
  };
}


const OptidomT: OptiDOM.optidom = new OptiDOM.optidom();

OptidomT.register(globalThis, "f", (iife: () => void) => iife());

globalThis.createEventListener = OptiDOM.createEventListener;
(globalThis as any).LocalStorage = OptiDOM.LocalStorage;
(globalThis as any).SessionStorage = OptiDOM.SessionStorage;
(globalThis as any).Cookie = OptiDOM.Cookie;
(globalThis as any).Time = OptiDOM.Time;
(globalThis as any).Sequence = OptiDOM.Sequence;
(globalThis as any).ShortcutEvent = OptiDOM.ShortcutEvent;
globalThis.emitter = OptiDOM.emitter;
globalThis.features = OptiDOM.features;
globalThis.isEmpty = OptiDOM.isEmpty;
globalThis.type = OptiDOM.type;
globalThis.generateID = OptiDOM.generateID;
globalThis.Colorize = OptiDOM.Colorize;
globalThis.UnknownError = OptiDOM.UnknownError;
globalThis.NotImplementedError = OptiDOM.NotImplementedError;
globalThis.AccessError = OptiDOM.AccessError;
globalThis.CustomError = OptiDOM.CustomError;
globalThis.ColorizedSyntaxError = OptiDOM.ColorizedSyntaxError;


OptidomT.register(Document, "ready", OptiDOM.ready);
/*! Not Working */ Document.prototype.leaving = OptiDOM.leaving;
/*! Deprecated */ Document.prototype.elementCreator = OptiDOM.elementCreatorDocument;
OptidomT.register(Document, "bindShortcut", OptiDOM.bindShortcut);
OptidomT.register(Document, "css", OptiDOM.documentCss);
OptidomT.register(Document, "createElementTree", OptiDOM.createElementTree);
OptidomT.register(Document, "$", OptiDOM.$);
OptidomT.register(Document, "$$", OptiDOM.$$);

OptidomT.register(Date, "at",OptiDOM.atDate);
OptidomT.register(Date, "fromTime", OptiDOM.fromTime);

OptidomT.register(NodeList, "addEventListener", OptiDOM.addEventListenerEnum as any);
OptidomT.register(NodeList, "addClass", OptiDOM.addClassList as any);
OptidomT.register(NodeList, "removeClass", OptiDOM.removeClassList as any);
OptidomT.register(NodeList, "toggleClass", OptiDOM.toggleClassList as any);
OptidomT.register(NodeList, "single", function (this: NodeList) {
  // If the NodeList has elements, return the first one, otherwise return null
  return this.length > 0 ? this[0] : null;
});

OptidomT.register(HTMLCollection, "addEventListener", OptiDOM.addEventListenerEnum as any);
OptidomT.register(HTMLCollection, "addClass", OptiDOM.addClassList as any);
OptidomT.register(HTMLCollection, "removeClass", OptiDOM.removeClassList as any);
OptidomT.register(HTMLCollection, "toggleClass", OptiDOM.toggleClassList as any);
OptidomT.register(HTMLCollection, "single", function (this: HTMLCollection) {
  // If the collection has elements, return the first one, otherwise return null
  return this.length > 0 ? this[0] : null;
});

OptidomT.register(EventTarget, "addBoundListener", OptiDOM.addBoundListener);
OptidomT.register(EventTarget, "addEventListeners", OptiDOM.addEventListeners);
OptidomT.register(EventTarget, "delegateEventListener", OptiDOM.delegateEventListener);

OptidomT.register(Element, "hasText", OptiDOM.hasText);
OptidomT.register(Element, "txt", OptiDOM.text);
OptidomT.register(Element, "addClass", OptiDOM.addClass);
OptidomT.register(Element, "removeClass", OptiDOM.removeClass);
OptidomT.register(Element, "toggleClass", OptiDOM.toggleClass);
OptidomT.register(Element, "hasClass", OptiDOM.hasClass);

OptidomT.register(HTMLElement, "css", OptiDOM.css);
OptidomT.register(HTMLElement, "elementCreator", OptiDOM.elementCreator);
OptidomT.register(HTMLElement, "tag", OptiDOM.tag);
OptidomT.register(HTMLElement, "html", OptiDOM.html);
OptidomT.register(HTMLElement, "show", OptiDOM.show);
OptidomT.register(HTMLElement, "hide", OptiDOM.hide);
OptidomT.register(HTMLElement, "toggle", OptiDOM.toggle);
// /*! Unchecked */ HTMLElement.prototype.fadeIn;
// /*! Unchecked */ HTMLElement.prototype.fadeOut;
// /*! Unchecked */ HTMLElement.prototype.fadeToggle;
// /*! Unchecked */ HTMLElement.prototype.slideIn;
// /*! Unchecked */ HTMLElement.prototype.slideOut;
// /*! Unchecked */ HTMLElement.prototype.slideToggle;
// /*! Unchecked */ HTMLElement.prototype.animate;

OptidomT.register(HTMLFormElement, "serialize", OptiDOM.serialize);

OptidomT.register(Node, "getParent", OptiDOM.getParent);
OptidomT.register(Node, "getAncestor", OptiDOM.getAncestor);
OptidomT.register(Node, "getChildren", OptiDOM.getChildren);
OptidomT.register(Node, "getSiblings", OptiDOM.getSiblings);
OptidomT.register(Node, "$", OptiDOM.find);
OptidomT.register(Node, "$$", OptiDOM.findAll);

Math.random = OptiDOM.random;

Object.clone = OptiDOM.clone;
Object.forEach = OptiDOM.forEach;

Date.fromTime = OptiDOM.fromTime;
Date.at = OptiDOM.atDate;

OptidomT.register(Number, "repeat", OptiDOM.repeat);

/* Untestable */ JSON.parseFile = OptiDOM.parseFile;

OptidomT.register(Array, "unique", OptiDOM.unique);
OptidomT.register(Array, "chunk", OptiDOM.chunk);

OptidomT.register(String, "remove", OptiDOM.remove);
OptidomT.register(String, "removeAll", OptiDOM.removeAll);
OptidomT.register(String, "capitalize", OptiDOM.capitalize);

defineGetter(Window.prototype, "width", () => window.innerWidth || document.body.clientWidth);
defineGetter(Window.prototype, "height", () => window.innerHeight || document.body.clientHeight);

defineGetter(HTMLElement.prototype, "visible", function (this: HTMLElement) {
  return this.css("visibility") !== "hidden"
    ? this.css("display") !== "none"
    : Number(this.css("opacity")) > 0;
});

defineGetter(Object.prototype, "__type", function(this: Object) {
  // Placeholder
  return this.constructor.name;
});

customElements.define("default-option", OptiDOM.HTMLDefaultElement, { extends: "option" });

globalThis.Optidom = OptidomT;