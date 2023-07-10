SHELL := /bin/bash

DOCKER_COMPOSE = docker-compose
RUN_SERVICE = USER_ID=$$(id -u $(USER)) GROUP_ID=$$(id -g $(USER)) $(DOCKER_COMPOSE) run --service-ports --rm order-service

install:
	$(RUN_SERVICE) npm ci

lint:
	$(RUN_SERVICE) npm run lint

audit:
	$(RUN_SERVICE) npm audit

build:
	$(RUN_SERVICE) npm run build

test:
	$(RUN_SERVICE) npm run test:cov

test-e2e:
	$(RUN_SERVICE) npm run test:e2e:cov

clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans &&	$(DOCKER_COMPOSE) rm -v -f

up:
	$(RUN_SERVICE) sh startup.sh

all: install lint build test test-e2e clean

.PHONY: test lint audit clean
