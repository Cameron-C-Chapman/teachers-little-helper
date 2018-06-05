import React, { Component } from 'react';
import { Button, Icon, Dropdown, Checkbox, Header, Grid, Segment, Divider} from 'semantic-ui-react';
import './App.css';

import ChosenUser from './ChosenUser';
import ChosenGroups from './ChosenGroups'

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
      selectedChannel: [],
      useSpecificChannel: false,
      groupSize: 1,
      chosenGroups: {},
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
        return (user.is_bot === false && user.deleted === false && user.is_admin === false);
      })});
    });

    slackInstance.getChannels().then((response) => {
      let channels = [];
      response.channels.map((channel) => {
        let newChannel = {
          key: channel.id,
          value: channel.id,
          text: channel.name,
          members: channel.members
        }
       return channels.push(newChannel);
      });
      return this.setState({ channels: channels });
    });
  }
  setGroupSize = (value) => {
    return this.setState({ groupSize: parseInt(value, 16) })
  }
  selectedChannel = (value) => {
    let channelKey = value.length? value : null;
    return this.setState({
      selectedChannel: channelKey,
      useSpecificChannel: !this.state.useSpecificChannel
     }, ()=>this.getChannelMembers())
  }
  getChannelMembers = () => {
    let channelMembers = []
    let selectedChannel = this.state.selectedChannel
    let newUsers = []

    if (this.state.channels && this.state.selectedChannel ) {
      let channelObj = this.state.channels.find(function (channel) { return channel.value == selectedChannel });

      channelMembers = channelObj.members
      for (let i=0; i<channelMembers.length; i++){
        
        var user = this.state.users.find(function (user) { return user.id === channelMembers[i]; });

        if (user !== undefined){ // channels include admins and this accounts for return undefined
          newUsers.push(user)
        }
      }
      return this.setState({ users: newUsers })
    }
  }
  buildGroups = () => {
   return this.setState({
      buildGroups: !this.state.buildGroups,
      chosenUser: {}
    })
  }
  chooseNewUser = () => {
    if (this.state.buildGroups){
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
        classGroups.push(tempArray);
      }
      return this.setState({
        chosenGroups: classGroups,
        chosenUser: {}
      })
    } else if (!this.state.buildGroups){
      // this selects a single student to display on the card. 
      let randomNum = Math.floor(Math.random() * this.state.users.length);
      return this.setState({ chosenUser: this.state.users[randomNum] });
    }
  }

  render() {
    return (
      <Grid textAlign='center'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Header as='h3' color='blue'>Pick a Random Student!</Header>
              <Button color="blue" onClick={ this.chooseNewUser }>Feeling Lucky &nbsp; <Icon name='wizard'></Icon></Button>
              <ChosenUser user={ this.state.chosenUser } isGrouped={ this.state.buildGroups }></ChosenUser>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h3' color='blue'>Select Students by Slack Cannel</Header>
              <Dropdown placeholder='Channels' fluid multiple selection options={ this.state.channels } onChange={ (e, {value}) => this.selectedChannel(value) }/>
            </Segment>
            <Segment>
              <Header as='h3' color='blue'>Group Options</Header>
              <Checkbox toggle label="Build Groups!" onChange={ this.buildGroups } onClick={ this.toggleDisplay }/>
              <Dropdown placeholder='Group Size' fluid selection options={ this.state.groupOptions } onChange={ (e, {value}) => this.setGroupSize(value) }/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Divider horizontal><Header as='h2' color='blue'>Groups!</Header></Divider>
              <Grid textAlign='center'>
                  <ChosenGroups groups={ this.state.chosenGroups } groupSize={ this.state.groupSize } buildGroups={ this.state.buildGroups } selectedChannel={ this.state.selectedChannel }></ChosenGroups>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Segment>
            <Divider horizontal>Made in the pursuit of <Icon name='world'/> domination</Divider>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
