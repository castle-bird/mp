import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import HeaderContainer from "./Header-styled";

// 네비 임시 데이터
const navList = [
    {
        link: "/",
        depth1: "Home",
    },
    {
        link: "/about",
        depth1: "About",
    },
    {
        link: "/history",
        depth1: "History",
    },
    {
        link: "https://github.com/castle-bird",
        depth1: "GitHub",
        external: true, // 외부 링크 여부
    },
];

export default function Header() {
    const navLine = useRef(); // 움직이는 선
    const navItems = useRef([]); // li 들
    const location = useLocation();
    let resizeTimer = useRef(); // debounce작업을 위함 - 리사이즈 과부화 막기

    useEffect(() => {
        if (navItems.current.length > 0) {
            // 새로고침 했을 때 line의 위치가 초기화 되는 상태(맨 처음으로 돌아가는)를 막기 위함
            // path받아서 위치 초기화 시킨다.
            const currentPath = location.pathname; // 현재 path
            const currentNavItem = navItems.current.find((item) => item.querySelector("a").getAttribute("href") === currentPath); // a태그 중에서 href === path 인것만 find

            if (currentNavItem) {
                updateNavLine(currentNavItem);
            } else {
                navLine.current.style.display = "none";
            }

            // resize시 폰트크기가 달라져서 .line의 크기도 변경되어야 함
            // resize과부화를 막기위해 debounce작업
            // resize 끝나고 0.2초 후에 사이즈 재조정
            window.addEventListener("resize", () => {
                clearTimeout(resizeTimer.current);

                resizeTimer.current = setTimeout(() => {
                    console.log("ads");
                    updateNavLine(currentNavItem);
                }, 200);
            });
        }
    }, [location]);

    // 크기/위치 잡는 함수
    const updateNavLine = (target) => {
        const targetLeft = target.offsetLeft;
        const targetWidth = target.offsetWidth;

        navLine.current.style.left = `${targetLeft}px`;
        navLine.current.style.width = `${targetWidth}px`;
    };

    const navClick = (e) => {
        const target = e.currentTarget;
        updateNavLine(target);
    };

    return (
        <HeaderContainer>
            <div className="header-wrap">
                <h1>
                    <Link to="/" aria-label="메인 바로가기">
                        Logo
                    </Link>
                </h1>

                <nav>
                    <span className="line" ref={navLine}></span>
                    <ul>
                        {navList.map((val, index) => (
                            <li key={index} onClick={navClick} ref={(el) => (navItems.current[index] = el)}>
                                {val.external ? (
                                    <a href={val.link} target="_blank" rel="noopener noreferrer" data-text={val.depth1}>
                                        <span>{val.depth1}</span>
                                    </a>
                                ) : (
                                    <NavLink to={val.link} data-text={val.depth1}>
                                        <span>{val.depth1}</span>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <label className="hamburger">
                    <input type="checkbox" />
                    <svg viewBox="0 0 32 32">
                        <path
                            className="line line-top-bottom"
                            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                        ></path>
                        <path className="line" d="M7 16 27 16"></path>
                    </svg>
                </label>
            </div>
        </HeaderContainer>
    );
}
