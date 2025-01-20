import styled from "styled-components";

import properties from "../../../global/GlobalStyleVar";
import logo from "../../../images/layout/logo.svg";

const HeaderContainer = styled.header`
    .header-wrap {
        display: flex;
        justify-content: space-between;
        align-content: center;

        max-width: ${properties.breakpoints.desktopSmall};
        margin: 0 auto;
        padding: 0.625rem 0;

        ${properties.mediaQuery.desktopSmall(`
            padding: 0.625rem 15px;
        `)}

        // 로고
        h1 {
            display: flex;
            align-items: center;

            a {
                display: block;
                width: 50px;
                height: 50px;
                background: no-repeat url(${logo}) left top;
                font-size: 0;
                line-height: 0;
            }
        }

        // 네비
        nav {
            position: relative;

            ${properties.mediaQuery.tablet(`
                display: none;     
            `)}

            .line {
                position: absolute;
                left: 0;
                bottom: 5px;
                width: 45px;
                height: 3px;
                background-color: ${properties.colors.primary};
                transition: all 0.1s ease-in-out;
                border-radius: 5px;
            }

            ul {
                display: flex;
                align-items: center;
                height: 100%;
                gap: 2rem;

                li {
                    height: 100%;

                    a {
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        font-size: 1rem;

                        &::before {
                            content: attr(data-text);
                            font-weight: 500;
                            height: 0;
                            line-height: 0;
                            font-size: 1rem;
                            visibility: hidden;
                        }

                        &.active {
                            font-weight: 500;
                        }

                        span {
                            display: flex;
                            align-items: center;
                            height: 100%;
                        }
                    }
                }
            }
        }

        // 햄버거
        .hamburger {
            display: flex;
            align-items: center;
            cursor: pointer;

            input {
                display: none;
            }

            svg {
                /* The size of the SVG defines the overall size */
                height: 3em;

                /* Define the transition for transforming the SVG */
                transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);

                .line {
                    fill: none;
                    stroke: ${properties.colors.default};
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 1.5;

                    /* Define the transition for transforming the Stroke */
                    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
                }

                .line-top-bottom {
                    stroke-dasharray: 12 63;
                }
            }

            input:checked + svg {
                transform: rotate(-45deg);

                .line-top-bottom {
                    stroke-dasharray: 20 300;
                    stroke-dashoffset: -32.42;
                }
            }
        }
    }
`;

export default HeaderContainer;
