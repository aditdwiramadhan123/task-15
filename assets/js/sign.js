function flip() {
    var loginContainer = document.getElementById('login');
    var registerContainer = document.getElementById('register');
  
    // Toggle kelas CSS untuk memutar kartu antara tampilan login dan sign up
    loginContainer.classList.toggle('flipped');
    registerContainer.classList.toggle('flipped');
  }
  