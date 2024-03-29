import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} exact='true' to='/' >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:10} } />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" as={NavLink} exact='true' to='/activities' />
                <Menu.Item name="Errors" as={NavLink} exact='true' to='/errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}