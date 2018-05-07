import React, { Component } from 'react';
import { Button, Icon, Dropdown, Checkbox } from 'semantic-ui-react';
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
      chosenUser: {},
      allowAdmin: false,
      buildGroups: false,
      groupSize: 2,
      groupOptions: [{
        key: 'two',
        name: 'Two',
        value: '2',
        text: 'Two'
      },
      {
        key: 'three',
        name: 'Three',
        value: '3',
        text: 'Three'
      },
      {
        key: 'four',
        name: 'Four',
        value: '4',
        text: 'Four'
      }]
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
        return channels.push(newChannel);
      });
      return this.setState({channels: channels});
    });
  }
  toggleAdmin = () => {
    this.setState({
      allowAdmin: !this.state.allowAdmin
    })
  }
  setGroupSize = (value) => {
    return this.setState({groupSize: parseInt(value)})
  }
  buildGroups = (value) => {
    this.setState({
      buildGroups: !this.state.buildGroups,
    })
  }
  chooseNewUser = () => {
    if (this.state.buildGroups){
      let numOfGroups = this.state.users.length / this.state.groupSize;
      let studentPool = this.state.users;
      let classGroups = [];

      /**
      * Randomize array element order in-place.
      * Using Durstenfeld shuffle algorithm.
      */
      for (let i = studentPool.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = studentPool[i];
          studentPool[i] = studentPool[j];
          studentPool[j] = temp;
      }

      let i,j,tempArray,
      chunk = this.state.groupSize;
      for (i=0,j=studentPool.length; i<j; i+=chunk) {
        tempArray = studentPool.slice(i,i+chunk);
        classGroups.push(tempArray)
      }
    } else if (!this.state.allowAdmin) {
      this.setState({users: this.state.users.filter((user) => {
        return (user.is_admin === false && user.is_bot === false);
      })})
    }
    // this selects a single student to display on the card. 
    // do we build groups visually -- Later we should slack the selected students in direct group messages
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
            <div className="ui segment">
              <Checkbox toggle label="Allow Admin" onChange={this.toggleAdmin}/>
            </div>
            <div className="ui segment">
              <Checkbox toggle label="Build Groups!" onChange={this.buildGroups}/>
              <Dropdown placeholder='Group Size' fluid selection options={this.state.groupOptions} value={this.value} onChange={(e, {value}) => this.setGroupSize(value)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
