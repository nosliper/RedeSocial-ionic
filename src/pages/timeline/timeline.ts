import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-timeline',
    templateUrl: 'timeline.html',
})
export class TimelinePage {

    isPosting: boolean = false;
    @Input() posts: any[] = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public postProvider: PostProvider,
        public userProvider: UserProvider) {
            this.fillPosts(this.posts);
        }
        
        ionViewDidLoad() {
            console.log('ionViewDidLoad TimelinePage');
    }

    fillPosts(posts): void {
        let provider = this.postProvider
        let fillAuthor = this.fillAuthor
        this.postProvider.getPosts()
        .subscribe(function(data) {
                for(let p of data) {
                    let post = {
                        _id: p._id,
                        texto: p.texto,
                        likes: p.likes
                    }
                    fillAuthor(post, provider);
                    posts.unshift(post);
                }
            },
            function(error) {
                console.log(error);
        })
    }

    fillAuthor(post, provider): void {
        provider.getPostAuthor(post._id)
        .subscribe(function(data) {
                post.author = data.nome;
            },
            function(error) {
                console.log(error);
        })
    }

    post(text: string): void {
        let control = this.navCtrl;
        this.postProvider.addPost(text, 0)
        .subscribe(function(data) {
                console.log(data);
                control.setRoot(TimelinePage);
            },
            function(error) {
                console.log(error);
        })
    }

    logout(): void {
        this.userProvider.logout();
        console.log("User signed out");
        this.navCtrl.setRoot(LoginPage);
    }
}
