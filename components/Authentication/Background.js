import React from "react";
import { ImageBackground, View } from "react-native";

const Background=({children})=>{
    return (
        <View>
            <ImageBackground source={require("./../../assets/bgimg.jpeg")} style={{height: "100%"}} blurRadius={1}/>
            <View style={{position:"absolute"}}>
                {children}
            </View>
        </View>
    )
};

export default Background;