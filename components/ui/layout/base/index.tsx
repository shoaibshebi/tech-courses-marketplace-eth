import { Navbar, Footer } from "@components/ui/common";
import { Web3Provider } from "@components/providers";
import Script from "next/script";
interface IProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: IProps) {
  return (
    <>
      <Script
        src="/js/truffle-contract.js"
        //load this script before below script
        strategy="beforeInteractive"
      />
      <Web3Provider>
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">{children}</div>
        </div>
        <Footer />
      </Web3Provider>
    </>
  );
}
