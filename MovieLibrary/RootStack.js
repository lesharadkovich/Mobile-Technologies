import { createStackNavigator } from 'react-navigation';

import MainPage from './components/Main';
import MovieCreationPage from './components/MovieCreation';
import MoviePage from './components/Movie';

export default createStackNavigator(
    {
        Main: MainPage,
        MovieCreation: MovieCreationPage,
        Movie: MoviePage
    },
    {
        initialRouteName: 'Main',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#eaf1fb',
            },
            // headerTintColor: '#006ef4',
        },
    },
);
