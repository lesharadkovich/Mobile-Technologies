import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image, ImageBackground, TouchableOpacity, View, Alert
} from 'react-native';
import {Button, Card, Tile} from 'react-native-elements';

import {bold, button, buttonText, text} from "../assets/styles/global";

import {moviesService} from '../services/movies.service'
import Spinner from "react-native-loading-spinner-overlay";
import FormItem from "./FormItem";

export default class MoviePage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Movies Library',
//         headerRight: (
//             <Button
//         icon={{name: 'plus', type: 'evilicon', size: 26}}
// onPress={navigation.getParam('onPressNewMovie')}
// fontSize={16}
// title="NEW"
// color="#fff"
// backgroundColor="#546785"
//     />
// ),
});

    constructor(props) {
        super();

        this.movie = props.navigation.getParam('movie');
        console.log(this.movie);
        this.state = {
            spinner: false,
            name: this.movie.name,
            director: this.movie.director,
            description: this.movie.description,
            imageurl: this.movie.imageurl
        };
    }

    delete = async () => {
        this.setState({ spinner: true });

        let result = '';
        try {
            await moviesService.deleteMovie(this.movie.id);
            result = 'Movie successfully deleted!';
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

    back = () => {
        this.props.navigation.goBack();
    };

    render() {
        const defaultImageUrl = 'https://timedotcom.files.wordpress.com/2017/05/star-wars_1024.jpg';

        return (
            <ImageBackground
                style={ styles.container }
                source={require('../assets/img/background.png')}
            >
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView style={ styles.scrollView }>
                    <Image style={ styles.image } source={{uri: moviesService.fetchImage(this.state.imageurl)}} />

                    <FormItem
                        editable={false}
                        label={'Name'}
                        value={this.state.name}
                    />

                    <FormItem
                        editable={false}
                        label={'Director'}
                        value={this.state.director}
                    />

                    <FormItem
                        editable={false}
                        label={'Description'}
                        value={this.state.description}
                    />


                    <TouchableOpacity onPress={this.delete}>
                        <View style={[styles.button, styles.logInButton]}>
                            <Text style={[styles.buttonText, styles.logInButtonText]}>
                                Delete
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.back}>
                        <View style={[styles.button, styles.logInButton]}>
                            <Text style={[styles.buttonText, styles.logInButtonText]}>
                                Back
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    scrollView: {
        flex: 1
    },
    image: {
        flex: 1,
        height: 250
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
        marginBottom: 10,
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
    logInButtonText: {
        color: '#fff',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});
