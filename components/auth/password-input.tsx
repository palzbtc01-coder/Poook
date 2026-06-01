"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = Omit<React.ComponentProps<typeof Input>, "type" | "leftIcon" | "rightSlot">;

export function PasswordInput(props: Props) {
  const [show, setShow] = React.useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      leftIcon={<Lock />}
      rightSlot={
        <button
          type="button"
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
          onClick={() => setShow((v) => !v)}
          className="rounded-md p-1 text-muted transition-colors hover:text-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}
