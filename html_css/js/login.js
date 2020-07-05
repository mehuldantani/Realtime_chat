const signUpbtn = document.getElementById('signup');
const signInbtn = document.getElementById('signin');
const container = document.getElementById('container');
const forgot = document.getElementById('forgot-pw');
const back = document.getElementById('back');
const user_sign_up = document.getElementById('user_sign_up');
const user_sign_in = document.getElementById('user_sign_in');

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

