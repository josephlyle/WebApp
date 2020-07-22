import React, { Component } from 'react';

export class Reddit extends Component {
    static displayName = Reddit.name;

    constructor(props) {
        super(props);
        this.state = { space: null, loading: true };
    }

    async componentDidMount() {
        const response = await fetch('api/RedditController');
        const data = await response.json();
        this.setState({ loading: false, picArray: data });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="reddit">
                    <p className="pageDesc"> interesting pictures from reddit </p>
                    <p>loading...</p>         
                </div>
            );
        }
        var rand = Math.floor(Math.random() * this.state.picArray.length); /* random number to select which picture to show in the array */
        var title = this.state.picArray[rand].item1;
        var img = this.state.picArray[rand].item2;
        var permaLink = "https://www.reddit.com".concat(this.state.picArray[rand].item3);
        return (
            <div className="reddit">
                <p className="pageDesc"> interesting pictures from reddit </p>
                <h1> {title} </h1>  
                <img className="Img" src={img} width="100%" height="100%" /> 
                <footer>
                    <a href={permaLink} target="_blank">click here to see original post</a>
                    <p className="foot"> current subreddits that are used: /r/spaceporn </p>
                </footer>             
            </div>
        );
    }
}