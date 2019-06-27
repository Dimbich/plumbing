$(document).ready(function() {

  new WOW().init();

  const validateSettings = {
    validClass: "success",
    rules: {
      username: {
        required: true,
        rangelength: [2, 15]
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      }
    },
    messages: {
      username: {
        required:'Заполните имя',
        rangelength: 'Введите от 2 до 15 символов'
      },
      email: {
          required: "Заполните e-mail",
          email: "Введите корректный email"
      },
      phone: {
        required: "Заполните телефон"
      }
    }    
  }

  let fromModal = false;

  $('.slider').on('init', function(event, slick){
    var $items = slick.$dots.find('li');
    $items.addClass('slider__dot');
    $items.find('button').remove();
 });

 $('.slider').on('init', function(event, slick){      
  var $items = slick.$dots.find('li');
  $items.addClass('slider__dot');
  $items.find('button').remove();
  });

  $('.slider').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    appendDots: $('.slider__blockdots'),  
    dotsClass: 'slider__dots',
    speed: 300,
    autoplay: true           
    });


    $('.review-slider').on('init', function(event, slick){
      var $items = slick.$dots.find('li');
      $items.addClass('review__dot');
      $items.find('button').remove();
   });

    $('.review-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false,
      dots: true,
      appendDots: $('.review__blockdots'),  
      dotsClass: 'review__dots',
      speed: 300,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]         
    });


  
    
    let key = false;

    $('.service__button').mouseover(function() {
      togglePrice(key, this);
    })

    $('.service__button').mouseout(function() {
      togglePrice(key, this);      
    })

    function togglePrice(l_key ,elem) {
      if (!l_key) {
        $(elem).addClass("service__button_active");
        $(elem).width($(elem).width());
        elem.innerText = 'от 500 руб.';       
      } else {
        $(elem).removeClass("service__button_active");
        elem.innerText = 'Узнать цену';        
      }
      key = !l_key;
    }


  
    
    function init(){ 
        // Создание карты.    
        var myMap = new ymaps.Map("map", {
            center:[55.433128, 37.550271],
            zoom: 17,
            controls: []
        });

        myMap.behaviors.disable('scrollZoom')
        
        myPlacemarkWithContent = new ymaps.Placemark([55.433225, 37.553891], {
          hintContent: '',
          balloonContent: '',
          iconContent: ''
      },{
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: './img/geo.png',
        // Размеры метки.
        iconImageSize: [81, 75],
        iconImageOffset: [-40, -40],
      });
      myMap.geoObjects.add(myPlacemarkWithContent);
    }


  //$("form").each(function(){
    $('#map-form').validate(validateSettings);
 // });

  $(".phone").mask('+7 (999) 999-99-99');


  let modal = document.querySelector(".modal");
  let btn = document.querySelector(".navbar__button");
  let closeButton = document.querySelector(".close-button");
  let modalText = document.querySelector(".modal__text");

  modal.addEventListener('click', function(event){
    if (event.target.classList.contains('close-button')||event.target == this){
      toggleModal();
    }
  })

  function toggleModal(type, message, fromModal) {   
    if (fromModal) {
      cleanForm(document.querySelector(".modal__content"));
      if (type == 'info') {
        generateContentModal(type,'Заявка принята!', message);
        document.querySelector(".modal__title").classList.add('title__success');
      } else {
        generateContentModal(type, 'Заявка не принята!',message);
        document.querySelector(".modal__title").classList.add('title__error');
      }
    } else {
      if (modal.classList.contains("show-modal")) {        
        document.body.style.overflow = 'visible'; 
        cleanForm(document.querySelector(".modal__content"));          
      } else {
        document.body.style.overflow = 'hidden';
        if (type=='info') {          
          generateContentModal(type,'Заявка принята!', message);
          document.querySelector(".modal__title").classList.add('title__success');
        } else if (type == 'error') {
          generateContentModal(type, 'Заявка не принята!',message);
          
        } else {
          generateContentModal('form', 'Введите, пожалуйста, имя и номер телефона'); 
          $(".phone").mask('+7 (999) 999-99-99');       
          $('#modal-form').validate(validateSettings); 
          sendData(document.getElementById('modal-form'), true);     
        }        
      }
      modal.classList.toggle("show-modal");
    }  
  }



  function generateContentModal(type ,title, message){ 

    if (type == 'error' || type =='info') {
      document.querySelector('.modal__content').insertAdjacentHTML('beforeEnd','<h4 class="modal__title">'+title+'</h4><p class="modal__text">'+message+'</p>');
    }   else {
      document
        .querySelector('.modal__content')
        .insertAdjacentHTML('beforeEnd', 
        `<h4 class="modal__title">${title}</h4>
          <form action="#" id="modal-form">
            <input type="text" class="input map__input" placeholder="Введите Ваше имя" name="username">
            <input type="text" class="input map__input phone phone_modal" placeholder="Введите Ваш номер телефона" name="phone">
            <button class="button map__button" type="submit">заказать  звонок</button>
      </form>`
      );
    }     
  }

  function cleanForm(form){
    form.innerHTML = '<span class="close-button">×</span>'
  }

  btn.addEventListener("click", toggleModal);
  
  function sendData(modalForm, fromModal) {
    $(modalForm).on('submit', function(event){
      let inputs = this.getElementsByTagName("input");
      let sendForm = true;
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains('error')) {
          sendForm = false
          break; 
        }
      }
      event.preventDefault();
      if (sendForm) {
        let formid = this.id;
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: $(this).serialize()})
        .done(function(data){
          toggleModal('info', data, fromModal);
          
          if (formid == 'map-form') {
            ym(54205633, 'reachGoal', 'request');
          } else if ( formid == 'modal-form') {
            ym(54205633, 'reachGoal', 'call');
          }
               
        })
        .fail(function(){
          toggleModal('error', 'При отправке данных произошла ошибка.<br>Отправьте, пожалуйста, заявку повторно', fromModal);
        });
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
        }
      }
    });
  }

  let btnMores = document.querySelectorAll('.slider__button');

  for (let i = 0 ; i < btnMores.length; i++) {
    btnMores[i].addEventListener('click',toggleModal)
  }

  sendData(document.getElementById('map-form'));

  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  $(".navbar__hamburger").click(function() {
    $(".menu__horizontal").toggle();
    $(".fas").toggleClass("fa-bars fa-times");
  });

  const mapStart = $('.news').offset().top;
  let isScroll;

  function connectMap() {
    const elem = document.createElement('script');     
    elem.src = 'https://api-maps.yandex.ru/2.1/?apikey=8d121638-8811-4c53-97b1-77c7110f1cb1&lang=ru_RU';
    document.getElementsByTagName('body')[0].appendChild(elem)
    setTimeout(function(){
      ymaps.ready(init);
    }, 1000);
  }


  $(window).scroll(function() {
    if ($(document).scrollTop() >= mapStart && !isScroll) {
      isScroll = true;
      connectMap();
    }
  });
})
