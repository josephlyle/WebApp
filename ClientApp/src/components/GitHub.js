import React, { Component } from 'react';
import SearchFormGitHub from './SearchFormGitHub';

export class GitHub extends Component {
    constructor(props) {
        super(props);
        this.state = { allRepos: null, user: 'josephlyle', repo: null, loading: true, error: false };
    }

    async componentDidMount() {
        this.handleSubmit(null); // let's page preload whatever default is in the user prop 
    }

    handleChange(event) { // enter username
        this.setState({ user: event.target.value });
    }   

    async handleSubmit(event) { // fetch github user
        this.setState({ loading: true });
        console.log("check:", this.state.user);
        if (event) { event.preventDefault(); } // if statement let's handleSubmit be called on pageload before an event actually happens
        const response = await fetch('api/GitHubController/getUserRepos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.user)
        });
        try {
            var data = await response.json();
            this.setState({ allRepos: data, loading: false, error: false });  
        } catch { // if user doesn't exist catch it
            console.log("CATCH");
            this.setState({ allRepos: null, loading: false, error: true });
        }
    }

    async readMeClick(repoName, repoId) { // "README" dropdown that displays readme
        if (document.getElementById(repoName) == null) { // if the element doesn't exist yet create it
            const response = await fetch('https://raw.githubusercontent.com/' + this.state.user + '/' + repoName + '/master/README.md');
            const readMe = await response.text();

            var dom = document.createElement('div');
            dom.innerHTML = readMe;
            dom.className = "readMeExpandable"; //used for styling
            dom.id = repoName;
            document.getElementById(repoId).appendChild(dom);
            
        } else { // if the element does exist remove it
            var elementToClose = document.getElementById(repoName);
            elementToClose.className = "readMeExpandableClose"; // add this classname so css can play a closing animation

            // pause for how long the css animation takes so readMeExpandableClose animation can play out then remove the element
            setTimeout(function () {
                if (elementToClose.parentNode) {
                    elementToClose.parentNode.removeChild(elementToClose);
                }
            }, 200); 

            // smoothing slideup for the rest of the elements
            var ele = document.getElementById(repoId).nextElementSibling;
            for (var i = 0; i < this.state.allRepos.length; i++) {
                if (!ele) { break; }
                this.slideElement(ele.id, (elementToClose.offsetHeight * -1));
                ele = ele.nextElementSibling;
            }
        }        
    }

    // function to make the other dom elements slide back smoothly when deleting the readme element.
    async slideElement(elementId, heightToSlide) {
        var element = document.getElementById(elementId);
        element.animate([
            // keyframes
            { transform: 'translateY(' + heightToSlide + 'px)' }
        ], {
            // timing options
            duration: 200
        });
    }

    render() {
        if (this.state.error) { // if the user can't be found
            return (
                <div className="git">
                    <SearchFormGitHub loading={this.state.loading} user={this.state.user}
                        handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)}
                    />
                    hold up: user,  {this.state.user},  does not exist.
                </div>
            );
        } else if (this.state.allRepos != null) {
            return (
               <div className="git">
                    <SearchFormGitHub loading={this.state.loading} user={this.state.user}
                        handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)}
                    />
                    {this.state.allRepos.map(repo => (
                        <div key={repo.nodeId} id={repo.nodeId}> {/* wrap with this div so we can append another div inside when expanding readMe (include id so we know which one to append to) */}
                            <div className="repoList">
                                <ul>
                                    <li className="repoName">{repo.name}</li>
                                    <li className="repoDesc">{repo.description}</li>
                                    <p><a className="repoUrl" href={repo.htmlUrl} target="_blank">open in github</a></p>
                                    <div className="readMe"><p className="readMe_right-align" onClick={this.readMeClick.bind(this, repo.name, repo.nodeId)}>README</p></div>
                                </ul>
                            </div>
                        </div>
                    ))}
               </div>
            );
        } else {
            return (
               <div className="git">
                    <SearchFormGitHub loading={this.state.loading} user={this.state.user}
                        handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)}
                    />
                    loading
               </div>
            );
        }
    }
} 
