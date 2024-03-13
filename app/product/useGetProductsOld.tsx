import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/_firebase/config"
import { useEffect, useState } from "react";

function useGetProducts() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<{ desc: string, price: number }[]>([
    { desc: "iPad", price: 20000 },
    { desc: "iPhone 8", price: 20000 },
    { desc: "iPhone X", price: 30000 }
  ])

  async function fetchData() {
    let data: { desc: string, price: number }[] = [];
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((doc) => {
      data.push({ desc: doc.data().desc, price: doc.data().price })
      console.log(`${doc.id} => ${doc.data()}`);
    });
    setProducts(() => [...data]);
  }
  // fecthData();
  // useEffect(fetchData)

  function addProduct(product: { desc: string, price: number }) {
    setProducts(() => [...products, product]);
    console.log("called");
  }
  return { products, addProduct };

}
export default useGetProducts;