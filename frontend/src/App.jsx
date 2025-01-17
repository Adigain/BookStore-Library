import "./App.css";
import "./index.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvide } from "./context/AuthContext";



function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard", ];
  const shouldHideNavbar = hideNavbarRoutes.some((route) => location.pathname.includes(route));

  return (
    <>
      <AuthProvide>
        {!shouldHideNavbar && <Navbar />}
        {shouldHideNavbar ?
        <div >
        <main className="min-h-screen max-w-screen-2xl mx-auto font-primary">
          <Outlet />
        </main>
        </div> :
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("../src/bg-opq.png")' }}>
          <Outlet />
        </main>}
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;
