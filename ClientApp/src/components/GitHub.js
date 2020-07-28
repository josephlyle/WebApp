import React, { Component } from 'react';

export class GitHub extends Component {
    static displayName = GitHub.name;

    constructor(props) {
        super(props);
        this.state = { repos: null, loading: true };
    }

    async componentDidMount() {
        const response = await fetch('api/GitHubController');
        const data = await response.json();
        console.log(data);
        
        this.setState({ repos: data, loading: false});
    }

    async printRepos() {
        return "test";
    }

    render() {
        if (this.state.loading) { return <div className="git"> loading... </div> }
        return (
            <div className="git">
                <h1> graaaaaaaaaaasssss tastes bad </h1>
                <ul>
                        
                </ul>

            </div>
        );
    } 
}