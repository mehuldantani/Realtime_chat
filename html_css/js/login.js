const signUpbtn = document.getElementById('signup');
const signInbtn = document.getElementById('signin');
const container = document.getElementById('container');
const forgot = document.getElementById('forgot-pw');
const back = document.getElementById('back');
const user_sign_up = document.getElementById('user_sign_up');
const user_sign_in = document.getElementById('user_sign_in');

const email = document.getElementById('login_id');
const password = document.getElementById('login_pw');

//adding eventlister for signup button for CSS animation
signUpbtn.addEventListener('click',()=>{
	container.classList.add('right-panel-active')
});

//adding eventlister for signin button for CSS animation
signInbtn.addEventListener('click',()=>{
	container.classList.remove('right-panel-active')
});

//adding eventlister for forgot button for CSS animation
forgot.addEventListener('click',()=>{
	container.classList.add('forgot-panel-active')
});

//adding eventlister for back button for CSS animation
back.addEventListener('click',()=>{
	container.classList.remove('forgot-panel-active')
});

user_sign_in.addEventListener('click', ()=>{

fetch("http://localhost:5500/user/login", {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: {
    "email": email,
    "password": password
}
})
  .then(response => {
	console.log(response);
	console.log('api done');
  })
  .catch(err => {
    console.log(err)
  })
});