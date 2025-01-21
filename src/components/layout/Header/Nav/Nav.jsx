import navData from "../navData.json";

import { useRef, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import NavContainer from "./Nav_styled";

export default function Nav() {
    const location = useLocation();
    const navLine = useRef(); // 움직이는 선
    const navItems = useRef([]); // nav li 들
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
        <NavContainer>
            <span className="line" ref={navLine}></span>
            <ul>
                {navData.map((val, index) => (
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
        </NavContainer>
    );
}
