import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from "react-native";
import Drop from "../../assets/down-arrow.png";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
var width = Dimensions.get('window').width-180;

const ExpDropdown=({value, setSelectedItem})=>{
    const [data, setData]=useState([]);
    const [showOption, setShowOption]=useState(false);

    const renderDrop=async()=>{
        const curref=collection(FIRESTORE_DB, 'ExpenseHead');
        const q = query(curref, where("ex_active", "==", true));
        const querySnapshot = await getDocs(q);
        const list=[];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setData(list);
    }

    const onSelected=(site)=>{
        setShowOption(false);
        setSelectedItem(site);
    }

    const Press=()=>{
        renderDrop();
        setShowOption(!showOption)
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropDownStyle} activeOpacity={0.7} onPress={()=>Press()}>
                <Text>{value==null?"Choose an option":value?.ex_name}</Text>
                <Image source={Drop} style={{height:20, width:20, transform:[{rotate:showOption?"180deg":"0deg"}]}}/>
            </TouchableOpacity>
            {showOption && (<View style={{
                // backgroundColor:"black",
                padding:1,  
                borderRadius: 4
            }}>
                {data.map((site)=>{
                    return <TouchableOpacity onPress={()=>onSelected(site)}
                    style={{
                        backgroundColor:value?.ex_code==site.ex_code?"pink":"white",
                        paddingVertical: 8,
                        borderRadius: 4,
                        paddingHorizontal: 6,
                        borderWidth:1,
                        margin:1
                    }}
                    ><Text>{site.ex_name}</Text></TouchableOpacity >
                })}
            </View>)}
        </View>
    )
}

const styles=StyleSheet.create({
    container:{

    },
    dropDownStyle:{
        width: width,
        // backgroundColor: "rgba(0,0,0,0.2)",
        backgroundColor: "white",
        padding: 8,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: "space-between",
        flexDirection:"row",
        alignItems:"center",
        marginBottom: 6,
        borderWidth:1
    }
});

export default ExpDropdown;