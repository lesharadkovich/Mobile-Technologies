import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    RefreshControl, ImageBackground,
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
        spinner: true,
        refreshing: false,
    };

    componentDidMount() {
        this.props.navigation.setParams({ onPressNewMovie: this.onPressNewMovie });

        this.fetchAllMovies();
    }

    fetchAllMovies = async () => {
        try {
            const movies = await moviesService.getAllMovies();
            this.setState({ movies, spinner: false });
        } catch (err) {
            this.setState({ spinner: false });
            alert(err);
        }
    };

    onRefresh = () => {
        this.fetchAllMovies();
    };


    onPressNewMovie = () => {
        this.props.navigation.push('MovieCreation');
    };

    onPressViewMovie = (movie) => {
        this.props.navigation.push('Movie', { movie });
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
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                >
                    {
                        this.state.movies.map((movie) => (
                            <Tile
                                key={movie.id}
                                imageSrc={{uri: moviesService.fetchImage(movie.imageurl)}}
                                title={movie.name}
                                featured
                                caption={movie.description}
                                containerStyle={{marginVertical: 5}}
                                onPress={this.onPressViewMovie.bind(this, movie)}
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
