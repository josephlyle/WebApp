import React, { Component } from 'react';
import joeyWhistle from '../images/joey-whistle.png';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    componentDidMount() {
        
    }

    render() {
        console.log(document.height);
        return (
            <div className="home">
                <div className="joeyWhistleContainer">
                    <img className="joey_whistle_spritesheet pixelart" src={joeyWhistle} alt="whistle img" />
                </div>
                <h1>ABOUT</h1>
                
                <h2>Purpose
                    <p>This webapp is a way to help me learn and practice new concepts and tools like .Net, React, dependency injection, Unity, etc..</p>
                </h2>      
                <h2 className="about">Details
                    <p>
                        The <span className="keyword">github</span> page of this application is a simple github search.
                        Mainly used to showcase my personal github, I thought it was appropriate to expand on the functionality of the page by letting the user search github itself.
                        I was also having fun messing around with CSS keyframing and how that can apply to elements within the dom.
                    </p>
                    <p>
                        While browsing <span className="keyword">reddit</span> I was annoyed that I couldn't browse through multiple subreddits at once with just a single click.
                        To remedy this I created a page to grab recent popular posts from different sections of reddit, pulling images and links to display randomly.
                    </p>
                    <p>
                        <span className="keyword">Game</span> development has always been an interest of mine.
                        I've played games my entire life and love the different emotions that they can evoke.
                        Learning new tools like, Unity, Blender, Aesprite help drive me creatively and express myself.
                        Hopefully you'll be seeing our little, whistling alien a lot more in my soon-to-be platformer.
                    </p>
                    <p>The <span className="keyword">design</span> to split this application into a front and back end was to be able to practice things in an environment more indicative to the industry.</p>
                </h2> 
                <h2>Me
                    <p>I guess this is the part where I tell you things you didn't need to know about me.</p>
                    <p>
                        In my freetime I enjoy, bouldering, pottery, working out, reading, biking, video games, and hanging out with friends.
                    </p>
                    <p>
                        I aspire to become a better and more fluent programmer. There is always something to learn and I hope to never lose the drive towards that.
                        I would love to one day be able to inspire others as they have me. So they can create and express themselves through any medium they choose.
                        Whether that's through programs I write, games I make, or pottery I throw, I want to pass on that inspiration to create.
                    </p> 
                </h2>
            </div>
        );
    }
}
