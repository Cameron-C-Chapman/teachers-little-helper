import React, { Component } from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import './App.css';

import ChosenUser from './ChosenUser';

import SlackInstance from './SlackInstance';
const slackInstance = new SlackInstance();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      channels: [],
      chosenUser: {}
    }
  }

  componentDidMount() {
    slackInstance.getUsers().then((response) => {
      this.setState({users: response.members.filter((user) => {
        return (user.is_bot === false && user.deleted === false);
      })});
    });

    slackInstance.getChannels().then((response) => {
      let channels = [];
      response.channels.map((channel) => {
        let newChannel = {
          key: channel.id,
          value: channel.id,
          text: channel.name
        }
        channels.push(newChannel);
      });
      this.setState({channels: channels});
      console.log(channels);
    });
  }

  chooseNewUser = () => {
    let randomNum = Math.floor(Math.random() * this.state.users.length);
    this.setState({chosenUser: this.state.users[randomNum]});
  }

  render() {
    return (
      <div className="App ui grid">
        <div className="two column row">
          <div className="column">
            <div className="ui segment">
              <Button color="blue" onClick={this.chooseNewUser}>Feeling Lucky &nbsp; <Icon name='wizard'></Icon></Button>
              <ChosenUser user={this.state.chosenUser}></ChosenUser>
            </div>  
          </div>
          <div className="column">
            <div className="ui segment">
              <Dropdown placeholder='Channels' fluid multiple selection options={this.state.channels} />
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default App;
