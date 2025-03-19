import PropTypes from "prop-types";
import { createContext, useReducer, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

async function getGitAPI() {
  
    const response = await axios.get(
        "https://castle-bird-default-rtdb.firebaseio.com/work_archive.json"
    );
    const data = response.data;

    const sortedJsonData = data
        .sort((a, b) => new Date(b.timeline.start) - new Date(a.timeline.start));


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
    const location = useLocation();
    const [gitState, gitDispatch] = useReducer(gitReducer, init);
    const [currentData, setCurrentData] = useState({});

    const [test, setTest] = useState()

    useEffect(() => {
        getGitAPI()
            .then((jsonData) => {
                gitDispatch({ type: "FETCH_SUCCESS", data: jsonData });
                setTest(jsonData)
            })
            .catch((error) => {
                gitDispatch({ type: "FETCH_ERROR", data: error });
            });
    }, []);

    // view에서 현재 데이터를 넘기기 위함
    useEffect(() => {
        // 처음에 data가 세팅 안됏을 때 리턴
        if(gitState.data === null) return

        // url이 /details/:id인지 아닌지 체크
        // 맞으면 id 리턴
        // 아니면 '' 
        const replacedPath = location.pathname.startsWith("/details/")
            ? location.pathname.replace("/details/", "")
            : '0';

        // /details/:id 가 아니면 첫 번째를 넘겨준다
        if(replacedPath === '0') {
            setCurrentData(gitState.data[0]);
        }

        // /details/:id 가 맞다면 그에 맞는 페이지 넘겨준다
        if (replacedPath !== "0" && gitState.data) {
            setCurrentData(gitState.data.find((val) => val.id === Number(replacedPath)));
        }
    }, [location, gitState]);

    return (
        <GitContext.Provider value={{ gitState, gitDispatch, currentData, setCurrentData }}>
            {test && JSON.stringify(test)}
            {children}
        </GitContext.Provider>
    );
}

GitProvider.propTypes = {
    children: PropTypes.node,
};
