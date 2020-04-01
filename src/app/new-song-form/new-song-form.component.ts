import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Artist } from 'app/model/artist';
import { DataServiceService } from 'app/data-service.service';
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { Song } from 'app/model/song';
import { AuthenticationService } from 'app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-song-form',
  templateUrl: './new-song-form.component.html',
  styleUrls: ['./new-song-form.component.scss']
})
export class NewSongFormComponent implements OnInit {

  imageAdded: boolean = false;
  fileData;
  newSong: Song = new Song();
  newArtist: Artist = new Artist();
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  artists: Artist[];
  imageSrc: string;

  constructor(private loginservice: AuthenticationService, private router:Router, private dataService: DataServiceService) { }

  ngOnInit() {
    
    this.loadData()
    .then(()=>{
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        enableCheckAll: false,
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

      this.dropdownList = this.artists;
    })
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item)
  }
  
  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.fileData = file
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result.toString();
      this.imageAdded = true;
      reader.readAsDataURL(file);
    }
  }

  async loadData(){
    this.artists = await this.dataService.getArtistsPromise();
  }

  addSong(form: NgForm){
    if(this.selectedItems.length<=0){
      alert("Please select artist");
      return;
    }
    this.selectedItems.forEach(element => {
      if(this.newSong.artistList.indexOf(element.id) == -1){
        this.newSong.artistList.push(element.id)
      }
    });
    if(this.imageAdded){
      const uploadData = new FormData();
      uploadData.append('file', this.fileData);
      this.newSong.cover = this.fileData.name
      this.dataService.uploadImage(uploadData)
      .then((data)=>{
        this.dataService.addSong(this.newSong)
        .subscribe((data) => {
          console.log(data)
          data.artistList.forEach(element => {
            this.dataService.addArtistSong(element,{songId: data.id})
            .then((data)=>{
              alert('Song Added Success');
              form.resetForm();
              this.selectedItems = []
              this.imageSrc = null
              this.newSong = new Song();
              console.log(data)
            },(err)=>{
              alert('Artist didnt update')
            }).catch((err)=>{
              alert('Artist didnt update')
            })
          });
        },(err)=>{
          alert('Song insert fail')
        })
      },(err)=>{
        alert('Image didnt upload')
      }).catch((err)=>{
        alert('Image didnt upload')
      })
    }else{
      this.dataService.addSong(this.newSong)
        .subscribe((data) => {
          data.artistList.forEach(element => {
            this.dataService.addArtistSong(element,{songId: data.id})
            .then((data)=>{
              alert('Song Added Success');
              form.resetForm();
              this.selectedItems = []
              this.imageSrc = null
              this.newSong = new Song();
              console.log(data)
            },(err)=>{
              alert('Artist didnt update')
            }).catch((err)=>{
              alert('Artist didnt update')
            })
          });
        },(err)=>{
          alert('Song insert fail')
        })
    }
  }

  invalidReleaseDate(){
    if(!this.newSong.dateOfRelease){
      return true;
    }
    return false;
  }

  invalidBirthDate(){
    if(!this.newArtist.dob){
      return true;
    }
    return false;
  }

  invalidName2(){
    if( this.newArtist.name.trim().length <= 0){
      return true;
    }
    return false;
  }

  invalidArtistList(){
    if(this.selectedItems.length<=0){
      return true;
    }
    return false;
  }

  invalidName(){
    if( this.newSong.name.trim().length <= 0){
      return true;
    }
    return false;
  }

  invalidForm(){
    if(
      this.invalidName() || 
      this.invalidReleaseDate() ){
      return true;
    }
  }

  invalidForm2(){
    if(
      this.invalidName2() || 
      this.invalidBirthDate() ){
      return true;
    }
  }

  goHome(){
    this.router.navigate(['home'])
  }
  logout(){
    this.loginservice.logOut();
    this.router.navigate(['signup'])
  }

  addArtist(form: NgForm){
    this.dataService.addArtist(this.newArtist).subscribe(
      (data)=>{
        alert('Artist added Successfully')
        form.resetForm();
        this.newArtist = new Artist();
        console.log(data)
        this.loadData()
        .then(()=>{
          this.dropdownList = this.artists;
        })
      },
      (err)=>{
        alert('Artist added Failed')
        console.log(err)
      }
    )
  }
}

////////////

@Component({
  selector: 'modal-form',
  templateUrl: './new-song-form.component.html'
})
export class ModalFormComponent {
  validatingForm: FormGroup;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }
}
