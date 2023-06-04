import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";

const ProfHeader=({icon, navigation})=>{
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={()=>navigation.navigate("Profile")}>
            <Image
                source={icon}
                resizeMode="cover"
                style={styles.btnImg("150%")}
            />
        </TouchableOpacity>
    )
}

export default ProfHeader;

const styles = StyleSheet.create({
    btnContainer: {
      margin:10,
      width: 32,
      height: 32,
      backgroundColor: "white",
      borderRadius: 1.25,
      justifyContent: "center",
      alignItems: "center",
    },
    btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
      borderRadius: 1.25,
    }),
  });