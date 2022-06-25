import "@styles/globals.css";
interface IProps {
  children: React.ReactNode;
}

const Noop = ({ children }: IProps) => <>{children}</>;

function MyApp({ Component, pageProps }: any) {
  const Layout = Component.Layout ?? Noop;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
