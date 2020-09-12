import { firestore } from "firebase-admin";
import { https, Response } from "firebase-functions";

export class HelloWorldController {
  // Take the text parameter passed to this HTTP endpoint and insert it into
  // Cloud Firestore under the path /messages/:documentId/original
  static async writeMessage(req: https.Request, res: Response) {
    // Grab the text parameter.
    const original = req.query.text;

    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await firestore()
      .collection("messages")
      .add({ original: original });

    // Send back a message that we've succesfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  }
}
