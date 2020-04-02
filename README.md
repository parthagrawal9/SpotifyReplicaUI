Author: Parth Agrawal
Contact: agrawal.parth9@gmail.com

This repository is focusing on the UI of Spotify Replica App.
For backend & DB Script kindly check "SpotifyReplica" repository. (https://github.com/parthagrawal9/SpotifyReplica)

Problem Statement:

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

    ○ Screen to ‘add’ a new Song with the necessary fields with existing Artists. If the user wants to add a new ‘Artist’ while creating the Song which is not present in the database then he should be able to add new artists from the same screen using Ajax.

TECH STACK:
    
    MEAN: MongoDB, ExpressJS, AngularJS, NodeJS

APPLICATION:

    - The theme is taken from Creative Tim and is modified as per the reqirements.

    - Screenshots of the application are added in screenshots folder. (https://github.com/parthagrawal9/SpotifyReplicaUI/tree/master/screenshots)

    - Http interceptor is used to add auth header to every outgoing Api call.

    - Basic Auth is used.

    - CanActivate (AuthGuard) is used to verify if the current user is allowed to visit the page or not.

    - Application contains 3 pages/modules

        1. home (path: localhost:4200/#/home)

            - It includes Top 10 Songs list and Top 10 Artists list.

            - If the user is logged in he will get an option of rating the song and adding a new song and artist. ( login is must for rating and adding new song/artist)

            - Without login user can only see top 10 songs and artists but cannot rate songs and add new songs/artists.

        2. newsong (path: localhost:4200/#/newsong)

            - It includes form for adding new song and artist.

            - While adding a new song, user can also add a new artist(in a popup form) without redirecting to any other page.

            - Validations are implemented and are listed below in this document

        3. login (signup) (path: localhost:4200/#/signup)

            - Input for email and password


RUN APPLICATION (UI):

    1. clone the repo

    2. go to the application folder

    3. Download Angular CLI

    4. run `npm install` to install node_modules

    5. `ng serve` to run the application 

VALIDATIONS:

    Add Song Form

        1. Song Name is required field

        2. Song Release date is required field

        3. Song Artist List is required

    Add Artist Form

        1. Artist Name is required field

        2. Artist Birth date is required field

DEPLOYMENT:

    - To deploy UI go to root folder of the application.

    - Run `ng build` command

    - Copy the contents of dist folder to /var/www/html on your server using scp command

    - Start httpd / apache2 service on the server

    - The Ui is now deployed. Check by visiting the server ip. :)

RUN APPLICATION (FULL APPLICATION BACKEND & FRONTEND):

    - Start Mongodb server & load the db with `loadData.js` script

    - After running the script 3 collections will be added

            - songs

            - artists

            - users

    - Run Node application (check guide for running backend in `SpotifyReplica` repo [https://github.com/parthagrawal9/SpotifyReplica])

    - Run Front End application

    - Go to browser and visit localhost:4200

    - Home page will be displayed first. It will display Top 10 Songs and Artitsts only.

    - There is a login option on top-bar. On successful login you will be redirected to home page again but now user will get the option of rating the song and  add new song. (check screenshots for better understanding).

        - If you are using the script for loading data 3 users are already created

                - Parth
                    - email: parth@abc.com
                    - password: parth 
                
                - Parul
                    - email: parul@abc.com
                    - password: parul

                - Nupur
                    - email: nupur@abc.com
                    - password: nupur
    
    - User will also see the rating provided by himself (if rated). If not it will show blank stars. Each user will get there own rating. 

        - Lets assume there are 5 songs.
        - One user rated 2 songs & 3 songs are not rated by him
        - then the list of top songs will display star rating based on current user. If the user has not rated the song it will display empty stars.
        - When the user clicks on rating(update the rating), the new rating will be added / updated in the database.
        - Other users will get rating stars based on there previous rating. So each user can see their own rating only and get a more personalised experience.