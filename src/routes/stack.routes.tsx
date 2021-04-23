import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdetification } from '../pages/UserIdetification';
import { Confirmation } from '../pages/Confirmation';
import AuthRoutes from './tab.routes';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';

const stackRoutes = createStackNavigator();
const appRoutes: React.FC = () => {
    return (
        <stackRoutes.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white
                },
            }}
        >
            <stackRoutes.Screen
                name="Welcome"
                component={Welcome}
            />
            <stackRoutes.Screen
                name="UserIdetification"
                component={UserIdetification}
            />
            <stackRoutes.Screen
                name="Confirmation"
                component={Confirmation}
            />
             <stackRoutes.Screen
                name="PlantSelect"
                component={AuthRoutes}
            />
             <stackRoutes.Screen
                name="PlantSave"
                component={PlantSave}
            />
            <stackRoutes.Screen
                name="MyPlants"
                component={AuthRoutes}
            />


        </stackRoutes.Navigator>
    )
}

export default appRoutes;

