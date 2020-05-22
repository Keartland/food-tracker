import React from 'react';

import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';

import Colours from './constants/colours.js';
import Card from './components/card.js';
import Header from './components/header.js';

class App extends React.Component {
    state={
        items:null,
        isMounted:false,
    }

    componentDidMount(){
        this.setState({isMounted:true});
        this.update();
    }
    componentWillUnmount(){
        this.setState({isMounted:false});
    }
    update = async () =>{
        if (this.state.isMounted){
            try {
                var value = await AsyncStorage.getItem('data');
                if (value !== null) { value = value.split("|") }
                    this.setState({items:value});
            } catch (error) {
                // Error retrieving data
                await AsyncStorage.setItem('data', "");
                console.log(error)
            }
        }
    }
    render () {
        if (this.state.items === null || this.state.items.length === 0) {
            this.update();
            return (
                <View style={styles.container}>
                    <Header forceUpdate={this.update}/>
                    <View style={styles.center}>
                        <Text style={styles.dataText}>Press the + in the top right to add a product!</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Header forceUpdate={this.update}/>
                <ScrollView>
                    {this.state.items.map(row => (
                        <Card
                            key={row.split("\t")[0]}
                            id={row.split("\t")[0]}
                            name={row.split("\t")[1]}
                            date={row.split("\t")[2]}
                            quantity={row.split("\t")[3]}
                            colour={row.split("\t")[4]}
                            forceUpdate={this.update}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.mainBackground,
        justifyContent: 'flex-start',
    },
    center:{
        flex: 1,
        padding:20,
    },
    dataText: {
        fontSize:20,
        fontWeight:"bold",
        color: Colours.dataColour,
    }
});

export default App;
