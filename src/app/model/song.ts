import { Rate } from "./rate"

export class Song{
    id: string
    name: string = ""
    dateOfRelease: Date
    cover: string 
    artistList: string[] = []
    rating: Rate[]
    dispArtistList: string = ""
    currentUserRating: number = 0
    currentUserRated: Boolean = false;
    avgRating: number
}