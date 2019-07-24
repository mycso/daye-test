import React, { Component } from 'react'
import PostData from '../data/posts.json'
import formatMoney from '../lib/formatMoney';

class PostList extends Component {
  // Create the initial state of the search filter blank.
  constructor () {
    super();
    this.state = {
      search: ''
    };
  }


  // Create an update search event in side the input.
  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  render () {
    // Connect the filter to the post JSON
    let filteredPostData = PostData.filter(
      (postDetail) => {
        return postDetail.productName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    // Return the list of tampons to display on the front end
    return (
      <div>
        <h1>Tampons</h1>

        <div><p>Sort By Product Name:</p> 
        {/* Create an input filter to filter all the tampon items */}
          <input type="text" 
            value={this.state.search} 
            onChange={this.updateSearch.bind(this)}
          />
        </div>
        
        {/* Map the post json data around the return so it can show all the items */}

        {filteredPostData.map((postDetail, index) => {
          return (
            <div className="wrapper">     
              <ul>
                <li className="item-list">
                  <div>
                    <img src={postDetail.productImage} width="150" />
                    <p><b>{postDetail.productName}</b></p>
                    <p>{formatMoney(postDetail.price)} {postDetail.currency}</p>
                    {
                      (typeof(postDetail.tampons)=='object')?
                        <div>
                          {postDetail.tampons.map((subPostDetail, k) =>
                            <div>
                              <b>Info</b><br /> 
                              {"Coating: "+subPostDetail.coating} <br /> 
                              {"Size: "+subPostDetail.size} <br /> 
                              {"Amount "+subPostDetail.amount}
                              <br /> 
                              <br /> 
                            </div>
                          )}
                        </div>
                      :
                      null
                    }
                  </div>
                </li>
              </ul>
            </div>
            )
        })}
      </div>
    )
  }
}

export default PostList
