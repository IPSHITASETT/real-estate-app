import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;