import { Link } from "react-router-dom";
import HeaderContainer from "./Header_styled";
import Nav from "./Nav/Nav";
import Hamburger from "./Hamburger/Hamburger";

export default function Header() {
    return (
        <HeaderContainer>
            <div className="header-wrap">
                <h1>
                    <Link to="/" aria-label="메인 바로가기">
                        Logo
                    </Link>
                </h1>

                {/* 네비 */}
                <Nav />

                {/* 햄버거 */}
                <Hamburger />
            </div>
        </HeaderContainer>
    );
}
