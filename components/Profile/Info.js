import React, { useContext, useEffect } from "react";
import { View , Text, Image} from "react-native";
import { DBContext } from "../../src/index.js";


const Info=()=>{
    
    const {lis}=useContext(DBContext);
    
    const remList = lis.map((data) => {
        return(
            <View style={{alignSelf:"center", flexDirection:"row", justifyContent:"center", backgroundColor:"#fff", width:"90%", padding:14, borderRadius:10, shadowOpacity:80, elevation:15, marginTop:10, marginBottom:10}}>
                <Image source={require("../../assets/to-do-list.png")} style={{height:20, width:20, marginTop:4}}></Image>
                <Text style={{fontSize: 20, fontWeight:"bold", marginLeft:10}}>{data.exp_desc}</Text>
            </View>
        )
    });

    return(
        <View style={{width:"100%"}}>
            {remList}
        </View>
    )
}

export default Info;