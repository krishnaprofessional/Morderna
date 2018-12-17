import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {istoggled: false};
  }

  toggleRemaining = () =>{
    this.setState({istoggled: !this.state.istoggled});
  }

  render() {
   return (<React.Fragment>
   <div className="posts row">
      {this.props.posts.map((post, i) =>
        <article key={i} className={`col-lg-3 col-md-4 col-sm-12 col-xs-12 ${i >= 8 ? (this.state.istoggled ? 'show' : 'hide') : ''}`}>
                <a href={post.url}>
                    <div className="items-container">
                        <img alt="content" key={i} src={`http://localhost:3002${post.image.href}`} />
                        <h3 className="Product-name">{post.name}</h3>
                    </div>
                </a>
        </article>
      )}
    </div>
    <div className="row view-more"> <a onClick={this.toggleRemaining} href="#" >{this.state.istoggled ? "Visa färre" : "Visa fler" } </a></div>
   </React.Fragment>);
    };
  }

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
