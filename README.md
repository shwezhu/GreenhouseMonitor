# 1. Client
---

LineCharts are drawn by ChartJS in plain Javascript. Support adjust x-axis automatically with time changing.

Get data from database in Node.JS. 

<img width="1440" alt="Screen Shot 2022-10-11 at 15 51 43" src="https://user-images.githubusercontent.com/54054395/195032652-b04981cb-ef98-4486-9c41-b2b5293b607e.png">

# 2. Server
---


Using Mongodb database with Node.JS, Express.JS...

1. You should install MongoDB and create database and collections(collection is similar to table in relational database, MongoDB is not a relational database) first, because this project(server) use MongoDB as database. 
2. remember your collections and database name, if you don't know how to create database in MongoDB, google it 
3. change source code in server, just as picture below:
<img width="1312" alt="database" src="https://user-images.githubusercontent.com/54054395/196470730-e1e088c5-a554-4938-96ad-3c1c721a1aa3.png">

<img width="1432" alt="database 2" src="https://user-images.githubusercontent.com/54054395/196470748-b298b9c8-8fee-4af3-b51f-15cc7747f3ee.png">

<img width="1277" alt="url" src="https://user-images.githubusercontent.com/54054395/196470769-3100c0c4-efbf-4d4a-8ea6-55ef94d2e544.png">

## 2.1. Run server
```shell
cd GreenhouseMonitor/server/
# install dependencies
npm install
# run server
npm start
```

## 2.2. Test
```shell
# get data 
curl -X GET "localhost:3001/temperature/?startDate=2022-09-20&endDate=2022-09-30"
# post data
curl -d '{ "value": 20.6 }' -H "Content-Type: application/json" -X POST http://localhost:3001/temperature/
```
