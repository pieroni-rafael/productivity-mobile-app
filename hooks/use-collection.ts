"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  collectionGroup,
  QueryConstraint,
  DocumentData,
  WhereFilterOp,
  OrderByDirection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Document interface with id
interface DocumentWithId extends DocumentData {
  id: string
  status?: string
  companyStatus?: string
}

// Query array type for where conditions
type QueryArray = [string, WhereFilterOp, unknown]

// Order by array type
type OrderByArray = [string, OrderByDirection]

// Custom hook to check if arrays are deeply equal
const useDeepCompareEffect = (callback: () => void, dependencies: unknown[]) => {
  const currentDependenciesRef = useRef<unknown[]>();

  if (
    !currentDependenciesRef.current ||
    !areArraysEqual(currentDependenciesRef.current, dependencies)
  ) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
};

// Helper function to check if two arrays are deeply equal
const areArraysEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!areArraysEqual(a[i] as unknown[], b[i] as unknown[])) return false;
    } else if (typeof a[i] === "object" && typeof b[i] === "object") {
      if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
    } else if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

interface UseCollectionResult {
  documents: DocumentWithId[] | null
  error: string | null
}

export const useCollection = (
  coll: string | null,
  _query: QueryArray | null = null,
  _orderBy: OrderByArray | null = null,
  _query2: QueryArray | null = null,
  _limit: number | null = null,
  isGroup: boolean = false,
  _dynamicQuery: QueryArray | null = null
): UseCollectionResult => {
  const [documents, setDocuments] = useState<DocumentWithId[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!coll) {
    console.log("Coleção não informada");
    return { documents: [], error: "Coleção não informada" };
  }

  useDeepCompareEffect(() => {
    // Early return if no collection
    if (!coll) return;

    let ref = isGroup ? collectionGroup(db, coll) : collection(db, coll);

    const filters: QueryConstraint[] = [];
    if (_query) filters.push(where(..._query));
    if (_query2) filters.push(where(..._query2));
    if (_dynamicQuery) filters.push(where(..._dynamicQuery));
    if (_orderBy) filters.push(orderBy(..._orderBy));
    if (_limit) filters.push(limit(_limit));

    if (filters.length > 0) {
      ref = query(ref, ...filters);
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        const results: DocumentWithId[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.status !== "deleted" &&
            data.companyStatus !== "deleted"
          ) {
            results.push({ ...data, id: doc.id } as DocumentWithId);
          }
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log("Erro na coleção ", coll);
        console.log(error);
        setError("Could not list transactions.");
      }
    );

    return () => unsub();
  }, [coll, isGroup, _query, _query2, _dynamicQuery, _orderBy, _limit]);

  return { documents, error };
};