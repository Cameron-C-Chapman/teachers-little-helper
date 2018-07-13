import React, { Component } from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';

class ChosenUser extends Component {
    constructor(props) {
        super(props);
    }

    getUserName = () => {
        if (this.props.user && this.props.user.real_name) {
            return this.props.user.real_name;
        }
    }

    getUserImage = () => {
        let userImage;
        let user = this.props.user
        let grouped = this.props.isGrouped;

        if (user && user.profile) {
            if(grouped){
                userImage = user.profile.image_48
            }else{
                if (user.profile.image_original) {
                    userImage = user.profile.image_original;
                } else if (user.profile.image_1024) {
                    userImage = user.profile.image_1024;
                } else if (user.profile.image_512) {
                    userImage = user.profile.image_512;
                } else if (user.profile.image_192) {
                    userImage = user.profile.image_192;
                } else if (user.profile.image_72) {
                    userImage = user.profile.image_72;
                } else if (user.profile.image_48) {
                    userImage = user.profile.image_48;
                } else if (user.profile.image_32) {
                    userImage = user.profile.image_32;
                } else if (user.profile.image_24) {
                    userImage = user.profile.image_24;
                } else {
                    userImage = 'http://via.placeholder.com/192x192';
                }
            }
        }
        return userImage;
    }
    buildGroupFeed = () => {
        // Build a feed to show group memebers in a condensed manner
        return (
            <Feed.Event>
                <Feed.Label><Image className='group-member-card' src={ this.getUserImage() }></Image></Feed.Label>
                <Feed.Content content={ this.getUserName() }/>
            </Feed.Event>
        );
    }
    buildSingleCard = () => {
        // returns a single user name and image
        return (
            <Card centered raised color='blue'>
                <Card.Content>
                    <Card.Header>{ this.getUserName() }</Card.Header>
                    <Image className='group-member-card' src={ this.getUserImage() }></Image>
                </Card.Content>
            </Card>
        );
    }
    
    render() {
        if (this.props.user) {
            return(
                this.props.isGrouped ? this.buildGroupFeed() : this.buildSingleCard()
            );
        }
    }
}

export default ChosenUser;