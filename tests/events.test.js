describe("EventTarget.addBoundListener", () => {
  it("should cancel the listener after `x` amount of times", () => {
    const div = document.createElement("div");
    document.body.append(div);

    let count = 0;

    div.addBoundListener("click", () => {
      count++;
    }, 2); // Only allow the listener to run twice

    div.click();
    div.click();
    div.click(); // This one should not increase the count

    expect(count).toBe(2);
  });

  it("should cancel the listener when the condition specified returns true", () => {
    const div = document.createElement("div");
    document.body.append(div);

    let ran = false;

    div.addBoundListener("click", () => {
      ran = true;
    }, () => ran);
  });
});