
import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    Text,
    StyleSheet, TouchableOpacity, ScrollView, BackHandler, Dimensions, AsyncStorage,
} from 'react-native';
import Modal from "react-native-modal";

import { Container, Content, Item, Input, Icon, CardItem, Card, Body, Button } from 'native-base';
import WebView from 'react-native-webview';
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
import SlidingPanel from 'react-native-sliding-up-down-panels';
import axios from 'react-native-axios';
import {subcity} from './homepage';
let update=0
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modal: {
        margin: 0,
        backgroundColor: 'white',
        height: 100,
        flex: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row'

    }
})
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





export default class Paytm extends Component {
    constructor(props) {
        super(props)
        this.state = {

            ORDER_ID:new Date().getTime(),
            TXN_AMOUNT:0,
            CUST_ID:"afafa",
            isOpen:false,
            ack:'',
            id:0,email:'',
            update:0,
            city:''

        };
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


                console.log("dff"+this.state.id)
            })

    }



    componentDidMount(): void {



        this.getuser()


        this.setState({TXN_AMOUNT:this.props.navigation.state.params.pay})
    }


    handlePress=(title)=>{
        if(title==='true')

      {
          alert(this.state.TXN_AMOUNT)

          if(this.state.TXN_AMOUNT===30)
          {

              update=30


          }
          else if(this.state.TXN_AMOUNT===160)
          {
              update=183
          }
          else if(this.state.TXN_AMOUNT===310)
          {
              update=366

          }

          alert(update)


          this.postupdate()
          this.setState({isOpen:false,ack:"Your payment is successful",TXN_AMOUNT:0})



    }
        else if(title==='false'){
            this.setState({isOpen:false,ack:'Something went Wrong'})

        }
}




    postupdate=()=>{


        console.log("helo"+update+this.state.id)
        fetch('http://3.7.73.13:3000/changepay', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({
                id:this.state.id,
                remain:update,
                city:subcity,
                day:new Date().getDate()
            })

        }).then((response) => {

            return response.json()



        }).then((jsondata) => {
            this.setState({data: jsondata})
        }).done()



    }






    openModal=()=>{
this.setState({isOpen:true})

    }


    handleBackButtonClick() {

    }



    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
    render() {
        var ORDER_ID=this.state
        return (


            <View style={{height:'100%'}}>




                    <ImageBackground source={require('./images/background.jpg')} style={{width:'100%',height:'100%',alignSelf:'center'}} blurRadius={10}>












                            <SlidingPanel
                                headerLayoutHeight = {300}
                                slidingPanelLayoutHeight={100}
                                headerLayout = { () =>
                                    <View style={{height:300,width:deviceWidth,backgroundColor:'#fff',borderTopRightRadius:35,borderTopLeftRadius:35}}>


                                        <View style={{height:50}}>
                                        </View>
                                        <TouchableOpacity style={{width:'90%',borderRadius:15,height:100,margin:25,elevation: 7,backgroundColor:'#f5f6fa', flexDirection:'row'}} onPress={()=>this.openModal()}>


                                            <View style={{flex:.4,justifyContent:'center'}}>
                                                <Image source={require('./images/paytm.png')} style={{width:150,height:80,alignSelf:'center'}}/>

                                            </View>
                                            <View style={{flex:.6,alignSelf:'center'}}>
                                                <Text style={{fontSize:15,fontWeight:'bold',textAlign: 'center',color:'grey'}}>Due amount</Text>

                                                <Text style={{fontSize:25,fontWeight: 'bold',textAlign:'center',color:'grey'}}>RS {this.state.TXN_AMOUNT}</Text>

                                            </View>

                                        </TouchableOpacity>

                                    </View>
                                }
                                slidingPanelLayout = { () =>
                                    <View style={{width:deviceWidth,backgroundColor:'#fff',height:deviceHeight}}>




                                        <View style={{height:160,}}>

                                            <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{this.state.ack}</Text>
                                        </View>

                                        <View style={{flexDirection:'row',height:120,width:'100%',}}>


                                            <View style={{flex:.33,alignSelf:'center'}}>
                                                <TouchableOpacity style={{width:100,height:100,borderRadius: 50,backgroundColor:'#f5f6fa',alignSelf:'center',justifyContent:'center'}}>
                                                    <Image source={require('./images/g+.png')} style={{width:80,height:80,alignSelf:'center'}}/>


                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flex:.33,alignSelf:'center'}}>
                                                <TouchableOpacity style={{width:100,height:100,borderRadius: 50,backgroundColor:'#f5f6fa',alignSelf:'center',justifyContent:'center'}}>
                                                    <Image source={require('./images/facebook.png')} style={{width:80,height:80,alignSelf:'center'}}/>

                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flex:.33,alignSelf:'center'}}>
                                                <TouchableOpacity style={{width:100,height:100,borderRadius: 50,backgroundColor:'#f5f6fa',alignSelf:'center',justifyContent:'center'}}>
                                                    <Image source={require('./images/twitter.png')} style={{width:60,height:60,alignSelf:'center'}}/>

                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                    </View>
                                }
                            />












                <Modal
                    visible={this.state.isOpen}
                    onRequestClose={()=>this.setState({isOpen:false})}

                >


                    <WebView
                        source={{uri:"http://3.7.73.13:3000/paytm/request"}}

                        injectedJavaScript={`document.getElementById("ORDER_ID").value="${this.state.ORDER_ID}";document.getElementById("TXN_AMOUNT").value="${this.state.TXN_AMOUNT}";document.getElementById("CUST_ID").value="${this.state.CUST_ID}";document.f1.submit()`}
                        onNavigationStateChange={data=>this.handlePress(data.title)}

                    />





                </Modal>





                    <View style={{height:20}}>
                        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{this.state.ack}</Text>
                    </View>




</ImageBackground>


            </View>
        );
    }
};

