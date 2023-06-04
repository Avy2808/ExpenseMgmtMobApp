import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import Info from "./Info";
import Btn from "../Authentication/Btn";
import { Stack } from "expo-router";
import { DBContext } from "../../src/index.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const Profile=(props)=>{

    const {usr}=useContext(DBContext);
    const [name, setname]=useState(null);

    useEffect(async()=>{
        const curref=collection(FIRESTORE_DB, 'UserMaster');
        const q = query(curref, where("usr_id", "==", usr));
        const querySnapshot = await getDocs(q);
        const list=[];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
        setname(list[0].usr_name);
    }, [])

    return(
        <View>
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
                headerTitle: "Payment Updation App"
            }}
            />
            <ScrollView>
                <Image source={require("../../assets/bgimg.jpeg")} style={{padding: 10, width:"100%", height: 150, backgroundColor:"#161"}} blurRadius={1.5}></Image>
                <View style={{alignItems: "center"}}>
                    <Image source={require("../../assets/boy.png")} style={{width: 140, height: 140, borderRadius: 100, marginBottom: 16,  marginTop: -90}}></Image>
                    <Text style={{fontSize: 25, fontWeight:"bold", padding: 10}}>{name}</Text>
                    <Text style={{fontSize: 15, fontWeight:"bold", color:"grey"}}>{usr}</Text>
                    <Text style={{fontSize: 20, fontWeight:"bold", marginTop: 10}}>Pending approvals</Text>
                    <Info/>
                    <Btn textColor="white" bgColor= "#006A42" btnLabel="New Expense" Press={()=>props.navigation.navigate("Formi")} style={{marginBottom: 15}}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile;