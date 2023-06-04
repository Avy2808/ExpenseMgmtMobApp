import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {View, Text, ScrollView, SafeAreaView} from "react-native";

const GST=({gst, setgst})=>{
    const choices=['YES','NO'];
    return (
        <View style={styles.container}>
            <Text style={styles.text}>GST ?</Text>
            <View style={styles.wrapper}>
                {choices.map((choice)=>(
                    <View key={choice} style={styles.choice}>
                        <Text style={styles.choiceText}>{choice}</Text>
                        <TouchableOpacity style={styles.outer} onPress={()=>setgst(choice)}>
                            {gst==choice && <View style={styles.inner}/>}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginVertical: 10,
    },
    text:{
        fontSize:18,
        fontWeight:600,
    },
    wrapper:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        marginTop: 10,
    },
    outer:{
        height:20,
        width:20,
        borderWidth:1,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    inner:{
        height:12,
        width:12,
        borderWidth:1,
        borderRadius: 10,
        backgroundColor: "black",
    },
    choice:{
        marginHorizontal: 24
    },
    choiceText:{
        fontSize: 15,
    },
});

export default GST;