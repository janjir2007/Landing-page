"use client";

import { useContext } from "react";

import { SmoothScrollContext } from "@/components/providers/SmoothScroll";

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return ctx;
}
