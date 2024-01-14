"use client";
import React, { useEffect } from "react";
import { useState } from "react";

export default function ClientWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <div>{children}</div>;
}
