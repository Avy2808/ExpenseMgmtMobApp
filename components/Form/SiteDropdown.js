import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from "react-native";
import Drop from "../../assets/down-arrow.png";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

var width = Dimensions.get('window').width-140;

const SiteDropdown=({usr, value1, setSelectedItem1, setCodes})=>{
    const [data, setData]=useState([]);
    const [showOption, setShowOption]=useState(false);

    const renderDrop=async()=>{
        const curref=collection(FIRESTORE_DB, 'SiteAllocate');
        const q = query(curref, where("alc_active", "==", true),  where("alc_user", "==", usr));
        const querySnapshot = await getDocs(q);
        const list=[];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setData(list);
    }

    const onSelected=async(site)=>{
        setSelectedItem1(site);
        await setCodes(site);
        setShowOption(false);
    }

    const Press=()=>{
        renderDrop();
        setShowOption(!showOption)
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropDownStyle} activeOpacity={0.7} onPress={()=>Press()}>
                <Text>{value1==null?"Choose an option":value1?.alc_site}</Text>
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
                        backgroundColor:value1?.alc_site==site.alc_site?"pink":"white",
                        paddingVertical: 8,
                        borderRadius: 4,
                        paddingHorizontal: 6,
                        borderWidth:1,
                        margin:1
                    }}
                    ><Text>{site.alc_site}</Text></TouchableOpacity >
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

export default SiteDropdown;