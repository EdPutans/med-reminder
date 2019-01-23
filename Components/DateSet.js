import React from 'react';
import { DatePicker, Container, Text, Header, Content } from 'native-base';

export default class DateSet extends React.Component {

    state={
        chosenDate: new Date()
    }

    setDate = (newDate) => {
        this.setState({ chosenDate: newDate })
        console.log(newDate)
    }

    render(){
        return(
            <Container>
                <Header />
                    <Content>
                    <DatePicker
                        onDateChange={this.setDate}
                    />
                    <Text>
                        Date: { this.state.chosenDate.toString().substr(4, 12) }
                    </Text>
                </Content>
            </Container>

        )
    }

}