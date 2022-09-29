import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity
}

function ActivitySublist({ activity }: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="medium" src={`/assets/categoryImages/${activity?.category}.jpg`} />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <span>
                    <Icon name="clock outline" />{activity.date}  <Icon name="map marker alternate" />{activity.venue}, {activity.city}
                </span>
            </Segment>
            <Segment secondary >
                Attendees
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />
            </Segment>
        </Segment.Group>
    );
}

export default ActivitySublist;