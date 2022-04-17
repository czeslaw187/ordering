import Navbar from "./Navbar";

function Layout({children}) {
    return ( 
        <>
        <Navbar />
        <div className="h-screen">
            {children}
        </div>
        </>
     );
}

export default Layout;