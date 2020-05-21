import React from 'react';
import * as SQLite from 'expo-sqlite';

import { StyleSheet, Text, View, TouchableOpacity, Animated, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colours from '../constants/colours.js';
import Card from '../components/card.js';

const db = SQLite.openDatabase("db.db");

class card extends React.Component {
    state = {
        name:"",
        date:new Date().toString(),
        quantity:"1",
        colour:0,
        show:true,
        showDate:false,
    }
    addRecord(){
        this.setState({
            name:"",
            date:new Date().toString(),
            quantity:"1",
            colour:0,
            show:false,
            showDate:false
        })
        console.log(db)
        db.transaction(
            tx => {
                tx.executeSql("insert into items (name, date, quantity, colour) values (?, ?, ?, ?)", [this.state.name,this.state.date,this.state.quantity,this.state.colour]);
                tx.executeSql("select * from items", [], (_, { rows }) => console.log(JSON.stringify(rows)) );
            },
            null,
            this.props.forceUpdate
        );
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.flexBox}>
                    <Text style={styles.headerText}>Product Tracker</Text>
                    <TouchableOpacity onPress={() => this.setState({show:true})}>
                        <FontAwesome style={styles.plusButton} name="plus"/>
                    </TouchableOpacity>
                </View>
                {this.state.show && (
                    <View style={styles.inputs}>
                        <Text style={[styles.headerText, {marginTop:0}]}>Enter New Product</Text>
                        <Text style={styles.label}>Product Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({name:text})}
                            value={this.state.name}
                            autoFocus={true}
                        />
                        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                            <View>
                                <Text style={styles.label}>Use By Date</Text>
                                <TouchableOpacity onPress={() => this.setState({showDate:true})}>
                                    <Text style={[styles.input,{width:100}]}>{new Date(this.state.date).toISOString().slice(0,10).split("-").reverse().join("/")}</Text>
                                </TouchableOpacity>
                                {this.state.showDate && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="date"
                                        display="spinner"
                                        onChange={(event) => this.setState({date:new Date(event.nativeEvent.timestamp).toUTCString(),showDate:false})}
                                    />
                                )}
                            </View>
                            <View>
                                <Text style={styles.label}>Quantity</Text>
                                <TextInput
                                    style={[styles.input,{width:100}]}
                                    onChangeText={text => this.setState({quantity:text})}
                                    value={this.state.quantity}
                                    keyboardType={"numeric"}
                                />
                            </View>
                        </View>
                        <Text style={styles.label}>Colour</Text>
                        <View style={{ marginLeft:40, marginRight:40, flexDirection: "row", justifyContent: "space-between",}}>
                            <TouchableOpacity onPress={() => this.setState({colour:0})}>
                                <FontAwesome name="square" size={35} color={Colours.cardColours[0]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({colour:1})}>
                                <FontAwesome name="square" size={35} color={Colours.cardColours[1]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({colour:2})}>
                                <FontAwesome name="square" size={35} color={Colours.cardColours[2]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({colour:3})}>
                                <FontAwesome name="square" size={35} color={Colours.cardColours[3]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({colour:4})}>
                                <FontAwesome name="square" size={35} color={Colours.cardColours[4]} />
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:20,paddingRight:20}}>
                            <Card
                                name={this.state.name}
                                date={this.state.date}
                                quantity={this.state.quantity}
                                colour={this.state.colour}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.addRecord()}>
                            <Text style={[{
                                backgroundColor:Colours.addColour,
                                height: 40,
                                padding:10,
                                marginLeft:100,
                                marginRight:100,
                                borderRadius: 10,
                                marginBottom:10,
                                textAlign:"center",
                                borderColor: Colours.inputColour,
                                color: Colours.inputColour,
                                borderWidth: 1,
                            }]}>Add</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        position:'relative',
    },
    flexBox: {
        backgroundColor: Colours.headerBackground,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 15,
    },

    inputs: {
        backgroundColor: Colours.inputsBackground,
        justifyContent: "space-between",
        elevation: 10,
    },
    input: {
        height: 40,
        padding:10,
        marginLeft:40,
        marginRight:40,
        marginBottom:10,
        borderColor: Colours.inputColour,
        color: Colours.inputColour,
        borderWidth: 1,
        borderRadius: 10,
    },
    label: {
        fontSize:12,
        marginLeft:40,
        color: Colours.titleColour,
    },
    headerText: {
        marginTop: 30,
        marginLeft: 10,
        fontWeight:"bold",
        fontSize:25,
        color: Colours.headerTitleColour,
    },
    plusButton: {
        marginTop: 30,
        marginRight: 10,
        fontSize:35,
        color: Colours.addColour,
    },
});

export default card;
