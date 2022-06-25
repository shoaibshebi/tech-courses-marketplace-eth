import { setupHooks } from "./hooks/setupHooks";

const { createContext, useContext, useEffect, useState } = require("react");

import Web3 from "web3";
import { useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "@utils/loadContract";

interface IProps {
  children: React.ReactNode;
}

interface IPropsState {
  web3: any;
  provider: any;
  contract: any;
  isLoading: any;
}

const Web3Context = createContext(null);
const createWeb3State = ({
  web3,
  provider,
  contract,
  isLoading,
}: IPropsState) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

export default function Web3Provider({ children }: IProps) {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  //its for to load provider
  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        //loadcontract from utils
        const contract = await loadContract("CourseMarketplace", web3);

        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api: any) => ({ ...api, isInitialized: true }));
        console.error("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);
  //its for the pupose to connect the provider to the metmask account,
  //and also extending the web3Api useState variable
  const _web3Api = useMemo(() => {
    const { provider, web3, contract, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      getHooks: () => setupHooks({ web3, provider, contract }),
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
  const { hooks } = useWeb3();
  return cb(hooks);
}
