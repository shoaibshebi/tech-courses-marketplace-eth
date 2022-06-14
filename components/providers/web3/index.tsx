import { setupHooks } from "./hooks/setupHooks";

const { createContext, useContext, useEffect, useState } = require("react");

import detectEthereumProvider from "@metamask/detect-provider";
import { useMemo } from "react";
import Web3 from "web3";

interface IProps {
  children: React.ReactNode;
}

const Web3Context = createContext(null);

export default function Web3Provider({ children }: IProps) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    isInitialized: false,
    connected: false,
  });

  //its for to load provider
  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isInitialized: true,
        });
      } else {
        setWeb3Api((api: any) => ({ ...api, isInitialized: true }));
        console.error("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);
  //its for the pupose to connect the provider to the metmask account
  const _web3Api = useMemo(() => {
    const { provider, web3 } = web3Api;
    return {
      ...web3Api,
      getHooks: () => setupHooks(web3, provider),
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
              setWeb3Api((api: any) => ({ ...api, connected: true }));
            } catch {
              location.reload();
            }
          }
        : () => {
            console.error("Cant connect to metamask, reload your browser.");
          },
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb: any) {
  const { getHooks } = useWeb3();
  const hooks = getHooks();
  return cb(hooks);
}
