const api =`https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
//const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const descsortBtn = document.getElementById("sort-desc");
const ascsortBtn = document.getElementById("sort-asc");
const appState = []
//creating our own class
class User{
  constructor(title,firstname,lastname,gender,email){
    this.name = `${title} ${firstname} ${lastname}`
    this.gender = gender
    this.email = email
  }
}

//calling api feature
addUser.addEventListener('click', async () => {
  const userData = await fetch(api, {
    method: "GET", 
  });
  const userJson = await userData.json()
  const user = userJson.results[0]
  const classUser = new User(
    user.name.title, 
    user.name.first, 
    user.name.last, 
    user.gender,
    user.email
  );
  appState.push(classUser)
  domRenderer(appState)
});
//Rendering dom
const domRenderer = (stateArr) => {
  userList.innerHTML = null
  stateArr.forEach(userObj => {
    const userEl = document.createElement('div')
    userEl.innerHTML = `<div>
    Name: ${userObj.name}
    <ol>
      <li>${userObj.gender}</li>
      <li>${userObj.email}</li>
    </ol>
    </div>`;
    userList.appendChild(userEl);
  });
};
//searching feature
searchInput.addEventListener("keyup",(e) => {
  const filterAppState = appState.filter(user =>
    user.name.toLowerCase()
    .includes(searchInput.value.toLowerCase()) ||
    user.gender.toLowerCase()
    .includes(searchInput.value.toLowerCase()) ||
    user.email.toLowerCase()
    .includes(searchInput.value.toLowerCase()) 
  );
  domRenderer(filterAppState)
});

//sorting feature
descsortBtn.addEventListener('click',() => {
  const appStateCopy = [...appState]
  appStateCopy.sort((a,b) => a.name < b.name ? 1: -1)
  
  domRenderer(appStateCopy)
});

ascsortBtn.addEventListener('click',() => {
  const appStateCopy = [...appState]
  appStateCopy.sort((a,b) => a.name < b.name ? -1: 1)
  
  domRenderer(appStateCopy)
});
