module.exports = function(app, Book)
{
    // GET ALL BOOKS
    app.get('/api/books', function(req, res){
        // debugger;
        Book.find(function(err, books){
            if(err){
                return res.status(500).send({
                    error: 'datebase failure'
                });
            }
            res.json(books);
        });
        
        //query with mongoose
        // let query = Book.find({}).select({ "title": 1, "_id": 0});

        // query.exec(function (err, books) {
        //     if(err){
        //         return res.status(500).send({
        //             error: 'datebase failure'
        //         });
        //     }

        //     res.json(books);
        // });
    });

    // GET SINGLE BOOK
    // app.get('/api/books/:book_id', function(req, res){
    //     debugger;
    //     Book.findOne({_id: req.params.book_id}, function(err, book){
    //         debugger;
    //         if(err) return res.status(500).json({error: err});
    //         if(!book) return res.status(400).json({error: 'book not found'});
    //         res.json(book);
    //     })
    // });
    app.get('/api/books/:book_id', function(req, res){
        // debugger;
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        });
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        // debugger;
        Book.find(
            {author: req.params.author}, 
            {_id: 0, title: 1, published_date: 1},
            function(err, books){
                // debugger;
                if(err) return res.status(500).json({error: err});
                if(books.length === 0) return res.status(404).json({
                    error: 'book not found'});
                res.json(books);
            });
    });

    // CREATE BOOK
    app.post('/api/books', function(req, res){
        // debugger;
        let book            = new Book();
        book.title          = req.body.title;
        book.author         = req.body.author;
        book.published_date  = new Date(req.body.published_date); 
        
        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});
        });
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', function(req, res){
        // Book.findById(req.params.book_id, function(err, book){
        //     if(err) return res.status(500).json({ error: 'database failure' });
        //     if(!book) return res.status(404).json({ error: 'book not found' });

        //     if(req.body.title) book.title = req.body.title;
        //     if(req.body.author) book.author = req.body.anuthor;
        //     if(req.body.published_date) book.published_date = req.body.published_date;

        //     book.save(function(err){
        //         if(err) res.status(500).json({error: 'failed to update'});
        //         res.json({message: 'book updated'});
        //     });
        // });
        Book.update(
            {_id: req.params.book_id}, 
            {$set: req.body},
            function(err, output){
                if(err) res.status(500).json({error: 'database failure'});
                console.log(output);
                if(!output.n) return res.status(404).json({error: 'book not found'});
                res.json({message: 'book updated'});
            }
        );
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        debugger;
        Book.remove(
            {_id: req.params.book_id},
            function(err, output){
                if(err) return res.status(500).json({ error: 'database failure'});

                // SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECITY )
                // if(!output.result.n) return res.status(404).json({error: 'book not found'});
                if(!output.n) return res.status(404).json({ error: 'book not found'});
                res.json({message: 'book deleted'});

                // res.status(204).end();
            })
    });
}
