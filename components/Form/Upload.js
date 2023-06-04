import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, Text, Platform, Image } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import Btn from "../Authentication/Btn";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as DocumentPicker from 'expo-document-picker';
import { storage, FIRESTORE_DB } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import docu from "../../assets/document.png";
import files from "../../assets/file.png";

export default function Upload({usr, attach, setattach, text, settext}){

    const [image, setimage]=useState(null);

    const pickDocument=async()=>{
        try{
            let file=await DocumentPicker.getDocumentAsync({});
            if(file.type==='cancel'){
                alert('No document selected');
                return;
            }
            // const path=await normalisePath(file.uri);
            settext(file.name);
            setimage(file.uri);
        }
        catch(err){
            throw err;
        }
    }

    useEffect(() => {

        const uploadImage=async()=>{
            const blobImage=await new Promise((resolve, reject)=>{
                const xhr=new XMLHttpRequest();
                xhr.onload=function(){
                    resolve(xhr.response);
                };
                xhr.onerror=function(){
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType="blob";
                xhr.open("GET", image, true);
                xhr.send(null);
            });

            // const metadata = {
            //     contentType: 'image/jpeg'
            // };

            const storageRef = ref(storage, 'ExpenseFiles/' + Date.now() + usr);
            const uploadTask = uploadBytesResumable(storageRef, blobImage);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setattach(downloadURL);
                });
            }
            );

        }
        if(image!=null){
            uploadImage();
            setimage(null);
        }
    }, [image]);

    return(
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text style={{fontSize: 20, textAlign: "center", marginVertical: 16, }}>Upload Document</Text>
            <View style={{marginHorizontal: 40, alignItems:"center"}}>
                <View style={{ marginHorizontal:10, backgroundColor:"white", zIndex:5, borderRadius:8, flexDirection:"row", alignItems:'center', justifyContent:'center', padding:8, borderColor:"black", borderWidth:1}}>
                    <Image source={attach===null?docu:files} style={{height:40, width:40, margin:5, marginHorizontal:10}} />
                    <Text style={{fontSize:14, fontWeight:400, margin:5}}>{text}</Text>
                </View>
                <TouchableOpacity onPress={pickDocument} style={{ backgroundColor: "#006A42", borderRadius: 70, alignItems: "center", width: 150, paddingVertical: 5, margin: 5}}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Select Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};