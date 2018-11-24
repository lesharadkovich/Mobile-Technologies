import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';
import {bold, button, buttonText, text} from "../assets/styles/global";

export default class GamePage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            moves: new Array(9).fill('')
        };
        this.currentPlayer = 'X';
    }

    restart = () => {
        this.currentPlayer = 'X';
        this.setState({ moves: new Array(9).fill('') });
    };

    changePlayer = () => {
        this.currentPlayer = this.currentPlayer === 'X'
            ? this.currentPlayer = 'O'
            : this.currentPlayer = 'X';
    };

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

                return squares[a];
            }
        }
        return null;
    };


    onCellPressed = (i) => {
        const movesCopy = this.state.moves.slice();

        if (this.calculateWinner(movesCopy) || movesCopy[i]) {
            return;
        }

        movesCopy[i] = this.currentPlayer;
        this.changePlayer();
        this.setState({ moves: movesCopy });
    };

    renderCell = (i) => {
        return (
            <TouchableOpacity
                style={ styles.cell }
                onPress={this.onCellPressed.bind(this, i)}
            >
                <Text style={ styles.cellText }>
                    {this.state.moves[i]}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        let status = '';
        let winner = this.calculateWinner(this.state.moves);
        if (winner) {
            status = `Winner is player ${winner}`;
        } else {
            status = `Next move is for ${this.currentPlayer}`
        }

        return (
            <ImageBackground
                style={ styles.container }
                source={require('../assets/img/background.png')}
            >
                <Text style={ styles.text }>{status}</Text>

                <View style={ styles.row }>
                    {this.renderCell(0)}
                    {this.renderCell(1)}
                    {this.renderCell(2)}
                </View>
                <View style={ styles.row }>
                    {this.renderCell(3)}
                    {this.renderCell(4)}
                    {this.renderCell(5)}
                </View>
                <View style={ styles.row }>
                    {this.renderCell(6)}
                    {this.renderCell(7)}
                    {this.renderCell(8)}
                </View>

                <TouchableOpacity onPress={this.restart}>
                    <View style={[styles.button, styles.logInButton]}>
                        <Text style={[styles.buttonText, styles.logInButtonText]}>
                            Restart
                        </Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#cac8e1',
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
});
