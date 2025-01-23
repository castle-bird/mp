import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import HomeListContainer from "./HomeList_styled";

export default function HomeList({ gitState: { loading, data, error } }) {
    return (
        <HomeListContainer>
            <ul>
                <li>{data && <Link to={`/details/${data[0].id}`}>{data[0].title}</Link>}</li>
            </ul>
        </HomeListContainer>
    );
}

HomeList.propTypes = {
    gitState: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.oneOfType([
            PropTypes.array, 
            PropTypes.oneOf([null])
        ]),
        error: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.object
        ]),
    }),
};
