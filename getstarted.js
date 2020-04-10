


import React, { Component, Fragment } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StatusBar,
    Button,
    Image,
    ImageBackground,
    Dimensions, AsyncStorage,
} from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';


import LinearGradient from 'react-native-linear-gradient';
import {Appintro, LoginController} from './App';
import Icon from 'react-native-vector-icons/AntDesign';
import {createStackNavigator} from 'react-navigation-stack';
import Homepage from './homepage';
import {createAppContainer} from 'react-navigation';
import axios from 'react-native-axios';
import Storage from 'react-native-storage';
import DocumentPicker from "react-native-document-picker";
import {firebase} from '@react-native-firebase/storage';

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


let deviceWidth = Dimensions.get('window').width


export  class Getstarted extends React.Component{

    constructor(){
        super()


        this.state={


            url:[],
            name:'',
            username:'',
            avaiable:true,
            email:'',
            uri:'',
            uploading:false,
            imgsource:null

        }
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


















    checkusername=()=>{
        for(var i=0;i<this.state.url.length;i++)
        {
            if(this.state.username.toLowerCase()===this.state.url[i].username)
            {
                this.setState({avaiable:false})
            }
        }

    }




    componentDidMount(): void {

        axios.get(`http://3.7.73.13:3000/users`)
            .then((res)=>{
                const url=res.data
                this.setState({url})


            })
        setInterval(() => {

            this.checkusername()

        }, 100);





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
                this.setState({email:ret.email,})

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





        axios.get(`http://3.7.73.13:3000/getuser/`+this.state.email)
            .then((res)=>{
                const url=res.data
                this.setState({url})



            })




    }




    postdata=()=>{



    fetch('http://3.7.73.13:3000/username', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
        },


        body: JSON.stringify({
            name:this.state.name.toLowerCase(),
            username:this.state.username.toLowerCase(),
            email:this.state.email.toLowerCase(),
            image:this.state.imgsource
        })

    }).then((response) => {

        return response.json()



    }).then((jsondata) => {
        this.setState({data: jsondata})
    }).done()

}





    render()
    {

        return(
            <View style={{height:'100%'}}>
                <ScrollView>
                <View style={{height:250,justifyContent:'center'}}>
                    <Text style={{fontSize:20,textAlign:'center',fontWeight: 'bold'}}>Let's get you started!</Text>

                </View>


                 <TouchableOpacity style={{height:160,width:160,borderRadius:80,backgroundColor:'#DDDDDD',alignSelf:'center',justifyContent:'center'}} onPress={()=>this.selectImage()}>



                     {this.state.imgsource===null||this.state.imgsource===''?

                         <Image source={require('./images/avatar.png')} style={{width:160,height:160,borderRadius:80}}/>

                         :

                         <Image source={{uri:this.state.imgsource}} style={{width:160,height:160,borderRadius:80}}/>

                     }




                     <Icon name="pluscircle" size={25} color="#EF1A4C"  style={{position:'absolute',bottom:10,right:20,}}/>


                 </TouchableOpacity>

<View style={{height:100}}>
</View>

                <View style={{height:250}}>
                    <Text style={{marginLeft:'13%',margin:5,color:'#C2C2C2'}}>Tell us your name</Text>
                    <TextInput
                        onChangeText={(name)=>this.setState({name})}
                     style={{width:deviceWidth-70,height:60,alignSelf:'center',borderRadius:15,backgroundColor:'#dddddd'}}
                    />

                    <Text style={{marginLeft:'13%',margin:5,color:'#C2C2C2'}}>@username</Text>
                    <TextInput
                        onChangeText={(username)=>{this.setState({username,avaiable:true});this.checkusername()}}

                        style={{width:deviceWidth-70,height:60,alignSelf:'center',borderRadius:15,backgroundColor:'#dddddd'}}
                    />
                    {this.state.avaiable===false?
                        <Text style={{color:'red',marginLeft:'10%'}}>Not avaiable</Text>
                        :
                        <View/>
                    }
                </View>



                    <TouchableOpacity style={{height:60,width:deviceWidth-70,backgroundColor:'#2196f3',alignSelf:'center',justifyContent:'center',borderRadius:10}} onPress={()=>{this.props.navigation.navigate('Details');this.postdata()}}>

                        <Text style={{textAlign:'center',color:'white',fontSize:20}}>Next</Text>
                    </TouchableOpacity>

                </ScrollView>



            </View>
        )
    }


}








const RootStack = createStackNavigator(
    {
        Apps:Getstarted,

        getstarted:Getstarted,
        Details:()=><Homepage/>



    },
    {
        headerMode:'none',
        navigationOptions: {
            header:null
        },

        initialRouteName:'Apps'
    }


);









const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;

    }
}











