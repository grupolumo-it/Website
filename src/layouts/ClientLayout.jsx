import Header from "../components/common/header/Header.jsx";
import Footer from "../components/common/footer/Footer.jsx";

export default function ClientLayout({ children }) {
  return (
    <div className="client-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}