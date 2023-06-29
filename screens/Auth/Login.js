import { async, FirebaseError } from '@firebase/util';
import React,{useState} from 'react';
import {View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView} from 'react-native';
import { FirebareAuth, FirestoreDB } from '../../FirebaseConfig';
import{createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { collection, getDocs, getDoc,addDoc, updateDoc,deleteDoc,doc, setDoc } from 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth=FirebareAuth;

    const signIn =async () =>{
        setLoading(true);
        try{
            const response =await signInWithEmailAndPassword(auth, email,password);
            console.log(response);
            const userDocRef =doc(FirestoreDB, 'users',response.user.uid);
            const userDocSnap= await getDoc(userDocRef);
        }catch(error){
            console.log(error);
            alert('Sign In failed' + error.message)
        }finally{
            setLoading(false);
        }
    }

    const signUp =async () =>{
        setLoading(true);
        try{
            const response =await createUserWithEmailAndPassword(auth, email,password);
            console.log(response);
            const userDocRef =doc(FirestoreDB, 'users',response.user.uid);
            await setDoc(userDocRef,{
                email:email,
                password: password,
            })
            
            alert('account created!')
        }catch(error){
            console.log(error);
            alert('Sign Up failed' + error.message)
        }finally{
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
           <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(text)=> setEmail(text)}>
           </TextInput>
           <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize='none' onChangeText={(text)=> setPassword(text)}>
           </TextInput>

           {loading ? (
            <ActivityIndicator size="large" color="#40128B" /> 
           ): (
            <>
            <Button title='Login' color="#5C469C" onPress={signIn}/>
            <Button title='Create account' color="#5C469C" onPress={signUp}/>
           </>
           )}
           </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        flex:1,
        justifyContent:'center'
    },
    input:{
       marginVertical:4,
       height:58,
       borderWidth:1,
       borderRadius:4,
       padding:10,
       backgroundColor:'#FFF4F4' 
    }
});

export default Login;
