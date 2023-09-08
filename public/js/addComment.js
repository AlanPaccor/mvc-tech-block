const addComment = async (e) => {
    e.preventDefault();

    const urlString = window.location.toString().split('/')
    const postId  = urlString[4];

    const contents = $('#comment').val().trim();
    
    if (contents) {
        const response = await fetch(`/api/comment/${postId}`, {
            method: 'POST',
            body: JSON.stringify({contents}),
            headers: {'Content-Type': 'application/json'}
          });
        const data = await response.json()
        if (response.ok) {
            alert('Comment Added')
            document.location.replace(`/post/${postId}`)
        } else {
            alert(`I'm sorry but I've ran into an issue while attempting to add your comment.`);
        }
    }
    
}

$('#add-comment').click(addComment);