import React, { Component } from 'react';
import { View, Image, FlatList, PermissionsAndroid, Platform, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import {Icon} from "native-base";

export default class camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:''
    };
    this.gallery = this.gallery.bind(this);
  }

  async componentDidMount(){
    if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission Explanation',
            message: 'We would like to access your photos!',
          },
        );
        if (result !== 'granted') {
          console.log('Access to pictures was denied');
          return;
        }
      }

      CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
      })
      .then(res => {
        this.setState({ data: res.edges });
      })
      .catch((error) => {
         console.log(error);
      });
    
  }

  gallery = (uri) => {
    // let data = await this.requestExternalStoragePermission();
    // console.log(data); 
    console.log('pressed a image');
    console.log('uri', uri);
    this.props.navigation.navigate('galleryimage', { data: uri });
  };
  renderItem(item) {
    return (
        <TouchableOpacity   
                 style={{width: '33%',
                 height: 150,}} onPress={() => this.gallery(item.node.image.uri)} >
                <Image style={{flex: 1}} resizeMode='cover' source={{ uri:  item.node.image.uri}}></Image>
        </TouchableOpacity>
    )
}

  render() {
    return (
      <View>
        <FlatList
          onPress={() => this.gallery(item.id)}
          data={this.state.data}
          numColumns={3}
          renderItem={({ item }) => this.renderItem(item) }
      />
        <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:70,
                    position: 'absolute',                                          
                    bottom: 10,                                                    
                    right: 10,
                    height:70,
                    backgroundColor:'#fff',
                    borderRadius:100,
                }}
                >
               <Icon name='cloud' />
            </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });