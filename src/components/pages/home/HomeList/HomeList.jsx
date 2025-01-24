import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import HomeListContainer from "./HomeList_styled";

export default function HomeList({ gitState: { loading, data, error } }) {
    return (
        <HomeListContainer>
            {loading && "로딩"}
            {error && "에러"}


            {data &&
                <ul>
                    {data.map((val, idx)=>(
                        <li key={idx}>
                            <Link to={`/details/${val.id}`}>
                                {val.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </HomeListContainer>
    );
}

HomeList.propTypes = {
    gitState: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([null])]),
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    }),
};
