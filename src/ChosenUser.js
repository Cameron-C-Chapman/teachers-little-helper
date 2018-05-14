import React, { Component } from 'react';
import { Card, Header, Image } from 'semantic-ui-react';

class ChosenUser extends Component {
    constructor(props) {
        super(props);
        console.log('ChosenUser.props', this.props);
    }

    getUserName = () => {
        if (this.props.user && this.props.user.real_name) {
            return this.props.user.real_name;
        }
        if (this.props.isGrouped){
        }
    }
    singleOrGrouped = () =>{
        return this.props.isGrouped;
    }

    getUserImage = () => {
        // console.log(this.props.groupSize);
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
    buildCard = () => {
        let cardDetails
        if(this.props.isGrouped){

            return <Card centered raised color='blue'>
                        <Card.Content>
                            <Card.Header>{this.getUserName()}</Card.Header>
                            <Image size='mini' className='group-member-card' src={this.getUserImage()}></Image>
                        </Card.Content>
                    </Card>
        } else {
            let singleCard = 
                <Card centered raised
                    header={this.getUserName()}
                    image={this.getUserImage()}
                    color='blue'
                    className='chosen-user-card'>
                </Card>
            cardDetails = singleCard;
        }
        return cardDetails
    }

    render(props) {
        if (this.props.user) {
            return(
                this.buildCard()
            );
        }
    }
}

export default ChosenUser;