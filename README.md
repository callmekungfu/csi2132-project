# Database I Course Project

This repository contains the solution for CSI2132 course project.

## Team Members

| Name          | Student Number |
| ------------- | -------------- |
| Stephen Chen  | TODO           |
| Keith Tang    | 300014176      |
| Yong Lin Wang | 300065862      |

## Get Started
### Prerequisite

Docker is required for this project, please download Docker Desktop from their website.

### Commands

To start the database and migrate all changes, run the following command.

```
docker-compose up db -d
docker-compose up flyway
```

if `docker-compose up flyway` fails due to PostgreSQL DB not ready, just run it a few seconds after.
