import React from 'react';
import { StyleSheet, Text, View, Title } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.whiteTitle}>
            Medrem
        </Text>
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
    fontSize: 20,
    color: '#fff',
  }
});
