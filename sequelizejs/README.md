First create the database

```sh
mysql -uroot
mysql> create database newdb
```

Then do:

```sh
npm i
node index
```

Then you will see a document in the database `users` table:

```sh
mysql -uroot
mysql> use newdb
mysql> select * from users
...
```
