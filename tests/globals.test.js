/// <reference path="../types/optidom.lib.d.ts" />
import {jest} from '@jest/globals';

describe('type', () => {
  it('should return the data type for a data type\'s input', () => {
    expect(type(42)).toBe("Number");
    expect(type(true)).toBe("Boolean");
    expect(type(false)).toBe("Boolean");
    expect(type(/test/)).toBe("RegExp");
  });

  it('should return the data type plus the length from a data type\'s input', () => {
    expect(type("")).toBe("String(0)");
    expect(type([2, 3, 4])).toBe("Array(3)");
    expect(type({ name: "John", age: 30 })).toBe("Object(2)");
    expect(type({})).toBe("Object(0)");
    expect(type([])).toBe("Array(0)");
  });

  it('should return "null" | "undefined" for a null | undefined input', () => {
    expect(type(null)).toBe("null");
    expect(type(undefined)).toBe("undefined");
  });

  it('should return "Function:<anonymous>(0)" for an anonymous function', () => {
    expect(type(() => {})).toBe("Function:<anonymous>(0)");
  });

  it('should return "Function:myFunction(2)" for a named function with arguments', () => {
    function myFunction(a, b) {}
    expect(type(myFunction)).toBe("Function:myFunction(2)");
  });

  it('should return Map or Set and the size for a Map or Set input input', () => {
    const map = new Map();
    map.set("key1", "value1");
    map.set("key2", "value2");
    expect(type(map)).toBe("Map(2)");
    const set = new Set([1, 2, 3]);
    expect(type(set)).toBe("Set(3)");
  });

  it('should return "Date:2021-09-01" for a valid Date input', () => {
    const date = new Date('2021-09-01');
    expect(type(date)).toBe("Date:2021-09-01");
  });

  it('should return "Date" for an invalid Date input', () => {
    const invalidDate = new Date('invalid-date');
    expect(type(invalidDate)).toBe("Date");
  });
});

describe("isEmpty", () => {
  it("should return true for empty values", () => {
    expect(isEmpty("")).toBeTruthy();
    expect(isEmpty(NaN)).toBeTruthy();
    expect(isEmpty(0)).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty(false)).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
  });

  it("should return false for non-empty values", () => {
    expect(isEmpty("Hello")).toBeFalsy();
    expect(isEmpty([1, 2])).toBeFalsy();
    expect(isEmpty({ key: "value" })).toBeFalsy();
    expect(isEmpty(true)).toBeFalsy();
    expect(isEmpty(1)).toBeFalsy();
    expect(isEmpty(() => {})).toBeFalsy();
    expect(isEmpty(Symbol("x"))).toBeFalsy();
    expect(isEmpty(new Date())).toBeFalsy();
  });
});

describe("f", () => {
  it("should immediately invoke a function", () => {
    let called = false;
    f(() => { called = true; });
    expect(called).toBeTruthy();
    
  });
});

describe("generateID", () => {
  it("should return a unique ID of length 16", () => {
    expect(generateID()).toHaveLength(16);
  });

  it("should generate a unique id each time", () => {
    const id1 = generateID();
    const id2 = generateID();
    expect(id1).not.toBe(id2);
  });

  it('should ensure the ID is readonly', () => {
    const id = generateID();

    expect(() => {
      id = "new-id";
    }).toThrow();
  });
});

describe("createEventListener", () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  it("should call the functions specified when the function to listen to is called", () => {
    let ran = false;

    createEventListener([window.alert], () => { ran = true; });
    window.alert("test");

    expect(ran).toBeTruthy();
  });
});

describe("Storage shims", () => {
  it("LocalStorage should be defined", () => {
    expect(globalThis.LocalStorage).toBeDefined();
  });
  it("SessionStorage should be defined", () => {
    expect(globalThis.SessionStorage).toBeDefined();
  });
  it("Cookie should be defined", () => {
    expect(globalThis.Cookie).toBeDefined();
  });
  it("Sequence should be defined", () => {
    expect(globalThis.Sequence).toBeDefined();
  });
  it("Time should be defined", () => {
    expect(globalThis.Time).toBeDefined();
  });
});

describe("UnknownError", () => {
  it("should extend Error and set name", () => {
    const err = new UnknownError("oops");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("UnknownError");
    expect(err.message).toBe("oops");
  });
});

describe("NotImplementedError", () => {
  it("should extend Error with default message", () => {
    const err = new NotImplementedError();
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("NotImplementedError");
    expect(err.message).toBe("Function not implimented yet.");
  });

  it("should use provided message", () => {
    const err = new NotImplementedError("custom");
    expect(err.message).toBe("custom");
  });
});