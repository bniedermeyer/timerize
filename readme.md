# Timerize
 
#### A simple tool for tracking how much time you spend on things during the day

 Timerize is a simple timer that lets you track the amount of time spent on individual tasks as you work throughout the day. Simply type in a description for your task and press start. When you are finished logging time for this task click 'Log Current Task' and the task is added to a list below. If you need to start working on that task later in the future click the resume button and your task is ready for you to add more time to it.

## Contributing

 Timerize is built with the following technologies:
 - React.js
 - Javascript (ES6)
 - Sass
 - Git
 - npm

To contribute first clone the repository to your local machine

````
$ git clone https://github.com/bniedermeyer/timerize.git
````
Then install the local dependencies
````
$ npm install
````
After the dependencies have finished installing you are good to start coding. This project uses Facebook's  [create-react-app](https://github.com/facebookincubator/create-react-app) and has all of the react scripts present to assist in development.

If you would like to run a local version of the app that auto-updates simply run the startup script.
````
$ npm start
````
When you are ready to push a release to the gh-pages branch run the build script and follow the instructions in your terminal.
````
# npm run build
````
Sass is not included in the create-react-app toolkit so you will need to run that manually if you would like to see your changes automatically transpiled.
````
$ sass --watch public/css/scss/main.scss:public/css/main.css
````
