import { SimpleTest } from "./simple-test";

describe("#simpleTest", function () {
  it("should start", async () => {
    const st: SimpleTest = new SimpleTest();
    await st.run();
  });
});
