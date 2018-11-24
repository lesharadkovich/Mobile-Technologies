import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
    ImageBackground,
} from 'react-native';

import {
    button,
    buttonText,
    text,
    bold,
} from '../assets/styles/global';

export default class WelcomePage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    onPressStart = () => {
        this.props.navigation.push('Game');
    };

    render() {
        return (
            <ImageBackground
                style={ styles.container }
                source={require('../assets/img/background.png')}
            >
                <StatusBar backgroundColor='#C3D0E3' hidden />
                <View style={styles.overflow}/>
                <Text style={styles.text}>
                    WELCOME TO A TIC-TAC-TOE GAME!
                </Text>

                <View>
                    <TouchableOpacity onPress={this.onPressStart}>
                        <View style={[styles.button, styles.logInButton]}>
                            <Text style={[styles.buttonText, styles.logInButtonText]}>
                                Start the game
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    logInButtonText: {
        color: '#fff',
    },
});
