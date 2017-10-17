/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import ImagePicker from 'react-native-syan-image-picker'

const {width, height} = Dimensions.get('window');

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
    }

    openImagePicker = () => {
       ImagePicker.showImagePicker({imageCount:9}, (err, photos) => {
           console.log(err, photos);
           if (!err) {
               this.setState({
                   photos: [...this.state.photos, ...photos]
               })
           }
       })
    };

    render() {

        const {photos} = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.openImagePicker}
                >
                    <Text style={{color:'#fff', fontSize: 16}}>选择照片</Text>
                </TouchableOpacity>
                <ScrollView style={{flex:1}} contentContainerStyle={styles.scroll}>
                    {photos.map((photo, index) => {
                        return(
                            <Image
                                key={`image-${index}`}
                                style={styles.image}
                                source={{uri: photo.uri}}
                                resizeMode={"contain"}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    btn: {
        backgroundColor:'#FDA549',
        justifyContent:'center',
        alignItems:'center',
        height:44,
        marginTop:20
    },
    scroll: {
        padding:10,
        flexWrap:'wrap',
        flexDirection:'row'
    },
    image: {
        margin:10,
        width: (width - 80) /3,
        height: (width - 80) / 3,
        backgroundColor:'#F0F0F0'
    },
});
