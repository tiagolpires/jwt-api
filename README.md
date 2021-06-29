# JWT API
API with JWT authorization
## Dependecies
Install the dependencies
```
npm install
```
## Docker
Initialize Docker's containers
```
docker-compose up
```
Acess Docker api container shell
```
docker exec -it jwt-api sh
```
## Migrations
In docker's shell, run the migrations
```
npm run typeorm migration:run
```
To create more migrations run
```
npm run typeorm migration:create -- -n <migrationName>
```
To generate migrations run
```
npm run typeorm migration:generate
```
