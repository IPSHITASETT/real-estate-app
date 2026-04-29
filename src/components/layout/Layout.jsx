import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationToast from "../common/NotificationToast";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <NotificationToast />
      <main style={{ padding: "20px" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;