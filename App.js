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
        SYImagePicker.showImagePicker({imageCount: 1, isRecordSelected: true, isCrop: true, showCropCircle: true}, (err, photos) => {
            console.log(err, photos);
            if (!err) {
                this.setState({
                    photos
                })
            }
        })
    };

    /**
     * 使用方式sync/await
     * 相册参数暂时只支持默认参数中罗列的属性；
     * @returns {Promise<void>}
     */
    handleAsyncSelectPhoto = async () => {
        SYImagePicker.removeAllPhoto()
        try {
            const photos = await SYImagePicker.asyncShowImagePicker({
                imageCount: 1,
                isCrop: true,
                showCropCircle: true
            });
            // 选择成功
            this.setState({
                photos: [...this.state.photos, ...photos]
            })
        } catch (err) {
            // 取消选择，err.message为"取消"
        }
    };

    handlePromiseSelectPhoto = () => {
        SYImagePicker.asyncShowImagePicker({imageCount: 3, enableBase64: true})
            .then(photos => {
                console.log(photos);
                const arr = photos.map(v => {
                    return {...v, enableBase64: true}
                });
                // 选择成功
                this.setState({
                    photos: [...this.state.photos, ...arr]
                })
            })
            .catch(err => {
                // 取消选择，err.message为"取消"
            })
    };

    handleLaunchCamera = () => {
        SYImagePicker.openCamera({isCrop: true, showCropCircle: true, showCropFrame: false}, (err, photos) => {
            console.log(err, photos);
            if (!err) {
                this.setState({
                    photos: [...this.state.photos, ...photos]
                })
            }
        })
    };

    handleDeleteCache = () => {
        SYImagePicker.deleteCache()
    };

    render() {

        const {photos} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.scroll}>
                    <Button title={'拍照'} onPress={this.handleLaunchCamera}/>
                    <Button title={'选择照片'} onPress={this.handleOpenImagePicker}/>
                    <Button title={'选择照片(Async)'} onPress={this.handleAsyncSelectPhoto}/>
                    <Button title={'选择照片(Promise)带base64'} onPress={this.handlePromiseSelectPhoto}/>
                    <Button title={'缓存清除'} onPress={this.handleDeleteCache}/>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll}>
                    {photos.map((photo, index) => {
                        let source = {uri: photo.uri};
                        if (photo.enableBase64) {
                            source = {uri: photo.base64};
                        }
                        return (
                            <Image
                                key={`image-${index}`}
                                style={styles.image}
                                source={source}
                                resizeMode={"contain"}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

const Button = ({title, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            <Text style={{color: '#fff', fontSize: 16}}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 40
    },
    btn: {
        backgroundColor: '#FDA549',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        paddingHorizontal: 12,
        margin: 5,
        borderRadius: 22
    },
    scroll: {
        padding: 5,
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
