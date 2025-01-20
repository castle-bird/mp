import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import Meta from "./global/Meta.jsx";
import GlobalStyle from "./global/GlobalStyle.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Meta />
        <GlobalStyle />
        <App />
    </BrowserRouter>
);
