import React, { useState } from 'react';
import {Pressable, SafeAreaView, StyleSheet, TextInput, Platform, View, TouchableOpacity} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

const TextInpute = ({desc, setDesc, amount, setAmount, date, setdate, datetext, setdatetext}) => {

  const [showpicker, setshowpicker]=useState(false);

  const toggleDatePicker=()=>{
    setshowpicker(!showpicker);
  }

  const confirmios=()=>{
    setdatetext(date.toDateString());
    toggleDatePicker();
  }

  const onChange=({type}, selecteddate)=>{
    if(type==="set"){
      const currDate=selecteddate;
      setdate(currDate);
      console.log(date);
      if(Platform.OS==="android"){
        toggleDatePicker();
        setdatetext(currDate.toDateString());
      }
      else{
        toggleDatePicker();
      }
    }
    else{
      toggleDatePicker();
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setDesc(text)}
        value={desc}
        placeholder="Description of expense"
      />
      <TextInput
        style={styles.input}
        onChangeText={(am)=>setAmount(am)}
        value={amount}
        placeholder="Amount Spent"
        keyboardType="numeric"
      />
      <Pressable onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Chose the Date of Expense"
          onChangeText={(dt)=>setdatetext(dt)}
          value={datetext}
          editable={false}
        />
      </Pressable>
      {showpicker && 
      <DateTimePicker
        mode='date'
        display='spinner'
        value={date}
        onChange={onChange}
      />
      }
      {showpicker && Platform.OS==="ios" && 
        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
          <TouchableOpacity 
            style={{padding:20, fontSize:14, justifyContent:"center", alignItems:"center", borderRadius:50, marginBottom:14, marginTop:10, backgroundColor:"#075985"}}
            onPress={toggleDatePicker}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{padding:20, fontSize:14, justifyContent:"center", alignItems:"center", borderRadius:50, marginBottom:14, marginTop:10}}
            onPress={confirmios}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 16,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor:"white",
    color:"black"
  },
});

export default TextInpute;