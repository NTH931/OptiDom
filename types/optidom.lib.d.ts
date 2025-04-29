/// <reference path="./optidom.d.ts" />
/// <reference path="./deprecation.d.ts" />
/// <reference path="./alterations.d.ts" />
/// <reference path="./classes.d.ts" />

/* eslint-disable no-var */
interface Document {
  /** 
   * Create a type of event listener that only listens for shortcuts
   * @optidom
   * @param shortcut The shortcut to listen for. The string provided needs to be in the format defined by {@link Shortcut}
   * @param callback The callback response to the keys that 'shortcut' defines
   * @note Use this function instead of using the 'keydown' event in conjunction with key testing
   * @example
   * document.bindShortcut("ctrl+s", e =>  {
   *   e.preventDefault();
   * 
   *   document.forms.forEach(form => {
   *     form.submit();
   *   });
   * });
   */
  bindShortcut(shortcut: Shortcut, callback: (event: KeyboardEvent) => void): void;

  /** 
   * Adds, edits and returns the element's css on the document stylesheet.
   * @optidom
   * @example
   * document.css("#target", {
   *   backgroundColor: "red",
   *   color: "grey"
   * })
   */
  css(
    element: keyof HTMLElementTagNameMap
  ): Partial<Record<keyof CSSStyleDeclaration, string>>;
  css(
    element: keyof HTMLElementTagNameMap,
    object: Partial<Record<keyof CSSStyleDeclaration, string | number>>
  ): void;
  css(
    element: string
  ): Partial<Record<keyof CSSStyleDeclaration, string>>;
  css(
    element: string,
    object: Partial<Record<keyof CSSStyleDeclaration, string | number>>
  ): void;

  /**
   * Selects a element from the document based on the css selector provided
   * @optidom
   * @param selector A css style selector used to find the element on the document
   * @example
   * const el = document.$("#target");
   * 
   * el.text("New Text");
   * if (el.hasText("New")) {
   *   console.log("New!");
   *   el.addClass("new");
   * }
   */
  $<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
  $<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
  $<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
  /** @deprecated */
  $<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
  $<E extends Element = Element>(selectors: string): E | null;

  /**
   * Selects all elements from the document that match the css selector provided
   * @optidom
   * @param selector The css selector used to find the elements
   * @example
   * const els = document.$$("a")
   * 
   * els.forEach((el) => {
   *   el.addClass("link")
   * });
   */
  $$<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
  $$<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
  $$<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
  /** @deprecated */
  $$<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
  $$<E extends Element = Element>(selectors: string): NodeListOf<E>;

  /**
   * Calls the callback when the document is ready and all of the content is loaded
   * @optidom
   * @param callback The function to call when the document is ready
   * @example
   * document.ready(() => {
   *   console.log("Document is ready");
   * 
   *   // Works because the document is ready
   *   const el = document.$("body");
   * })
   */
  ready(callback: (this: Document, ev: Event) => any): void;

  /**
   * Calls the callback when the user leaves the page or website
   * @optidom
   * @param callback The function to call when the user leaves the page or website
   * @example
   * document.leaving(() => {
   *   console.log("User is Leaving");
   * 
   *   // Cleanup tasks
   *   LocalStorage.clear();
   *   Cookie.clear();
   * })
   */
  leaving(callback: (this: Document, ev: Event) => any): void;

  /**
   * Starts an instance of the {@link HTMLElementCreator} to create an structure of elements
   * @optidom
   * @param superEl The top level HTMLElement
   * @param attrs Attributes for the 'superEl'
   * 
   */
  elementCreator(superEl: keyof HTMLElementTagNameMap, attrs: HTMLAttrs): HTMLElementCreator;

  /**
   * Creates an element tree to create trees of HTML
   * @optidom
   * @param node The html element(s)
   * @example
   * const content = Elements.createTree({
   *   tag: "div",
   *   class: "current-class",
   *   children: [
   *     {
   *       tag: "div",
   *       class: "class-name",
   *       children: [
   *         {
   *           tag: "a",
   *           attrs: {
   *             href: "https://example.com",
   *             target: "_blank",
   *           },
   *           text: "To example.com",
   *         }
   *       ]
   *     }
   *   ]
   * });
   */
  createTree<Tag extends HTMLTag>(node: ElementNode<Tag>): HTMLElementOf<Tag>;
}

interface Window {
  readonly width: number;
  readonly height: number;
}

interface Node {
  /** 
   * Gets the parent of the node
   * @optidom
   * @returns The parent node
   * @example
   * const el = document.$("#child");
   * const target = el.getParent();
   * 
   * console.log("Target: " + target);
   */
  getParent(this: Node): Node | null;

  /**
   * Gets all the children of the node
   * @optidom
   * @example
   * const el = document.$("#target").getChildren();
   * 
   * el.forEach((child, i) => console.log("Child " + i + ": " + child));
   */
  getChildren(this: Node): NodeListOf<ChildNode>

  /**
   * Gets the siblings of the node and, if 'inclusive' is true, includes itself in the list
   * @optidom
   * @param inclusive If the list should include itself
   * @example
   * const el = document.$("#target").getSiblings(true);
   * 
   * el.forEach((sibling, i) => console.log("Sibling " + i + ": " + sibling));
   */
  getSiblings(this: Node, inclusive?: boolean): Node[]

  /** 
   * Gets the ancestor of the node by the amount of levels specified
   * @optidom
   * @param level The amount of levels to go up
   * @returns The ancestor node
   * @example
   * const el = document("#child");
   * const target = el.getAncestor(3);
   * 
   * console.log("Target: " + target);
   */
  getAncestor(this: Node, level: number): Node | null;

  /** 
   * Gets the element's ancestor (ancestor selected is based on the css selector) 
   * @optidom
   * @param selector The selector used to get the ancestor
   * @returns The parent element
   */
  querySelectAncestor<T extends Element>(this: Element, selector: string): T | null;

  /**
   * Finds children based on the selector specified
   * @optidom
   * @param selector The css style selector used to find the descendants
   * @example
   * const el = document.$("#parent");
   * el.text("Parent");
   * 
   * el.find(".hidden").removeClass("hidden");
   */
  find<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  find<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
  find<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
  find<E extends Element = Element>(selector: string): E | null;

  /**
   * Finds children based on the selector specified
   * @optidom
   * @param selector The css style selector used to find the descendants
   * @example
   * const el = document.$("#parent");
   * el.text("Parent");
   * 
   * el.find(".hidden", true).removeClass("hidden");
   */
  findAll<K extends keyof HTMLElementTagNameMap>(selector: K): NodeListOf<HTMLElementTagNameMap[K]>;
  findAll<K extends keyof SVGElementTagNameMap>(selector: K): NodeListOf<SVGElementTagNameMap[K]>;
  findAll<K extends keyof MathMLElementTagNameMap>(selector: K): NodeListOf<MathMLElementTagNameMap[K]>;
  findAll<E extends Element = Element>(selector: string): NodeListOf<E>;
}

interface EventTarget {
  /** 
   * Creates an event listener that triggers a set amount of times
   * @optidom
   * @param type The type of listener to use
   * @param listener The callback of the listener
   * @param options Optional options to give the listener (if number, then thats the amount of times the event has to be triggered before being removed)
   * @example
   * const el = document.$("#target");
   * 
   * el.addBoundListener("click", () => {
   *   el.removeAttr("id");
   * }, 1);
   */
  addBoundListener<T extends EventTarget, K extends keyof EventMapOf<T>>(
    this: T,
    type: K,
    listener: (this: T, e: EventMapOf<T>[K]) => void,
    times: number,
    options?: boolean | AddEventListenerOptions
  ): void;

  /** 
   * Adds multiple event listeners to the target
   * @optidom
   * @param listeners The listeners to apply
   * @example
   * document.addEventListeners({
   *   load: () => console.log("loaded!"),
   *   unload: () => console.log("unloaded!")
   * });
   */
  addEventListeners<T extends EventTarget>(
    this: T,
    listeners: {
      [K in keyof EventMapOf<T>]?: (e: EventMapOf<T>[K]) => any
    }
  ): void

  /** 
   * Adds multiple event listeners that resolve under a unified callback
   * @optidom
   * @param types The events to listen to
   * @param listener The listener to apply
   * @param options options for the event listeners
   * @example
   * document.addEventListeners(["load", "unload"], () => {
   *   console.log("document experienced a loading event");
   * });
   */
  addEventListeners<T extends EventTarget>(
    this: T,
    types: (keyof EventMapOf<T>)[],
    listener: (e: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

interface Element {
  /**
   * Returns a boolean based on whether the elements text contains the text specified or matches the regex provided
   * @optidom
   * @param text The text to search for or the regex to match
   * @example
   * const el = document.$("#target");
   * 
   * if (el.containsText("new")) {
   *   el.addClass("new");
   * }
   */
  hasText(text: string | RegExp): boolean;

  /**
   * Adds a class to the element
   * @param elClass The class to add
   * @optidom
   * @example
   * const el = document.$("#target");
   * el.addClass("classy")
   */
  addClass(elClass: string): void;

  /**
   * Removes a class from the element
   * @param elClass The class to remove
   * @optidom
   * @example
   * const el = document.$("#target");
   * el.removeClass("classy")
   */
  removeClass(elClass: string): void;

  /**
   * Toggles the class on the element
   * @param elClass The class to toggle
   * @optidom
   * @example
   * const el = document.$("#target");
   * el.toggleClass("classy")
   */
  toggleClass(elClass: string): void;

  /**
   * Detects whether the element has the class specified
   * @param elClass The class to toggle
   * @optidom
   * @example
   * const el = document.$("#target");
   * if (el.hasClass("classy")) {
   *   console.log("It's really classy! (Get it? XD)");
   * }
   */
  hasClass(elClass: string): boolean;

  /**
   * Modifies and/or returns the text of the element
   * @optidom
   * @note Putting only "textContent" as a parameter references the previous textContent
   * @example
   * const el = document.$("#target");
   * el.text("textContent", "Yelp")
   * 
   * console.log(el.text());
   */
  text(newText: string | "textContent", ...moreText: (string | "textContent")[]): void;
  text(): string;
}

interface HTMLElement {
  /** 
   * Adds inline css to the element 
   * @optidom
   * @example
   * const el = document.$("#target");
   * 
   * el.css("background-color", "red");
   * el.css({
   *   visibility: "visible",
   *   backgroundColor: "blue"
   * })
   * 
   * console.log(el.css());
   */
  css(key: string, value: string): void;
  css(key: string): string;
  css(key: Partial<Record<keyof CSSStyleDeclaration, string | number>>): void;
  css(): Partial<Record<keyof CSSStyleDeclaration, string>>;

  /**
   * Creates children of the element
   * @param elements The elements to use, specified by the cascade. The cascade is a {@link HTMLElementCascade}
   * @deprecated use {@link document.elementCreator} or new {@link HTMLElementCreator}
   * @optidom
   */
  createChildren(elements: HTMLElementCascade): void;

  /**
   * Starts instance of the {@link HTMLElementCreator} to create an structure of elements
   * @optidom
   * @example 
   * const el = document.$("#target");
   * 
   * el.elementCreator()
   *   .el("h1", { text: "Hello" })
   *   .el("h2", { text: "world!", id: "small" })
   */
  elementCreator(this: HTMLElement): HTMLElementCreator;

  /**
   * Changing an elements tag name
   * @optidom
   * @warning BE CAREFUL WITH THIS FUNCTION, AS IT MODIFIES TAG NAMES, WHICH ARE A MAJOR PART OF HTML.
   * @param type the new element type
   */
  tag<T extends keyof HTMLElementTagNameMap>(type: T): HTMLElementOf<T>;

  /**
   * Gets the elements tag name
   * @optidom
   * @example
   * const el = document.$("#target");
   * 
   * console.log(el.tag()); // Logs tag name
   */
  tag(this: HTMLElement): keyof HTMLElementTagNameMap;

  /**
   * Gets and sets the elements html
   * @optidom
   * @notice use HTMLElement.{@link text} instead if you are not insterting raw html
   * @param input The html to insert in place of the old html
   * @example
   * const el = document.$("target");
   * const html = el.html();
   * 
   * el.html(html + "<a href='example.com'>Link</a>");
   */
  html(input?: string): string;

  // /**
  //  * Creates a HTML element animation that animates into the css properties specified
  //  * @optidom
  //  * @param styles The css styles to ease into
  //  * @param duration The amount of time the animation should take
  //  * @param easing The easing to apply
  //  * @param finished The function to run when the animation is done
  //  * @example
  //  * document.$("#target").animate({
  //  *   paddingLeft: "+=75px",
  //  *   width: "75%"
  //  * }, 5000, "ease-out", () => console.log("Done!"));
  //  */
  // animate(styles: object, duration: number, easing?: AnimationEasing, finished: () => any): void;

  /**
   * Shows an element
   * @optidom
   * @example
   * const el = document.$("#target");
   * el.show();
   */
  show(): void;

  /**
   * Hides an element
   * @optidom
   * @param layout If the layout should shift when the element is hidden
   * @example
   * const el = document.$("#target");
   * el.hide(true);
   */
  hide(): void;

  /**
   * Toggles the visibility of a element
   * @optidom
   * @param layout If the layout should shift when the element's visibility is changed
   * @example
   * const el = document.$("#target");
   * el.toggle(true);
   */
  toggle(): void;

  // /**
  //  * 
  //  * @optidom
  //  * @param layout If the layout should shift when the element has finished and during the animation
  //  * @param duration The ammount of time the animation takes in milliseconds (default 1000)
  //  * @example
  //  * const el = document.$("#target");
  //  * el.fadeIn(2000);
  //  */
  // fadeIn(duration?: number): void;

  // /**
  //  * 
  //  * @optidom
  //  * @param layout If the layout should shift when the element has finished and during the animation
  //  * @param duration The ammount of time the animation takes in milliseconds (default 1000)
  //  * @example
  //  * const el = document.$("#target");
  //  * el.fadeOut(5000);
  //  */
  // fadeOut(duration?: number): void;

  // /**
  //  * 
  //  * @optidom
  //  * @param layout If the layout should shift when the element has finished and during the animation
  //  * @param duration The ammount of time the animation takes in milliseconds (default 1000)
  //  * @example
  //  * const el = document.$("#target");
  //  * el.fadeToggle(1000);
  //  */
  // fadeToggle(duration?: number): void;

  // /**
  //  * 
  //  * @optidom
  //  * @param layout If the layout should shift when the element has finished and during the animation
  //  * @param duration The ammount of time the animation takes in milliseconds (default 1000)
  //  * @param direction Where the element should slide to
  //  * @example
  //  * const el = document.$("#target");
  //  * el.slideIn(Direction.UP, 1000);
  //  */
  // slideIn(direction: Direction, duration?: number): void;

  // /**
  //  * 
  //  * @optidom
  //  * @param layout If the layout should shift when the element has finished and during the animation
  //  * @param duration The ammount of time the animation takes in milliseconds (default 1000)
  //  * @param direction Where the element should slide to
  //  * @example
  //  * const el = document.$("#target");
  //  * el.slideDown(Direction.DOWN, 5000);
  //  */
  // slideOut(direction: Direction, duration?: number): void;

  // /**
  //  * 
  //  * @optidom
  //  * @param layout If the layout should shift when the element has finished and during the animation
  //  * @param duration The ammount of time the animation takes in milliseconds (default 1000)
  //  * @param direction Where the element should slide to
  //  * @example
  //  * const el = document.$("#target");
  //  * el.slideToggle(Dircetion.UP, Direction.DOWN, 2000);
  //  */
  // slideToggle(direction: Direction, duration?: number): void;
  // slideToggle(direction: Direction, directionTo: Direction, duration?: number): void;

  /**
   * Returns a boolean that represents if the elements visibility, opacity, or display is set to a hidden value
   * @optidom
   */
  readonly visible: boolean;
}

interface HTMLFormElement {
  serialize(): string;
}

interface NodeList {
  /** 
   * Adds the same event listener to every element in the list
   * @optidom
   * @param type The type of listener to attach
   * @param listener The callback to the event
   * @param options Options of the event listener
   * @example
   * document.$$("div.panel")
   *   .addEventListeners("click", () => {
   *     this.fadeOut(3000);
   *     this.removeClass("panel");
   *   });
   */
  addEventListener<T extends EventTarget>(
    this: Iterable<T>,
    type: keyof EventMapOf<T>,
    listener: (this: T, e: EventMapOf<T>[keyof EventMapOf<T>]) => any, 
    options?: boolean | AddEventListenerOptions
  ): void

  /**
   * Adds a class to the elements
   * @param elClass The class to add
   * @optidom
   * @example
   * const el = document.$$("#target");
   * el.addClass("classy")
   */
  addClass(elClass: string): void;

  /**
   * Removes a class from the elements
   * @param elClass The class to remove
   * @optidom
   * @example
   * const el = document.$$("#target");
   * el.removeClass("classy")
   */
  removeClass(elClass: string): void;

  /**
   * Toggles the class on the elements
   * @param elClass The class to toggle
   * @optidom
   * @example
   * const el = document.$$("#target");
   * el.toggleClass("classy")
   */
  toggleClass(elClass: string): void;

  /**
   * Returns the first value in the list
   * @optidom
   * @note returns the same value as doing [0] on this object, but this method is preffered
   */
  single(): Node | null
}

interface HTMLCollection {
  /** 
   * Adds the same event listener to every element in the list
   * @optidom
   * @param type The type of listener to attach
   * @param listener The callback to the event
   * @param options Options of the event listener
   * @example
   * document.$$("div.panel")
   *   .addEventListeners("click", () => {
   *     this.fadeOut(3000);
   *     this.removeClass("panel");
   *   });
   */
  addEventListener<T extends EventTarget, K extends keyof EventMapOf<T>>(
    this: Iterable<T>,
    type: K, 
    listener: (this: T, e: EventMapOf<T>[keyof EventMapOf<T>]) => any, 
    options?: boolean | AddEventListenerOptions
  ): void

  /**
   * Adds a class to the elements
   * @param elClass The class to add
   * @optidom
   * @example
   * const el = document.$$("#target");
   * el.addClass("classy")
   */
  addClass(elClass: string): void;

  /**
   * Removes a class from the elements
   * @param elClass The class to remove
   * @optidom
   * @example
   * const el = document.$$("#target");
   * el.removeClass("classy")
   */
  removeClass(elClass: string): void;

  /**
   * Toggles the class on the elements
   * @param elClass The class to toggle
   * @optidom
   * @example
   * const el = document.$$("#target");
   * el.toggleClass("classy")
   */
  toggleClass(elClass: string): void;

  /**
   * Returns the first value in the collection
   * @optidom
   * @note returns the same value as doing [0] on this object, but this method is preffered
   */
  single(): Element | null;
}

interface DateConstructor {
  /** 
   * Returns an absolute number of time from January 1, 1970 
   * @optidom
   */
  at(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;

  /**
   * Returns a date object by using a time object
   * @optidom
   * @param time The time object
   * @param year The year to use
   * @param monthIndex The month to use, by index
   * @param date The date, by number
   * @example
   * const time = new Time();
   * const newDate = Date.fromTime(time, 2025, 4, 28);
   */
  fromTime(this: Date, time: TimeInternal, year: number, monthIndex: number, date?: number): Date;
}

interface Math {
  /** 
   * Returns a pseudorandom number between 0 and max.
   * @optidom
   * @param max the maximum random number 
   */
  random(max: number): number
}

interface ObjectConstructor {
  /**
   * Clones an object
   * @optidom
   * @param object The object to clone
   * @param deep Wether the clone should be deep or not
   * @example
   * class Example {
   *   exampleVal = 2;
   *   run() { console.log("Running...") }
   *   static walk() { console.log("Walking...") }
   * }
   * 
   * const oldObj = new Example();
   * const newObj = Object.clone(oldObj);
   *
   * newObj.exampleVal = 4;
   * newObj.run(); // Running...
   * console.log(oldObj.exampleVal); // 2
   */
  clone<T>(object: T, deep?: boolean): T;

  /**
   * Performs the specified action for each element in an array.
   * @optidom
   * @param iterator The function that runs on each iteration of the object. Gives the key: value pair for the current value in the object
   * @example
   * Object.forEach({ val1: 1, val2: "Yes" }, ([key, value]) => {
   *  console.log(`Key: ${key}, Value: ${value}`);
   * });
   */
  forEach<T>(object: T, iterator: (key: keyof T, value: T[keyof T]) => any): void;
}

interface Number {
  /**
   * Repeats the iterator the amount of times as the Number
   * @optidom
   * @param iterator the function to run on each iteration
   * @example
   * const times = 5;
   * times.repeat(i => {
   *   console.log("Time " + (i + 1));
   * });
   */
  repeat(iterator: (i: number) => void): void;
}

interface Array<T> {
  /**
   * Makes all values in an array unique
   * @optidom
   * @example
   * const newArr = [1, 2, 3, 3, 4].unique();
   * console.log(newArr); // [1, 2, 3, 4]
   */
  unique(this: T[]): T[]
  /**
   * Seperates an array into an array of arrays, with each subarray of a defined size
   * @optidom
   * @param size The size of the subarrays
   * @example
   * const newArr = [1, 2, 3, 3, 4].chunk(2);
   * console.log(newArr); // [[1, 2], [3, 3], [4]]
   */
  chunk(this: T[], size: int): T[][]
}

interface String {
  /**
   * Removes text in a string, using a regular expression or search string.
   * @optidom
   * @param finder The serching string or regular expression
   * @example 
   * const oldString = "Hello! World!";
   * const newString = oldString.remove("!") // Hello World!
   * const evenNewerString = newString.remove(/\s\w+/) // Hello!
   */
  remove(finder: string | RegExp): string;

  /**
   * Removes text in a string, using a regular expression or search string.
   * @optidom
   * @param finder The serching string or regular expression
   * @example 
   * const oldString = "Hello! World!";
   * const newString = oldString.removeAll("!") // Hello World
   * const evenNewerString = newString.removeAll(/[HW]/) // elloorld
   */
  removeAll(finder: string | RegExp): string;
}

interface JSON {
  /**
   * Parses a file into JSON using the type parameters specified (Or returning any in base JS)
   * @optidom
   * @param file The file to parse
   * @param receiver The alterations to make to the outputted json
   * @example
   * const results = JSON.parseFile<{ content: string }, { content: { id: string, class: string } }>(
   *   "https://example.com/jsons", 
   *   (content) => content.id + " " + content.class
   * );
   */
  parseFile<R = any, T = R>(file: string, receiver?: (content: T) => R): Promise<R>;
}

/** 
 * Creates an iife (Immediately invoked function expression) that triggers on run 
 * @optidom
 * @param iife The function to run the code in for the iife
 */
function f(iife: () => void): void;

/**
 * Creates a user defined event listener that triggers the callback when one of the triggers is activated
 * @optidom
 * @param triggers The triggers that activate the event listener
 * @param callback The function that is caslled when one of the trigger functions are called
 * @example
 * createEventListener([window.alert, window.confirm] ([al, conf]) => {
 *   console.log("Window method called");
 *   console.log(conf); // Logs return value returned
 * });
 */
function createEventListener<T extends AnyFunc[]>(
  triggers: [...T], 
  callback: (...results: CallbackResult<T>) => void
): void;

/**
 * Cheks whether the value given is empty, `null`, or `undefined`
 * @optidom
 * @param value The value to check
 * @example
 * class ExampleClass {};
 * 
 * isEmpty(""); // true
 * isEmpty("Hello"); // false
 * isEmpty(NaN); // true
 * isEmpty(0); // false
 * isEmpty({}); // true
 * isEmpty([]); // true
 * isEmpty([1, 2]); // false
 */
function isEmpty(val: string): val is "";
function isEmpty(val: number): val is 0 | typeof NaN;
function isEmpty(val: boolean): val is false;
function isEmpty(val: null | undefined): true;
function isEmpty(val: Array<any>): val is [];
function isEmpty(val: Record<any, unknown>): val is Record<any, never>;
function isEmpty(val: Map<any, any>): val is Map<any, never>;
function isEmpty(val: Set<any>): val is Set<never>;
function isEmpty(val: WeakMap<object, any>): val is WeakMap<object, any>;
function isEmpty(val: WeakSet<object>): val is WeakSet<object>;
function isEmpty(val: any): boolean;

/**
 * Gets the type of the value and returns a string representation of the type of the value
 * @optidom
 * @param val The value who's type is being tested
 * @example
 * type(5)               // "number"
 * type("hello")         // "string"
 * type(null)            // "null"
 * type(undefined)       // "undefined"
 * type([1,2,3])         // "array"
 * type({})              // "object"
 * type(new Date())      // "date"
 * type(/abc/)           // "regexp"
 * type(() => {})        // "function"
 * type(new Map())       // "map"
 * type(new Set())       // "set"
 */
function type(val: any): string;

var UnknownError: ErrorType;
var NotImplementedError: ErrorType;

var Cookie: typeof Cookie;
var LocalStorage: typeof LocalStorage;
var SessionStorage: typeof SessionStorage;
var Time: typeof Time;
var Sequence: typeof Sequence;
var optidom: OptiDOM;