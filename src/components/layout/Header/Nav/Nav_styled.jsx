import styled from "styled-components";
import properties from "../../../../global/GlobalStyleVar";

const NavContainer = styled.nav`
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
`;

export default NavContainer;
