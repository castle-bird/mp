import PropTypes from "prop-types";
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

async function getGitAPI() {
    const config = {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: import.meta.env.VITE_GIT_TOKEN,
            "X-GitHub-Api-Version": "2022-11-28",
        },
    };

    const response = await axios.get("https://api.github.com/repos/castle-bird/myApi/contents/api.json", config);
    const data = response.data;
    const decodedBase64 = atob(data.content); // Base64로 디코딩된 문자열
    const decodedContent = new TextDecoder("utf-8").decode(Uint8Array.from(decodedBase64, (c) => c.charCodeAt(0)));
    const jsonData = JSON.parse(decodedContent);

    

    const sortedJsonData = jsonData.slice().sort((a,b) => new Date(b.timeline.start) - new Date(a.timeline.start));
    // console.log( 'jsonData', jsonData)
    // console.log( 'sortedJsonData', sortedJsonData)

    return sortedJsonData;
}

export const GitContext = createContext();

// 데이터 초기상태
const init = {
    loading: true,
    data: null,
    error: false,
};

function gitReducer(state, action) {
    switch (action.type) {
        case "FETCH_SUCCESS":
            console.log(action.data)

            return {
                ...state,
                loading: false,
                data: action.data,
                error: false,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                data: null,
                error: action.data,
            };
        default:
            return state;
    }
}

export function GitProvider({ children }) {
    const [gitState, gitDispatch] = useReducer(gitReducer, init);

    useEffect(() => {
        getGitAPI()
            .then((jsonData) => {
                gitDispatch({ type: "FETCH_SUCCESS", data: jsonData });
            })
            .catch((error) => {
                gitDispatch({ type: "FETCH_ERROR", data: error });
            });
    }, []);

    return <GitContext.Provider value={{ gitState, gitDispatch }}>{children}</GitContext.Provider>;
}

GitProvider.propTypes = {
    children: PropTypes.node,
};