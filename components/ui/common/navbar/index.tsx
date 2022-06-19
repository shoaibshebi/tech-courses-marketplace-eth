import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3";

export default function Navbar() {
  const { connect, connected, web3 } = useWeb3();
  const { pathname } = useRouter();
  const { account } = useAccount();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div className="text-center">
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              <a
                href="#"
                onClick={connect}
                className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
      {account?.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8 mt-2">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account?.data}
          </div>
        </div>
      )}
    </section>
  );
}
