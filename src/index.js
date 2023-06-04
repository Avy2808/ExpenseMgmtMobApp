import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Authentication/Home';
import Login from '../components/Authentication/Login';
import Formi from "../components/Form/form";
import Profile from '../components/Profile/Profile';
import { createContext, useState } from "react";
import { FIRESTORE_DB } from "../firebaseConfig";
import { setDoc, collection, doc, where, query, getDocs, onSnapshot } from "firebase/firestore";
import { useRef } from 'react';
import firebase from 'firebase/compat/app';
import { Alert } from 'react-native';

export const DBContext=createContext();

const Stack = createNativeStackNavigator();

function Appi() {

    const [lis, setList]=useState([]);
    const [desc, setDesc]=useState('');
    const [amount, setAmount]=useState(0);
    const [date, setdate]=useState(new Date());
    const [gst, setgst]=useState(null);
    const [phone, setPhone]=useState('');
    const [otp, setotp]=useState('');
    const [verid, setverid]=useState(null);
    const recaptchaVerifier=useRef(null);
    const [usr, setusr]=useState('');
    const [value1, setSelectedItem1]=useState('');
    const [value, setSelectedItem]=useState('');
    const [com, setcom]=useState(null);
    const [cc, setcc]=useState(null);
    const [datetext, setdatetext]=useState('');
    const [attach, setattach]=useState(null);
    const [text, settext]=useState('Select a document...');

    const cancel=()=>{
      setSelectedItem1('');
      setAmount(0);
      setdate(new Date());
      setdatetext('');
      setSelectedItem('');
      setcom(null);
      setcc(null);
      setattach(null);
      settext('Select a document...');
      setgst(null);
      setDesc('');
    }

    const setCodes=async(site)=>{
      console.log(site);
      // const curref=collection(FIRESTORE_DB, 'SiteMaster');
      // const q = query(curref, where("site_name", "==", site.alc_site), where("site_active", "==", true));
      // const querySnapshot = await getDocs(q);
      // const list=[];
      // querySnapshot.forEach((doc) => {
      //   list.push(doc.data());
      // });
      // console.log(list.length);
      // setcom(list[0].site_com);
      // setcc(list[0].site_cc);
      const q=query(collection(FIRESTORE_DB, 'SiteMaster'), where('site_name', '==', site.alc_site));
    const unsubscribe=onSnapshot(q, (querySnapshot)=>{
      const arr=[];
      querySnapshot.forEach((doc)=>{
        arr.push({...doc.data(), id:doc.id});
      });
      setcc(arr[0].site_cc);
      setcom(arr[0].site_com);
    })
    return ()=>unsubscribe()
    }

    const sendVerification = () => {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phone, recaptchaVerifier.current)
        .then(setverid);
        setusr(phone.toString());
  };

    const renderList=async()=>{
        const curref=collection(FIRESTORE_DB, 'SiteExpense');
        const q = query(curref, where("exp_usr", "==", usr));
        const querySnapshot = await getDocs(q);
        const list=[];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
        setList(list);
    }

    const addRequest=async()=>{
        if(desc==='' || amount==='' || gst===null || date==='' || value==='' || com===null || cc===null || attach===null){
          Alert.alert('Enter values for all the fields again');
          return;
        }
        setCodes();
        const curref=collection(FIRESTORE_DB, 'SiteExpense');
        await setDoc(doc(curref), {exp_desc: desc, exp_amt: amount, exp_gst: gst, exp_usr: usr, exp_sub:value.ex_sub, exp_date: new Date(), exp_com:com, exp_code:value.ex_code, exp_cc:cc, exp_attach:attach, exp_date1:date, exp_by1:usr, exp_date2:null, exp_by2:null, exp_date3:null, exp_by3:null, exp_rejected:false, exp_rej_date:null, exp_approved:false, exp_apr_date:null, exp_site:value1.alc_site, exp_status:1});
        renderList();
        setDesc('');
        setAmount(0);
        setgst(null);
        setcom(null);
        setcc(null);
        setSelectedItem(null);
        setSelectedItem1(null);
        setdatetext('');
        setattach(null);
        settext('Select a document...');
        alert('Expense recorded successfully');
    }




  return (
    <DBContext.Provider value={{cancel:cancel, lis:lis, setList:setList, desc:desc, setDesc:setDesc, amount:amount, setAmount:setAmount, gst:gst, setgst:setgst, addRequest:addRequest, phone:phone, setPhone:setPhone , otp:otp, setotp:setotp, verid:verid, setverid:setverid, recaptchaVerifier:recaptchaVerifier, sendVerification:sendVerification, renderList:renderList, usr:usr, value1:value1, setSelectedItem1:setSelectedItem1, value:value, setSelectedItem:setSelectedItem, setCodes:setCodes, date:date, setdate:setdate, attach:attach, setattach:setattach, datetext:datetext, setdatetext:setdatetext, text:text, settext:settext}}>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Formi" component={Formi}/>
          <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
    </DBContext.Provider>
  );
}

export default Appi;