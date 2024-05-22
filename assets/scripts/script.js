const repoContainer = document.querySelector(".repo-container");
const userContainer = document.querySelector(".user-container");
const searchBar = document.querySelector(".searchbar");


searchBar.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        let inputName = searchBar.value;
        fetchData(inputName);
        searchBar.value = '';
    }
});



const fetchUserData = async (inputName) => {
    const res = await fetch(`https://api.github.com/users/${inputName}`);
    return res.json();
};
const fetchReposData = async (inputName) => {
    const res = await fetch(`https://api.github.com/users/${inputName}/repos`);
    return res.json();
};


const fetchData = async (inputName) => {
    try {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
        const [userData, reposData] = await Promise.all([fetchUserData(inputName), fetchReposData(inputName)]);

        console.log(userData);
        console.log(reposData);
        spinner.style.display = 'none';

        let userHtml = `
            <div class="user-details">
                <div class="avatar">
                    <img src=${userData.avatar_url} alt="avatar">
                </div>
                <div class="user">
                    <p class="user-name">${userData.name}</p>
                    <p class="login">${userData.login}</p>
                    <p class="user-bio">${userData.bio}</p>
                </div>
            </div>
        `;

        userContainer.innerHTML = userHtml;

        let repoHtml = "";

        reposData.forEach((repo) => {
            repoHtml += `
                <div class="box">
                    <p class="name">${repo.name}</p>
                    <p class="description">${repo.description}</p>
                    <p class="language">${repo.language}</p>
                </div>
            `;
        });

        repoContainer.innerHTML = repoHtml;
    } catch (err) {
        console.log(err);
    }
};