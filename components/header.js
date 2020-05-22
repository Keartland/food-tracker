import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, TextInput, Animated} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colours from '../constants/colours.js';
import Card from '../components/card.js';

class header extends React.Component {
    state = {
        name:"",
        date:new Date().getTime(),
        quantity:"1",
        colour:0,
        show:false,
        showDate:false,
        animationValue : new Animated.Value(-475),
    }
    startScaleAnimation = () => {
        Animated.timing(this.state.animationValue, {
            toValue : 0,
            timing : 1200
        }).start(()=>{
            Animated.timing(this.state.animationValue,{
                toValue : -475,
                duration : 1200
            }).start();
        })
    }

    addRecord = async () => {
        try {
            var value = await AsyncStorage.getItem('data');
            if (value == null) { value = "" }
            value = value.split("|")
            this.setState({id:value.length})
            value.push(this.state.id+"\t"+this.state.name + "\t" + new Date(this.state.date).getTime() + "\t" + this.state.quantity + "\t" + this.state.colour)
            await AsyncStorage.setItem('data', value.join("|"));
        } catch (error) {
            // Error saving data
            await AsyncStorage.setItem('data', "");
            console.log(error.message)
        }
        this.props.forceUpdate()
        this.setState({
            name:"",
            date:new Date().getTime(),
            quantity:"1",
            colour:0,
            show:false,
            showDate:false
        })
    }

    dateChange = (event,date) => {
        if (event.type == "dismissed") {return}
        this.setState({date:date.getTime()})
    }

    showDatePicker(show){
        if(show){
            this.setState({showDate:false})
            return( <DateTimePicker
                value={this.state.date}
                mode="date"
                display="spinner"
                onChange={this.dateChange}
            />)
        }
    }

    render(){
        const animatedStyle = {

            transform : [
                {
                    translateY : this.state.animationValue
                }
            ]

        }
        return (
            <View style={styles.container}>
                <View style={styles.flexBox}>
                    <Text style={styles.headerText}>Product Tracker</Text>
                    <TouchableOpacity onPress={this.startScaleAnimation}>
                        <FontAwesome style={styles.plusButton} name="plus"/>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.inputs, animatedStyle]}>
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
                                <Text style={[styles.input,{width:100}]}>{new Date(Number(this.state.date)).toISOString().slice(0,10).split("-").reverse().join("/")}</Text>
                            </TouchableOpacity>
                            {this.showDatePicker(this.state.showDate)}
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
                            forceUpdate={this.props.forceUpdate}
                            id={-1}
                            name={this.state.name}
                            date={this.state.date}
                            quantity={this.state.quantity}
                            colour={this.state.colour}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.addRecord()}>
                        <Text style={styles.addNewElementButton}>Add</Text>
                    </TouchableOpacity>
                </Animated.View>
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
        height: 405,
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
    addNewElementButton:{
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
    },

    plusButton: {
        marginTop: 30,
        marginRight: 10,
        fontSize:35,
        color: Colours.addColour,
    },
});

export default header;
