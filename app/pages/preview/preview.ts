import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

/*
  Generated class for the PreviewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/preview/preview.html',
})
export class PreviewPage {
  private preview_url = '';
  private mediaFile: MediaPlugin;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.preview_url = this.navParams.get('preview_url');
  }

  play(){
    this.mediaFile = new MediaPlugin(this.preview_url);
    this.mediaFile.play()
  }

  pause(){
    this.mediaFile.pause();
  }

  stop(){
    this.mediaFile.stop();
  }

}
