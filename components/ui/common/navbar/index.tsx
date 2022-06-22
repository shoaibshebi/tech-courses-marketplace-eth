import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3";
import ActiveLink from "../link";

export default function Navbar() {
  const { connect, connected, web3 } = useWeb3();
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
          <div className="flex flex-col xs:flex-row justify-between">
            <div>
              <ActiveLink href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href="/blog">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blog
                </a>
              </ActiveLink>
            </div>
            <div className="text-center">
              {account?.data && !pathname.includes("/marketplace") && (
                <div className="flex justify-end pt-1 sm:px-6 lg:px-8 mt-2">
                  <div className="text-white bg-turk rounded-md p-2">
                    {account?.data}
                  </div>
                </div>
              )}
              <a
                href="#"
                onClick={connect}
                className="px-8 py-3 border-2 rounded-full text-base font-medium text-black border-turk hover:text-white hover:bg-turk"
              >
                {connected
                  ? account.isAdmin
                    ? "Hi there admin"
                    : "Hi there user"
                  : "Connect"}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
