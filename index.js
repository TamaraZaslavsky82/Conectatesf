/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import App from './App';
import {name as appName} from './app.json';
import codePush from "react-native-code-push";

enableScreens();

let CodePushApp = codePush(App);

AppRegistry.registerComponent(appName, () => CodePushApp);