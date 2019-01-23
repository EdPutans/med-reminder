import React from 'react'
import {
  StyleSheet, AsyncStorage, ScrollView } from 'react-native'
import { 
  Container, Header, Content, Body, 
  List, ListItem, Title, Text,
  Button, Footer, FooterTab,
  Card, CardItem,
} from 'native-base' 

import DateSet from './Components/DateSet'


export default class App extends React.Component {


  state = {

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
              <DateSet>
                
              </DateSet>
              <List>
                  { this.state.reminders && this.state.reminders.map(r =>
                    <Card key={r.time.split()[7]}>
                      <CardItem>
                        <Text  >
                          { r.time }
                        </Text>
                      </CardItem>
                    </Card>
                  )}
              </List>
            </Content>
            <Footer>
              <FooterTab>
                <Button
                full
                  onPress={ this.toggleAdd }>
                  <Text>Add current date</Text>
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
