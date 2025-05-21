/// <reference path="../types/optidom.lib.d.ts" />

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

describe('Colorize', () => {
  // Helper regex to check ANSI codes for styles
  const ansiCodes = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;208m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    blue: '\x1b[34m',
    purple: '\x1b[35m',
    pink: '\x1b[38;5;205m',
    bold: '\x1b[1m',
    underline: '\x1b[4m',
    strikethrough: '\x1b[9m',
    italic: '\x1b[3m',
    reset: '\x1b[0m',
  };

  test('Basic colors', () => {
    expect(Colorize`{red:This is red text}`).toContain(ansiCodes.red);
    expect(Colorize`{orange:Bright orange color}`).toContain(ansiCodes.orange);
    expect(Colorize`{yellow:Yellow text example}`).toContain(ansiCodes.yellow);
    expect(Colorize`{green:Green is calm}`).toContain(ansiCodes.green);
    expect(Colorize`{cyan:Cyan looks cool}`).toContain(ansiCodes.cyan);
    expect(Colorize`{blue:Blue skies ahead}`).toContain(ansiCodes.blue);
    expect(Colorize`{purple:Purple power!}`).toContain(ansiCodes.purple);
    expect(Colorize`{pink:Pretty in pink}`).toContain(ansiCodes.pink);
  });

  test('Text styles', () => {
    expect(Colorize`{bold:This text is bold}`).toContain(ansiCodes.bold);
    expect(Colorize`{underline:This text is underlined}`).toContain(ansiCodes.underline);
    expect(Colorize`{strikethrough:Strike this text out}`).toContain(ansiCodes.strikethrough);
    expect(Colorize`{italic:Italic style}`).toContain(ansiCodes.italic);
    expect(Colorize`{emphasis:Emphasis is italic too}`).toContain(ansiCodes.italic);
  });

  test('Mixing and nesting styles', () => {
    const mixed = Colorize`Mixing styles {red:red and {bold:bold red} back to red}`;
    expect(mixed).toContain(ansiCodes.red);
    expect(mixed).toContain(ansiCodes.bold);

    const nested = Colorize`Nested {green:green {underline:underlined} and normal}`;
    expect(nested).toContain(ansiCodes.green);
    expect(nested).toContain(ansiCodes.underline);
  });

  test('Dynamic ANSI code', () => {
    const dynamic = Colorize`Dynamic ANSI {(\\x1b[35m):Custom magenta color}`;
    expect(dynamic).toContain('\x1b[35m');
  });

  test('Shorthand underline and bold', () => {
    const shorthand = Colorize`Shorthand underline {_underlined_} and bold {**bold**} also {*underline*}`;
    expect(shorthand).toContain(ansiCodes.underline);
    expect(shorthand).toContain(ansiCodes.bold);
  });

  test('Escaped braces', () => {
    const escaped = Colorize`Escaped braces \\{this is not a tag\\} and {blue:blue text}`;
    expect(escaped).toContain('{this is not a tag}');
    expect(escaped).toContain(ansiCodes.blue);
  });

  test('Multiple nested styles', () => {
    const multiNested = Colorize`Multiple nested styles {cyan:{underline:underlined cyan} and {bold:bold cyan}}`;
    expect(multiNested).toContain(ansiCodes.cyan);
    expect(multiNested).toContain(ansiCodes.underline);
    expect(multiNested).toContain(ansiCodes.bold);
  });

  test('Complex nesting', () => {
    const complex = Colorize`Complex example: {red:Red {underline:underlined {bold:bold underlined} back} red}`;
    expect(complex).toContain(ansiCodes.red);
    expect(complex).toContain(ansiCodes.underline);
    expect(complex).toContain(ansiCodes.bold);
  });

  test('No tags (plain text)', () => {
    const plain = Colorize`Edge case: text with no tags at all`;
    expect(plain).toBe('Edge case: text with no tags at all' + ansiCodes.reset);
  });

  test('Strikethrough', () => {
    const strike = Colorize`Use strikethrough {strikethrough:this is crossed out}`;
    expect(strike).toContain(ansiCodes.strikethrough);
  });

  test('Throws on missing closing tag for shorthand', () => {
    expect(() => Colorize`{_missing closing}`).toThrow(ColorizedSyntaxError);
    expect(() => Colorize`{**missing closing}`).toThrow(ColorizedSyntaxError);
    expect(() => Colorize`{*missing closing}`).toThrow(ColorizedSyntaxError);
  });

  test('Throws on unknown style', () => {
    expect(() => Colorize`{unknown:this should fail}`).toThrow(ColorizedSyntaxError);
  });
});

describe("ShortcutEvent", () => {
  it("should make a new shortcut event", () => {
    expect(new ShortcutEvent(["ctrl", "shift", "0"]));
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

describe('emitter', () => {
  it('should call listener when event is emitted', () => {
    const listener = jest.fn();

    emitter.on('test', listener);
    emitter.emit('test', 'data');

    expect(listener).toHaveBeenCalledWith('data');
  });

  it('should not call removed listener', () => {
    const listener = jest.fn();

    emitter.on('test', listener);
    emitter.off('test', listener);
    emitter.emit('test');

    expect(listener).not.toHaveBeenCalled();
  });

  it('should handle multiple listeners', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    emitter.on('event', listener1);
    emitter.on('event', listener2);
    emitter.emit('event', 1, 2);

    expect(listener1).toHaveBeenCalledWith(1, 2);
    expect(listener2).toHaveBeenCalledWith(1, 2);
  });
});

describe('features.*', () => {
  beforeEach(() => {
    // Spy on all enable and disable methods
    for (const feature of Object.values(features)) {
      if (feature && typeof feature.enable === "function") {
        jest.spyOn(feature, "enable");
      }
      if (feature && typeof feature.disable === "function") {
        jest.spyOn(feature, "disable");
      }
    }
  });

  afterEach(() => {
    // Restore the original implementations after each test
    jest.restoreAllMocks();
  });

  it('should call enable on all features', () => {
    features.enableAll();

    for (const feature of Object.values(features)) {
      if (feature && typeof feature.enable === "function") {
        feature.enable();
        expect(feature.enable).toHaveBeenCalled();
      }
    }
  });

  it('should call disable on all features', () => {
    features.disableAll();

    for (const feature of Object.values(features)) {
      if (feature && typeof feature.disable === "function") {
        feature.disable();
        expect(feature.disable).toHaveBeenCalled();
      }
    }
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

describe("AccessError", () => {
  it("should extend Error with default message", () => {
    const err = new AccessError();
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("AccessError");
    expect(err.message).toBe("");
  });

  it("should use provided message", () => {
    const err = new AccessError("custom");
    expect(err.message).toBe("custom");
  });
});

describe("CustomError", () => {
  it("should be an error", () => {
    expect(new CustomError()).toBeInstanceOf(Error);
    expect(new CustomError());
  });
});