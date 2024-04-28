'use client'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "@/app/_firebase/config"

export const AuthContext = createContext({ email: 'email', uid: 'id' });
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = getAuth(app);
  // const [account, setAccount] = useState({ email: "", uid: "" });
  const [email, setEmail] = useState('');
  const [uid, setUID] = useState('');
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      setEmail(user.email ? user.email : '');
      setUID(user.uid);
      // setAccount({ email: (user.email ? user.email : ""), uid: user.uid });
    }
    else {
      //清空資料
      setEmail('');
      setUID('');
    }

    console.log("AuthContext in useEffect:", user);
    return () => {
      unsub();
    }
  }
  );
  // useEffect(unsub, []);
  useEffect(unsub, [unsub]);

  //typescript會檢查value的值與createContext的型別是否相符
  return (
    <AuthContext.Provider value={{ email, uid }}>
      {children}
    </AuthContext.Provider>
  );
};
