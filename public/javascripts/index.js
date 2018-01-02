/*$('.error-page').hide(0);

$('.login-button , .no-access').click(function(){
  $('.login').slideUp(500);
  $('.error-page').slideDown(1000);
});

$('.try-again').click(function(){
  $('.error-page').hide(0);
  $('.login').slideDown(1000);
});*/

function validate(){
  var n1 = document.getElementById("user_name");
  var n2 = document.getElementById("password");
  if(n1.value!="" && n2.value!=""){
    return true;
  }else{
    alert("Debe completar todos los campos...");
    return false;
  }
}

