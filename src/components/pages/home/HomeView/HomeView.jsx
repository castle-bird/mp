import PropTypes from "prop-types";
import HomeViewContainer from "./HomeView_styled";

export default function HomeView({ currentData }) {
    return (
        <HomeViewContainer>
            {currentData && (
                <>
                    <strong>{currentData.role}</strong>
                    <h3>{currentData.title}</h3>
                    <p>{currentData.description}</p>
                    <img src={currentData.image} alt="" />
                </>
            )}
        </HomeViewContainer>
    );
}

HomeView.propTypes = {
    currentData: PropTypes.shape({
        title: PropTypes.string,
        role: PropTypes.string,
        timeline: PropTypes.object,
        tags: PropTypes.array,
        description: PropTypes.string,
        image: PropTypes.string,
    }),
};
