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
        this.setState({ loading: false, space: data });
        console.log(this.state.space);
    }

    render() {
        var randy = Math.floor(Math.random() * 25);
        if (this.state.loading) {
            return (
                <div className="reddit">
                    <p>posts from /r/spaceporn</p>
                    loading...
                </div>
            );
        };
        return (
            <div className="reddit">
                <p>posts from /r/spaceporn</p>
                <img className="spaceImg" src={this.state.space[randy]} width="100%" height="100%"/>
            </div>
        );
    }
}