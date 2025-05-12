/// <reference path="../types/optidom.lib.d.ts" />

describe("Element.hasText", () => {
  /** @type {Element} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should return true if the text matches", () => {
    element.textContent = "Hello, World!";
    expect(element.hasText("Hello, World!")).toBe(true);
  });

  it("should return false if the test does not match", () => {
    element.textContent = "Hello, World!";
    expect(element.hasText("Hello World!")).toBe(false);
  });
});

describe("Element.text", () => {
  /** @type {Element} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should set text content", () => {
    element.txt("Test");
    expect(element.textContent).toBe("Test");
  });

  it("should get text content", () => {
    element.textContent = "Hello";
    expect(element.txt()).toBe("Hello");
  });
});

describe("Element.addClass", () => {
  /** @type {Element} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should add a class to the element", () => {
    element.addClass('test-class');
    expect(element.classList.contains('test-class')).toBe(true);
  });
});

describe("Element.removeClass", () => {
  /** @type {Element} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
    element.classList.add('test-class');
  });

  it("should remove a class from the element", () => {
    element.removeClass('test-class');
    expect(element.classList.contains('test-class')).toBe(false);
  });
});

describe("Element.toggleClass", () => {
  /** @type {Element} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should toggle a class on the element", () => {
    element.toggleClass('test-class');
    expect(element.classList.contains('test-class')).toBe(true);
    element.toggleClass('test-class');
    expect(element.classList.contains('test-class')).toBe(false);
  });
});

describe("Element.hasClass", () => {
  /** @type {Element} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should return true if the element has the specified class", () => {
    element.classList.add('test-class');
    expect(element.hasClass('test-class')).toBe(true);
  });

  it("should return false if the element does not have the specified class", () => {
    expect(element.hasClass('test-class')).toBe(false);
  });
});

describe("HTMLElement.css", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should apply CSS styles to the element", () => {
    element.css({ color: 'red' });
    expect(element.style.color).toBe('red');
  });
});

describe("HTMLElement.elementCreator", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should create a new element with the specified tag name", () => {
    document.elementCreator('p').append(element);
    expect(element.lastElementChild.tagName).toBe('P');
  });
});

describe("HTMLElement.tag", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should return the tag name of the element", () => {
    const tagName = element.tag();
    expect(tagName).toBe('div');
  });
});

describe("HTMLElement.html", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should set inner HTML content", () => {
    element.html('<p>Hello</p>');
    expect(element.innerHTML).toBe('<p>Hello</p>');
  });
});

describe("HTMLElement.show", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should show the element", () => {
    element.hide(); // first hide
    element.show();
    expect(element.style.visibility).toBe('visible');
  });
});

describe("HTMLElement.hide", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should hide the element", () => {
    element.show(); // first show
    element.hide();
    expect(element.style.visibility).toBe('hidden');
  });
});

describe("HTMLElement.toggle", () => {
  /** @type {HTMLElement} */
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it("should toggle the visibility of the element", () => {
    element.toggle();
    expect(element.style.visibility).toBe('hidden');
    element.toggle();
    expect(element.style.visibility).toBe('visible');
  });
});