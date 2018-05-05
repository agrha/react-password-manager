import React, {Component} from 'react'
import Password from './Password.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRestaurant } from '../store/restaurant/restaurant.action'
import {BrowserRouter as Router} from 'react-router-dom'
import {Grid, Row, Col, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap'
import './Utility.css'
import './Password.css'


class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: ''
    }
  }

  componentDidMount(payload) {
    payload = '1'
    this.setState({category:payload})
    this.props.getRestaurant(payload)
  }

  fetchRestaurantByCategory(payload) {
    this.setState({category:payload})
    this.props.getRestaurant(payload)
  }

  render () {
    var password = this.props.passwords.map((password, index) => 
    <Password data={password} key={index}/>
    )
    return (
    <Router>
    <div class="limiter">
      <div class="container-table100">
        <div class="wrap-table100">
          <div class="table100 ver1 m-b-110">
            <div class="table100-head">
            <table>
              <thead>
								<tr class="row100 head">
									<th class="cell100 column1">WebPage</th>
									<th class="cell100 column2">Username</th>
									<th class="cell100 column3">Password</th>
									<th class="cell100 column4">Created At</th>
									<th class="cell100 column5">Updated At</th>
								</tr>
							</thead>
              <tbody>
                <code>{password}</code>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  restaurants: state.restaurant.data
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getRestaurant
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantList);