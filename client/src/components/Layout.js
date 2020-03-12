import React from 'react'
import Nav from './Nav'
import {Grid, Image, Icon, Form, Input, Button} from 'semantic-ui-react'
import '../styles/layout.css'


const Layout = () => {
    return (
        <Grid columns={3} divided id="layout-grid">
            <Grid.Row>
            <Grid.Column id="left-column">
                <Nav/>
            </Grid.Column>
            <Grid.Column id="center-column">
                <Grid.Row id="home-row">
                    Home
                </Grid.Row>
                
                <Grid.Row id="home-menu">
                    <Icon name="user circle outline"/> 
                    <Form>
                        <Form.Field>
                            <Input type="text" name="body" placeholder="What's happening?"/>
                        </Form.Field>
                        <Button>Submit</Button>
                    </Form>
                </Grid.Row>
                
                <Grid.Row id="home-intro">
                    <h3>Welcome to Community Cards</h3>
                    <p>This is a twitter clone that captures the essentials of twitter</p>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column>
                <Image src='/images/wireframe/media-paragraph.png' />
            </Grid.Column>
            </Grid.Row>
      </Grid>
    );
}
 
export default Layout;