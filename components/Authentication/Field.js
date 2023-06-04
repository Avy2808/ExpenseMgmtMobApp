import React from "react";
import { TextInput } from "react-native-gesture-handler";

const Field=(props)=>{
    return(
        <TextInput {...props} style={{borderRadius: 100, color: "#006A42", padding: 10, width:"76%", backgroundColor: "rgb(220, 220, 220)", marginVertical: 8}} placeholderTextColor={"#006A42"}>

        </TextInput>
    )
}

export default Field;