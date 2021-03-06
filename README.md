# Movement Martial Arts

This is the source code to build the website for [Movement Martial Arts](http://www.movementmartialarts.com.au) martial arts gym

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have these installed. A working knowledge on what they are and how to use them will help.

* [Node](https://nodejs.org/en/) - Javascript runtime
* [Bower](https://bower.io/) - Package manager
* [Grunt](https://gruntjs.com/) - Task runner

### Installing

Clone or download a zip of the project

Run 'bower install' to install bower dependencies

```
bower install
```

Run 'npm install' to install npm dependencies

```
npm install
```

Run 'grunt' on the folder to build and run local server for dev

```
npm run build
```

## Deployment


Run 'grunt prod' on the folder to just build assets needed to update site

```
grunt prod
```

Take assets from the dist folder and FTP into web server to deploy

## Built With

* [Bootstrap](http://getbootstrap.com) - The web framework used
* [Jquery](https://jquery.com/) - Dependency from bootstrap
* [Bootstrap Native](http://thednp.github.io/bootstrap.native) - Native bootstrap Js
* [Handlebars](http://handlebarsjs.com/) - For generating html pages from templates

## Authors

* **Reynold Ismail** - *Lead dev* - [reyn79](https://github.com/reyn79)
