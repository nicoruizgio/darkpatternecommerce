# Automated E-Commerce Shopping Assistant

## Docker:

### Build the image

`docker build -t chat-service .`

### Run the container

`docker run -p 3000:3000 chat-service`

### Then open your browser:

➡️ http://localhost:3000

### View Swagger Documentation

http://localhost:3000/api

### DB

```shell
docker run -d \
  --name my_postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
