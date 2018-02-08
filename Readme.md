# Youtube API

This app is based on NodeJs and will implement a nice Rest API.
It will implement some route to fetch data on the real Youtube API server and fit our need.

The project is used on Docker but if you want you can install required services on your host, it's up to you ;)

# Docker

You can use the basic docker / docker-compose command, but you should use the `Makefile` command, it contains the basics often used.

## Install

To install your project inside the container, use
```bash
make install
```

## Build and Run

To build the app, just simply run
```bash
make build
```

Then run the container
```bash
make start
```

## Customize needs

In case you want to customize the services settings, create a `docker-compose.override.yml` file and apply your needs.

### Environment

Actually 3 variables could be used
 - prod
 - dev
 - test

By default it uses the `80` port but you can change it easily

Use `docker-compose.override.yml` file to override any settings as port and env value.

```yaml
services:
    app:
        environment:
            - NODE_ENV=dev
            - NODE_PORT=9000
```
