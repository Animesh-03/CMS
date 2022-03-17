Before running:
1. Add a file named ".env" in root directory and add the line PORT=3000. (no semicolon)
2. Add the variables MYSQL_DB_USERNAME=xxxxxxxx and MYSQL_DB_PASSWORD=xxxxxxxxxxx (Enter your username and password from workbench)
3. Create a new database in mysql named cms
4. Run all the SQL queries given in the SQL Queries.txt
5. Add another .env in the frontend folder and add the line PORT=3001.


To run:
1. In terminal 1: npx nodemon index.js
2. In terminal 2: cd frontend
                  npm start