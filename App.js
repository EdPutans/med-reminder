import React from 'react'
import {
  StyleSheet, AsyncStorage, ScrollView } from 'react-native'
import { Container, Header, Content, List, ListItem,  Title, Body, Button, Text, View, Footer, FooterTab} from 'native-base' 
const reminders = require('./reminders.json')
export default class App extends React.Component {


  state = {
    adding: false,
    // reminders: []
  }

  async componentDidMount() {
    let reminders = await AsyncStorage.getItem('reminders')
    reminders = JSON.parse(reminders)
    this.setState({ reminders })
  }


  toggleAdd = async () => {
    console.log('Adding test reminder')
    let reminder = {
      time: (new Date()).toString()
    }
    let newReminders = []
    try {
      AsyncStorage.getItem('reminders',
        (err, resp) => {
          storageData = JSON.parse(resp)
          newReminders = storageData ? [...storageData, reminder] : [reminder]
          AsyncStorage.setItem('reminders', JSON.stringify(newReminders))
            .then(r => this.setState({ reminders: [...this.state.reminders, reminder] }))
        }
      )

    } catch (e) {
      console.log('failed')
      alert(e)
    }
    console.log({ newReminders })
  }


  clearMe = async () => {
    await AsyncStorage.removeItem('reminders')
    this.setState({ reminders: [] })
    console.log('Cleared storage')
  }

  render() {
    return (
        <ScrollView>
          <Container style={ { backgroundColor: '#66b2b2', } }>
          <Header>
            <Title>
              Current Dates
          </Title>
          </Header>
          <Content>
            
              <List>
                  
                  { this.state.reminders && this.state.reminders.map(r =>
                    <ListItem>
                      <Body>
                        <Text style={ styles.white } > 
                        { r.time }
                        </Text>
                      </Body>
                    </ListItem>
                  ) }
              </List>
            </Content>
            <Footer>
              <FooterTab>
                <Button
                full
                  onPress={ this.toggleAdd }>
                  <Text>"Test me"</Text>
               </Button>
                <Button 
                full
                onPress={this.clearMe }>
                  <Text>
                    Clear me
                  </Text>
                </Button>
               
                </FooterTab>
            </Footer>
          </Container>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    zIndex: 100,
    fontSize: 10,
    color: '#fff',
  },
  whiteTitle: {
    fontSize: 50,
    color: '#fff',
  }
})
