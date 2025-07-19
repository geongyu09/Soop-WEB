import { QueryClient } from "@tanstack/react-query";

export type PathTuple = [string, string];

export interface StackContextType {
  history: PathTuple[];
  push: (path: PathTuple) => void;
  pop: () => void;
  queryClient?: QueryClient;
}
