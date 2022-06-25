// @ts-nocheck
import { useRouter } from "next/router";
import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3";
import ActiveLink from "../link";

export default function Navbar() {
  const { connect, connected, web3, provider } = useWeb3();
  const { pathname } = useRouter();
  const { account } = useAccount();

  return (
    <section
      style={{
        width: "80rem",
        background: "white",
        zIndex: "10",
        height: "70px",
      }}
    >
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Buy Here
                </a>
              </ActiveLink>
              <ActiveLink href="/blog">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blog
                </a>
              </ActiveLink>
              <ActiveLink href="/howto">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  How To
                </a>
              </ActiveLink>
            </div>
            <div className="text-center flex items-center justify-center">
              {
                <div className="flex justify-end sm:px-6 lg:px-8">
                  <div className="text-white text-xs bg-turk rounded-md p-2">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://metamask.io/"
                    >
                      {account?.data && provider
                        ? account?.data
                        : "Install Metamask!"}
                    </a>
                  </div>
                </div>
              }
              <button
                className={`${
                  !provider && "disabled:opacity-10 disabled:cursor-not-allowed"
                } `}
              >
                <a
                  href="#"
                  onClick={connect}
                  className={`px-8 py-3 ${
                    !provider && "opacity-50 disabled:cursor-not-allowed"
                  } border-2 rounded-full text-base font-medium text-black border-turk ${
                    provider && "hover:text-white hover:bg-turk"
                  }`}
                >
                  {account?.data ? "Hi Meta Lover" : "Connect"}
                </a>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
