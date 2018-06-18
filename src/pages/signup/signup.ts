import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    signup(nome: string, email: string, password: string) : void {
        let control = this.navCtrl;
        this.userProvider.addUser(nome, email, password)
        .subscribe(
            function(data) {
                console.log(data);
                control.setRoot(LoginPage);
            },
            function(error) {
                console.log(error);
        })
    }

    toLogin(): void {
        this.navCtrl.setRoot(LoginPage);
    }
}
