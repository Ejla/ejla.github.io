var nanobar = new Nanobar({
  bg: "rgba(0, 0, 0, .5)"
});
nanobar.go(100);

$(document).ready(function () {

  $('.nav-toggle').addClass('a2');

  // $('.hero-bg').last().hide();
  // function rotateHeroBackground() {
  //     $(".hero-bg").first().appendTo('#hero').fadeOut(5000);
  //     $(".hero-bg").first().fadeIn(5000);
  //     setTimeout(rotateHeroBackground, 7000);
  // }
  // rotateHeroBackground();

  $('#carousel').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '50px',
    responsive: [
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '100px',
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 700,
        settings: {
          centerPadding: '50px',
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 500,
        settings: {
          centerPadding: '15px',
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  });

  if (top.location.pathname === '/work/') {
    handleLoadProject();
  }

  enableCarouselSwipe();

  // http://cookiecuttr.com/
  $.cookieCuttr({
    cookieNotificationLocationBottom: true,
    cookieWhatAreLinkText: ''
  });

});

function enableCarouselSwipe() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('#carousel .slick-prev').addClass('slick-nav-mobile');
    $('#carousel .slick-next').addClass('slick-nav-mobile');
  }
}

function handleLoadProject() {
  var project, hash = window.location.hash;
  if (hash !== "") {
    project = hash.replace(/#/, "");
    loadProject(project);
    findInSlider(project);
  } else {
    var projectFirst = $('.slick-current .project').attr('data-project');
    loadProject(projectFirst);
  }
}
function findInSlider(project) {
  var projects = {};
  $('.slick-slide').not('.slick-cloned').each(function () {
    var key = $(this).find('.project').attr('data-project');
    var value = $(this).attr('data-slick-index');
    projects[key] = value;
  });
  $('#carousel').slick('slickGoTo', projects[project]);
}
function loadProject(project) {
  $.get('../projects/' + project + '.html', function (data, textStatus, jqXHR) {
    $('#project').hide().html(data).fadeIn('slow');
  }).fail(function () {
    var msg = "Sorry but there was an error in connection to server";
    alert(msg);
  });
}
$('#carousel').on('afterChange', function (event, slick, currentSlide) {
  var projectID = $("[data-slick-index='" + currentSlide + "']").find('.project').attr('data-project');
  findInSlider(project);
  loadProject(projectID);
  window.location.hash = projectID;
});

$('#carousel').on('init', function (slick) {
  $(this).find('.project').css('opacity', '1');
});
