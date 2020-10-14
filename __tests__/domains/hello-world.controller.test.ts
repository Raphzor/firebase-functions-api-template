import * as admin from "firebase-admin";
import { writeMessage } from "../../src/domains/hello-world/hello-world.controller";

jest.mock("firebase-admin");
describe("Tests for helloWorld controller", () => {
  xit("should call firestore function once", async () => {
    const text = "test_1";
    const mockAdd = jest.fn();
    const mockCollection = jest.spyOn(admin.firestore(), "collection");

    mockCollection.mockImplementationOnce(() => {
      return ({ mockAdd } as unknown) as any;
    });

    await writeMessage(text);
    expect(admin.firestore).toHaveBeenCalledTimes(1);
  });
});
