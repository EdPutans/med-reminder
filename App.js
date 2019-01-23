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
    chosenDate: new Date()
  }

  async componentDidMount() {
    let reminders = await AsyncStorage.getItem('reminders')
    reminders = JSON.parse(reminders)
    this.setState({ reminders })
  }

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate })
    console.log(newDate)
    // this.toggleAdd()
  }

  getTimeFromString = (string) =>{
    let date =  new Date(string)
    let h = date.getHours().toString()
    if(h.length===1){
      h = "0" + h
    }
    
    let m = date.getMinutes().toString()
    if (m.length === 1) {
      m = "0" + m
    }
    return `${h}:${m}`
  }


  toggleAdd = async () => {
    const {reminders, chosenDate} = this.state
    console.log('Adding test reminder')
    let reminder = { date: chosenDate.toString() }
    let newReminders = []
    try {
        AsyncStorage.getItem('reminders', (error, resp) => {
            error && alert(error)
            let storageData = JSON.parse(resp)
            if(storageData){
              newReminders = [...storageData, reminder]
            }else{
              newReminders = [reminder]
            }
            AsyncStorage.setItem('reminders', JSON.stringify(newReminders))
              .then(() => this.setState({ reminders: newReminders }))
          })
    } catch (error) {
      console.log('failed')
      alert(error)
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
              <DateSet  
                setDate={this.setDate}
                chosenDate={this.state.chosenDate}
              
              />
              <List>
                  { this.state.reminders && this.state.reminders.map(r =>
                    <Card>
                      <CardItem>
                        <Text>
                          {` ${this.getTimeFromString(r.date)}`}
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
                  <Text>Add selected time</Text>
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
