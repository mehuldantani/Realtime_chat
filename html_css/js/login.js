const signUpbtn = document.getElementById('signup');
const signInbtn = document.getElementById('signin');
const container = document.getElementById('container');
const forgot = document.getElementById('forgot-pw');
const back = document.getElementById('back');
const user_sign_up = document.getElementById('user_sign_up');
const user_sign_in = document.getElementById('user_sign_in');

signUpbtn.addEventListener('click',()=>{
	container.classList.add('right-panel-active')
});

signInbtn.addEventListener('click',()=>{
	container.classList.remove('right-panel-active')
});

forgot.addEventListener('click',()=>{
	container.classList.add('forgot-panel-active')
});

back.addEventListener('click',()=>{
	container.classList.remove('forgot-panel-active')
});

