const api =`https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
//const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const sortBtn = document.getElementById("sort");
const appState = []


addUser.addEventListener('click', async () => {
  const userData = await fetch(api, {
    method: "GET", 
  });
  const userJson = await userData.json()
  const user = userJson.results[0]
  appState.push(user)
  console.log(appState)
  domRenderer(appState)
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null
  stateArr.forEach(userObj => {
    const userEl = document.createElement('div')
    userEl.innerHTML = `<div>
    Name: ${userObj.name.title} ${userObj.name.first} ${userObj.name.last}
    <ol>
      <li>${userObj.gender}</li>
      <li>${userObj.email}</li>
    </ol>
    </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup",(e) => {
  console.log(e,searchInput.value);
  const filterAppState = appState.filter(user =>
    user.name.first.toLowerCase()
    .includes(searchInput.value.toLowerCase()) ||
    user.name.last.toLowerCase()
    .includes(searchInput.value.toLowerCase()) ||
    user.gender.toLowerCase()
    .includes(searchInput.value.toLowerCase()) ||
    user.email.toLowerCase()
    .includes(searchInput.value.toLowerCase()) 
  );
  domRenderer(filterAppState)
});

sortBtn.addEventListener('click',() => {
  const appStateCopy = [...appState]
  appStateCopy.sort((a,b) => a.name.first - b.name.first)
  
  domRenderer(appStateCopy)
});


