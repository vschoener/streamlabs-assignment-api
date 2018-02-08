build:
	docker-compose build

start:
	docker-compose up -d

down:
	docker-compose down

install:
	docker-compose run app npm install

logs:
	docker-compose logs -f
