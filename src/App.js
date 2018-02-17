import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './App.css';

import ChosenUser from './ChosenUser';

import SlackInstance from './SlackInstance';
const slackInstance = new SlackInstance();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chosenUser: {}
    }
  }

  componentDidMount() {
    slackInstance.getUsers().then((response) => {
      this.setState({users: response.members.filter((user) => {
        return (user.is_bot === false && user.deleted === false);
      })});
    });
  }

  chooseNewUser = () => {
    let randomNum = Math.floor(Math.random() * this.state.users.length);
    this.setState({chosenUser: this.state.users[randomNum]});
  }

  render() {
    return (
      <div className="App ui grid">
        <div className="one column row">
          <div className="column">
            <div className="ui segment">
              <Button color="blue" onClick={this.chooseNewUser}>Feeling Lucky</Button>
              <ChosenUser user={this.state.chosenUser}></ChosenUser>
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default App;
