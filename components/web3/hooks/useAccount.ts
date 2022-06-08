import { useHooks } from "@components/providers/web3";

export const useAccount = () => useHooks((hooks: any) => hooks.useAccount);
