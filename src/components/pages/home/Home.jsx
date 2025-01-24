import { useContext } from "react";
import { GitContext } from "../../../hooks/GitContext";

import HomeContainer from "./Home_styled";
import HomeList from "./HomeList/HomeList";
import HomeView from "./HomeView/HomeView";

export default function Home() {
    const { gitState, gitDispatch } = useContext(GitContext);

    return (
        <HomeContainer>
            <HomeList gitState={gitState} gitDispatch={gitDispatch} />
            <HomeView gitState={gitState} gitDispatch={gitDispatch} />
        </HomeContainer>
    );
}
