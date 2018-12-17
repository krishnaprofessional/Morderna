import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import Posts from '../components/Posts'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    iconUrl: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts());
  }


  render() {
    const { posts, isFetching, iconUrl } = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div>
        <div className="header">
          <a className="header-anchor" href="#" >
            <img className="header-logo" src={`http://localhost:3002${iconUrl}`} alt="" />
          </a>
        </div>
        {isEmpty
          ? (isFetching ?<div className="container">
              <div className="loadersmall"></div>
            </div> : <h2>Empty.</h2>)
          : <div className="container" style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
        <div className="footer">
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isFetching,  posts,  iconUrl } = state;
  return {
    posts,
    isFetching,
    iconUrl
  }
}

export default connect(mapStateToProps)(App)
