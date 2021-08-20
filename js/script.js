{
'use strict';

/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
*/

const titleClickHandler = function(event){
    event.preventDefault(); // zapobiega zmianie adresu - strona zostaje na tej samej wysokości
    const clickedElement = this;
//    console.log('Link was clicked!');
//    console.log(event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
//    console.log('clickedElement', clickedElement);
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
//    console.log(articleSelector);
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
 //   console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
        article.innerHTML = '';
    }
    /* get the article id */
    let article;
    for(let element of articles){
        article = element;
    }
    console.log(article);
    const articleID = article.getAttribute('id');
    console.log(articleID);
    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.getElementsByClassName(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend", linkHTML);

    console.log('Everything O.K. so far!!!');
}
generateTitleLinks();

}