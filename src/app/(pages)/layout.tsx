
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
          <Header />

          <div className={`container pageContainer`}>
              {children}
          </div>
          <div className={`footerContainer`}>
            <Footer />
          </div>
    </>
  );
}

