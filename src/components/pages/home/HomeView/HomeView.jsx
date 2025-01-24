import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import HomeViewContainer from "./HomeView_styled";

export default function HomeView({ gitState: { loading, data, error } }) {
    const [currentData, setCurrentData] = useState();

    // 첫 로딩 시, 첫 번째 목록 보여주기 위함
    useEffect(() => {
        data && setCurrentData(data[1]);
    }, [data]);

    return (
        <HomeViewContainer>
            {loading && "로딩중"}
            {error && "에러"}
            {data && JSON.stringify(currentData)}
        </HomeViewContainer>
    );
}

HomeView.propTypes = {
    gitState: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([null])]),
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    }),
};
