import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserProvider } from '../../providers/user/user';
import { TimelinePage } from '../timeline/timeline';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(email: string, password: string): void {
        let control = this.navCtrl;
        this.userProvider.login(email, password)
        .subscribe(function(data) {
            console.log(data);
            control.setRoot(TimelinePage);
        },
        function(error) {
            console.log(error);
    });
    }

    toSignUp(): void {
        this.navCtrl.setRoot(SignupPage);
    }

}
