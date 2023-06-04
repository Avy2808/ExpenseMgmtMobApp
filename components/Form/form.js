import React, { useState } from "react";
import {View, Text, ScrollView, ImageBackground, Dimensions} from "react-native";
import { useContext } from "react";
import { Stack } from "expo-router";
import { StyleSheet, Pressable} from "react-native";
import ProfHeader from "./profHeader";
import ExpDropdown from "./ExpDropdown";
import SiteDropdown from "./SiteDropdown";
import TextInpute from "./TextInput";
import GST from "./GSTCheck";
import Boy from "../../assets/boy.png";
import Upload from "./Upload";
import { DBContext } from "../../src/index.js";

const Formi=(props)=>{

    const {desc, setDesc, amount, setAmount, gst, setgst, addRequest, usr, value1, setSelectedItem1, value, setSelectedItem, setCodes, date, setdate, attach, setattach, datetext, setdatetext, text, settext, cancel}=useContext(DBContext);

    return(
        <View style={{flex:1, backgroundColor: "lightWhite"}}>
            <Stack.Screen
            options={{
                title: 'My home',
                headerStyle: {
                    backgroundColor: "#594",
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center'
                },
                headerShadowVisible:false,
                headerRight: () =>  (
                    <ProfHeader icon={Boy} navigation={props.navigation}/>
                ),
                headerTitle: "Payment Updation App"
            }}
            />
            <ScrollView contentContainerStyle={{justifyContent:"space-around"}}>
                <ImageBackground source={require("../../assets/bgimg.jpeg")} style={{width:"100%"}} resizeMode="cover">
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:"#ffd", margin:10, borderRadius: 12, padding: 10, marginTop: 40, marginBottom:40}}>
                    <View style={{flex:1, padding: 20, justifyContent:"center", flexDirection:"row"}}>
                        <Text style={{fontSize: 18, marginTop: 8, fontWeight: 600}}>Site: </Text>
                        <SiteDropdown usr={usr} value1={value1} setSelectedItem1={setSelectedItem1} setCodes={setCodes} />
                    </View>
                    <View style={{flex:1, padding: 15, justifyContent:"center", flexDirection:"row"}}>
                        <Text style={{fontSize: 18, marginTop: 8, fontWeight: 600}}>Expense: </Text>
                        <ExpDropdown value={value} setSelectedItem={setSelectedItem} />
                    </View>
                    <TextInpute desc={desc} setDesc={setDesc} amount={amount} setAmount={setAmount} date={date} setdate={setdate} datetext={datetext} setdatetext={setdatetext} />
                    <GST gst={gst} setgst={setgst} />
                    <Upload usr={usr} attach={attach} setattach={setattach} text={text} settext={settext}/>
                    <View style={{flexDirection: "row", alignItems:"center", justifyContent:"space-around", marginHorizontal: 40, marginVertical:20}}>
                        <Pressable style={({ pressed }) => [{backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'}, styles.button1]} onPress={()=>addRequest()}>
                            <Text style={styles.text}>Submit</Text>
                        </Pressable>
                        <Pressable style={styles.button2} onPress={()=>cancel()} >
                            <Text style={styles.text}>Cancel</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}

export default Formi;

const styles = StyleSheet.create({
    button1: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#209F00",
    },
    button2: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
      elevation: 3,
      backgroundColor: "#F02F00",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
    },
  });