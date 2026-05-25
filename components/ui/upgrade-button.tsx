'use client';

import { Button } from "./button";

export function UpgradeButton({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {

  const go = () => {
    window.location.href = href;
  };

  return (
    <Button onClick={go} className="bg-gradient-to-r from-blue-500 to-cyan-400">
      {children}
    </Button>
  );
}
