


import React, { Component, Fragment } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StatusBar, FlatList,
    Button,
    Image,
    ImageBackground,
    Dimensions, AsyncStorage, Linking,
} from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';


import LinearGradient from 'react-native-linear-gradient';
import {LoginController} from './App';


let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

import Carousel from 'react-native-snap-carousel';
import axios from 'react-native-axios'
import Modal from 'react-native-modal';
import SlidingUpPanel from 'rn-sliding-up-panel';
import SlidingPanel from 'react-native-sliding-up-down-panels';
import Icon from 'react-native-vector-icons/Fontisto';


import Storage from 'react-native-storage';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Getstarted} from './getstarted';
import Subscribe from './subscribe';
import Pay from './dopayment';



import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipe from './swipe';
import SoundPlayer from 'react-native-sound-player';
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






export default class Contact extends React.Component{

    constructor(props) {
        super(props);
        this.state={


        }
    }



    render(){

        return(
            <View style={{height:'100%'}}>
                <ScrollView>

                <View style={{height:500,width:'100%',backgroundColor:'#EF1A4C',}}>
                    <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',textAlign: 'center',margin:'5%'}}>Contact Us</Text>
                    <Image source={require('./images/contact.png')} style={{height:250,width:300,alignSelf:'center'}}/>

                    <View style={{flexDirection:'row',marginTop:15}}>
                        <View style={{flex:.5,justifyContent:'center'}}>
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                                <Icon name="email" size={15} color="#FFf" style={{alignSelf:'center',justifyContent:'center'}} />

                                <Text style={{textAlign:'center',color:'#fff',margin:5}}>  Email</Text>
                            </View>
                            <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold',margin:5}}> RitzzyRadio@gmail.com</Text>

                        </View>



                        <View style={{flex:.5,justifyContent:'center'}}>
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                                <Icon name="phone" size={15} color="#FFf" style={{alignSelf:'center',justifyContent:'center'}} />

                                <Text style={{textAlign:'center',color:'#fff',margin:5}}>  Phone</Text>
                            </View>
                            <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold',margin:5}}> +91 88888888888</Text>

                        </View>

                    </View>



                </View>



                <View style={{width:'95%',height:270,backgroundColor:'#fff',alignSelf:'center',elevation: 7,marginTop:'-19%',borderRadius:15,margin:15}}>




                    <TouchableOpacity style={{flex:.4,width:'80%'}} onPress={() => Linking.openURL('mailto:Ritzzyradio.com?cc=contact to RitzzyRadio &body=Happy to help\n')}>


                        <View style={{flex:1,margin:15}}>

                            <View style={{flexDirection:'row',}}>
                                <Icon name="email" size={15} color={'#2196f3'} style={{alignSelf:'center',justifyContent:'center'}} />

                                <Text style={{textAlign:'center',margin:5,color:'#2196f3',fontSize:18}}>  Write An Email</Text>
                            </View>

                            <View style={{marginLeft:'10%'}}>
                            <Text style={{color:'grey'}}>
                                We are here to help you!!
                            </Text>
                            <Text style={{color:'grey'}}>
                                If you need any help email us we will contact you ASAP!

                            </Text>
                            </View>

                        </View>

                    </TouchableOpacity>








                    <View style={{flex:.5,width:'80%'}}>


                        <View style={{flex:1,margin:15}}>

                            <View style={{flexDirection:'row',}}>
                                <Icon name="periscope" size={15} color={'#2196f3'} style={{alignSelf:'center',justifyContent:'center'}} />

                                <Text style={{textAlign:'center',margin:5,color:'#2196f3',fontSize:18}}>  HeadQuaters</Text>
                            </View>

                            <View style={{marginLeft:'10%'}}>
                                <Text style={{color:'grey'}}>
                                    A1 building near post office
                                </Text>
                                <Text style={{color:'grey'}}>

                                pin-261001
                                </Text>
                            </View>

                        </View>

                    </View>



                </View>
                </ScrollView>

            </View>
        )

    }

}
