$(document).ready(function() {
  // const button = $('.navbar__button');
  // const modal = $('.modal');
  // const close = $('.modal-dialog__close');
  // button.on('click', function() {
  //   modal.addClass('modal_active');
  // })

  // close.on('click', function() {
  //   modal.removeClass('modal_active');
  // })

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
    speed: 300           
    });

    $('.slider').on('init', function(event, slick){
      var $items = slick.$dots.find('li');
      $items.addClass('slider__dot');
      $items.find('button').remove();
   });
  
    $('.reviews-block').slick({
      slidesToShow: 2,
      arrows: false,
      dots: true,
      appendDots: $('.review__blockdots'),  
      dotsClass: 'slider__dots',
      speed: 300           
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
        elem.innerText = '500 руб.';       
      } else {
        $(elem).removeClass("service__button_active");
        elem.innerText = 'Узнать цену';        
      }
      key = !l_key;
    }

    ymaps.ready(init);
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
        iconImageHref: '../img/geo.png',
        // Размеры метки.
        iconImageSize: [81, 75],
        iconImageOffset: [-40, -40],
      });
      myMap.geoObjects.add(myPlacemarkWithContent);
    }
  // $("#brif-form,  #offer_form").each(function(){
  //   $(this).validate({
  //     rules: {
  //       username: {
  //         required: true,
  //         rangelength: [2, 15]
  //       },
  //       email: {
  //         required: true,
  //         email: true
  //       },
  //       phone: {
  //         required: true,
  //       }
  //     },
  //     messages: {
  //       username: {
  //         required:'Заполните имя',
  //         rangelength: 'Введите от 2 до 15 символов'
  //       },
  //       email: {
  //           required: "Заполните e-mail",
  //           email: "Введите корректный email"
  //       },
  //       phone: {
  //         required: "Заполните телефон",
  //       }
  //     }    
  //   });
  // });
  // $(".phone").mask('+7 (999) 999-99-99');

  // const mapStart = $('.brif').offset().top;
  // let isScroll;

  // $(window).scroll(function() {
  //   if ($(document).scrollTop() >= mapStart && !isScroll) {
  //     $('.map').append(
  //       '<script async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Afd9db69f1e5fb9c0514efe96c555feaa60743b05a1b308e566760a4d6302967a&amp;width=100%25&amp;height=640&amp;lang=ru_RU&amp;scroll=false"></script>');
  //     isScroll = true;
  //   }
  // });
})
