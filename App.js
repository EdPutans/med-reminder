import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RNFS from 'react-native-fs'

export default class App extends React.Component {


  state = {
    adding: false,
    // reminders: allreminders.reminders
  }

  componentDidMount(){
   RNFS.readFile('./reminders.txt', 'utf-8')
    .then(res=> console.log({res}))
    // console.log({reminders: this.state.reminders})
  }

  toggleAdd = () => {
    this.setState({adding: !this.state.adding})
    console.log(this.state)
    let dateObj = {time: new Date('January 22, 2019 18:00:00')}

  }


  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.whiteTitle}>
            {this.state.reminders && "Henlo"}
        </Text>
        <Text style={styles.whiteTitle}>
            Medrem
        </Text>
        {
          // (this.state.reminders.map(d=> 
          // <Text>
          //   {d.time.toString()})
          // </Text>))
        }
        <Button 
          onPress={this.toggleAdd} 
          title="+"
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
