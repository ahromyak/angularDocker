## Demo
Сonvenient demo at web: http://mebelland.in.ua 

## Technologies
Client-side:
- AngularJs
- Material Design lite
- Gulp
- docker

##How to start app
First of all you have to instal docker on your machine,
to do that you need to go to - 
https://www.docker.com/products/overview
For ubuntu users just run docker-compose up.
Please be sure that ports 80 or 8080 or 7777 are not used.
By default it uses port 80. In google developers console
i have added localhost:80,localhost:8080,localhost:7777
to accept gapi calls. If port 80 is used change it to 8080 or 7777
in docker-compose.yml
For windows user please clone app to C:\Users\docker folder,
because docker compose can mount volumes only from that folder.
All you have to do is to run docker-compose up.


## License
The MIT License (MIT)
