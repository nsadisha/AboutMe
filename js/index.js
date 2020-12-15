$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn()
			} else {
				$('#back-to-top').fadeOut()
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400)
			return false
		})
})


// Fetching medium articles
let articles = document.getElementById('articles')

const mediumUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nsadisha'
fetch(mediumUrl).then(function(response){
    return response.json();
}).then(function(obj){
	// var txtData = JSON.stringify(obj)
	// data = JSON.parse(txtData).items
	data = obj.items

	data.forEach(e => {
		title = e.title
		link = e.link
		thumbnail = e.thumbnail
		author = e.author
		tags = e.categories
		date = e.pubDate.split(' ')[0]

		pushArticle(title, thumbnail, link, author, tags, date)
	})
}).catch(function(error){
	alert("Something went wrong!\nTry refreshing your browser.")
	console.error(error)
})

function pushArticle(_title, _thumbnail, _link, _author, _tags, _date){
	let template = `
		<div class="col-lg-6 mb-3">
			<div class="article row mx-auto">
				<div class="col-md-4 image" style="background-image: url('${_thumbnail}');">
				</div>
				<div class="col-md-8 mt-3 mt-md-0">
					<a href="${_link}" target="_blank" rel="noopener noreferrer" class="title">${_title}</a>
					<br>
					<strong class="text-secondary">${_author}</strong>
					<div class="categories mt-3">
						<ul>
							${tags[0]?`<li><span>#</span>`+tags[0]+'</li>':''}
							${tags[1]?`<li><span>#</span>`+tags[1]+'</li>':''}
							${tags[2]?`<li><span>#</span>`+tags[2]+'</li>':''}
							${tags[3]?`<li><span>#</span>`+tags[3]+'</li>':''}
							${tags[4]?`<li><span>#</span>`+tags[4]+'</li>':''}
						</ul>
					</div>
					<div class="date">Published : ${_date}</div>
				</div>
			</div>
		</div>
	`
	articles.innerHTML += template
}

// Fetching git repos
let repos = document.getElementById('repos')

const gitUrl = 'https://gh-pinned-repos-5l2i19um3.vercel.app/?username=nsadisha'
fetch(gitUrl).then(function(response){
    return response.json();
}).then(function(obj){
	data = obj

	data.forEach(e => {
		repo = e.repo
		url = e.link
		description = e.description
		language = e.language
		stars = e.stars
		forks = e.forks

		pushRepo(repo, url, description, language, stars, forks)
	})
}).catch(function(error){
	alert("Something went wrong!\nTry refreshing your browser.")
	console.error(error)
})

function pushRepo(_repo, _url, _description, _language, _stars, _forks){
	let template = `
		<div class="col-lg-6 mb-3">
			<div class="repository row mx-auto">
				<div class="col-12 p-0">                            
					<svg class="octicon octicon-repo mr-2 text-gray flex-shrink-0" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>    
					<a href="${_url}" target="_blank" rel="noopener noreferrer" class="repo-name text-blue">${_repo}</a>
					<br>
					<p class="description mt-2 mb-3">${_description}</p>
					<div class="d-flex details">
						<div class="col-auto p-0">${_language}</div>
						<div class="col-auto d-flex p-0 pl-3">
							<svg aria-label="stars" class="octicon octicon-star my-auto mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
							${_stars}
						</div>
						<div class="col-auto d-flex p-0 pl-3">
							<svg aria-label="fork" class="octicon octicon-repo-forked my-auto mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
							${_forks}
						</div>
					</div>
				</div>
			</div>
		</div>
	`
	repos.innerHTML += template
}