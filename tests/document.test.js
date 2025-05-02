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