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

#### Start database & servers

To start the database and migrate all database changes, run the following command.

```
docker-compose up
```

If you database is still empty after starting the database, run the command in [Migrate database changes](#Migrate-database-changes)

#### Migrate database changes

To apply any migrations you made to the database run the following command.

```
docker-compose up flyway
```

This will apply all sql database scripts on your database.