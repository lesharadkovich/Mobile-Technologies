import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, PermissionsAndroid } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {bold, button, buttonText, text} from "../assets/styles/global";
import ImagePicker from 'react-native-image-picker';
import {moviesService} from "../services/movies.service";

export default class MovieCreationPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title'),
    });

    constructor(props) {
        super(props);

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

    // onInputChange(a) {
    //     if ()
    // }

    render() {
        const {label, placeholder} = this.props;

        return (
            <View>
                <FormLabel>{label}</FormLabel>
                <FormInput
                    onChangeText={this.onInputChange}
                    placeholder={placeholder}
                    inputStyle={styles.input}
                />
                <FormValidationMessage>This field is required</FormValidationMessage>
            </View>
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
