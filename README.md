## PLP Bookstore – MongoDB Week 1 Assignment

## Objective

This project demonstrates the fundamentals of MongoDB:

* Setting up a database and collections
* Performing CRUD operations
* Writing advanced queries with projection, sorting, and pagination
* Using aggregation pipelines for data analysis
* Creating indexes to optimize performance


## Prerequisites

Before running the project, make sure you have the following installed:

* **Node.js** (v14 or above)
* **npm** (comes with Node.js)
* **MongoDB** (either:

  * [Community Edition](https://www.mongodb.com/try/download/community) installed locally, OR
  * A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)


## Project Structure

plp-bookstore/
│
├── insert_books.js   # Script to insert sample data into MongoDB
├── queries.js        # MongoDB queries (CRUD, advanced, aggregation, indexing)
├── README.md         # Documentation and setup instructions
└── .env              # (Optional) stores your MongoDB connection string securely

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-github-repo-url>
cd plp-bookstore
```

### 2. Install Dependencies

This project uses the MongoDB Node.js driver and dotenv (optional, for environment variables).

```bash
npm install mongodb dotenv
```

### 3. Configure MongoDB Connection

#### Option A: MongoDB Atlas (Recommended)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Whitelist your IP and create a database user.
3. Copy your **connection string** from Atlas (e.g.):

   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
4. Create a `.env` file in the root of your project and add:

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB

If you installed MongoDB locally, your connection string will look like:

```
mongodb://127.0.0.1:27017
```

## Running the Scripts

### Step 1: Insert Sample Data

Run the insert script to populate the `plp_bookstore` database with the `books` collection:

```bash
node insert_books.js
```

What happens:

* Connects to your MongoDB cluster
* Drops the `books` collection if it exists
* Inserts the sample book documents
* Prints the inserted books in the console


### Step 2: Run Queries

There are two ways to use the queries:

#### Option A: Using MongoDB Shell (mongosh)

1. Start the MongoDB shell:

   ```bash
   mongosh "<your-mongo-uri>"
   ```
2. Select the database:

   ```js
   use plp_bookstore
   ```
3. Copy-paste queries from **queries.js** into the shell.

#### Option B: Using MongoDB Compass

1. Open Compass and connect to your MongoDB instance (local or Atlas).
2. Navigate to the `plp_bookstore` database → `books` collection.
3. Paste queries from **queries.js** into the **Filter** or **Aggregation** tabs.


## Example Queries

* Find all Fiction books:

  ```js
  db.books.find({ genre: "Fiction" })
  ```

* Update the price of *1984*:

  ```js
  db.books.updateOne({ title: "1984" }, { $set: { price: 15.99 } })
  ```

* Average price of books by genre:

  ```js
  db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
  ])
  ```

## Expected Outcome

* `plp_bookstore` database created with a `books` collection
* At least 10 book documents inserted
* Queries demonstrating CRUD, projection, sorting, and pagination working correctly
* Aggregation pipelines returning grouped and summarized data
* Indexes created and analyzed with `explain()`

