// Global variables
 
// create  container class for bootstrap
let container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

// Navbar from bootstrap to display the sections
let navbar=`
    <nav class="my-nav-bar navbar navbar-expand-lg navbar-light bg-white border-bottom mb-3">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto mr-auto">
                <a class="nav-link btn active" id='home' href="#">HOME <span class="sr-only">(current)</span></a>
                <a class="nav-link btn" id="world" href="#">WORLD</a>
                <a class="nav-link btn" id="politics" href="#">POLITICS</a>
                <a class="nav-link btn" id="magazine" href="#">MAGAZINE</a>
                <a class="nav-link btn" id="technology" href="#">TECHNOLOGY</a>
                <a class="nav-link btn" id="science" href="#">SCIENCE</a>
                <a class="nav-link btn" id="health" href="#">HEALTH</a>
                <a class="nav-link btn" id="sports" href="#">SPORTS</a>
                <a class="nav-link btn" id="arts" href="#">ARTS</a>
                <a class="nav-link btn" id="fashion" href="#">FASHION</a>
                <a class="nav-link btn" id="food" href="#">FOOD</a>
                <a class="nav-link btn" id="travel" href="#">TRAVEL</a>
            </div>
        </div>
    </nav>
`
document.querySelector('.container').innerHTML+=navbar;

function createCardCollection(){
    let cardCollection = document.createElement('div');
    cardCollection.classList.add('cardCollection');
    container.append(cardCollection);
}

async function fetchData (section='home'){
    try {
        let request = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=b0h29MWy1DA51mr06Tduuf0uqj6MN2Qn`);
        let data = await request.json();
        initialize(data.results);
        // document.querySelector('.nav-link').className='active';
      } catch(err) {
        console.log(err); // TypeError: failed to fetch
      }
}

fetchData();

function initialize(data){
    let arrayHome=data;
    let nextElement=document.querySelector('.my-nav-bar');
    if (nextElement.nextElementSibling){
            nextElement.nextElementSibling.remove();
            createCardCollection();
            arrayHome.forEach(element => {
                let createdDate= new Date(element.created_date);
                let img;
                if (!!element.multimedia){
                    if (element.multimedia.length>0 && !!element.multimedia[4]){
                        img=element.multimedia[4].url;
                    } else {
                        img=' ';
                    }
                } else{
                    img='....';
                }
                html=`
                <div class="card mb-3 shadow-lg p-3 mb-5 bg-white rounded">
                <div class="row no-gutters">
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title section-card text-muted">${element.section.toUpperCase()}</h5>
                            <h5 class='card-text titlecard'>${element.title}<br><small class="text-muted byline">${element.byline}</small></h5>
                            <p class='card-text date-card text-muted'>${createdDate}</p>
                            <p class="card-text abstract-card">${element.abstract}</p>
                            <a class="continueReading" href=${element.short_url}>Continue reading</a>
                            <p class="card-text"><small class="text-muted">${element.item_type}</small></p>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex">
                        <img src=${img} class="card-img img-thumbnail" alt="...">
                    </div>
                </div>
                </div>
                `;
                document.querySelector('.cardCollection').innerHTML+=html;
            });
    } else {
            createCardCollection();
            arrayHome.forEach(element => {
            let createdDate= new Date(element.created_date);
            let img;
            if (element.hasOwnProperty('multimedia') && element.multimedia !== undefined && element.multimedia.length>0){
                img=element.multimedia[4].url;
            } else{
                img='....';
            }
            html=`
            <div class="card mb-3 shadow-lg p-3 mb-5 bg-white rounded">
            <div class="row no-gutters">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title section-card text-muted">${element.section.toUpperCase()}</h5>
                        <h5 class='card-text titlecard'>${element.title}<br><small class="text-muted byline">${element.byline}</small></h5>
                        <p class='card-text date-card text-muted'>${createdDate}</p>
                        <p class="card-text abstract-card">${element.abstract}</p>
                        <a class="continueReading" href=${element.short_url}>Continue reading</a>
                        <p class="card-text"><small class="text-muted">${element.item_type}</small></p>
                    </div>
                </div>
                <div class="col-md-4 d-flex">
                    <img src=${img} class="card-img img-thumbnail" alt="...">
                </div>
            </div>
            </div>
            `;
                document.querySelector('.cardCollection').innerHTML+=html;
            });
    }

    let navButtons=document.querySelectorAll('.nav-link');
    navButtons.forEach( item =>{
    item.addEventListener('click', function(event){
        fetchData(event.currentTarget.id);
        document.querySelector('.nav-link').classList.remove('active');
        })
    });

}


