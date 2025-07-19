"use client";

import { PropsWithChildren, useCallback, useState } from "react";

import StackContext from "../context/stackContext";
import type { PathTuple } from "../types";

export default function StackLinkProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<PathTuple[]>([]);
  // const [queryClient] = useState(client);

  const push = useCallback((pathTuple: PathTuple) => {
    setHistory((prev) => [...prev, pathTuple]);
  }, []);

  const pop = useCallback(() => {
    setHistory((prev) => prev.slice(0, -1));
  }, []);

  return (
    <StackContext.Provider value={{ history, push, pop }}>
      <div id="stack-main" className="relative">
        {children}
      </div>
      <div id="stack-root" />
    </StackContext.Provider>
  );
}
