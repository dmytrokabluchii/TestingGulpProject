// core version Swiper + navigation, pagination modules:
$(function(){
    // Fix Header Scroll
  $(window).on('scroll', function(){
    if($(window).scrollTop()>0){
      if(!$("header").hasClass("fixed_header")) {
          $("header").addClass("fixed_header");
      }
    }else{
      if($("header").hasClass("fixed_header")){
          $("header").removeClass("fixed_header");
      }
    }
  });

  // Smooth Scroll
  $(".header__logo_symbol, .nav__menu_link").on('click', function (e) {
    e.preventDefault();
    const top = $($(this).attr("href")).offset().top - 60;
    $('body,html').animate({
        scrollTop: top + 'px'
    }, 1100);
  });

  // Hamburger-menu
  $(".hamburger, .page_overlay").on('click', function () {
    $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  });
  // close burger
  $(".sidemenu ul li a, .mobile__logo_symbol").on('click', function () {
      $("body").removeClass("open");
  });

   // init Swiper:
   const swiper = new Swiper('.swiper', {
    grabCursor: true,
    autoHeight: true,
    rewind: true,
    spaceBetween: 20,
    // откл. свайп при нажатии на кнопку в слайдере
    watchSlidesProgress: true,
    setWrapperSize: true,
    breakpoints: {
      // when window width is >= 768px
      390: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      490: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
    },  
      // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      // nextEl: '.custom-next',
      // prevEl: '.custom-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    // autoplay: {
    //   delay: 5000,
    // },
  });

  // Modal window
  $('.team__button_read, .btn__read').click(function () {
    $('.modal__window').fadeIn();
    $('.modal__window').addClass('disabled');
  });
  // закрыть на крестик
  $('.modal__close_btn').click(function () {
      $('.modal__window').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
  });
  // закрыть по клику вне окна
  $(document).mouseup(function (e) {
      let popup = $('.modal__content');
      if (e.target != popup[0] && popup.has(e.target).length === 0) {
          $('.modal__window').fadeOut(600);
      }
  });
  // закрыть по ESC
  $(document).on('keydown', function (event) {
      if (event.keyCode == 27) {
          $('.modal__window').fadeOut(600);
      }
  });

  // phone mask
  $(function () {
    $('#form_phone').mask('+38 (099) 999-99-9?9');
  });
  // e-mail mask
  $('#form_email[type=email]').on('blur', function (e) {
      e.preventDefault();
      let email = $(this).val();
      if (email.length > 0 && (email.match(/.+?\@.+/g) || []).length !== 1) {
          Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Fill right email address!',
              showConfirmButton: false,
              timer: 3000
          });
      }
  });

  // Upload file CV 
  let inputs = document.querySelectorAll('.input__file');
  Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
    labelVal = label.querySelector('.input__file-button-text').innerText;

    input.addEventListener('change', function (e) {
      let countFiles = '';
      if (this.files && this.files.length >= 1)
        countFiles = this.files.length;

      if (countFiles)
        label.querySelector('.input__file-button-text').innerText = 'Chose files: ' + countFiles;
      else
        label.querySelector('.input__file-button-text').innerText = labelVal;
    });
  });

  // send form to my Telegram BOT
  const BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8';
  const CHAT_ID = '-1001758890997';
       // Отправка формы на Telegram BOT
       $(".contact__form").on('submit', function (e) {
        e.preventDefault();
        let nameInput = document.getElementById('form_name');
        let emailInput = document.getElementById('form_email');
        let phoneInput = document.getElementById('form_phone');
        let typeJobs = document.getElementById('form_type_jobs');
        let messageInput = document.getElementById('form_message');
        // let inputFile = document.getElementById('input__file');
        // File: ${inputFile.value}  && inputFile.value !== ''
        let text = encodeURI(`Name: ${nameInput.value}, Email: ${emailInput.value}, 
        Phone: ${phoneInput.value}, Jobs: ${typeJobs.value}, 
        Message: ${messageInput.value}`);
  
        if (nameInput.value !== '' && emailInput.value !== '' && 
        phoneInput.value !== '' && typeJobs.value !== '' && 
        messageInput.value !== '') {
            $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + text + 
             '&parse_mode=html', (json) => {
                if (json.ok) {
                    $("#my_form").trigger('reset');
                    Swal.fire({
                         position: 'top-end',
                         icon: 'success',
                         title: 'Your message send!',
                         showConfirmButton: false,
                         timer: 3000,
                    });
                }
            });
        } else {
             Swal.fire({
                 position: 'top-end',
                 icon: 'warning',
                 title: 'Fill all field marked *!',
                 showConfirmButton: false,
                 timer: 3000
            });
        }
    });

});

// Tabs
function openCity(evt, partnersName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("partners__tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(partnersName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();