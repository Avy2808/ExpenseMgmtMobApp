import React from 'react';
import {View, Text} from 'react-native';
import Background from './Background';
import Btn from './Btn';

const Home=(props)=> {
    return (
        <Background>
            <View style={{marginHorizontal: 32, marginVertical: 200}}>
                <Text style={{color:"white", fontSize: 52}}>Welcome</Text>
                <Text style={{color:"white", fontSize: 52, marginBottom: 80}}>To My App</Text>
                <Btn bgColor="#006A42" textColor="white" btnLabel="Login" Press={()=>props.navigation.navigate("Login")}/>
                {/* <Btn bgColor="white" textColor="#006A42" btnLabel="Sign Up" Press={()=>props.navigation.navigate("Signup")}/> */}
            </View>
        </Background>
    );
}

export default Home;
