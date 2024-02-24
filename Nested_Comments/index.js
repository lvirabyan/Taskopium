const comments = [
    {
      id: 1,
      text: "This is the first comment",
      parentId: null,
      replies: [
        {
          id: 2,
          text: "This is a reply to the first comment",
          parentId: 1,
          replies: [
            {
              id: 3,
              text: "This is a nested reply",
              parentId: 2,
              replies: [] // Further nesting possible
            }
          ]
        }
      ]
    },
    {
      id: 4,
      text: "This is an independent comment",
      parentId: null,
      replies: []
    },
  ];

  
  
  function generateCommentHTML(comment, nestingLevel) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.style.marginLeft = nestingLevel * 20 + 'px'; 
  
    const commentText = document.createElement('p');
    commentText.textContent = comment.text;
    commentDiv.appendChild(commentText);
  
    if (comment.replies && comment.replies.length > 0) {
      const repliesDiv = document.createElement('div');
      repliesDiv.classList.add('replies');
      
      comment.replies.forEach(reply => {
        const replyHTML = generateCommentHTML(reply, nestingLevel + 1);
        repliesDiv.appendChild(replyHTML);
      });
  
      commentDiv.appendChild(repliesDiv);
    }
  
    return commentDiv;
  }
  
  function appendCommentsToDOM() {
    const commentsContainer = document.getElementById('commentsContainer');
  
    comments.forEach(comment => {
      if (comment.parentId === null) {
        const commentHTML = generateCommentHTML(comment, 0);
        commentsContainer.appendChild(commentHTML);
      }
    });
  }
  
  appendCommentsToDOM();
  