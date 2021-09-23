{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloud: Handlebars.compile(document.querySelector('#tag-cloud-link').innerHTML),
  }

  'use strict';

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){
      const articleID = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      //const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleID, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      html += linkHTML;
    }

    titleList.innerHTML = html;
  };
  generateTitleLinks();

  const titleClickHandler = function(event){
    event.preventDefault(); // zapobiega zmianie adresu - strona zostaje na tej samej wysokości
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const calculateTagsParams = function(tags){
    const params = {
      min: 999999,
      max: 0,
    };
    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      } else(tags[tag] < params.min);
      params.min = tags[tag];
    }
    return params;
  };

  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function(){
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for(let tag of articleTagsArray){
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        const linkHTMLData = {tag: tag};
        const linkHTML = templates.articleTag(linkHTMLData);
        html = html + linkHTML +  ' ';
        if(!allTags[tag]){
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagsWrapper.innerHTML = html;
    }
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};
    for(let tag in allTags){
      //allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')' + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloud(allTagsData);
  };
  generateTags();

  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for(let activeTagLink of activeTagLinks){
      activeTagLink.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for(let tagLink of tagLinks){
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    for(let tagLink of tagLinks){
      tagLink.addEventListener('click', tagClickHandler);
    }
  };
  addClickListenersToTags();

  const generateAuthors = function(){
    let allAuthors = [];
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthors = article.getAttribute('data-author');
      //const authorHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';
      const linkHTMLData = {author: articleAuthors};
      const authorHTML = templates.articleAuthor(linkHTMLData);
      if(allAuthors.indexOf(authorHTML) == -1){
        allAuthors.push(authorHTML);
      }
      html += authorHTML +  ' ';
      authorWrapper.innerHTML = html;
    }
    const authorList = document.querySelector('.authors');
    let allAuthorHTML = '';
    for(let author of allAuthors){
      allAuthorHTML += '<li>' + author + '</li>';
    }
    authorList.innerHTML = allAuthorHTML;
  };
  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for(let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for(let authorLink of authorLinks){
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenerstoAuthors = function(){
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for(let authorLink of authorLinks){
      authorLink.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenerstoAuthors();

}

