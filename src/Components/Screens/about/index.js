import "./About.css";
import demoDayImage from "../../../Assets/images/demoday.png";

const About = () => {
    return (
        <div className="about-page">
            <div className="about-demoday">
                <h1>Demoday Timeline and Stages</h1>
            </div>
            <div className="demoday-image">
                <img src={demoDayImage} alt="DemoDay" />
            </div>
            <div className="about-details">
                <h2>1. Call for Ideas</h2>
                <p>
                    This is the initial phase where we invite participants to submit their innovative ideas. The goal is to
                    promote the event and crowdsource a diverse range of concepts. This stage helps us gather creative solutions
                    that address specific challenges or opportunities.
                </p>

                <h2>2. Idea Screening</h2>
                <p>
                    In this phase, all submitted ideas are meticulously screened and evaluated. We assess each idea based on its
                    relevance, feasibility, and alignment with our goals. The most promising ideas are selected for further
                    development.
                </p>

                <h2>3. Team Formation</h2>
                <p>
                    Here, we assemble project teams by pairing subject matter experts (SMEs) with the ideators whose ideas have
                    been selected. This collaboration ensures that each team has the necessary expertise and creativity to bring
                    their idea to life.
                </p>

                <h2>4. Incubation</h2>
                <p>
                    During the incubation period, SMEs provide technical assistance and guidance to the ideators. This includes
                    helping with code development, refining concepts, and overcoming technical challenges to build a robust
                    solution.
                </p>

                <h2>5. Prototype</h2>
                <p>
                    Teams are required to submit a working prototype of their idea. This prototype demonstrates the core
                    functionality and viability of the concept, serving as a proof of concept for further evaluation and
                    refinement.
                </p>

                <h2>6. DemoDay</h2>
                <p>
                    On DemoDay, teams present their ideas and the results of their implementation. This is an opportunity for them
                    to showcase their work, receive feedback, and engage with an audience interested in their innovations.
                </p>
            </div>
        </div>
    );
};

export default About;
