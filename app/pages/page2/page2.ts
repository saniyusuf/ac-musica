import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  private friends = [];
  private unalteredList = [];
  
  constructor(private http: Http) {
     this.http.get('http://api.randomuser.me/?results=2000&inc=gender,name,nat,email,picture&exc=gender,nat')
      .map((response) => response.json().results)
      .subscribe((friends) => {
        this.friends = friends;
        this.unalteredList = friends;
    });

  }

  searchFriends(ev){
    let searchTerm = ev.target.value;
    this.friends = this.unalteredList;

    if (searchTerm && searchTerm.trim() != '') {
      this.friends = this.unalteredList.filter((friend) => {
        return (friend.name.first.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (friend.name.last.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

}
