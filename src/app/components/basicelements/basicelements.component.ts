import { Component, OnInit } from '@angular/core';
import { Song } from 'app/model/song';
import { DataServiceService } from 'app/data-service.service';
import { Artist } from 'app/model/artist';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Rate } from 'app/model/rate';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/authentication.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss'],
  providers: [NgbRatingConfig]
})
export class BasicelementsComponent implements OnInit {

  currentUserData: User;
  userLoggedIn:boolean = false;
  isLoading: boolean = true;
  songs: Song[];
  artists: Artist[];

  constructor(private loginservice: AuthenticationService, private router:Router, private dataService: DataServiceService, 
    config: NgbRatingConfig) { 
      config.max = 5;
  }

  async ngOnInit() {
    this.loadUser().then(()=>{
      this.loadData()
      .then(() => {
        this.songs.sort(function(a, b) { return b.avgRating - a.avgRating; })
        this.artists.sort(function(a, b) { return b.avgRating - a.avgRating; })
        this.isLoading = false;
      })
    })
  }

  addSong(){
    this.router.navigate(['/newsong']);
  }

  onRatingChange(id){
    for(var i=0;i<this.songs.length;i++){
      if(this.songs[i].id == id){
          var rate: Rate = new Rate;
          rate.rate = this.songs[i].currentUserRating;
          rate.user = this.currentUserData.name;
        if(this.songs[i].currentUserRated){
          this.dataService.updateRatingToSong(id,rate)
          .subscribe((data)=>{
            console.log("rating updated")
          })
        }
        else {
          this.songs[i].currentUserRated = true;
          this.dataService.addRatingToSong(id,rate)
          .subscribe((data)=>{
            console.log("rating added" )
          })
        }
      }
    }
  }

  async loadUser(){
    if(this.loginservice.currentUser || localStorage.getItem('user')) {
      if(!this.loginservice.currentUser){
        this.currentUserData = JSON.parse(localStorage.getItem('user'))
      }else{
        this.currentUserData = this.loginservice.currentUser
      }
      this.userLoggedIn = true;
    }else{
      this.currentUserData = new User();
    }
  }

  login(){
    this.router.navigate(['signup'])
  }
  logout(){
    this.loginservice.logOut();
    this.router.navigate(['signup'])
  }

  async loadData(){
    var tempRating = 0;
    var ratingCount = 0;
    var tempArtistString = "";
    this.songs = await this.dataService.getSongsPromise();
    this.artists = await this.dataService.getArtistsPromise();

    for(var i=0;i<this.songs.length;i++){ //2
      for(var y=0; y<this.songs[i].rating.length;y++){ //2,0
        tempRating += this.songs[i].rating[y].rate;
        ratingCount++;
        if(this.songs[i].rating[y].user == this.currentUserData.name){
          this.songs[i].currentUserRating = this.songs[i].rating[y].rate;
          this.songs[i].currentUserRated = true;
        }
      }
      
      if(ratingCount>0){
        this.songs[i].avgRating = (tempRating/ratingCount);
      }else{
        this.songs[i].avgRating = 0;
      }
      
      for(var j=0; j<this.songs[i].artistList.length;j++){
        for(var x=0;x<this.artists.length;x++){
          if(this.songs[i].artistList[j] == this.artists[x].id){
            tempArtistString = tempArtistString.concat(this.artists[x].name.toString() + ", ")           
          }
        }  
      } 
      this.songs[i].dispArtistList = tempArtistString.slice(0,-2)  
      ratingCount = 0;
      tempRating = 0;   
      tempArtistString = "";
    } 
    
    var tempDispSongList = "";
    var tempRating2 = 0;
    for (let index = 0; index < this.artists.length; index++) {
      for(let j = 0; j < this.artists[index].songList.length; j++){
        for(let x = 0; x < this.songs.length; x++){
          if(this.artists[index].songList[j] == this.songs[x].id){
            tempDispSongList = tempDispSongList.concat(this.songs[x].name + ", ");
            tempRating2 += this.songs[x].avgRating;
          }
        }
      }
      

      if(this.artists[index].songList.length>0){
        this.artists[index].dispSongList = tempDispSongList.slice(0,-2);
        this.artists[index].avgRating = tempRating2 / this.artists[index].songList.length;
      }else{
        this.artists[index].avgRating = 0;
        this.artists[index].dispSongList = " - ";
      }

      tempDispSongList = "";
      tempRating2 = 0;
    }
  }
}
