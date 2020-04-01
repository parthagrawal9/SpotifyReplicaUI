This repository is focusing on the UI of Spotify Replica App.
For backend & DB Script kindly check "SpotifyReplica" repository. (https://github.com/parthagrawal9/SpotifyReplica)

Problem Statement
Create a Spotify like website with basic CRUD and song listings using an MVC web-framework of your choice
(Asp.NET MVC / Asp.NET Core / Django / Rails / MEAN stack).

We would like to have the following entities in the application.

Artists

- Name
- DOB
- Bio

Songs

- Name
- Date of Release
- Cover (image)
  User
- Name
- Email
  Relationships
  ● Artist can sing multiple songs
  ● Song can be sung by multiple artists
  ● Users can rate a song (rating between 1 - 5)
  Application specifics (minimum requirements)
  ● Home Screen
  ○ Top 10 Songs (by Avg Rating)
  ■ Show Cover (image), Name, Date of Release, Avg. Rating and all Artists of the song
  ■ Add a ‘New Song’ button
  ■ Allow users to rate the Song from this screen
  ○ Top 10 Artists (by Avg Rating of their Songs)
  ■ Show Name, DOB and Avg. Rating
  ● Add a ‘New Song’
  ○ Screen to ‘add’ a new Song with the necessary fields with existing Artists. If the user wants to
  add a new ‘Artist’ while creating the Song which is not present in the database then he should
  be able to add new artists from the same screen using Ajax.

TECH STACK:
MEAN: MongoDB, ExpressJS, AngularJS, NodeJS
