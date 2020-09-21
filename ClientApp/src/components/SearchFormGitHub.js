import React, { Component } from 'react';
import joeyLoading from '../images/joey-loading.png';
import joeyLoaded from '../images/joey-loaded.png';

export class SearchFormGitHub extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loadingCheck() {
        if (this.props.loading) {
            return <img className="joey_run_spritesheet pixelart" src={joeyLoading} alt="loading img" />
        } else {
            return <img className="joey_idle_spritesheet pixelart" src={joeyLoaded} alt="loaded img" />
        }
    } 

    render() {
        return (
            <form className="form-inline mx-auto" onSubmit={(e) => this.props.handleSubmit(e)}>
                <input id="usernameInput" value={this.props.user} onChange={(e) => this.props.handleChange(e)} className="form-control mb-5" type="text" placeholder="GitHub Username" />
                <input type="submit" className="btn ml-2 mb-5" value="search" />
                <div className="joey">
                    {this.loadingCheck()}
                </div>
            </form>
        );
    }
}

export default SearchFormGitHub;