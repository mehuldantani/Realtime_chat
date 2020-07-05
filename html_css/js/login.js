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

//adding eventlistener when user clicks login
user_sign_in.addEventListener('click', ()=>{

//get email id and password
const email_id = document.getElementById('login_id').value;
const pword = document.getElementById('login_pw').value;
 
//call API and check credentials.
fetch('http://localhost:5500/user/login', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    email: email_id,
    password: pword
  })
})
  .then(response => response.json())
  .then(data => {
    //if API response is successful then redirect to chat page
    if(data.message === "Auth Successful")
    window.location.href ="http://localhost:5500/chat.html"
  }
    )
  .catch(err => {
    console.log(err)
  })
});


//adding eventlistener when user clicks signup
user_sign_up.addEventListener('click', ()=>{

  //get email id and password
  const email_id = document.getElementById('signup_email_id').value;
  const pword = document.getElementById('signup_pword').value;
  const name = document.getElementById('signup_name').value;
   
  //call API and check credentials.
  fetch('http://localhost:5500/user/signup', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email_id,
      password: pword,
      name: name
    })
  })
    .then(response => response.json())
    .then(data => {
      //if API response is successful then redirect to chat page
      if(data.message === "User created")
      window.location.href ="http://localhost:5500/chat.html"
    }
      )
    .catch(err => {
      console.log(err)
    })
  });