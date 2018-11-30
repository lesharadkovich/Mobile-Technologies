import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import FormItem from "./FormItem";
import {bold, button, buttonText, text} from "../assets/styles/global";
import {moviesService} from "../services/movies.service";

export default class MovieCreationPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title'),
    });

    constructor(props) {
        super(props);

        this.imagePickerLastResponse = null;
        this.inputRefs = {};
        this.state = {
            imageSource: { uri: 'https://timedotcom.files.wordpress.com/2017/05/star-wars_1024.jpg' }
        }
    }

    async componentDidMount() {
        const movie = this.props.navigation.getParam('movie');
        const title = movie
            ? `Edit movie ${movie.name}`
            : 'New movie';
        this.props.navigation.setParams({ title });

        // const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        // console.log(granted);
        // const movies = await moviesService.getAllMovies();
        // this.setState({ movies });
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

                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    };

    save = () => {
        const name = this.inputRefs.name.value;
        const director = this.inputRefs.director.value;
        const description = this.inputRefs.description.value;

        if (!name || !director || !description) {
            return;
        }

        moviesService.createNewMovie(name, director, description, this.imagePickerLastResponse);
    };

    render() {
        return (
            <ScrollView style={ styles.container }>
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
                        source={{ uri: 'https://timedotcom.files.wordpress.com/2017/05/star-wars_1024.jpg' }}
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
    row: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    cell: {
        borderWidth: 3,
        borderColor: '#414677',
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 80,
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
    }
});
