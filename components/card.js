import React from 'react';
import * as SQLite from 'expo-sqlite';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colours from '../constants/colours.js';

const db = SQLite.openDatabase("db.db");

export default function card(props) {
    return (
        <View style={[styles.container, { backgroundColor: Colours.cardColours[props.colour]}]}>
            <View style={styles.infoTitle}>
                <Text style={[styles.dataText, styles.textShadow, {fontSize:30, top:-10}]}>{props.name}</Text>
                <TouchableOpacity>
                    <FontAwesome style={[styles.dataText, styles.textShadow, {fontSize:25, top:0}]} name="trash"/>
                </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
                <View style={{marginRight:50}}>
                    <Text style={[styles.titleText, styles.textShadow]}>Use By Date</Text>
                    <Text style={[styles.dataText, styles.textShadow]}>{new Date(props.date).toISOString().slice(0,10).split("-").reverse().join("/")}</Text>
                </View>
                <View>
                    <Text style={[styles.titleText, styles.textShadow]}>Quantity</Text>
                    <Text style={[styles.dataText, styles.textShadow]}>{props.quantity}</Text>
                </View>
            </View>
        </View>
    );
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
