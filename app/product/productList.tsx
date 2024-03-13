'use client'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useGetProducts from "./useProducts";
import { Product } from "../_settings/interfaces";
import axios from "axios";
export default function ProductList() {
  // const [products, setProducts] = useState([
  //   { desc: "iPad", price: 20000 },
  //   { desc: "iPhone 8", price: 20000 },
  //   { desc: "iPhone X", price: 30000 }
  // ]);
  const [products, addProduct, deleteProduct, updateProduct, isLoading] = useGetProducts();
  const [newProduct, setNewProduct] = useState<Product>({ id: "", desc: "", price: 0, });
  const [status, setStatus] = useState({ visible: false });

  const resetProduct = () => {
    setNewProduct({ id: "", desc: "", price: 0, })
  }

  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "price") {
      setNewProduct({ ...newProduct, [e.target.name]: parseInt(e.target.value) })
    }
    else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
  }
  const hide = () => {
    setStatus({ ...status, visible: false })
  }
  const show = () => {
    setStatus({ ...status, visible: true })
  }
  // function handleClickDesc(e: React.ChangeEvent<HTMLInputElement>) {
  //   setNewProduct({ ...newProduct, desc: e.target.value });
  // }
  // function handleClickPrice(e: React.ChangeEvent<HTMLInputElement>) {
  //   setNewProduct({ ...newProduct, price: Number(e.target.value) });
  // }
  async function sendEmail(subject: string, html: string) {
    try {
      const response = await axios({
        method: 'post',
        url: '/email',
        data: {
          email: "benwu@im.fju.edu.tw",
          subject: subject,
          html: html
        },
      });
      console.log(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
      } else {
        console.error("錯誤");
      }

    }
  }
  function addOrUpdate() {
    if (newProduct.id === "") {
      addProduct(newProduct);
      sendEmail("新增產品", `新增產品 ${newProduct.desc} 成功`);
    }
    else {
      updateProduct(newProduct);
      sendEmail("更新產品", `更新產品 ${newProduct.desc} 成功`);
    }
    setStatus({ ...status, visible: false })
    resetProduct();
    // console.log(products);
  }
  function setUpdateProduct(product: Product) {
    // setProducts(() => [...products, newProduct]);
    setNewProduct({ ...product })
    setStatus({ visible: true })
    // console.log(products);
  }

  return (
    <Box sx={{
      width: '80vw',
      height: '100vh',
      backgroundColor: 'background.paper',
      color: 'black',
      textAlign: 'left'
    }}>
      <Dialog open={status.visible} onClose={hide} aria-labelledby={newProduct.id === "" ? "新增產品" : "更新產品"}>
        <DialogTitle>{newProduct.id === "" ? "新增產品" : "更新產品"}</DialogTitle>
        <DialogContent>
          <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
          <TextField type="number" label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
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
          <Button variant="contained" color="primary" onClick={addOrUpdate}>{newProduct.id === "" ? "新增產品" : "更新產品"}</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Button variant="contained" color="primary" onClick={show}>新增產品</Button>
        {isLoading ? <CircularProgress /> :
          <List subheader="Product list" aria-label="product list">
            {products.map((product) =>
              <ListItem divider key={product.desc}>
                <ListItemText primary={product.desc} secondary={product.price}>
                </ListItemText>
                <IconButton edge="end" aria-label="update" onClick={() => setUpdateProduct(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteProduct(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>)}
          </List>
        }
      </div>
    </Box>
  );
}