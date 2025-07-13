# Restaurant Recommendation
### Stack
NestJs, MongoDB, Docker

## API

### Running The API 

Clone the project

```bash
git clone https://github.com/aminyasser/restaurant-recommendation-api.git
cd restaurant-recommendation-api
```
If you prefer using docker, You should have docker and docker-compose installed.
The application is all dockerize, you just need to type the following command to run it.

```bash
 docker-compose  up --build 
```

Run the seeder
```bash
docker compose exec restaurant pnpm seed
```

### API Documentation

Swagger UI can be found here `http://localhost:3000/docs`
