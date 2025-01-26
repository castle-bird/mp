import PropTypes from "prop-types";
import HomeViewContainer from "./HomeView_styled";
import Loading from "../../../loading/Loading";

export default function HomeView({
    currentData: { id, role, title, timeline, logo, logoAlt, description, tags },
}) {
    if (!id) {
        return (
            <HomeViewContainer>
                <Loading />
            </HomeViewContainer>
        );
    }

    // 총일수 계산
    const startDate = new Date(timeline.start);
    const endDate = new Date(timeline.end);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // 태그 클래스 매핑
    const tagClassMap = {
        퍼블리싱: "pub",
        공공기관: "public",
        WEB: "web",
        운영: "manage",
        구축: "build",
        웹접근성: "accessibility",
        nexacro: "nexacro",
        si: "si",
        입사: "join",
    };

    return (
        <HomeViewContainer>
            <div className="home-view-wrap">
                <strong>{role}</strong>
                <h4>
                    <em>프로젝트 명</em>
                    <span className="content">{title}</span>
                </h4>
                <div className="logo">
                    <img src={logo} alt={logoAlt} />
                </div>
                <ul className="timeline">
                    <li>
                        <em>시작일</em>
                        <span className="content">{timeline.start}</span>
                    </li>

                    {timeline.end && (
                        <li>
                            <em>종료일</em>
                            <span className="content">{timeline.end}</span>
                        </li>
                    )}
                    {totalDays > 0 && (
                        <li>
                            <em>총일수</em>
                            <span className="content">{totalDays} 일</span>
                        </li>
                    )}
                </ul>

                <p className="description">
                    <em>프로젝트 후기</em>
                    <span className="content">{description}</span>
                </p>
            </div>
            <ul className="tags">
                {tags.map((tag, idx) => (
                    <li key={idx}>
                        <span className={tagClassMap[tag] || "anthor"}># {tag}</span>
                    </li>
                ))}
            </ul>
        </HomeViewContainer>
    );
}

HomeView.propTypes = {
    currentData: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        role: PropTypes.string,
        timeline: PropTypes.shape({
            start: PropTypes.string,
            end: PropTypes.string,
        }),
        tags: PropTypes.array,
        description: PropTypes.string,
        logo: PropTypes.string,
        logoAlt: PropTypes.string,
    }),
};
