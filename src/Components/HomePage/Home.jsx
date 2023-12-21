import { Helmet } from "react-helmet";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TaskManager | Home</title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;