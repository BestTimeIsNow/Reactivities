import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react';

function ActivityDetailedChat() {
    return (
        <>
            <Segment attached textAlign="center" color="teal" inverted style={{ border: "none" }}>
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src={`/assets/user.png` }></Comment.Avatar>
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                                <div>
                                    Today at 5:42PM
                                </div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    <Comment>
                        <Comment.Avatar src={`/assets/user.png`}></Comment.Avatar>
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>
                                    5 days ago
                                </div>
                            </Comment.Metadata>
                            <Comment.Text>Dude, this is awesome.  Thanks so much!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
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