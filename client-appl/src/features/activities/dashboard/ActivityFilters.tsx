import { observer } from 'mobx-react-lite';
import { Calendar } from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

function ActivityFilters() {
    return (
        <>
            <Menu vertical style={{ width: '100%', marginTop: 33 }}>
                <Header attached icon='filter' color='teal' as='h3' content='Filters' />
                <Menu.Item content="All activities"></Menu.Item>
                <Menu.Item content="I'm going"></Menu.Item>
                <Menu.Item content="I'm hosting"></Menu.Item>
            </Menu>
            <Header></Header>
            <Calendar></Calendar>
        </>
    );
}

export default observer(ActivityFilters);