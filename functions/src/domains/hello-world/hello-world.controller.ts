import { firestore } from "firebase-admin";

export class HelloWorldController {
  // Take the text parameter passed to this HTTP endpoint and insert it into
  // Cloud Firestore under the path /messages/:documentId/original
  static async writeMessage(text: string): Promise<string> {
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await firestore()
      .collection("messages")
      .add({ original: text });

    return writeResult.id;
  }
}
