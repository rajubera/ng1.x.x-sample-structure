Files are grouped structurally (each section of the app being self contained with its own views, controllers, and directives) instead of functionally (all views in one folder, all styles in one folder, etc). In practice, the basic file structure should look something like this:

```
/app
--- /assets
------ /audios
------ /images
--- /common
------ /configs (Maintains translate configs for all three languages)
------ /constants (Maintains cognito configs)
------ /controllers (Maintains common controllers for common directives like header, modal)
------ /directives (common directive for heder and directive to compare model values for confirm password)
------ /factories (Maintains lang factory that maintains selected language and function to change language)
------ /styles (All css are maintained here)
------ common.js (common module requirements)
------ common-init.js (Maintains on all event listeners on rootscope)
--- /modules
------ index.js
------ /aws
--------- index.js (module definition)
--------- MqttClientAws.js (factory - get aws credential, create aws thing object, register thing shadow and subscribe for update messages)
------ /cognito
--------- index.js (module definition)
--------- services
------------- cognitoService.js (Maintains all function for cognito signup, signin, forget password, reset password, edit profile, change password etc.)
------ /user
--------- index.js (module definition)
--------- services
------------- userServices.js (All user modules like sign in, sign up etc call this module and this module calls the respective cognito service, this service also holds the user data)
--------- active (Module to activate account after signup)
--------- change-password (Module to change logged in user's password)
--------- edit-profile (Module to change logged in user's details)
--------- forget-password (Module for forget password)
--------- login (Module for login)
--------- reset-password (Module to reset password)
--------- signup (Module for signup)
------ /home
--------- index.js (module definition)
--------- homeRoutes.js (Maintians the home page route declaration)
--------- controllers
-------------- ContactInfoController.js (Controller for the popup window to show user details, also holds the code to edit elder's details)
-------------- HomeControllers.js (Gets logged in user's details, loads all the devices for the user from DynamoDB, shows the devices in the dashabord page, connects to aws iot thing shadow for each device, listens to the status and message event for shadows to change the status of device in the dashbaord, checks for internet for each minute and shows error message if no network, also if the device has not received status for 15 minutes then shows disconnected status)
---------- directives
-------------- InfoWindow.js (Directive for the app window popup)
---------- filters
-------------- DeviceFilter.js (Filter method to hide and show disconnected devices)
--- index.html
/dist (this is the gulp pipeline file output destination)
/docs (this is the gulp generated folder that contains the documents)
/bower_componets (bower components install here)
/libs (External library files)
/node_modules (npm installations go here)
```

### Setup Instructions

*NOTE:* We you already have bower (http://bower.io/) and gulp (http://gulpjs.com/) installed locally. If you don't, then run the following command first: ```npm install -g bower gulp```

1) Node Modules and Bower Components are not included in this repository to keep it light weight. After cloning or pulling changes from this repository, make sure to run the following command in terminal: ```npm install```

Bower dependencies should install automatically at the end of the NPM install process. If the dependencies don't install correctly you may need to manually run ```bower install``` as well.

2) Once everything is installed all you have to run ```npm start``` and open the folder ```dist``` to see the changes in the browser(you can edit the port in the gulpFile). And if you want to deploy the application you need to deploy just the dist folder. And if you want to modify the code you can just modify the file and run ```npm start``` it'll automatically change the dist folder. If you're changing the js/css files then you can run ```npm start``` in the terminal and make the chnages, it'll watch for the chnages and change the dist folder automatically.

3) To generate the documentation of the project you have to run ```npm run doc``` and open the folder ```docs``` in the browser.


### Working with this application structure
1) All pipeline, automation, and testing dependencies are in the ```node_modules``` folder (installed using npm), while all third party application libraries are located in the ```libs``` folder (installed using bower).

2) Any additional third party modules and plugins should always be installed automatically whenever possible using ```npm install module_name``` or ```bower install module_name``` with the ```--save``` or ```--save-dev``` suffixes to save the dependencies in the ```package.json``` and ```bower.json``` files.

3) All development takes place in the ```app``` folder. Production files are generated with gulp automatically and pushed to the ```dist``` folder (it will automatically be created the first time the ```gulp``` task is run in terminal post-installation).

4) The ```gulpfile.js``` is clearly commented, defining each task that takes place during pipeline automation. Every file change is watched and new files are automatically pushed to the ```dist``` folder. All files are concatenated into individual files for use on production servers.

