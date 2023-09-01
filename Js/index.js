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

  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const carouselChildrens = [...carousel.children];
  
  let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
  
  // Carousel'e bir kerede sığabilecek kart sayısını alın
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
  // Son birkaç kartın kopyalarını, sonsuz kaydırma için atlıkarın başlangıcına ekleyin
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
  
  // Sonsuz kaydırma için atlıkarın sonuna kadar ilk birkaç kartın kopyalarını ekleyin
  carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });
  
  // Firefox'ta ilk birkaç yinelenen kartı gizlemek için atlıkarıncayı uygun konumda kaydırın
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");
  
  // atlıkarın sol ve sağını kaydırmak için ok düğmeleri için etkinlik dinleyicileri ekleyin
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
      });
  });
  
  const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      // atlıkarın ilk imlecini ve kaydırma konumunu kaydeder
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  }
  
  const dragging = (e) => {
      if(!isDragging) return; // Isdragging buradan yanlış geri dönüş ise
      // İmleç hareketine göre atlıkarıncanın kaydırma konumunu günceller
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }
  
  const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
  }
  
  const infiniteScroll = () => {
      //Eğer atlıkarın başlangıçta ise, sonuna kadar kaydırın
      if(carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
      }
      // Carousel sonunda ise, başlangıçta kaydırın
      else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
      }
  
      // Mevcut zaman aşımını temizleyin ve fare atlıkarın üzerinde durmuyorsa otomatik oynamaya başlayın
      clearTimeout(timeoutId);
      if(!wrapper.matches(":hover")) autoPlay();
  }
  
  const autoPlay = () => {
      if(window.innerWidth < 800 || !isAutoPlay) return; // Pencere 800'den küçükse veya Isautoplay yanlışsa dön
      // Her 2500 ms'den sonra atlıkarıncayı otomatik oynatın
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  }
  autoPlay();
  
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);