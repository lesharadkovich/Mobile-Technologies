import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {bold, button, buttonText, text} from "../assets/styles/global";

export default class FormItemPage extends Component {
    constructor(props) {
        super(props);

        this.name = '';
        this.state = {
            error: false
        }
    }

    get value() {
        return this.name;
    }

    onInputChange = (event) => {
        if (!event) {
            this.setState({ error: true });
        }

        this.name = event;
    }

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
                {
                    this.state.error && <FormValidationMessage>This field is required</FormValidationMessage>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#bdc6cf',
        borderBottomWidth: 1,
        color: '#000'
    }
});
