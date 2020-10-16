import { writeMessage } from "../../src/domains/hello-world/hello-world.controller";
import * as firestoreUtils from "../../src/utils/firestore.handler";

jest.mock("firebase-admin");
describe("Tests for helloWorld controller", () => {
  it("should call writeDocument function once, with parameter 'text'", async () => {
    const text = "test_1";
    const spyWriteDocument = jest.spyOn(firestoreUtils, "writeDocument");

    spyWriteDocument.mockImplementationOnce(() => {
      return {} as any;
    });

    await writeMessage(text);
    expect(spyWriteDocument).toHaveBeenCalledTimes(1);
    expect(spyWriteDocument).toHaveBeenCalledWith("messages", {
      original: text,
    });
  });
});
