import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/config"
import { useEffect, useState } from "react";
import { Product } from "../_settings/interfaces";

export default function useProducts() {
  const db = getFirestore(app);
  // const [products, setProducts] = useState<{ desc: string, price: number }[]>([
  // ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [updated, setUpdated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // let data = [
  //   { desc: "iPad", price: 20000 },
  //   { desc: "iPhone 8", price: 20000 },
  //   { desc: "iPhone X", price: 30000 }
  // ];
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // let data: { desc: string, price: number }[] = [];
      let data: Product[] = [];
      const productRef = collection(db, "product")
      const productQuery = query(productRef, orderBy("price"));
      const querySnapshot = await getDocs(productQuery);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, desc: doc.data().desc, price: doc.data().price })
        // console.log(`${doc.id} => ${doc.data()}`);
      });
      setProducts(() => [...data]);
      setIsLoading(false);
    }
    fetchData();
  }, [db, updated]);

  async function addProduct(product: { desc: string, price: number }) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "product"),
      { desc: product.desc, price: product.price });
    // console.log("Document written with ID: ", docRef.id);
    setUpdated((currentValue) => currentValue + 1)
  }

  async function deleteProduct(id: string) {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "product", id));
      setUpdated((currentValue) => currentValue + 1)
    }
    catch (error) {
      console.error(error);
    }

  }
  // async function updateProduct(product: { id: string, desc: string, price: number }) {
  async function updateProduct(product: Product) {
    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "product", product.id),
        { desc: product.desc, price: product.price });
      setUpdated((currentValue) => currentValue + 1)
    }
    catch (error) {
      console.error(error);
    }

  }

  return [products, addProduct, deleteProduct, updateProduct, isLoading] as const;

}