"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { refreshCars } from "@/lib/admin/actions/car";
import { RefreshCw } from "lucide-react";

const RefreshButton = () => {
  return (
    <Button variant="outline" size="icon" onClick={() => refreshCars()}>
      <RefreshCw />
    </Button>
  );
};
export default RefreshButton;
