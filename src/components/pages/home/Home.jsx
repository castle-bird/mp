import { useContext } from "react";
import { GitContext } from "../../../hooks/GitContext";

import HomeContainer from "./Home_styled";
import HomeList from "./HomeList/HomeList";
import HomeView from "./HomeView/HomeView";


export default function Home() {
    const { gitState } = useContext(GitContext);

    return (
        <HomeContainer>
            {JSON.stringify(gitState)}
            <HomeList />
            <HomeView />
            
        </HomeContainer>
    );
}
