﻿import React, { Component } from 'react';

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
                    <p>loading...</p>         
                </div>
            );
        }
        var rand = Math.floor(Math.random() * this.state.picArray.length); /* random number to select which picture to show in the array */
        var img = this.state.picArray[rand].item2;
        while (!img.endsWith(".jpg") && !img.endsWith(".gif") && !img.endsWith(".png")) {
            var rand = Math.floor(Math.random() * this.state.picArray.length);
            var img = this.state.picArray[rand].item2;
        }
        var title = this.state.picArray[rand].item1;
        var permaLink = "https://www.reddit.com".concat(this.state.picArray[rand].item3);
        console.log(img);
        return (
            <div className="reddit">             
                <h1> {title} </h1>  
                <img className="Img" src={img} width="100%" height="100%" /> 
                <footer>
                    <a href={permaLink} target="_blank">click here to see original post</a>
                    <p className="foot"> pool: /r/spaceporn </p>
                </footer>             
            </div>
        );
    }
}