'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import app from "@/app/_firebase/config"
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function ProductList() {
  const [products, setProducts] = useState([
    { desc: "iPad", price: 20000 },
    { desc: "iPhone 8", price: 20000 },
    { desc: "iPhone X", price: 30000 }
  ]);
  const [newProduct, setNewProduct] = useState({ visible: false, desc: "", price: 0 })
  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }
  const db = getFirestore(app);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      let result: any[] = [];
      const querySnapshot = await getDocs(collection(db, "product"));
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          desc: doc.data().desc,
          price: doc.data().price
        });
        console.log(doc.id);

      });
      setProducts(() => [...result]);
    }
    fetchData();
  }, [db]);
  const hide = () => {
    setNewProduct({ ...newProduct, visible: false })
  }
  const show = () => {
    setNewProduct({ ...newProduct, visible: true })
  }
  // function handleClickDesc(e: React.ChangeEvent<HTMLInputElement>) {
  //   setNewProduct({ ...newProduct, desc: e.target.value });
  // }
  // function handleClickPrice(e: React.ChangeEvent<HTMLInputElement>) {
  //   setNewProduct({ ...newProduct, price: Number(e.target.value) });
  // }
  function update() {
    setProducts(() => [...products, newProduct]);
    setNewProduct({ ...newProduct, visible: false })
    console.log(products);
  }
  return (
    <Box sx={{
      width: '80vw',
      height: '100vh',
      backgroundColor: 'background.paper',
      color: 'black',
      textAlign: 'left'
    }}>
      <Dialog open={newProduct.visible} onClose={hide} aria-labelledby="新增產品">
        <DialogTitle>新增產品</DialogTitle>
        <DialogContent>
          <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
          <TextField label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={update}>新增</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Button variant="contained" color="primary" onClick={show}>新增產品</Button>
        <List subheader="Product list" aria-label="product list">
          {products.map((product) =>
            <ListItem divider key={product.desc}>
              <ListItemText primary={product.desc} secondary={product.price}>
              </ListItemText>
            </ListItem>)}
        </List>
      </div>
    </Box>
  );
}