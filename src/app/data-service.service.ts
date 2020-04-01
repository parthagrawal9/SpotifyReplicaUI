import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './model/song';
import { StandardResponse } from './model/standardresponse';
import { Artist } from './model/artist';
import { Rate } from './model/rate';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  apiUrl = 'http://localhost:3000/';

  constructor(private _http:HttpClient) { }

  //SONGS
  getSongsPromise(){
    return this._http.get<Song[]>(this.apiUrl+'api/songs').toPromise();
  }

  getSongs(){
    return this._http.get<Song[]>(this.apiUrl+'api/songs');
  }

  getSong(songId: string){
    return this._http.get<Song>(this.apiUrl + `api/songs/${songId}`).toPromise();
  }

  updateSong(song: Song):Observable<StandardResponse>{ 
    return this._http.put<StandardResponse>(this.apiUrl + `api/songs/`,song);
  }

  addSong(song: Song):Observable<Song>{
    return this._http.post<Song>(this.apiUrl + `api/songs/`,song);
  }

  addRatingToSong(songId: string,rate: Rate):Observable<Song>{
    return this._http.post<Song>(this.apiUrl + `api/songs/${songId}/rating`,rate);
  }

  updateRatingToSong(songId: string,rate: Rate):Observable<Song>{
    return this._http.put<Song>(this.apiUrl + `api/songs/${songId}/rating`,rate);
  }

  //SINGERS
  getArtists(){
    return this._http.get<Artist[]>(this.apiUrl+'api/artists');
  }

  getArtistsPromise(){
    return this._http.get<Artist[]>(this.apiUrl+'api/artists').toPromise();
  }

  getArtistPromise(artistId: string){
    return this._http.get<Artist>(this.apiUrl + `api/artists/${artistId}`).toPromise();
  }

  addArtistSong(artistId: string,songId){
    return this._http.post<Artist>(this.apiUrl + `api/artists/${artistId}`,songId).toPromise();
  }

  getArtist(artistId: string){
    return this._http.get<Song>(this.apiUrl + `api/artists/${artistId}`);
  }

  updateArtist(artist: Artist):Observable<StandardResponse>{ 
    return this._http.put<StandardResponse>(this.apiUrl + `api/artists/`,artist);
  }

  addArtist(artist: Artist):Observable<StandardResponse>{
    return this._http.post<StandardResponse>(this.apiUrl + `api/artists/`,artist);
  }

  //UPLOAD IMAGE
  uploadImage(uploadData){
    return this._http.post<any>(this.apiUrl + `api/songs/cover`,uploadData).toPromise();
  }

}
