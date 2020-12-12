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
		tags = e.categories
		date = e.pubDate.split(' ')[0]

		pushArticle(title, thumbnail, link, tags, date)
	})
}).catch(function(error){
	alert("Something went wrong!\nTry refreshing your browser.")
	console.error(error)
})

function pushArticle(_title, _thumbnail, _link, _tags, _date){
	let template = `
		<div class="col-lg-6 mb-3">
			<div class="article row mx-auto">
				<div class="col-md-4 image" style="background-image: url('${_thumbnail}');">
				</div>
				<div class="col-md-8 mt-3 mt-md-0">
					<a href="${_link}" target="_blank" rel="noopener noreferrer" class="title">${_title}</a>
					<div class="categories mt-3 mt-md-2">
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