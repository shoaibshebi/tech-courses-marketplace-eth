import { handler as createUseAccount } from "./useAccount";

export const setupHooks = (web3: any) => {
  return {
    useAccount: createUseAccount(web3),
  };
};
