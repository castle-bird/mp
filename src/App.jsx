import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/Header/Header";
import Error404 from "./components/error/error404/Error404";

import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import History from "./components/pages/history/History";

const paths = ["/", "/about", "/history", "/details/:id"];
function App() {
    const location = useLocation();
    const is404 = !paths.some((path) => new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`).test(location.pathname));

    return (
        <div id="body-wrap">
            {!is404 && <Header />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/details/:id" element={<Home />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </main>
            {!is404 && <Footer />}
        </div>
    );
}

export default App;
