let preloading = false;


const showPreloader = () => {

    let preloader = document.getElementById("preloader");
    preloader.style.display = "block";
}

const hidePreloader = () => {

    let preloader = document.getElementById("preloader");
    preloader.style.display = "none";
}

const getData = () => {


    if (!preloading) {
        preloading = true;

        fetch("https://akademia108.pl/api/ajax/get-users.php")
            .then(res => res.json())
            .then(data => {

                let body = document.body;
                let hr = document.createElement("hr");
                body.appendChild(hr);

                for (let user of data) {

                    let pId = document.createElement("p");
                    let pName = document.createElement("p");
                    let pWebsite = document.createElement("p");

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`;
                    pWebsite.innerHTML = `User ID: ${user.url} <br>--------------`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);

                }
                preloading = false;
                hidePreloader();
            })
            .catch(error => {
                console.error(error);
            })
    }
}

const scrollToEndOfPage = () => {

    let d = document.documentElement;
    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    if (sumScrollTopClientHeight >= scrollHeight) {
        showPreloader();
        getData();

    }

}

window.addEventListener("scroll", scrollToEndOfPage);
