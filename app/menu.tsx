'use client';
import { AppBar, Button, Toolbar } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './account/AuthContext';
import { useContext } from 'react';

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const authContext = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" variant={pathname === "/" ? "outlined" : "text"} onClick={() => router.push("/")}>主頁面</Button>
        <Button color="inherit" variant={pathname === "/product" ? "outlined" : "text"} onClick={() => router.push("/product")}>產品管理</Button>
        {authContext}
      </Toolbar>
    </AppBar>
  );
}
