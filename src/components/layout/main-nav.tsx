import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MainNav = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-background border-b">
      <Link href="/" className="text-2xl font-bold text-primary">Combating Human Trafficking Using AI</Link>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
      </div>
    </div>
  );
};

export default MainNav;


