let blogId;

const newComment = async (event) => {
    event.preventDefault();
    const blogId = event.target.getAttribute('data-blog-id');
    console.log('blogId', blogId)
    const comment = document.querySelector('#comment').value.trim();
    if (comment) {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                blogPost_id: parseInt(blogId),
                content: comment,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            document.location.reload();
            console.log('New comment created');
        } else {
            alert('Failed to create new comment');
        }
    }
};

document
    .querySelector('#commentBtn')
    .addEventListener('click', newComment);