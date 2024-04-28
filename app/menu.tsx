'use client';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './account/AuthContext';
import { useContext, useState, useEffect } from 'react';
import app from "@/app/_firebase/config"
import { getAuth } from 'firebase/auth';

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const authContext = useContext(AuthContext);
  const auth = getAuth(app);
  const user = useState({ email: "", uid: "" })
  useEffect(() => {


  }, [])

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" variant={pathname === "/" ? "outlined" : "text"} onClick={() => router.push("/")}>主頁面</Button>
        <Button color="inherit" variant={pathname === "/product" ? "outlined" : "text"} onClick={() => router.push("/product")}>產品管理</Button>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>

        </Typography>
        {authContext.email}
        {authContext.email === "" ?
          <Button color="inherit" onClick={() => router.push("/account")}>登入</Button> :
          <Button color="inherit" onClick={() => auth.signOut()}>登出</Button>}

      </Toolbar>

    </AppBar>
  );
}
