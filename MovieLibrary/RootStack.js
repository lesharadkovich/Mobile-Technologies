import { createStackNavigator } from 'react-navigation';

import MainPage from './components/Main';
import MovieCreationPage from './components/MovieCreation';

export default createStackNavigator(
    {
        Main: MainPage,
        MovieCreation: MovieCreationPage,
    },
    {
        initialRouteName: 'MovieCreation',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#eaf1fb',
            },
            // headerTintColor: '#006ef4',
        },
    },
);
