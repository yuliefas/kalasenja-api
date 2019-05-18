# Sequelize

## Generate Migration and Model
- Generate Model
- Will make 2 files in migration directory and models directory :
  ```
  $ sequelize model:generate --name Bus --attributes busName:string,plateNumber:string,capacity:integer
  ```
- Or we need only generate 1 file migration to alter table
- Will make 1 file in migration directory :
  ```
  $ sequelize migration:generate --name alter-bus-change-column
  ```
## Run Migration
- Make sure your workdir in root

- Run Migration
  ```
  $ env $(cat dev.env) npm run migrate
  ```
- Undo last migration
  ```
  $ env $(cat dev.env) npm run migrate:undo
  ```
- Undo all migration
  ```
  $ env $(cat dev.env) npm run migrate:undo:all
  ```
  
---

## Generate Seeder
- Generate Seeder
- Will make 1 file in seeders directory :
  ```
  $ sequelize seed:generate --name define-bus
  ```
## Run Seeders file
- `RUN ONLY IN DEVELOPMENT`
- `DO NOT RUN IN PRODUCTION!`
- Make sure your workdir in root
- Seeder only for development
- Run Seeder
  ```
  $ env $(cat dev.env) npm run seed:all
  ```
- Undo Seeder
  ```
  $ env $(cat dev.env) npm run seed:undo:all
  ```
- We cannot undo 1 seeder to ensure the data clean