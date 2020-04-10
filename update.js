import React, { Fragment, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    ActivityIndicator,
    Dimensions,
    FlatList,
    TouchableOpacity, AsyncStorage, TouchableHighlight,ImageBackground
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

import {Container,Content,Header,Form,Input,Item,Label} from "native-base";
import {GoogleSigninButton} from "react-native-google-signin";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
// import {userNameKey} from './constant';



import PropTypes from 'prop-types'



import axois from 'react-native-axios'
import DocumentPicker from "react-native-document-picker";


import {firebase} from '@react-native-firebase/storage';


import Storage from 'react-native-storage';
const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});



export default class Update extends React.Component {



    constructor(){

        super()
        this.state={

            info:[],
            name:'',
            email:'',
            username:'',
            image:'',
            number:'',
            uri:'',
            filename:"",
            default:true,
            imgsource:'',
            uploading:false,
            imglink:''




        }
    }


    fetchuser=()=>{
        axois.get(`http://3.7.73.13:3000/getuser/`+this.state.email)

            .then((res)=>{

                const info=res.data

                this.setState({info})
                this.setState({name:this.state.info[0].name,email:this.state.info[0].email,username:this.state.info[0].username,imgsource:this.state.info[0].image})

                if(this.state.imgsource===null||this.state.imgsource==='')
                {

                    this.setState({imgsource:this.state.imglink})
                }


                console.log(this.state.imgsource)

            })


    }

    getuser=()=>
    {

        storage
            .load({
                key: 'loginState',

                // autoSync (default: true) means if data is not found or has expired,
                // then invoke the corresponding sync method
                autoSync: true,

                // syncInBackground (default: true) means if data expired,
                // return the outdated data first while invoking the sync method.
                // If syncInBackground is set to false, and there is expired data,
                // it will wait for the new data and return only after the sync completed.
                // (This, of course, is slower)
                syncInBackground: true,

                // you can pass extra params to the sync method
                // see sync example below
                syncParams: {
                    extraFetchOptions: {
                        // blahblah
                    },
                    someFlag: true
                }
            })
            .then(ret => {
                this.setState({email:ret.email,imglink:ret.image})
                this.fetchuser()

            })
            .catch(err => {
                // any exception including data not found
                // goes to catch()
                console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            });








    }

    componentDidMount() {

       this.getuser()


    }






    async selectImage() {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            this.setState({filename:res.name})
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            this.setState({ singleFile: res });
            this.setState({uri:res.uri})

            const response = await fetch(this.state.uri)
            const blob = await response.blob()
            var ref = firebase.storage().ref().child('profileimage/' + this.state.filename)

            this.setState({uploading:true})
            return  ref.put(blob)

                .then(() => {

                    ref.getDownloadURL().then((url) =>


                        {
                            this.setState({default:false})
                            this.setState({imgsource:url,activity:false,uploading:false})

                            console.log(this.state.imgsource)




                        }

                    )


                })



        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }



    }

    updateprofile=(Name,Email,Username,)=>{
        if(this.state.imgsource===null||this.state.imgsource==='')
        {

            this.setState({imgsource:this.state.imglink})
        }


        fetch('http://3.7.73.13:3000/updateuser/'+this.state.email, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({
                name: Name,
                email:Email,
                username:Username,
                image:this.state.imgsource


            })

        }).then((response) => {
            alert('Profile Updated')
            return response.json()



        }).then((jsondata) => {
            this.setState({data: jsondata})
        }).done()

    }
    catch (e) {
        console.log(e)

    }




    render(){

        return(

            <View style={{height:'100%'}}>
                <ScrollView>
                    <LinearGradient colors={['#EF1A4C', '#EF1A4C', '#FF1A4E']} start={{ x: 0, y: 0 }} style={{height:300,}}>


                        <View style={{flex:1}}>
                            <View style={{flex:.25}}/>
                            <View style={{alignSelf:'center',borderWidth:4,borderColor:'#fff',borderRadius:75,height:140,width:140,justifyContent:'center'}}>


                                <View>


                                    {this.state.imgsource===null||this.state.imgsource ===''?
                                        <Image style={{ width: 140, height: 140,borderRadius:140/2,justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}
                                               source={{uri:this.state.imglink}}/>
                                        :
                                        <View style={{justifyContent:'center'}}>
                                            <Image source={{uri:this.state.imgsource}} style={{height:140,width:140,borderRadius:140/2,alignSelf:'center'}}/>

                                        </View>
                                    }




                                </View>


                            </View>

                            <TouchableOpacity style={{alignSelf:'center',marginLeft:'19%',marginTop:-30,borderRadius:50,borderWidth:2,borderColor:'#EF1A4C'}} onPress={()=>this.selectImage()}>
                                <Icon name="pluscircle" size={25} color="#2196f3" />

                            </TouchableOpacity>
                            <ActivityIndicator animating={this.state.uploading}   size={'small'} />



                            <Text style={{color:'#fff',textAlign: 'center',fontSize:20,fontWeight: 'bold'}}>{this.state.name}</Text>
                            <Text style={{color:'#fff',textAlign: 'center',fontSize:15,fontWeight: 'bold'}}>{this.state.email}</Text>
                            <View style={{flexDirection:'row',bottom:10,position:'absolute'}}>

                                <View style={{flex:.5,borderRightWidth:3,borderColor:'#fff'}}>
                                    <Text style={{color:'#fff',textAlign: 'center',fontSize:17,fontWeight: 'bold'}}>{this.state.name}</Text>
                                </View>
                                <View style={{flex:.5}}>
                                    <Text style={{color:'#fff',textAlign: 'center',fontSize:17,fontWeight: 'bold'}}>@{this.state.username}</Text>
                                </View>
                            </View>
                        </View>

                    </LinearGradient>

                    <Text style={{fontSize:20,textAlign:'center',color:'#c1c1c1',marginTop:15}}>Update Profile</Text>

                    <View style={{marginTop:15}}>
                        <Container style={{height:400,backgroundColor:'transparent'}}>




                            <View style={{margin:5,marginTop:15}}>

                                <Item floatingLabel style={{width:'90%',alignSelf:'center'}}>

                                    <Input
                                        autoCorrect={false }
                                        autoCapitalize='none'
                                        placeholder={this.state.name}

                                        onChangeText={(name)=>this.setState({name})}

                                    />

                                </Item>
                            </View>




                            <View style={{margin:5,}}>


                                <Item floatingLabel style={{width:'90%',alignSelf:'center'}}>

                                    <Input
                                        autoCorrect={false }
                                        autoCapitalize='none'
                                        placeholder={this.state.email}
                                        onChangeText={(email)=>this.setState({email})}

                                    />

                                </Item>
                            </View>


                            <View style={{margin:5,}}>


                                <Item floatingLabel style={{width:'90%',alignSelf:'center'}}>

                                    <Input
                                        autoCorrect={false }
                                        autoCapitalize='none'
                                        placeholder={this.state.username}
                                        onChangeText={(username)=>this.setState({username})}

                                    />

                                </Item>
                            </View>



                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#EF1A4C', '#EF1A4C', '#FF1A4E']} style={{height:60,width:300,alignSelf:'center',borderRadius:50,marginTop:15,justifyContent:'center'}}>

                                <TouchableOpacity style={{alignSelf:'center',justifyContent:'center'}} onPress={()=>{this.updateprofile(this.state.name,this.state.email,this.state.username,this.state.number,this.state.images)}} disabled={this.state.uploading}>

                                    <Text style={{textAlign:'center',justifyContent:'center',fontSize:20,color:'#fff'}}>Update</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                        </Container>
                    </View>

                </ScrollView>


            </View>
        )
    }



}
