// Article.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const articlesList = document.getElementById('articlesList');
      const response = await fetch('/article'); // Updated route
      const articles = await response.json();
  
      articles.forEach(article => {
        const li = document.createElement('li');
        li.textContent = `${article.article} - Posted by: ${article.posted_by}`;
        articlesList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  });
  
  document.getElementById('createArticleForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const article = document.getElementById('article').value;
    const posted_by = document.getElementById('posted_by').value;
  
    try {
      const response = await fetch('/article/create', { // Updated route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article, posted_by }),
      });
  
      const newArticle = await response.json();
      console.log('Created new article:', newArticle);
  
      // Clear the form fields after submission
      document.getElementById('article').value = '';
      document.getElementById('posted_by').value = '';
    } catch (error) {
      console.error('Error creating article:', error);
    }
  });
  