"use client";

import { useReducer, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FirestoreState {
  document: DocumentReference | string | null
  isPending: boolean
  error: string | null
  success: boolean | null
}

type FirestoreActionType = 
  | "IS_PENDING" 
  | "ADDED_DOCUMENT" 
  | "SET_DOCUMENT" 
  | "DELETED_DOCUMENT" 
  | "UPDATED_DOCUMENT" 
  | "ERROR"

interface FirestoreAction {
  type: FirestoreActionType
  payload?: DocumentReference | string | null
  status?: string
}

type FirestoreOperationResult = 
  | { type: "SUCCESS"; payload: string }
  | { type: "ERROR"; payload: string }

const initialState: FirestoreState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state: FirestoreState, action: FirestoreAction): FirestoreState => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload || null,
        success: true,
        error: null,
      };
    case "SET_DOCUMENT":
      return {
        isPending: false,
        document: action.payload || null,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload || null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload as string || null,
      };
    default:
      return { ...state, isPending: false };
  }
};

interface UseFirestoreReturn {
  addDocument: (doc: DocumentData) => Promise<FirestoreOperationResult>
  deleteDocument: (id: string) => Promise<FirestoreOperationResult>
  createDocument: (id: string, data: DocumentData) => Promise<FirestoreOperationResult>
  updateDocument: (id: string, updates: DocumentData) => Promise<FirestoreOperationResult>
  addSubDocument: (docId: string, subcoll: string, data: DocumentData) => Promise<FirestoreOperationResult>
  updateSubDocument: (docId: string, subcoll: string, subDocId: string, updates: DocumentData) => Promise<FirestoreOperationResult>
  deleteSubDocument: (docId: string, subcoll: string, subDocId: string) => Promise<FirestoreOperationResult>
  status: string
  response: FirestoreState
}

export const useFirestore = (coll: string): UseFirestoreReturn => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [status, setStatus] = useState<string>("idle");
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  // Collection ref
  const ref = collection(db, coll);

  // Only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: FirestoreAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // Add a document
  const addDocument = async (doc: DocumentData): Promise<FirestoreOperationResult> => {
    dispatch({ type: "IS_PENDING", status: "pending" });
    setStatus("pending");
    try {
      const createdAt = new Date().getTime();
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        status: "success",
        payload: addedDocument,
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "SUCCESS", payload: addedDocument.id };
    } catch (err) {
      const error = err as Error;
      console.log(`Error adding document to ${coll}`, error);
      console.log("Document => ", doc);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  // Set a document
  const createDocument = async (id: string, data: DocumentData): Promise<FirestoreOperationResult> => {
    setStatus("pending");
    const createdAt = new Date().getTime();
    const completeData = {
      ...data,
      id,
      createdAt,
    };

    try {
      await setDoc(doc(db, coll, id), completeData);

      dispatchIfNotCancelled({
        type: "SET_DOCUMENT",
        status: "success",
        payload: id,
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "SUCCESS", payload: id };
    } catch (err) {
      const error = err as Error;
      console.log(`Error creating document ${id} to ${coll}`, error);
      console.log(`Data would be: `, completeData);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  // Update a document
  const updateDocument = async (id: string, updates: DocumentData): Promise<FirestoreOperationResult> => {
    dispatch({ type: "IS_PENDING", status: "pending" });
    setStatus("pending");
    try {
      const docRef = doc(db, coll, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().getTime(),
      });
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        status: "success",
        payload: id,
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      console.log(`Updated document ${id} to ${coll}`);
      return { type: "SUCCESS", payload: id };
    } catch (err) {
      const error = err as Error;
      console.log(`Error updating document ${id} to ${coll}`, error);
      console.log(`Updates would be: `, updates);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  // Remove a document
  const deleteDocument = async (id: string): Promise<FirestoreOperationResult> => {
    dispatch({ type: "IS_PENDING", status: "pending" });
    setStatus("pending");
    try {
      await deleteDoc(doc(ref, id));
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        status: "success",
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "SUCCESS", payload: "" };
    } catch (err) {
      const error = err as Error;
      console.log(`Error deleting document ${id} for collection ${coll}`, error);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  const addSubDocument = async (docId: string, subcoll: string, data: DocumentData): Promise<FirestoreOperationResult> => {
    dispatch({ type: "IS_PENDING", status: "pending" });
    setStatus("pending");
    try {
      const createdAt = new Date().getTime();
      const subcollRef = collection(db, `${coll}/${docId}/${subcoll}`);
      const addedSubDocument = await addDoc(subcollRef, { ...data, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        status: "success",
        payload: addedSubDocument,
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "SUCCESS", payload: addedSubDocument.id };
    } catch (err) {
      const error = err as Error;
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  // Remove a subdocument
  const deleteSubDocument = async (docId: string, subcoll: string, subDocId: string): Promise<FirestoreOperationResult> => {
    dispatch({ type: "IS_PENDING", status: "pending" });
    setStatus("pending");
    try {
      const subDocRef = doc(db, `${coll}/${docId}/${subcoll}`, subDocId);
      await deleteDoc(subDocRef);
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        status: "success",
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "SUCCESS", payload: "" };
    } catch (err) {
      const error = err as Error;
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  const updateSubDocument = async (docId: string, subcoll: string, subDocId: string, updates: DocumentData): Promise<FirestoreOperationResult> => {
    dispatch({ type: "IS_PENDING", status: "pending" });
    setStatus("pending");
    try {
      const subDocRef = doc(db, `${coll}/${docId}/${subcoll}`, subDocId);
      await updateDoc(subDocRef, {
        ...updates,
        lastEdited: new Date().getTime(),
      });
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: subDocId,
        status: "success",
      });
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      return { type: "SUCCESS", payload: subDocId };
    } catch (err) {
      const error = err as Error;
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
        status: "error",
      });
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return { type: "ERROR", payload: error.message };
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return {
    addDocument,
    deleteDocument,
    createDocument,
    updateDocument,
    addSubDocument,
    updateSubDocument,
    deleteSubDocument,
    status,
    response,
  };
};