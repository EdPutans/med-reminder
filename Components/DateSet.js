import React from 'react';
import {DatePickerIOS} from 'react-native'
import { DatePicker, View , Container, Text, Header, Content } from 'native-base';

export default class DateSet extends React.Component {

    state={
        chosenDate: new Date()
    }


    render(){
        return(
            <View>
                    <DatePickerIOS
                        mode='time'
                        date={this.props.chosenDate}
                        onDateChange={date=> this.props.setDate(date)}
                    />
                    <Text>
                        Date: { this.props.chosenDate.toString().substr(4, 12) }
                    </Text>
            </View>

        )
    }

}

