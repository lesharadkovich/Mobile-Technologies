import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View, ImageBackground,
} from 'react-native';
import {Button, Card, Tile} from 'react-native-elements';


import {moviesService} from '../services/movies.service'
import Spinner from "react-native-loading-spinner-overlay";

export default class MainPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Movies Library',
        headerRight: (
            <Button
                icon={{name: 'plus', type: 'evilicon', size: 26}}
                onPress={navigation.getParam('onPressNewMovie')}
                fontSize={16}
                title="NEW"
                color="#fff"
                backgroundColor="#546785"
            />
        ),
    });

    state = {
        movies: [],
        spinner: true
    };

    async componentDidMount() {
        this.props.navigation.setParams({ onPressNewMovie: this.onPressNewMovie });

        const movies = await moviesService.getAllMovies();
        this.setState({ movies, spinner: false });
    }


    onPressNewMovie = () => {
        this.props.navigation.push('MovieCreation');
    };

    onPressViewMovie = () => {
        this.props.navigation.push('Game');
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
                <ScrollView>
                    {
                        this.state.movies.map((movie) => (
                            <Tile
                                key={movie.id}
                                imageSrc={{uri: movie.imageurl}}
                                title={movie.name}
                                featured
                                caption={movie.description}
                                containerStyle={{marginVertical: 5}}
                            />
                        ))
                    }
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    text: {
        fontSize: 36,
        color: '#414677',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // buttonText: {
    //     ...buttonText,
    //     ...bold,
    // },
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
