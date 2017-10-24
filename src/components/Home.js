import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

import axios from 'axios';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }
	this.componentWillMount = this.componentWillMount.bind(this);
    }

    // insert componentWillMount:
    componentWillMount(){
	axios.get('/api/featured').then(res => {
	    console.log(res);
	    this.setState({posts:res.data,
			   index:(~~(Math.random()*res.data.length) +0)
			  });
	});
    }

    render(){
        // map over your recommended blogs here, replace null.
        const posts = this.state.posts.map((c,i)=><BlogThumb key={i} blog={c}/>)
	

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;
