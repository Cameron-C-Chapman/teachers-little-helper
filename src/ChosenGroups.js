import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';

import ChosenUser from './ChosenUser'

class ChosenGroups extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            groups: this.props.groups,
            groupSize: this.props.groupSize,
            buildGroups: this.props.buildGroups
        }
    }

    buildCards = () => {
        let groups = this.props.groups
        let cards = [];
        
        if  (groups.length >=1){
            for (let i=0; i<groups.length; i++){
                let group = [];
                for(let j=0; j<groups[i].length; j++){ 
                    let groupMember = <ChosenUser user={groups[i][j]} isGrouped={this.props.buildGroups}></ChosenUser>;
                    group.push(groupMember);
                }
               let cardGroup =
                    <Card.Group >
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                Group {i+1}
                                </Card.Header>
                                <Card.Group >
                                    <Card color='violet' centered raised>
                                        {group}
                                    </Card>
                                </Card.Group>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                cards.push(cardGroup)
            }
        }
        return cards
    }

    render(props) {
        if (this.props.groups) {
            return(
                this.buildCards()
            );
        }
    }
}

export default ChosenGroups;