

function visitPage(pageno) {
	let pageVisits = localStorage.getItem('pv');
	pageVisits = pageVisits ? JSON.parse(pageVisits) : {};

	pageVisits[pageno] = (pageVisits[pageno] || 0) + 1;

	localStorage.setItem('pv', JSON.stringify(pageVisits));
}
	
function displayVisitCounts() {
	let pageVisits = localStorage.getItem('pv');
	pageVisits = pageVisits ? JSON.parse(pageVisits) : {};

	let vc = '';
	for (let i in pageVisits) {
		vc += 'You visited ' + i + ' ' + pageVisits[i] + ' time(s)<br>';
	}

	let ce = document.getElementById('content');
	ce.innerHTML += '<p>' + vc + '</p>';

	localStorage.removeItem('pv');
}
