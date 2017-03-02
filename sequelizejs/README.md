First create the database

```sh
mysql -uroot -p123
mysql> create database seq_users
```

Then do:

```sh
npm i
node index
```

Then you will see a document in the database `users` table:

```sh
mysql -uroot -p123
mysql> use seq_users
mysql> select * from users
...
```
