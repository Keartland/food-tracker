import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colours from '../constants/colours.js';

deleteRecord = async (id, forceUpdate) => {
    if(id != -1){
        try {
            var value = await AsyncStorage.getItem('data');
            if (value == null) { value = "" }
            value = value.split("|")
            var newValue = []
            for (var i=0;i<value.length;i++){
                if (id != value[i].split("\t")[0]){
                    newValue.push(value[i])
                }
            }
            await AsyncStorage.setItem('data', newValue.join("|"));
        } catch (error) {
            // Error saving data
            console.log(error.message)
        }
        forceUpdate()
    }
}

function formatDate(date) {
    var d = new Date(Number(date))
    var ret = d.toISOString().slice(0,10).split("-").reverse().join("/")
    return ret;
}

export default function card(props) {
    try{
        if (props.id == ""){return null}
        return (
            <View style={[styles.container, { backgroundColor: Colours.cardColours[props.colour]}]}>
                <View style={styles.infoTitle}>
                    <Text style={[styles.dataText, styles.textShadow, {fontSize:30, top:-10}]}>{props.name}</Text>
                    <TouchableOpacity onPress={() => deleteRecord(props.id, props.forceUpdate)}>
                        <FontAwesome style={[styles.dataText, styles.textShadow, {fontSize:25, top:0}]} name="trash"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoRow}>
                    <View style={{marginRight:50}}>
                        <Text style={[styles.titleText, styles.textShadow]}>Use By Date</Text>
                        <Text style={[styles.dataText, styles.textShadow]}>{
                            formatDate(props.date)
                        }</Text>
                    </View>
                    <View>
                        <Text style={[styles.titleText, styles.textShadow]}>Quantity</Text>
                        <Text style={[styles.dataText, styles.textShadow]}>{props.quantity}</Text>
                    </View>
                </View>
            </View>
        );
    }
    catch (error){
        console.log(error.message)
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        margin:10,
        height: 120,
        borderRadius: 5,
        elevation: 5,
    },
    infoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"flex-start",
    },
    infoRow: {
        flex:1,
        flexDirection: "row",
        alignItems:"flex-end",
    },
    textShadow:{
        textShadowColor:'#A8A8A8',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:1,
    },
    titleText: {
        fontSize:10,
        color: Colours.titleColour,
    },
    dataText: {
        fontSize:20,
        fontWeight:"bold",
        color: Colours.dataColour,
    }
});
