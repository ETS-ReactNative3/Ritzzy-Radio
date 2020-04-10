


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
    Dimensions, AsyncStorage,ActivityIndicator
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
import Icon from 'react-native-vector-icons/AntDesign';


import Storage from 'react-native-storage';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Getstarted} from './getstarted';
import Subscribe from './subscribe';
import Pay from './dopayment';



import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipe from './swipe';
import SoundPlayer from 'react-native-sound-player';

import Contact from './contact';
import Sound from 'react-native-sound';

var links="https://firebasestorage.googleapis.com/v0/b/e2lpython.appspot.com/o/mute-no-sound.mp3?alt=media&token=f83f1232-c66b-4fc8-acf0-87ddc98fadf0"
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


let user=0
var subcity="";
var whoosh;
export  class Homepage extends React.Component
{


    constructor(){

        super()
        this.state={
            url:[],
            email:'',
            city:[],
            showham:false,
            id:0,
            selectedItem:0,
            ischeck:false,
            check:[],
            post:false,
            daysleft:0,
            date:0,
            remain:[],
            changedate:false,
            time:true,
            subcity:'',
            clicked:false,
            activity:false
        }
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

    fetchuser=()=>{
        axios.get(`http://3.7.73.13:3000/getuser/`+this.state.email)
            .then((res)=>{
                const url=res.data
                this.setState({url})
                this.setState({id:this.state.url[0].id})


                user=this.state.id
                console.log(this.state.id)
            })

    }


    subscribed=(city)=>{
        fetch('http://3.7.73.13:3000/subscribed', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({
                id:this.state.id,
                city:city
            })

        }).then((response) => {

            return response.json()



        }).then((jsondata) => {
            this.setState({data: jsondata})
        }).done()
    }


    componentDidMount(): void {


            this.getdate()

        this.getuser()

        axios.get(`http://3.7.73.13:3000/getcity`)
            .then((res)=>{
                const city=res.data
                this.setState({city})


            })








        whoosh = new Sound(links, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
            // whoosh.release();

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                    this.setState({clicked:true})

                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
        whoosh.pause();











    }





        getdate=()=>{

        var date=new Date().getDay()
            this.setState({date})
            console.log(date)
        }





        checkremaning=(city,link)=>{

            axios.get('http://3.7.73.13:3000/ispay/'+this.state.id+'/'+city)


                .then((res)=>{
                    const remain=res.data;
                    this.setState({remain})


                    var date=new Date().getDate()






                    if(this.state.remain[0].remain===0)
                    {

                        this.setState({time:false})




                    }
                    else if(this.state.remain[0].day!==date)
                    {
                        console.log("byee"+this.state.remain[0].day)

                        this.setState({changedate:true})
                    }



                    console.log("hiii"+this.state.time)


                    if(this.state.changedate===true){


                        fetch('http://3.7.73.13:3000/changedate', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                                'Content-Type': 'application/json'
                            },


                            body: JSON.stringify({
                                id:this.state.id,
                                city:city,
                                date:this.state.remain[0].remain-1,
                                day:date
                            })

                        }).then((response) => {


                            this.setState({changedate:false})
                            return response.json()



                        }).then((jsondata) => {
                            this.setState({data: jsondata})
                        }).done()


                    }




                    if(this.state.time===true){



                        this.setState({activity:true})




                        whoosh = new Sound(link, Sound.MAIN_BUNDLE, (error) => {
                            if (error) {
                                console.log('failed to load the sound', error);
                                return;
                            }
                            // loaded successfully
                            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
                            // whoosh.release();
                            console.log("hii")
                            this.setState({activity:false})
                            // Play the sound with an onEnd callback
                            whoosh.play((success) => {

                                if (success) {
                                    console.log('successfully finished playing');


                                } else {
                                    console.log('playback failed due to audio decoding errors');
                                }
                            });
                        });








                    }



                })


        }







        stop=()=>{

            whoosh.pause();


        }




        removemusic=()=>{
            whoosh.stop()


        }




    playradio=(city)=>{

        subcity=city
        console.log(subcity)








        axios.get('http://3.7.73.13:3000/ispay/'+this.state.id+'/'+city)
            .then((res)=>{


                const check=res.data
                this.setState({check})

                console.log(check)
                if(this.state.check.length===0)
                {

                    this.setState({post:true})
                }

            })
            .then(()=>{
                if(this.state.post===true){

                    alert(new Date().getDay())
                    fetch('http://3.7.73.13:3000/postpay', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                            'Content-Type': 'application/json'
                        },


                        body: JSON.stringify({
                            id:this.state.id,
                            city:city,
                            date:new Date().getDate()
                        })

                    }).then((response) => {

                        return response.json()



                    }).then((jsondata) => {
                        this.setState({data: jsondata})
                    }).done()

                }


                else{
                    this.setState({daysleft:this.state.check[0]})
                }

            })








    }





    setdefault=()=>{



        this.setState({time:true,clicked:false})
        this.removemusic()


    }



    onSwipeUp(gestureState) {
        this.setState({myText: 'You swiped up!'});
    }

    onSwipeDown(gestureState) {
        this.setState({myText: 'You swiped down!'});
    }

    onSwipeLeft(gestureState) {
        // this.setState({myText: 'You swiped left!'});
        this.setdefault()
    }

    onSwipeRight(gestureState) {
        this.setdefault()
    }

    onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
            case SWIPE_UP:
                // this.setState({backgroundColor: 'red'});
                break;
            case SWIPE_DOWN:
                // this.setState({backgroundColor: 'green'});
                break;
            case SWIPE_LEFT:
                // this.setState({backgroundColor: 'blue'});
                break;
            case SWIPE_RIGHT:
                // this.setState({backgroundColor: 'yellow'});
                break;
        }
    }












    play=()=>{
        SoundPlayer.playUrl(link)

    }







    render(){
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return(
            <View style={{height:'100%'}}>





                <ScrollView>


                    <GestureRecognizer
                        onSwipe={(direction, state) => this.onSwipe(direction, state)}
                        onSwipeUp={(state) => this.onSwipeUp(state)}
                        onSwipeDown={(state) => this.onSwipeDown(state)}
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}
                        style={{
                            flex: 1,
                            backgroundColor: this.state.backgroundColor
                        }}
                    >








                    <Carousel
                        layout={'stack'}
                        data={this.state.city}
                        sliderWidth={deviceWidth}
                        itemWidth={deviceWidth}
                        itemHeight={deviceHeight}
                        sliderHeight={deviceHeight}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item}) =>



                            <View style={{width:deviceWidth,height:deviceHeight,backgroundColor: '#ddd'}} >
                                <ImageBackground source={require('./images/background.jpg')} style={{width:deviceWidth,height:deviceHeight}}>

                                    <ActivityIndicator animating={this.state.activity} size={'large'}/>

                                    <View style={{backgroundColor: 'rgba(0,0,0,0.5)',width:60,height:60,borderRadius:5,right:0,position:'absolute',justifyContent:'center',borderBottomRightRadius:0,borderTopRightRadius:0}}>
                                        <TouchableOpacity style={{}} onPress={()=>this.setState({showham:!this.state.showham})}>

                                            <Icon name="bars" size={35} color="#fff" style={{alignSelf:'center'}} />

                                        </TouchableOpacity>



                                    </View>
                                    <View>
                                        {this.state.showham===true?
                                            <View style={{height:60,width:150,backgroundColor:'#fff',position:'absolute',right:1,top:20,borderRadius:10,justifyContent:'center',borderBottomRightRadius:0,borderTopRightRadius:0 }}>
                                                <TouchableOpacity style={{flex:1,justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('Sub')}>
                                                    <Text style={{textAlign:'center',fontWeight:'bold'}}>Subscribed City's</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View/>
                                        }
                                    </View>





                                    <SlidingPanel
                                        headerLayoutHeight = {300}
                                        headerLayout = { () =>
                                            <View style={{height:400,backgroundColor:'#fff',width:deviceWidth,borderTopRightRadius:50,borderTopLeftRadius:50}}>


                                                <View style={{flex:1,margin:15}}>

                                                    <View style={{flex:.07}}>
                                                    </View>
                                                    <View style={{flex:.2,margin:15}}>
                                                        <View style={{flex:1,flexDirection:'row'}}>


                                                            <View style={{flex:.2,flexDirection:'row',}}>
                                                                <Image source={require('./images/generic_song.jpg')} style={{width:70,height:70,borderRadius:15}} />

                                                            </View>
                                                            <View style={{flex:.4,justifyContent:'center'}}>
                                                                <Text style={{textAlign:'center',fontSize: 20,fontWeight: 'bold',color:'grey'}}>Posted By</Text>
                                                                <Text style={{textAlign:'center',fontWeight:'bold',color:'grey'}}>@{item.city}</Text>

                                                            </View>


                                                            <View style={{flex:.33,justifyContent:'center'}}>

                                                                <TouchableOpacity style={{width:100,height:40,backgroundColor:'#ddd',borderRadius:15,alignSelf:'center',justifyContent:'center'}} onPress={()=>this.subscribed(item.city)}>
                                                                    <Text style={{textAlign:'center',color:'white'}}>Subscribe</Text>
                                                                </TouchableOpacity>

                                                            </View>
                                                        </View>





                                                    </View>

                                                    <View style={{width:'95%',height:1,backgroundColor:'grey',alignSelf:'center',margin:15}}></View>



                                                    <View style={{flex:1,flexDirection:'row'}}>
                                                        <View style={{flex:.25}}>
                                                            <TouchableOpacity style={{backgroundColor:'#EF1A4C',height:70,width:70,margin:15,borderRadius:15,justifyContent:'center'}} onPress={()=>{this.playradio(item.city);this.checkremaning(item.city,item.soundlink)}}>
                                                                <Icon name="play" size={45} color="#FFf" style={{alignSelf:'center',justifyContent:'center'}} />


                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{flex:.25,flexDirection:'row'}}>



                                                            <TouchableOpacity style={{backgroundColor:'#EF1A4C',height:70,width:70,margin:15,borderRadius:15,justifyContent:'center'}} onPress={()=>this.stop()}>
                                                                <Icon name="pausecircle" size={45} color="#FFf" style={{alignSelf:'center',justifyContent:'center'}} />


                                                            </TouchableOpacity>

                                                        </View>

                                                        <View style={{flex:.5,}}>

                                                            {this.state.time===true?
                                                                <View style={{backgroundColor:'#03a9f4',height:70,width:150,margin:15,borderRadius:15,justifyContent:'center'}}>

                                                                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Listen For Free</Text>

                                                                </View>
                                                                :
                                                                <TouchableOpacity style={{backgroundColor:'#03a9f4',height:70,width:150,margin:15,borderRadius:15,justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('pay')}>

                                                                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Subscribe Now</Text>

                                                                </TouchableOpacity>

                                                            }

                                                        </View>





                                                    </View>





                                                </View>


                                            </View>
                                        }
                                        slidingPanelLayout = { () =>
                                            <View style={{flex:1,backgroundColor:'#fff',width:deviceWidth,height:deviceHeight}}>

                                                <View style={{marginLeft:30, }}>
                                                    <Text style={{fontSize:25,color:'#EF1A4C',fontWeight:'bold'}}>City Profile</Text>
                                                </View>




                                                <View style={{width:deviceWidth-20,height:100,alignSelf:'center',marginTop:'5%'}}>

                                                    <View style={{flex:1,flexDirection:'row',}}>

                                                        <View style={{flex:.3,justifyContent:'center'}}>
                                                            <View style={{height:80,width:80,borderRadius:15,backgroundColor:'#ddd',alignSelf:'center',justifyContent:'center'}}>

                                                                <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center'}}>{item.rating}</Text>

                                                            </View>

                                                        </View>
                                                        <View style={{height:'80%',width:1,backgroundColor:'red',alignSelf:'center'}}></View>




                                                        <View style={{flex:.7,justifyContent:'center'}}>
                                                            <View style={{height:80,borderRadius:15,alignSelf:'center',justifyContent:'center'}}>
                                                                <Text style={{fontSize:20,fontWeight:'bold'}}>Today,7:00 AM-9:00 PM</Text>
                                                                <Text style={{fontSize:12,color:'grey'}}>Ritzzy Radio Get Heard!</Text>




                                                            </View>



                                                        </View>

                                                    </View>
                                                </View>











                                                <View style={{width:deviceWidth-20,height:100,alignSelf:'center',marginTop:'5%'}}>

                                                    <View style={{flex:1,flexDirection:'row',}}>

                                                        <View style={{flex:.3,justifyContent:'center'}}>
                                                            <View style={{height:80,width:80,borderRadius:15,backgroundColor:'#2196f3',alignSelf:'center',justifyContent:'center'}}>

                                                                <Icon name="dingding" size={45} color="#FFf" style={{alignSelf:'center',justifyContent:'center'}} />

                                                            </View>

                                                        </View>
                                                        <View style={{height:'80%',width:1,backgroundColor:'red',alignSelf:'center'}}></View>




                                                        <TouchableOpacity style={{flex:.7,justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('contact')}>
                                                            <View style={{height:80,borderRadius:15,alignSelf:'center',justifyContent:'center'}}>
                                                                <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Contact Us</Text>
                                                                <Text style={{fontSize:12,color:'grey',textAlign:'center'}}>Ritzzy Radio Get Heard!</Text>




                                                            </View>



                                                        </TouchableOpacity>

                                                    </View>
                                                </View>






                                                <View style={{flex:1,height:'100%'}}>

                                                    <Text style={{margin:30,fontSize:20,fontWeight:'bold'}}>
                                                        Music Details
                                                    </Text>

                                                    <Text style={{margin:30,marginTop:15,fontWeight:'bold'}}>
                                                        {item.details}
                                                    </Text>
                                                </View>


                                            </View>
                                        }
                                    />

                                </ImageBackground>
                            </View>




                        }/>
                    </GestureRecognizer>



                </ScrollView>




            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLayoutStyle: {
        width:deviceWidth,
        height: 100,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slidingPanelLayoutStyle: {
        width:deviceWidth,
        height:deviceHeight,
        backgroundColor: '#7E52A0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonTextStyle: {
        color: 'white',
        fontSize: 18,
    },
});




const RootStack = createStackNavigator(
    {
        Apps:Homepage,

        getstarted:Getstarted,

        Sub:Subscribe,
        pay:Pay,
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


export {subcity}
