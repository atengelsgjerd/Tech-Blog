const router = require('express').Router();

const { User, BlogPost, Comment } = require('../../models');



// CREATE new user
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.id;
            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//User-specific route to display logged-in user's blog posts
// Modified route to display the logged-in user's blog posts without using Passport.js
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if (req.session.loggedIn) {
        const userId = req.session.userId;

        if (userId) {
            BlogPost.findAll({ 
                where: { user_id: userId }, 
                include: Comment // Include the Comment model to fetch associated comments
            })
            .then(blogPostData => {
                const blogPosts = blogPostData.map(blogPost => {
                    console.log('Blog post content:', blogPost.content);
                    console.log('Blog post comments:', blogPost.Comments);
                    const serializedBlogPost = blogPost.get({ plain: true });
                    serializedBlogPost.comment = blogPost.Comment?.map(comment => comment.get({ plain: true })) || [];
                    return serializedBlogPost;
                });
                console.log('User blog posts:', blogPosts);
                res.render('dashboard', { blogPosts, loggedIn: req.session.loggedIn });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error fetching user posts');
            });
        } else {
            res.status(400).send('User ID not found in session');
        }
    } else {
        res.redirect('/login');
    }
});
//Middleware function to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
        return next();
    }
    res.redirect('/login');
}

//get one post
router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });

        if (!blogPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const blogPost = blogPostData.get({ plain: true });
        res.render('single-post', { blogPost, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});
//create post
router.post('/', async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.userId
        });
        console.log("req.body", req.body);

        res.status(200).json(newPost);
        console.log("Post created successfully", newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//comment on post

//update post
// router.put('/:id', async (req, res))

//Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;