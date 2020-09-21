import React, { Component } from 'react';
import joeyLoading from '../images/joey-loading.png';
import joeyLoaded from '../images/joey-loaded.png';

export class Reddit extends Component {
    constructor(props) {
        super(props);
        this.state = { picArray: null, loading: true, randomNum: null };
    }

    async componentDidMount() {
        const response = await fetch('api/RedditController');
        const data = await response.json();
        this.setState({ loading: false, picArray: data });
    }

    async handleNextImg(ele) {
        //first remove current image from cache
        var newPicArray = this.state.picArray;
        if (newPicArray) { // allows you to spam next button before cache is filled
            newPicArray.splice(ele, 1);
            this.setState({ picArray: newPicArray });
        }

        // picArray isn't null and we've exhausted it -- reset to null
        if (this.state.picArray && this.state.picArray.length == 0) {
            this.setState({ picArray: null });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="reddit">
                    <form className="form-inline mx-auto">
                        <input className="btn ml-2 mb-5" type="button" value="next image" onClick={this.handleNextImg.bind(this)} />
                        <div className="joey joey_loading">
                            <img className="joey_run_spritesheet pixelart" src={joeyLoading} alt="mascot isn't loading :[" />                        
                        </div>
                    </form>
                    <p>loading</p>         
                </div>
            );
        }
        // if the picArray is exhausted
        if (this.state.picArray == null) {
            return(
                <div>You Won!
                    <p>You've been looking at the hottest 100 posts from /r/spaceporn and /r/earthporn respectively! </p>
                    <p> Go check them out to see more cool stuff or refresh and look again!</p>
                </div>
            );
        }
 
        var rand = Math.floor(Math.random() * this.state.picArray.length); /* random number to select which picture to show in the array */
        var img = this.state.picArray[rand].item2;
        /* have to check because some of the imgs/gifs grabbed from reddit are imbedded deeper than just the raw file ie: not a format we can work with atm */
        while (!img.endsWith(".jpg") && !img.endsWith(".gif") && !img.endsWith(".png")) { 
            this.state.picArray.splice(rand, 1); // remove the image if it's something not a raw image/gif file
            rand = Math.floor(Math.random() * this.state.picArray.length);
            img = this.state.picArray[rand].item2;
        }
        var title = this.state.picArray[rand].item1;
        var permaLink = "https://www.reddit.com".concat(this.state.picArray[rand].item3);
        return (
            <div className="reddit">  
                
                <form className="form-inline mx-auto" onSubmit={this.handleNextImg.bind(this)}>  
                    <input className="btn ml-2 mb-5" type="button" value="next image" onClick={this.handleNextImg.bind(this, rand)} />
                    <div className="joey">
                        <img className="joey_idle_spritesheet pixelart" src={joeyLoaded} alt="mascot isn't loading :[" />
                    </div>
                </form>
                <div className="redditContainer">
                    <h1> {title} </h1>  
                    <img className="redditImg" src={img} width="100%" height="100%" alt=""/> 
                    <footer>
                        <a href={permaLink} target="_blank">click here to see original post</a>
                        <p className="foot">  </p>
                    </footer>
                </div>
            </div>
        );
    }
}