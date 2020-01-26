# Bulletproof And Clean Node.js Architecture
Here I demonstration a bulletproof and clean architecture which automatically guide you to write loosely coupled and more maintainable code using Hapi, Node.js and MongoDB.
## Requirements
* Node >=12
* Git
* VS Code
## Common setup
Clone the repo and install the dependencies.
```
git clone https://github.com/shuvo009/Bulletproof-Node.js-Architecture.git
cd Bulletproof-Node.js-Architecture
```
```
npm install
```
To start the @hapi server, run the following command
```
npm run start:watch
```
Open http://localhost:3000/doc and take a look api documentation.

## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo
```
git clone https://github.com/shuvo009/Bulletproof-Node.js-Architecture.git
```
Step 2: Run the Docker container locally:
```
docker-compose up
```
## Dependencies
* [Typescript](https://www.typescriptlang.org) - Typescript is an open-source programming language developed and maintained by Microsoft.
* [@hapi/hapi](https://hapi.dev/) - The server for handling and routing HTTP requests
* [hapi-auth-jwt2](https://www.npmjs.com/package/hapi-auth-jwt2) - Simplified JSON Web Token (JWT) authentication plugin
* [hapi-swagger](https://github.com/glennjones/hapi-swagger) - A swagger documentation UI generator plugin for hapi
* [inversify](http://inversify.io) - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.
* [mongoose](https://mongoosejs.com) - Mongoose is a MongoDB object modeling tool
* [nodemon](https://nodemon.io) -  Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
* [tslint](https://palantir.github.io/tslint) - TSLint is an extensible static analysis tool that checks TypeScript code.

## Directory Structure

```
src
├── apiRoute                  # @hapi route registration and controllers will goes here.
├── config                    # All kind of configuration related code will goes here.
│   ├── constant              # Different types of constant will goes here.
│   ├── ioc                   # IOC related configuration code will goes here.
│   └── plugins               # All @hapi plugins will goes this directory.                  
│
├── dataAccess                # Any kind of database related code are goes here.
│   ├── repositories          # Repositories are goes here. I prefer one repository for one schema.
│   └── schema                # All database schema will goes here.
│                     
├── interfaces                # All interfaces of this application will goes here.
│   ├── ioc                   # IOC related interfaces will goes here.
│   ├── repositories          # Repository interfaces will goes here.
│   └── services              # Service interfaces will goes here.
│                     
├── models                    # All models of this application will goes here.
│   ├── databaseModels        # All database models will goes here.
│   └── viewModels            # All viewModels models will goes here.
│                     
└── services                  # All kind of business and third pary service integration will goes here.
    └── business              # All domain related business will goes here.                     
 
```
## Code overview
* **DatbaseModel** - All database model should inherited from `IBaseModel` to avoid re-implement common properties.
* **Repository Interface** - We need to create Interface for each Repository and it should inherited from `IRepositoryBase`. So it will help us to avoid re-implement common functionality at each repository.
* **Repository** - We need to create repository for each schema and it should implemented it's own intreface and also inherited from `RepositoryBase`. So it will help us to avoid re-implement common functionality at each repository.
* **Service Interface** -  We need to create Interface for each Service for our business domain and it should inherited from `IBaseService`. So it will help us to avoid re-implement common functionality at each service.
* **Service** - We need to create service for each service and it should implemented it's own intreface and also inherited from `BaseService`. So it will help us to avoid re-implement common functionality at each repository. Multiple repository can be injected in a service via constrator.
* **apiRoute** - All route and controller should be inherited from `BaseController`. By inherit `BaseController` we will get basic CRUD operation automatically.
* **config/ioc** - We have to register each Repository at `RepositoryRegister` and each service at `ServiceRegister` and also for controller at `routerRegister`
## Design Patterns are used
* Repository patterns 
* Façade
* Inversion of control (IOC)
## ToDo
* Unit Test
