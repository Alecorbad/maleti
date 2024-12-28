
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import PageTransition from "../animations/PageTransition";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <div className={`headerContainer`}>
              <Header />
          </div>
          <div className={`container pageContainer`}>
              {children}
          </div>
          <div className={`footerContainer`}>
            <Footer />
          </div>
    </>
  );
}
