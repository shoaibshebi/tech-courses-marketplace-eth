import Link from "next/link";
import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/web3/hooks/useAccount";

export default function index() {
  const { connect, connected } = useWeb3();
  const { account } = useAccount()((hooks: any) => hooks.useAccount());

  return (
    <section>
      {"account => " + account}
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/">
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
            <div>
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
                {connected ? "Connected" : "Connect"}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
