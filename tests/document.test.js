/// <reference path="../types/optidom.lib.d.ts" />

describe("Document.ready", () => {
  it("should run when the document is loaded", () => {
    window.dispatchEvent(new Event("load"));

    new Promise((resolve) => {
      document.ready(() => {
        expect(true).toBeTruthy();
        resolve();
      });
    });
  });
});

describe("Document.leaving", () => {
  it("should run when the user attempts to leave the document", () => {
    window.dispatchEvent(new Event("unload"));

    new Promise(resolve => {
      document.leaving(() => {
        expect(true).toBeTruthy();
        resolve();
      });
    });
  });
});

describe("Document.css", () => {
  it("should set the css for an element class", () => {
    const div = document.createElement("div");
    div.className = "target";
    document.body.appendChild(div);

    document.css("div.target", {
      color: "red"
    });

    const styles = document.css("div.target");
    expect(styles).toHaveProperty("color");
    expect(styles.color).toBe("red");
  });
});