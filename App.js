/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import SYImagePicker from 'react-native-syan-image-picker'

const {width} = Dimensions.get('window');

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
    }

    handleOpenImagePicker = () => {
        SYImagePicker.showImagePicker({imageCount: 9}, (err, photos) => {
            console.log(err, photos);
            if (!err) {
                this.setState({
                    photos: [...this.state.photos, ...photos]
                })
            }
        })
    };

    // 以Promise形式调用
    // 相册参数暂时只支持默认参数中罗列的属性；
    // 使用方式
    // sync/await

    handleAsyncSelectPhoto = async () => {
        try {
            const photos = await SYImagePicker.asyncShowImagePicker({imageCount: 3});
            // 选择成功
            this.setState({
                photos: [...this.state.photos, ...photos]
            })
        } catch (err) {
            // 取消选择，err.message为"取消"
        }
    };

    // promise形式
    handlePromiseSelectPhoto = () => {
        SYImagePicker.asyncShowImagePicker({imageCount: 3})
            .then(photos => {
                // 选择成功
                this.setState({
                    photos: [...this.state.photos, ...photos]
                })
            })
            .catch(err => {
                // 取消选择，err.message为"取消"
            })
    };

    render() {

        const {photos} = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleOpenImagePicker}
                >
                    <Text style={{color: '#fff', fontSize: 16}}>选择照片</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleAsyncSelectPhoto}
                >
                    <Text style={{color: '#fff', fontSize: 16}}>选择照片(Async)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handlePromiseSelectPhoto}
                >
                    <Text style={{color: '#fff', fontSize: 16}}>选择照片(Promise)</Text>
                </TouchableOpacity>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll}>
                    {photos.map((photo, index) => {
                        return (
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
        backgroundColor: '#FDA549',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        marginTop: 20
    },
    scroll: {
        padding: 10,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    image: {
        margin: 10,
        width: (width - 80) / 3,
        height: (width - 80) / 3,
        backgroundColor: '#F0F0F0'
    },
});
