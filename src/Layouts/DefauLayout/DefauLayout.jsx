import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
function DefaultLayout({ children }) {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
