import React, { Component } from 'react';

    //    -- TODO flow of github component:
    // enter in a username
    // display repos of that username
    // click on a repo to get the readme.

export class GitHub extends Component {

    constructor(props) {
        super(props);
        this.state = { allRepos: null, user: '', repo: null, loading: true };
    }

    async componentDidMount() {
        this.setState({ loading: false });
    }
    
    handleChange(event) { // enter username
        this.setState({ user: event.target.value });
    }

    async handleSubmit(event) { // once submit, get repos of that username
        event.preventDefault();
        const response = await fetch('api/GitHubController/getUsersRepos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        });
        const data = await response.json();
        console.log(data);
        this.setState({ allRepos: data, loading: false });
    }

    // TODO: get the variable repo of whichever repo was clicked
    async readMe() { // "README" dropdown that displays readme
        const _readMe = await fetch('https://raw.githubusercontent.com/' + this.state.user + '/' + this.state.repo + '/master/README.md');
        this.setState({ readMe: _readMe })
    }
    
    render() {
        if (this.state.allRepos != null) { // ifcheck doesn't work inside return
            // TODO: apply some css and manipulation to the allRepos
            return (
                <div className="git">
                    <form id="gitHubForm" className="form-inline mx-auto" onSubmit={this.handleSubmit.bind(this)}>
                        <input id="usernameInput" value={this.state.user} onChange={this.handleChange.bind(this)} className="form-control mb-5" type="text" placeholder="GitHub Username" />
                        <input type="submit" className="btn btn-primary ml-2 mb-5" value="Submit" />
                    </form>
                    
                    {this.state.allRepos.map(repo => (
                        <div className="repolist" key={repo.nodeId}>
                            <ul>
                                <li>{repo.name}</li>
                                <li>{repo.description}</li>
                                <li>{repo.htmlUrl}</li>  
                            </ul>
                        </div>
                    ))}           
                </div>     
            );
        } else {
            return (
                <div className="git">
                    <form id="gitHubForm" className="form-inline mx-auto" onSubmit={this.handleSubmit.bind(this)}>
                        <input id="usernameInput" value={this.state.user} onChange={this.handleChange.bind(this)} className="form-control mb-5" type="text" placeholder="GitHub Username" />
                        <input type="submit" className="btn btn-primary ml-2 mb-5" value="Submit" />
                    </form>
                </div>
            );
        }
    } 
}