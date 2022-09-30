import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Comment, Form, Header, Segment, TextArea } from 'semantic-ui-react';

function ActivityDetailedChat() {
    return (
        <>
            <Segment attached textAlign="center" color="teal" inverted style={{ border: "none" }}>
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar></Comment.Avatar>
                        <Comment.Content>
                            <Comment.Metadata></Comment.Metadata>
                            <Comment.Text></Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>
                                </Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    <Comment>

                    </Comment>
                    <Form>
                        <Form.TextArea />
                        <Button></Button>
                    </Form>
                </Comment.Group>
            </Segment>
        </>
    );
}

export default observer(ActivityDetailedChat)