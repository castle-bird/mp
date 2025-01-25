import styled from "styled-components";
import properties from "../../../../global/GlobalStyleVar";

const HomeListContainer = styled.article`
    width: 300px;

    ul {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0.5rem;
            background-color: ${properties.colors.white};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${properties.colors.gray};
            border-radius: 1rem;
        }

        &::-webkit-scrollbar-thumb:hover {
            cursor: pointer;
            background-color: ${properties.colors.primary};
        }

        li {
            padding: 1rem 1rem 0;

            &:last-child {
                padding-bottom: 1rem;
            }

            &.active a {
                box-shadow: 0 0 8px rgba(0 0 0 / 16%);
            }

            &:hover a {
                box-shadow: 0 0 8px rgba(0 0 0 / 16%);
            }

            a {
                display: block;
                padding: 2rem 1rem;
                border-radius: 1.5rem;
                transition: all 0.1s ease-in;

                strong {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: ${properties.colors.primary};
                }

                h3 {
                    font-weight: 600;
                    font-size: 1.125rem;
                }

                p {
                    overflow: hidden;
                    white-space: normal;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: keep-all;
                    color: ${properties.colors.gray2};
                }
            }
        }
    }
`;

export default HomeListContainer;
