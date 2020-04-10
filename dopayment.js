


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
    FlatList,
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
import {createAppContainer} from 'react-navigation';
import axios from 'react-native-axios';
import Storage from 'react-native-storage';
import PTRView from 'react-native-pull-to-refresh';
import Carousel from 'react-native-snap-carousel';
import {subcity}from './homepage'
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

let deviceHeight = Dimensions.get('window').height


import user from './homepage'
import {Getstarted} from './getstarted';
import Update from './update';
import Payment from './payment';
import Paytm from './paytm';
import Subscribe from './subscribe';






export  class Pay extends React.Component{

    constructor(){
        super()
        this.state={

            value:0,
            city:0
        }
    }




    componentDidMount(): void {







    }

    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground
                    style={{height:'100%',width:'100%'}}
                    source={require('./images/background.jpg')}
                    blurRadius={15}>






                        <View style={{flex:.25,height:'100%'}}>



                    </View>


                    {/*<Text>{this.props.navigation.state.params.city}</Text>*/}
                    <View style={{width:'80%',backgroundColor:'#fff',flex:.5,alignSelf:'center',borderRadius:25}}>

                        <ScrollView>

                            <View style={{height:20}}/>
                            <View style={{height:80,margin:15}}>
                            <Text style={{textAlign: 'center',fontSize:20,fontWeight: 'bold',color:'grey'}}>Get Uninterrupted Services</Text>

                            <Text style={{textAlign:'center',margin:15,color:'grey'}}>Subscribe to one of our plans and enjoy your favourite channels without any interruption</Text>
                            </View>



                            <View style={{margin:5,}}>
                                <View style={{flex:1,}}>
                                    <View style={{flex:.33,flexDirection:'row',margin:15,marginBottom:15,alignSelf:'center'}}>
                                    <View style={{flex:.5,justifyContent:'center'}}>
                                        <Text style={{fontSize:20,fontWeight: 'bold',color:'grey'}}>For 1 Month</Text>

                                    </View>
                                    <View style={{flex:.25,alignSelf:'center',}}>
                                        <Text style={{fontSize:20,fontWeight: 'bold',color:'#2196f3'}}>30 rs</Text>

                                    </View>
                                        <TouchableOpacity style={{height:40,flex:.25,width:100,backgroundColor:'#03a9f4',alignSelf:'center',justifyContent:'center',borderRadius:5}} onPress={()=>this.setState({value:30})}>

                                            {this.state.value===30?
                                                <Text style={{textAlign:'center',color:"#fff"}}>SELECTED</Text>

                                                :
                                                <Text style={{textAlign:'center',color:"#fff"}}>SELECT</Text>

                                            }
                                        </TouchableOpacity>

                                </View>








                                    <View style={{flex:.33,flexDirection:'row',margin:15,marginBottom:15,alignSelf:'center'}}>
                                        <View style={{flex:.5,justifyContent:'center'}}>
                                            <Text style={{fontSize:20,fontWeight: 'bold',color:'grey'}}>For 6 Month</Text>

                                        </View>
                                        <View style={{flex:.25,alignSelf:'center',}}>
                                            <Text style={{fontSize:20,fontWeight: 'bold',color:'#ff9800'}}>160 rs</Text>

                                        </View>
                                        <TouchableOpacity style={{height:40,flex:.25,width:100,backgroundColor:'#ff9800',alignSelf:'center',justifyContent:'center',borderRadius:5}} onPress={()=>this.setState({value:160})}>



                                            {this.state.value===160 ?
                                                <Text style={{textAlign:'center',color:"#fff"}}>SELECTED</Text>

                                                :
                                                <Text style={{textAlign:'center',color:"#fff"}}>SELECT</Text>

                                            }
                                        </TouchableOpacity>

                                    </View>



                                    <View style={{flex:.33,flexDirection:'row',margin:15,marginBottom:15,alignSelf:'center'}}>
                                        <View style={{flex:.5,justifyContent:'center'}}>
                                            <Text style={{fontSize:20,fontWeight: 'bold',color:'grey'}}>For 12 Month</Text>

                                        </View>
                                        <View style={{flex:.25,alignSelf:'center',}}>
                                            <Text style={{fontSize:20,fontWeight: 'bold',color:'#EF1A4C'}}>310 rs</Text>

                                        </View>
                                        <TouchableOpacity style={{height:40,flex:.25,width:100,backgroundColor:'#EF1A4C',alignSelf:'center',justifyContent:'center',borderRadius:5}} onPress={()=>this.setState({value:310})}>
                                            {this.state.value===310?
                                                <Text style={{textAlign:'center',color:"#fff"}}>SELECTED</Text>

                                                :
                                                <Text style={{textAlign:'center',color:"#fff"}}>SELECT</Text>

                                            }

                                        </TouchableOpacity>

                                    </View>


                                </View>
















                            </View>






                        </ScrollView>





                    </View>

                    <TouchableOpacity style={{height:70,width:200,backgroundColor:'#03a9f4',alignSelf:'center',marginTop:'-10%',borderRadius:15,}} onPress={()=>this.props.navigation.navigate('paytm',{pay:this.state.value})}>

                        <View style={{justifyContent:'center',marginTop:'10%'}}>
                        <Text style={{textAlign:'center',color:'#fff',fontSize:18}}>Subscribe</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{flex:.25}}>



                    </View>





                </ImageBackground>

            </View>
        )
    }

}





const RootStack = createStackNavigator(
    {
        Apps:Pay,

        paytm:Paytm




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

