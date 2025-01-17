const Book = require("./book.model");

const postABook = async(req, res) => {
    try{
        const newBook = await Book({...req.body});
        await newBook.save();
        console.log("Book posted successfully", newBook)
        res.status(200).send({message: "Book posted successfully", book: newBook})
    }
    catch (err) {
        console.log("Error creating book", err)
        res.status(500).send({message: "Failed to create book"})
    }
}

const getAllBooks = async(req, res) => {
    try{
        /*const allBooks = await Book.find().sort({createdAt: -1})*/ 
        const totalBooks = await Book.countDocuments();
        const allBooks = await Book.aggregate([{ $sample: { size: totalBooks } }])
        console.log("Fetched all books", allBooks)
        res.status(200).send({message: "All books fetched successfully", allBooks})
    }
    catch (err) {
        console.log("Error fetching books", err)
        res.status(500).send({message: "Failed to fetch books"})
    }
}

const getSingleBook = async(req, res) => {
    try{
        const {id} = req.params
        const singleBook = await Book.findById(id)
        if (!singleBook) {
            console.log("Book with this id does not exist. Id: ", id)
            res.status(404).send({message: "Book with this id does not exist", id})
        }
        else {
            console.log("Fetched book", singleBook)
            res.status(200).send({message: "Book fetched successfully", singleBook})
        }
    }
    catch (err) {
        console.log("Error fetching book", err)
        res.status(500).send({message: "Failed to fetch book"})
        
    }
}

const updateBook = async(req, res) => {
    try{
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if (!updatedBook) {
            console.log("Book with this id does not exist. Id: ", id)
            res.status(404).send({message: "Book with this id does not exist", id})
        }
        else {
            console.log("Updated book", updatedBook)
            res.status(200).send({message: "Book updated successfully", updatedBook})
        }
        
    }
    catch (err){
        console.log("Error updating book", err)
        res.status(500).send({message: "Failed to update book"})
    }
}

const deleteABook = async(req, res) => {
    try{
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            console.log("Book with this id does not exist. Id: ", id)
            res.status(404).send({message: "Book with this id does not exist", id})
        }
        else {
            console.log("Deleted book", deletedBook)
            res.status(200).send({message: "Book deleted successfully", deletedBook})
        }
    }
    catch (err) {
        console.log("Error deleting book", err)
        res.status(500).send({message: "Failed to delete book"})
    }
}

const getBookByName = async(req, res) => {
    
    try {
        const {query} = req.query;
        console.log(query)
        const searchBooks = await Book.find({
            title: { $regex: query, $options: 'i' } 
        })
        if (searchBooks.length === 0){
            return res.status(404).json({message: "No books found"})
        }
        return res.status(200).json(searchBooks);


    }
    catch (err){
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteABook,
    getBookByName,
}