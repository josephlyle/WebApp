import React, { Component } from 'react';

    //    -- TODO flow of github component:
    // enter in a username
    // display repos of that username
    // click on a repo to get the readme.

export class GitHub extends Component {

    constructor(props) {
        super(props);
        this.state = { allRepos: null, user: 'josephlyle', repo: null, loading: true };
    }

    async componentDidMount() {
        this.setState({ loading: false }); // on page load -- go to my github
        this.handleSubmit(null);
    }

    handleChange(event) { // enter username
        this.setState({ user: event.target.value });
    }

    async handleSubmit(event) { // fetch github user
        if (event) { event.preventDefault(); } // if statement let's handleSubmit be called on pageload before an event actually happens
        const response = await fetch('api/GitHubController/getUsersRepos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        });
        const data = await response.json();
        this.setState({ allRepos: data, loading: false });
    }

    // TODO: get the variable repo of whichever repo was clicked
    async readMe() { // "README" dropdown that displays readme
        const _readMe = await fetch('https://raw.githubusercontent.com/' + this.state.user + '/' + this.state.repo + '/master/README.md');
        this.setState({ readMe: _readMe })
    }

    animateJoey() {
        document.getElementById("image").style.backgroundPosition = `-64px 0px`;
    }

    render() {
        if (this.state.allRepos != null) { // if check doesn't work inside return
            // TODO: make the readme a clickable event that calls the readMe() function
            return (
                <div className="git">
                    <form id="gitHubForm" className="form-inline mx-auto" onSubmit={this.handleSubmit.bind(this)}>
                        <input id="usernameInput" value={this.state.user} onChange={this.handleChange.bind(this)} className="form-control mb-5" type="text" placeholder="GitHub Username" />
                        <input type="submit" className="btn btn-primary ml-2 mb-5" value="search"/>
                    </form>
                    
                    {this.state.allRepos.map(repo => (
                        <div className="repoList" key={repo.nodeId}>
                            <ul>
                                <li className="repoName">{repo.name}</li>
                                <li className="repoDesc">{repo.description}</li>
                                <p className="readMe">README</p> 
                                <p className="urlP"><a className="repoUrl"href={repo.htmlUrl} target="_blank">open in github</a></p>
                            </ul>
                        </div>
                    ))}           
                </div>     
            );
        } else { 
            return (
                <div className="gitLoading">
                    loading...
                    <p className="loadingimg"></p>
                </div>       
            );
        }
    } 
}