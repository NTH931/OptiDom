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

globalThis.f = (iife: () => void) => iife();
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


Document.prototype.ready = OptiDOM.ready;
/*! Not Working */ Document.prototype.leaving = OptiDOM.leaving;
/*! Deprecated */ Document.prototype.elementCreator = OptiDOM.elementCreatorDocument;
Document.prototype.bindShortcut = OptiDOM.bindShortcut;
Document.prototype.css = OptiDOM.documentCss;
Document.prototype.createElementTree = OptiDOM.createElementTree;
Document.prototype.$ = OptiDOM.$;
Document.prototype.$$ = OptiDOM.$$;


Date.at = OptiDOM.atDate;
Date.fromTime = OptiDOM.fromTime;

NodeList.prototype.addEventListener = OptiDOM.addEventListenerEnum;
NodeList.prototype.addClass = OptiDOM.addClassList;
NodeList.prototype.removeClass = OptiDOM.removeClassList;
NodeList.prototype.toggleClass = OptiDOM.toggleClassList;
NodeList.prototype.single = function () {
  // If the NodeList has elements, return the first one, otherwise return null
  return this.length > 0 ? this[0] : null;
};

HTMLCollection.prototype.addEventListener = OptiDOM.addEventListenerEnum;
HTMLCollection.prototype.addClass = OptiDOM.addClassList;
HTMLCollection.prototype.removeClass = OptiDOM.removeClassList;
HTMLCollection.prototype.toggleClass = OptiDOM.toggleClassList;
HTMLCollection.prototype.single = function () {
  // If the collection has elements, return the first one, otherwise return null
  return this.length > 0 ? this[0] : null;
};

EventTarget.prototype.addBoundListener = OptiDOM.addBoundListener;
EventTarget.prototype.addEventListeners = OptiDOM.addEventListeners;

Element.prototype.hasText = OptiDOM.hasText;
Element.prototype.txt = OptiDOM.text;
Element.prototype.addClass = OptiDOM.addClass;
Element.prototype.removeClass = OptiDOM.removeClass;
Element.prototype.toggleClass = OptiDOM.toggleClass;
Element.prototype.hasClass = OptiDOM.hasClass;

HTMLElement.prototype.css = OptiDOM.css;
HTMLElement.prototype.elementCreator = OptiDOM.elementCreator;
HTMLElement.prototype.tag = OptiDOM.tag;
HTMLElement.prototype.html = OptiDOM.html;
HTMLElement.prototype.show = OptiDOM.show;
HTMLElement.prototype.hide = OptiDOM.hide;
/*! Not Working */ HTMLElement.prototype.toggle = OptiDOM.toggle;
// /*! Unchecked */ HTMLElement.prototype.fadeIn;
// /*! Unchecked */ HTMLElement.prototype.fadeOut;
// /*! Unchecked */ HTMLElement.prototype.fadeToggle;
// /*! Unchecked */ HTMLElement.prototype.slideIn;
// /*! Unchecked */ HTMLElement.prototype.slideOut;
// /*! Unchecked */ HTMLElement.prototype.slideToggle;
// /*! Unchecked */ HTMLElement.prototype.animate;

/*! Unchecked */ HTMLFormElement.prototype.serialize = OptiDOM.serialize;

Node.prototype.getParent = OptiDOM.getParent;
Node.prototype.getAncestor = OptiDOM.getAncestor;
Node.prototype.getChildren = OptiDOM.getChildren;
Node.prototype.getSiblings = OptiDOM.getSiblings;
Node.prototype.$ = OptiDOM.find;
Node.prototype.$$ = OptiDOM.findAll;

Math.random = OptiDOM.random;

Object.clone = OptiDOM.clone;
Object.forEach = OptiDOM.forEach;

Number.prototype.repeat = OptiDOM.repeat;

/* Untestable */ JSON.parseFile = OptiDOM.parseFile;

Array.prototype.unique = OptiDOM.unique;
Array.prototype.chunk = OptiDOM.chunk;

String.prototype.remove = OptiDOM.remove;
String.prototype.removeAll = OptiDOM.removeAll;
String.prototype.capitalize = OptiDOM.capitalize;


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