import { Component } from '@angular/core';
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
    posts: any[] = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public postProvider: PostProvider,
        public userProvider: UserProvider) {
            this.fillPosts(this.posts);
            this.fillAuthors(this.posts);
            // this.posts.push({author: "fulano", texto: "this is the content of this post", likes: 11});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TimelinePage');
    }

    fillPosts(posts): void {
        this.postProvider.getPosts()
        .subscribe(function(data) {
                for(let p of data) {
                    posts.unshift(
                        {
                            author: p._id,
                            texto: p.texto,
                            likes: p.likes
                        }
                    );
                }
            },
            function(error) {
                console.log(error);
        })
    }

    fillAuthors(posts): void {
        for(let i in posts) {
            this.postProvider.getPostAuthor(posts[i].author)
            .subscribe(function(data) {
                    console.log(data);
                    posts[i].author = data.nome;
                },
                function(error) {
                    console.log(error);
            })
        }
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
