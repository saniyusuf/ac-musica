import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PreviewPage } from '../preview/preview'

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  private tracks = []
  constructor(public navCtrl: NavController, private http: Http, private loadingCtrl: LoadingController, private actionSheetCtrl: ActionSheetController) {
    let loader = this.loadingCtrl.create({
      content: "Getting Your Tracks....."
    });
    loader.present();
     this.http.get('https://api.spotify.com/v1/search?query=michael+jackson&type=track')
      .map((response) => response.json().tracks.items)
      .subscribe((tracks) => {
        this.tracks = tracks;
        loader.dismiss();
    });
  }

  goToPreview(trackURL){
    this.navCtrl.push(PreviewPage, {
      preview_url: trackURL
    });
  }

  shareTrack(track){
    let socialShareActionSheet = this.actionSheetCtrl.create({
      title: 'Share Your Track',
      buttons: [
       {
         text: 'Share Track',
         handler: () => {
           SocialSharing.share(track.name, '', track.album.images[0].url);
         }
       },
      
       {
         text: 'Cancel',
         role: 'cancel'
       }
     ]
    });

    socialShareActionSheet.present();
  }

}
