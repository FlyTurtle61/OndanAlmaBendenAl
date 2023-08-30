// Yukarı çık butonu
let mybutton = document.getElementById("myBtn");

// Kaydırma çubuğu sayfanın üst çubuğundan 400 piksel kadar kaydıktan sonra yukarı çık butonu görünmesi için fonksiyon 
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Kullanıcı butona bastığı sayfanın başına çıkması için fonksiyon
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }