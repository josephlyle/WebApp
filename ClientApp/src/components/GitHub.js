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

    async readMeClick(repoName, repoId) { // "README" dropdown that displays readme
        if (document.getElementById(repoName) == null) { // if the element doesn't exist yet create it
            const response = await fetch('https://raw.githubusercontent.com/' + this.state.user + '/' + repoName + '/master/README.md');
            const readMe = await response.text();
            //create div containing the readMe text
            //var div = document.createElement('div');
            //div.id = repoName; //used to remove if clicked again
            //div.className = "readMeExpandable"; //used for styling
            //div.appendChild(document.createTextNode(readMe));
            //document.getElementById(repoId).appendChild(div);

            var dom = document.createElement('div');
            dom.innerHTML = readMe;
            dom.className = "readMeExpandable"; //used for styling
            dom.id = repoName;
            document.getElementById(repoId).appendChild(dom);

        } else { // if the element does exist remove it
            var element = document.getElementById(repoName);
            element.parentNode.removeChild(element);
        }         
    }

    render() {
        if (this.state.allRepos != null) { // if check doesn't work inside return
            // TODO: make the readme a clickable event that calls the readMe() function
            return (
                <div className="git">
                    <form id="gitHubForm" className="form-inline mx-auto" onSubmit={this.handleSubmit.bind(this)}>
                        <input id="usernameInput" value={this.state.user} onChange={this.handleChange.bind(this)} className="form-control mb-5" type="text" placeholder="GitHub Username" />
                        <input type="submit" className="btn btn-primary ml-2 mb-5" value="search" />
                        <div className="joey">
                            <img className="joey_idle_spritesheet pixelart" src="https://i.ibb.co/2PsbRmR/joey-p-loading.png" alt="cute alien" />
                        </div>
                    </form>
                    
                    {this.state.allRepos.map(repo => (
                        <div key={repo.nodeId} id={repo.nodeId}> {/* wrap with this div so we can append another div inside */ }
                            <div className="repoList">
                                <ul>
                                    <li className="repoName">{repo.name}</li>
                                    <li className="repoDesc">{repo.description}</li>     
                                    <p><a className="repoUrl" href={repo.htmlUrl} target="_blank">open in github</a></p>
                                    <p className="readMe urlP" onClick={this.readMeClick.bind(this, repo.name, repo.nodeId)}>README</p>
                                </ul>
                            </div>
                            {/* <div id={repo.name}></div>  so each repoList div has a unique id to append the readme to if clicked */}
                        </div>
                    ))} 
                </div>     
            );
        } else {
            return (
                <div className="gitLoading">   
                    <form id="gitHubForm" className="form-inline mx-auto" onSubmit={this.handleSubmit.bind(this)}>
                        <input id="usernameInput" value={this.state.user} onChange={this.handleChange.bind(this)} className="form-control mb-5" type="text" placeholder="GitHub Username" />
                        <input type="submit" className="btn btn-primary ml-2 mb-5" value="search" />
                        <div className="joey joey_loading">
                            <img className="joey_run_spritesheet pixelart" src="https://i.ibb.co/B4JHWTt/joey-p-loading.png" alt="cute alien" />
                        </div>
                    </form>
                    loading     
                </div> 
            );
        }
    } 
}