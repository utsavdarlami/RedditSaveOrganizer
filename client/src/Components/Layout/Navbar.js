import React from 'react';
import Search from './Search';
import Fetch from './Fetch';

const Navbar=(props)=>{
    // console.log(props.searchSaves)

    return (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
	    <a className="navbar-brand" href="/">Reddit Saves</a>
	    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	    </button>

	    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		<ul className="navbar-nav mr-auto">
		    <li className="nav-item">
                <Fetch fetchSaves = {props.fetchSaves}/>
		    </li>
		</ul>
		<Search searchSaves = {props.searchSaves} />
	    </div>
	</nav>
    );
}
export default Navbar;
