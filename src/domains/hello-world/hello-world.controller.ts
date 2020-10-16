import { writeDocument } from "../../utils/firestore.handler";

class HelloWorldController {
  // Take the text parameter passed to this HTTP endpoint and insert it into
  // Cloud Firestore under the path /messages/:documentId/original
  static async writeMessage(text: string): Promise<string> {
    return (await writeDocument("messages", { original: text })).id;
  }
}

export const writeMessage = HelloWorldController.writeMessage;
