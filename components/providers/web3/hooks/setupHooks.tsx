import { handler as createUseAccount } from "./useAccount";

export const setupHooks = (...deps: any) => {
  return {
    useAccount: createUseAccount(...deps),
  };
};
