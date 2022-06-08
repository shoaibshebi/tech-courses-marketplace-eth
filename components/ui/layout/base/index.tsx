import { Navbar, Footer } from "@components/ui/common";
import { Web3Provider } from "@components/providers";

interface IProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: IProps) {
  return (
    <>
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
