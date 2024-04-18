$(document).ready(function() {
  const apiUrl = "../data/collections.json";

  // Fetch hero data
  async function fetchHeroData(api) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      swapIndicator(data);
      displayData(data);
      $('.loading-container').hide(300);
      $('.main-container').show();
    } catch (error) {
      console.log(error);
    }
  }
  
  async function fetchTop(api) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      getMostRated(data);
      getMostPopular(data);
    } catch (error) {
      console.log(error);
    }
  }

  function swapIndicator(data) {
    let resultsData = data;
    let indicatorNum = 0;
    const heroTitle = $("#hero-title");
    const heroSynopsis = $("#hero-synopsis");
    const heroContainer = $(".hero-container");
    const heroBtn = $('#hero-btn');
    
    heroContainer.css(
      "background-image",
      "url('" + resultsData[indicatorNum].backdrops + "')"
    );
    heroTitle.text(resultsData[indicatorNum].title_jp);
    heroSynopsis.html(resultsData[indicatorNum].synopsis);
    heroBtn.attr('data-src', 'page.html?id='+resultsData[indicatorNum].id);
    
    function swapCount() {
      const $selectedIndicator = $(".indicator-selected");
      const $nextIndicator = $selectedIndicator.next(
        ".hero-indicator span"
      );

      if ($nextIndicator.length) {
        $selectedIndicator.removeClass("indicator-selected");
        $nextIndicator.addClass("indicator-selected");
        indicatorNum++;
      } else {
        // If no next indicator, select the first one
        $selectedIndicator.removeClass("indicator-selected");
        $(".hero-indicator span:first-child").addClass(
          "indicator-selected"
        );
        indicatorNum = 0;
      }

      heroContainer.css(
        "background-image",
        "url('" + resultsData[indicatorNum].backdrops + "')"
      );
      heroTitle.text(resultsData[indicatorNum].title_jp);
      heroSynopsis.html(resultsData[indicatorNum].synopsis);
      heroBtn.attr('data-src', 'page.html?id='+resultsData[indicatorNum].id);
    }
    setInterval(swapCount, 5000);
    
    /*$('#hero-btn').click(function() {
      window.location.href = $(this).data('src');
    });*/

  }
  
  function displayData(data){
    const results = data;
    results.forEach(items => {
      const item = `
        <li data-src='page.html?id=${items.id}' style="background-image:url(${items.image})">
          <div class='item-content'>
            <span>${items.rating}</span>
          </div>
        </li>
      `;
      $('#item-display').append(item);
    });
  }
  
  function getMostRated(data){
    data.sort((a, b) => b.scores - a.scores);
    data.forEach(items => {
      const item = `
            <li data-src='page.html?id=${items.id}' style="background-image:url(${items.image})">
              <div class='item-content'>
                <span>${items.rating}</span>
              </div>
            </li>
          `;
      $('#item-display-top').append(item);
    });
  }
  
  function getMostPopular(data) {
    data.sort((a, b) => b.popularity - a.popularity);
    data.forEach(items => {
      const item = `
              <li data-src='page.html?id=${items.id}' style="background-image:url(${items.image})">
                <div class='item-content'>
                  <span>${items.rating}</span>
                </div>
              </li>
            `;
      $('#item-display-popular').append(item);
    });
  }
  
  fetchHeroData(apiUrl);
  fetchTop(apiUrl);
  
  //Actions
  $('.menu-btn').click(function(){
    $('.modal-menu-container').css('display','flex')
  });
  $('#close-modal').click(function() {
    $('.modal-menu-container').css('display', 'none')
  });
  
  $('#item-display').on('click','li', function(){
    window.location.href = $(this).data('src');
  });
  $('#item-display-top').on('click', 'li', function() {
    window.location.href = $(this).data('src');
  });
  $('#item-display-popular').on('click', 'li', function() {
    window.location.href = $(this).data('src');
  });
  
});