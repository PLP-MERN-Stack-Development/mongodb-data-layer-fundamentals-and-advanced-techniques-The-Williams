// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })


// Task 3: Advanced Queries

// 1. Books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Projection (only title, author, price)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. Sort books by price ascending
db.books.find().sort({ price: 1 })

// 4. Sort books by price descending
db.books.find().sort({ price: -1 })

// 5. Pagination (limit & skip)
// Page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Page 2 (next 5 books)
db.books.find().skip(5).limit(5)


// Task 4: Aggregation Pipelines

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 3. Group books by decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [ { $toString: { $multiply: ["$_id", 10] } }, "s" ] },
      count: 1,
      _id: 0
    }
  }
])


// Task 5: Indexing

// 1. Create index on title
db.books.createIndex({ title: 1 })

// 2. Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to analyze query performance
db.books.find({ title: "1984" }).explain("executionStats")
