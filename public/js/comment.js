let blogId;
const commentForms = document.querySelectorAll('.new-comment-form');

commentForms.forEach(form => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const blogId = form.dataset.blogid;
        const comment = form.querySelector('#comment').value.trim();

        if (!comment) {
            alert('Please enter a comment');
            return;
        }

        try {
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
                const data = await response.json();
                alert('Failed to create new comment');
            }
        } catch (error) {
            console.error('Failed to create new comment', error);
            alert('Failed to create new comment');
        }
    });
});

// const newComment = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     console.log('form', form)
//     const blogId = form.dataset.blogid;
//     console.log('blogId', blogId)
//     const comment = form.querySelector('#comment').value.trim();
//     console.log('comment', comment)
//     if (!comment) {
//         alert('Please enter a comment');
//         return;
//     }
//     try {
//         const response = await fetch('/', {
//             method: 'POST',
//             body: JSON.stringify({
//                 blogPost_id: parseInt(blogId),
//                 content: comment,
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status === 200) {
//             document.location.reload();
//             console.log('New comment created');
//         } else {
//             const data = await response.json(data);
//             alert('Failed to create new comment');
//         }
//     } catch (error) {
//         console.error('Failed to create new comment', error);
//         alert('Failed to create new comment');
//     }
// };

// document
//     .querySelector('.new-comment-form')
//     .addEventListener('submit', newComment);

    