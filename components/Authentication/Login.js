import React from "react";
import { View, Text, KeyboardAvoidingView, Alert } from "react-native";
import Background from "./Background";
import Field from "./Field";
import Btn from "./Btn";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { DBContext } from "../../src/index.js";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha"
import { firebaseConfig } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';

export default function Login(props){

    const {setPhone, otp, setotp, verid, recaptchaVerifier, sendVerification, renderList}=useContext(DBContext);

    const confirmCode = () => { 
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verid,
          otp
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => {
            setotp('');
            Alert.alert(
            'Login Successful. Welcome to Dashboard.',
            );
            props.navigation.navigate("Profile");
        })
        .catch((error) => {
          alert(error);
        })
    };

    const Logi=()=>{
        confirmCode();
        renderList();
    }

    return (
        <Background>
            <KeyboardAvoidingView style={{alignItems:"center", width: 350}}>
                <Text style={{color:"white", fontSize: 52, fontWeight:"bold", marginVertical: 100, marginBottom: 50}}>Login</Text>
                <View style={{backgroundColor: "white", height: 700, width: 400, borderTopLeftRadius: 120, paddingTop: 50, alignItems:"center"}}>
                    <Text style={{fontSize: 40, color:"#006A42", fontWeight:"bold"}}>Welcome Back</Text>
                    <Text style={{color: "grey", fontSize: 20, fontWeight:"bold", marginBottom: 20}}>Login using OTP</Text>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    />
                    <Field
                        placeholder="Phone number with country code"
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        autoCompleteType="tel"
                    />
                    <TouchableOpacity onPress={sendVerification} style={{paddingHorizontal:16, paddingVertical:12, borderRadius:24, backgroundColor:"#006A42", margin: 12}}>
                        <Text style={{color:"white", fontWeight:600}}>
                            Send Verification
                        </Text>
                    </TouchableOpacity>
                    <Field
                        placeholder="Confirm Code"
                        onChangeText={setotp}
                        keyboardType="number-pad"
                    />
                    {/* <View style={{alignItems:"flex-end", width:"78%", paddingRight: 16, marginBottom: 50}}>
                        <Text style={{color: "#006A42", fontWeight:"bold", fontSize: 16}}>Forgot password?</Text>
                    </View> */}
                    <Btn textColor="white" bgColor= "#006A42" btnLabel="Login" Press={Logi}/>
                    {/* <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <Text style={{fontWeight:"bold", fontSize: 16}}>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=>props.navigation.navigate("Signup")}>
                            <Text style={{color: "#006A42", fontWeight:"bold", fontSize: 16}}>Signup</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </KeyboardAvoidingView>
        </Background>
    );
}