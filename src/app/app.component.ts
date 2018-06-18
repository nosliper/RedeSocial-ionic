import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';
import { TimelinePage } from '../pages/timeline/timeline';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userProvider: UserProvider) {
        if(userProvider.hasToken()) {
            this.rootPage = TimelinePage;
        }
        else {
            this.rootPage = LoginPage;
        }
        platform.ready().then(() => {

            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

