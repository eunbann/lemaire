$(document).ready(function(){
    // cursor 갖고오기
    $(function() {

        var prefix = function() {

          var a = window.getComputedStyle(document.documentElement, ""),

            b = (Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/) || "" === a.OLink && ["", "o"])[1];

          return "WebKit|Moz|MS|O".match(new RegExp("(" + b + ")", "i"))[1], "-" + b + "-"

        }();

        $(document).mousemove(function(e) {

          mouseX = e.pageX + 15;

          mouseY = e.pageY - $(window).scrollTop() + 15;

          $('.theBall-outer').attr('style', prefix + 'transform:translate(' + mouseX + 'px,' + mouseY + 'px)');

        });
    })
    
    // 커서 바꾸기
    $('.bl').hover(function(){
        $('.theBall-outer').addClass('zoom');
    },function(){
        $('.theBall-outer').removeClass('zoom');
    });

    $('.bl2').hover(function(){
        $('.theBall-outer').addClass('zoom2');
    },function(){
        $('.theBall-outer').removeClass('zoom2');
    });

    $('.bl3').hover(function(){
        $('.theBall-outer').addClass('zoom3');
    },function(){
        $('.theBall-outer').removeClass('zoom3');
    });

    $('#hamburger').click(function(){
        $(this).toggleClass('active');
        $(this).children().toggleClass('active');
        $('.header-logo svg').toggleClass('active');
        $('.header-area .main-menu').toggleClass('active');
    });
    

    // 과제 : 풀페이지 진행(.sec-4, .sec-5, .footer 제외) 스크롤바 활성화
    media();
    function media(){
        let windowWidth = $(window).width();
        if(windowWidth >= 1000){
            // fullpage
            new fullpage('#wrap',{
            scrollBar : true,
            anchors : ['anchor1','anchor2','anchor3','anchor4'],
            normalScrollElements : '.sec-4, .sec-5, .footer',
            fitToSection : false,
            scrollinSpeed: 500,
            })
        }else{

        }
    }
    
    // sub-menu
    // 마우스 올리면 카테고리에 맞는 탭 활성화 / 헤더 색상 변경 / 서브메뉴 박스에서 마우스 나가면 기존 상태로 다시 변경
    $('.main-menu li').mouseenter(function(){
        let result = $(this).attr('data-alt');
        $('.sub-menu').removeClass('active');
        $(`#${result}`).addClass('active');

        // 서브메뉴박스 보이게
        $('.sub-menu-box').addClass('active');

        // 헤더 색상 변경
        $('.header-area').addClass('active');
        $('.header-logo svg').addClass('active');
    });

    $('.sub-menu-box').mouseleave(function(){
        $(this).removeClass('active');

        // 헤더 색상 원래대로 돌리기
        $('.header-area').removeClass('active');
        $('.header-logo svg').removeClass('active');
    });

    // 스크롤 위치 값에 맞춰 클래서 제어
    $(window).scroll(function(){
        const sct = $(window).scrollTop();
        console.log(sct);

        // 섹션별 상단 위치값 변수에 저장
        const banner = $('.banner').offset().top;
        const sec1 = $('.sec-1').offset().top;
        const sec2 = $('.sec-2').offset().top;
        const sec5 = $('.sec-5').offset().top;

        if(sct >= banner && sct < sec1){
            $('.header-area').removeClass('active');
            $('.header-logo svg').removeClass('active');
            $('.header-logo').removeClass('active');
        }else if(sct >= sec1 && sct < sec2){
            $('.header-area').addClass('active');
            $('.header-logo svg').addClass('active');
            $('.header-logo').addClass('active');
        }else if(sct >= sec2 && sct < sec5){
            $('.header-area').removeClass('active');
            $('.header-logo svg').removeClass('active');
        }else if(sct >= sec5){
            $('.header-area').addClass('active');
            $('.header-logo svg').addClass('active');
        }
    });

    // sec-4 swiper
    new Swiper('.mySwiper',{
        direction:"vertical",
        slidePerView:"auto",
        speed: 500,
        loop:true,
        autoplay:{
            delay:1500,
            disableOnInteraction:false,
        },
    })

    // 상단 이동 버튼 300px 이상일때 최상단으로 올라가는 상단 이동 버튼 구현(배너에선 X, sec1 O)
    let btn = $('.top-btn');
    $(window).scroll(function(){
        if($(window).scrollTop() >= 300){
            btn.fadeIn();
        }else{
            btn.fadeOut();
        }
    });
    btn.click(function(){
        $('html,body').animate({
            scrollTop : 0
        },500);
    });
});

