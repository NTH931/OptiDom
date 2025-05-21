/// <reference path="../types/optidom.lib.d.ts" />

describe("NodeList.addClass, NodeList.removeClass, NodeList.toggleClass", () => {
  /** @type {NodeList} */
  let nodeList;

  beforeEach(() => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    document.body.append(div1);
    document.body.append(div2);
    div1.classList.add('item');
    div2.classList.add('item');
    nodeList = document.querySelectorAll('div');
  });

  it("should add the class to each element", () => {
    nodeList.addClass('new-class');
    expect(nodeList[0].classList.contains('new-class')).toBeTruthy();
    expect(nodeList[1].classList.contains('new-class')).toBeTruthy();
  });

  it("should add the class to each element", () => {
    nodeList.removeClass('item');
    expect(nodeList[0].classList.contains('item')).toBeFalsy();
    expect(nodeList[1].classList.contains('item')).toBeFalsy();
  });
});

describe("NodeList.single", () => {
  /** @type {NodeList} */
  let nodeList;

  beforeEach(() => {
    document.body.append(document.createElement('div'));
    document.body.append(document.createElement('div'));
    nodeList = document.querySelectorAll('div');
  });

  it("should return the first element", () => {
    const firstElement = nodeList.single();
    expect(firstElement).toBe(nodeList[0]);
  });

  it("should return null for an empty NodeList", () => {
    nodeList = [];
    const firstElement = document.querySelectorAll('p').single();
    expect(firstElement).toBe(null);
  });
});

describe("HTMLCollection.addClass, HTMLCollection.removeClass, HTMLCollection.toggleClass", () => {
  /** @type {HTMLCollectionOf<HTMLDivElement>} */
  let htmlCollection;

  beforeEach(() => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    document.body.append(div1);
    document.body.append(div2);
    div1.classList.add('item');
    div2.classList.add('item');
    htmlCollection = document.getElementsByTagName('div');
  });

  it("should add the class to each element", () => {
    htmlCollection.addClass('new-class');
    expect(htmlCollection[0].classList.contains('new-class')).toBeTruthy();
    expect(htmlCollection[1].classList.contains('new-class')).toBeTruthy();
  });

  it("should add the class to each element", () => {
    htmlCollection.removeClass('item');
    expect(htmlCollection[0].classList.contains('item')).toBeFalsy();
    expect(htmlCollection[1].classList.contains('item')).toBeFalsy();
  });
});

describe("HTMLCollection.single", () => {
  /** @type {HTMLCollectionOf<HTMLDivElement>} */
  let htmlCollection;

  beforeEach(() => {
    document.body.append(document.createElement('div'));
    document.body.append(document.createElement('div'));
    htmlCollection = document.getElementsByTagName('div');
  });

  it("should return the first element", () => {
    const firstElement = htmlCollection.single();
    expect(firstElement).toBe(htmlCollection[0]);
  });

  it("should return null for an empty HTMLCollection", () => {
    const firstElement = document.getElementsByTagName("p").single();
    expect(firstElement).toBe(null);
  });
});