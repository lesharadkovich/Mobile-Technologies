import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import FormItem from "./FormItem";
import {bold, button, buttonText, text} from "../assets/styles/global";
import {moviesService} from "../services/movies.service";

export default class MovieCreationPage extends Component {
    static navigationOptions = {
        title: 'New movie',
    };

    constructor(props) {
        super(props);

        this.imagePickerLastResponse = null;
        this.inputRefs = {};
        this.state = {
            imageSource: { uri: 'https://timedotcom.files.wordpress.com/2017/05/star-wars_1024.jpg' },
            spinner: false
        }
    }

    selectImage = () => {
        ImagePicker.showImagePicker(async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.imagePickerLastResponse = response;

                const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSource: source,
                });
            }
        });
    };

    back = () => {
        this.props.navigation.goBack();
    };

    save = async () => {
        const name = this.inputRefs.name.value;
        const director = this.inputRefs.director.value;
        const description = this.inputRefs.description.value;
        const imageurl = this.imagePickerLastResponse;

        if (!name || !director || !description) {
            this.inputRefs.name.setError();
            this.inputRefs.director.setError();
            this.inputRefs.description.setError();
            return;
        }

        this.setState({ spinner: true });

        let result = '';
        try {
            await moviesService.createNewMovie(name, director, description, imageurl);
            result = 'Movie successfully created!';
        } catch (err) {
            result = err;
        } finally {
            this.setState({ spinner: false });
            Alert.alert(
                '',
                result,
                [ {text: 'OK', onPress: () => this.back()} ],
                { cancelable: false }
            )
        }
    };

    render() {
        return (
            <ScrollView style={ styles.container }>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />

                <FormItem
                    ref={(item) => this.inputRefs.name = item}
                    label={'Name'}
                    placeholder={'Enter movie name'}
                />

                <FormItem
                    ref={(item) => this.inputRefs.director = item}
                    label={'Director'}
                    placeholder={'Enter name of movie director'}
                />

                <FormItem
                    ref={(item) => this.inputRefs.description = item}
                    label={'Description'}
                    placeholder={'Enter movie description'}
                />


                <View style={{marginTop: 20}}>
                    <Image
                        source={ this.state.imageSource }
                        style={{flex: 1, height: 150}}
                    />
                    <TouchableOpacity onPress={this.selectImage}>
                        <View style={[styles.button, styles.logInButton]}>
                            <Text style={[styles.buttonText, styles.logInButtonText]}>
                                Select Image
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.save}>
                    <View style={[styles.button, styles.logInButton]}>
                        <Text style={[styles.buttonText, styles.logInButtonText]}>
                            Save
                        </Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f2',
    },

    text: {
        ...text,
        fontSize: 36,
        color: '#414677',
        textAlign: 'center',
    },
    button: {
        ...button,
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        ...buttonText,
        ...bold,
    },
    logInButton: {
        backgroundColor: '#414677',
    },

    input: {
        borderBottomColor: '#bdc6cf',
        borderBottomWidth: 1,
        color: '#000'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});
