import * as admin from "firebase-admin";
import { firestore, logger } from "firebase-functions";

export class FirestoreHandler {
  // Listens for new messages added to /messages/:documentId/original and creates an
  // uppercase version of the message to /messages/:documentId/uppercase
  static makeUppercase(doc: string) {
    return firestore.document(doc).onCreate(async (snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      logger.log("Uppercasing", context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return await snap.ref.set({ uppercase }, { merge: true });
    });
  }

  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  static async writeDocument(collection: string, doc: unknown) {
    return await admin.firestore().collection(collection).add(doc);
  }
}

export const makeUppercase = FirestoreHandler.makeUppercase;
export const writeDocument = FirestoreHandler.writeDocument;
