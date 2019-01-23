import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
// import RNFS from 'react-native-fs'
const reminders = require('./reminders.json')
export default class App extends React.Component {


  state = {
    adding: false,
    // reminders: []
  }

  async componentDidMount(){
    let reminders = await AsyncStorage.getItem('reminders')
    reminders = JSON.parse(reminders)
    this.setState({reminders})
  }


  toggleAdd = async () =>{
    console.log('Adding test reminder')
    let reminder = {time: new Date()}
    let newReminders = []
    try {
      AsyncStorage.getItem('reminders', 
        (err, resp)=>{
          storageData = JSON.parse(resp)
          // console.log(storageData)
          newReminders = storageData? [...storageData, reminder] : [reminder]
          AsyncStorage.setItem('reminders', JSON.stringify(newReminders))
            .then(r => this.setState({ reminders: r }))
          }
      )
      
    } catch (e) {
      console.log('failed')
      alert(e)
    }
    console.log({newReminders})
  }
   

  // displayData = async () => {
  //   try{
  //     let user = await AsyncStorage.getItem('reminders')
  //     alert(user)
  //   }catch(e){
  //     alert(error)
  //   }
  // }

  clearMe = async () => {
    await AsyncStorage.removeItem('reminders')
    this.setState({ reminders: [] })
    console.log('Cleared storage')
    
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.whiteTitle}>
            {this.state.reminders && this.state.reminders.map(r=>r['time'])}
        </Text>
        <Text style={styles.whiteTitle}>
            Medrem
        </Text>
        <Button 
          onPress={this.toggleAdd} 
          title="Test me"
        />
        <Button 
          onPress={this.clearMe}
          title="Clear reminders"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66b2b2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteTitle: {
    fontSize: 50,
    color: '#fff',
  }
});
