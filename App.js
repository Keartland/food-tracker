import React from 'react';
import * as SQLite from 'expo-sqlite';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Colours from './constants/colours.js';
import Card from './components/card.js';
import Header from './components/header.js';

const db = SQLite.openDatabase("db.db");

class App extends React.Component {
    state={
        items:null
    }
    componentDidMount(){
        this.update();
    }
    update(){
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists items (id integer primary key not null, string name, int date, string quantity, string colour);"
            );
            tx.executeSql("insert into items (name, date, quantity, colour) values (?, ?, ?, ?)", ["this.state.name","this.state.date","this.state.quantity","this.state.colour"]);
            tx.executeSql(
                `select * from items;`,
                [],
                (_, { rows: { _array } }) =>(this.setState({items:_array}) )
            );
            tx.executeSql("select * from items", [], (_, { rows }) => console.log(JSON.stringify(rows)) );
        });

        console.log(db)
    }
    render(){
        if (this.state.items === null || this.state.items.length === 0) {
            return (
                <View style={styles.container}>
                    <Header forceUpdate={this.update()}/>
                    <View style={styles.center}>
                        <Text style={styles.dataText}>Press the + in the top right to add a product!</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Header forceUpdate={this.update()}/>
                <ScrollView>
                    {this.state.items.map(({ name, date, quantity, colour }) => (
                        <Card
                            name={name}
                            date={date}
                            quantity={quantity}
                            colour={colour}
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
