'use client';
import { useState } from 'react';
export default function MyButton() {
  const [nums, setNums] = useState<number[]>([]);
  function handleClick() {
    let num = Math.floor(Math.random() * 10);
    setNums(nums => [...nums, num]);
  }

  return (
    <div>
      {nums.map((value) => value + " ")}
      < button onClick={handleClick} >
        點我
      </button >
    </div>
  );
}