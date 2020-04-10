


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
import Homepage from './homepage';
import {createAppContainer} from 'react-navigation';
import axios from 'react-native-axios';
import Storage from 'react-native-storage';
import PTRView from 'react-native-pull-to-refresh';
import Carousel from 'react-native-snap-carousel';

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
import Contact from './contact';
export  class Subscribe extends React.Component{

    constructor()

    {
        super()
        this.state={

            email:'',
            name:'',
            id:0,
            url:[],
            urls:[],
            image:''
        }
    }



    fetchuser=()=>{


        axios.get(`http://3.7.73.13:3000/getuser/`+this.state.email)
            .then((res)=>{
                const url=res.data
                this.setState({url})
                this.setState({name:this.state.url[0].name,id:this.state.url[0].id,image:this.state.url[0].image})




                axios.get(`http://3.7.73.13:3000/getsub/`+this.state.id)
                    .then((res)=>{
                        const urls=res.data
                        this.setState({urls})
                        console.log(this.state.id)



                    })

            })


    }

    getcity=()=>{

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

    componentDidMount(): void {

        this.getcity()
    }


    render(){
        return(
            <View style={{height:'100%'}}>

                <ScrollView>
                    <PTRView onRefresh={this.getcity} >

                        <LinearGradient colors={['#EF1A4C', '#EF1A4C', '#FF1A4E']} start={{ x: 0, y: 0 }} style={{height:400,borderBottomRightRadius:50,borderBottomLeftRadius:50}}>
                            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:25,color:'#fff',marginTop:40}}>Ritzzy-Radio</Text>


                            <View style={{flexDirection:'row',alignSelf:'center',marginTop:5}}>
                                <View style={{flex:.25,justifyContent:'center',}}>

                                    <TouchableOpacity style={{justifyContent:'center',alignSelf:'center',borderRadius:50,backgroundColor: 'rgba(0,0,0,0.1)',width:50,height:50}} onPress={()=>this.props.navigation.navigate('Update')} >
                                        <Icon name="edit" size={25} color="#fff" style={{alignSelf:'center'}}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flex:.5,alignSelf:'center'}}>

                                    <View style={{height:130,width:130,borderWidth:5,borderRadius:75,justifyContent:'center',borderColor:'white',alignSelf:'center'}}>

                                        {this.state.image===''||this.state.image===null||this.state.image===undefined?

                                            <Image source={require('./images/avatar.png')} style={{width:130,height:130,alignSelf:'center'}}/>
                                            :
                                            <Image source={{uri:this.state.image}} style={{width:130,height:130,alignSelf:'center',borderRadius:130/2}}/>

                                        }

                                    </View>
                                </View>


                                <View style={{justifyContent:'center',flex:.25,alignSelf:'center'}}>
                                    <TouchableOpacity style={{justifyContent:'center',alignSelf:'center',borderRadius:50,backgroundColor: 'rgba(0,0,0,0.1)',width:50,height:50}} onPress={()=>this.props.navigation.navigate('contact')}>
                                        <Icon name="setting" size={25} color="#fff" style={{alignSelf:'center'}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{alignSelf:'center',marginTop:'5%'}}>
                                <Text style={{fontSize:20,color:'white',fontWeight:'bold',textAlign:'center'}}>{this.state.name}</Text>
                                <Text style={{fontSize:15,color:'white',fontWeight:'bold',textAlign:'center'}}>{this.state.email}</Text>




                            </View>


                            <View style={{flexDirection:'row',flex:1}}>

                                <View style={{borderRightWidth:2,flex:.33,alignSelf:'center',justifyContent:'center',borderColor:'#fff'}}>
                                    {this.state.progress<=.01?
                                        <Text style={{textAlign:'center',fontSize:20,color:'white',fontWeight:'bold'}}>0 Cal</Text>

                                        :
                                        <Text style={{textAlign:'center',fontSize:20,color:'white',fontWeight:'bold'}}></Text>

                                    }

                                    <Text style={{textAlign:'center',fontSize:15,color:'white'}}></Text>

                                </View>
                                <View style={{flex:.33,alignSelf:'center',justifyContent:'center',borderColor:'#fff'}}>
                                    <Icon name="fork" size={35} color="#fff" style={{alignSelf:'center'}} />


                                </View>
                                <View style={{flex:.33,alignSelf:'center',justifyContent:'center',borderLeftWidth:2,borderColor:'#fff'}}>

                                    <Text style={{textAlign:'center',fontSize:20,color:'white',fontWeight:'bold'}}></Text>

                                    <Text style={{textAlign:'center',fontSize:15,color:'white'}}></Text>

                                </View>
                            </View>

                        </LinearGradient>




                        {/*<View>*/}











                        <View style={{height:90,flex:1,justifyContent:'center'}}>
                            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Subscribed City's</Text>
                        </View>


                        {/*<View style={{flex:.9,flexDirection:'row',alignSelf:'center'}}>*/}


                        {/*    <TouchableOpacity style={{flex:.8,justifyContent:'center',backgroundColor:'#fff',height:80,margin:5,alignSelf:'center',elevation:5,borderRadius:5}}>*/}
                        {/*        <Icon name="linechart" size={35} color="red" style={{marginLeft:5}} />*/}

                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        <View style={{flex:1,alignSelf:'center',}}>
                            {/*<ProgressChart*/}

                            {/*    data = {{*/}
                            {/*        labels: ["Aim", "Progress", "Goal"], // optional*/}
                            {/*        data: [this.state.randoms, this.state.showprogress/897,this.state.progress/897]*/}
                            {/*    }}*/}
                            {/*    width={400}*/}
                            {/*    height={220}*/}

                            {/*chartConfig={{backgroundColor: "transparent",*/}
                            {/*    alignSelf:'center',*/}
                            {/*    backgroundGradientFrom: "#fff",*/}
                            {/*    backgroundGradientTo: "#fff",*/}
                            {/*    decimalPlaces: 2, // optional, defaults to 2dp*/}
                            {/*    color: (opacity = 1) => `rgba(0, 0, 0, .1)`,*/}
                            {/*    labelColor: (opacity = 1) => `rgba(0, 0, 0, .5)`,*/}
                            {/*    style: {*/}
                            {/*        borderRadius: 16,*/}
                            {/*        alignSelf:'center',*/}

                            {/*    },*/}
                            {/*    propsForDots: {*/}
                            {/*        r: "6",*/}
                            {/*        strokeWidth: "2",*/}
                            {/*        stroke: "#36bb75"*/}
                            {/*    }*/}
                            {/*}}*/}

                            {/*    style={{*/}
                            {/*        marginLeft: -8,*/}
                            {/*        alignSelf:'center',*/}
                            {/*        marginTop:15,*/}

                            {/*        borderRadius: 16}}*/}
                            {/*    hideLegend={false}*/}
                            {/*/>*/}
















                            <Carousel
                                layout={'tinder'}
                                data={this.state.urls}
                                sliderWidth={deviceWidth}
                                itemWidth={deviceWidth}
                                itemHeight={400}
                                sliderHeight={400}
                                keyExtractor={(item,index) => index.toString()}
                                renderItem={({item}) =>

                                        <View style={{width:deviceWidth-50,height:200,backgroundColor:'#fff',alignSelf:'center',borderRadius:15}}>
                                            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',margin:10}}>City Details</Text>


                                            <View style={{flex:.7,backgroundColor:'transparent',width:deviceWidth-50,}}>





                                                <View style={{width:deviceWidth-50,height:100,alignSelf:'center',marginTop:'5%'}}>

                                                    <View style={{flex:1,flexDirection:'row',}}>

                                                        <View style={{flex:.3,justifyContent:'center'}}>
                                                            <View style={{height:80,width:80,borderRadius:15,backgroundColor:'#2196f3',alignSelf:'center',justifyContent:'center'}}>

                                                                <Icon name="dingding" size={35} color="#fff" style={{alignSelf:'center'}} />

                                                            </View>

                                                        </View>
                                                        <View style={{height:'80%',width:1,backgroundColor:'red',alignSelf:'center'}}></View>




                                                        <View style={{flex:.6,justifyContent:'center',backgroundColor:'transparent'}}>
                                                            <View style={{height:80,borderRadius:15,alignSelf:'center',justifyContent:'center'}}>
                                                                <Text style={{fontSize:20,fontWeight:'bold'}}>{item.city.toUpperCase()}</Text>
                                                                <Text style={{fontSize:12,color:'grey'}}>Ritzzy Radio Get Heard!</Text>




                                                            </View>



                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                }/>














                                    </View>
                    </PTRView>
                </ScrollView>





            </View>


        )
    }
}






const RootStack = createStackNavigator(
    {
        Apps:Subscribe,

        getstarted:Getstarted,
        Update:Update,
        Payment:Paytm,
        contact:Contact





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

