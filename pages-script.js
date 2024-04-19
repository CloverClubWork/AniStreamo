$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const path = "../data/collections.json";

  async function getDataById(path, id) {
    try {
      const response = await fetch(path);
      const data = await response.json();
      const results = findSpecificItem(data, id);

      if (results) {
        
        
        // Docs
        $('title').text('Watch '+results.title_jp);
        
        const description = synopsis(results.synopsis);
        $('meta[name="title"]').attr('content', results.title_jp);
        $('meta[property="og:title"]').attr('content', results.title_jp);
        $('meta[name="description"]').attr('content', description);
        $('meta[property="og:description"]').attr('content', description);
        $('meta[name="url"]').attr('content', window.location.href);
        $('meta[property="og:url"]').attr('content', window.location.href);
        $('meta[name="image"]').attr('content', results.backdrops);
        $('meta[property="og:image"]').attr('content', results.backdrops);
        
        $(".main-container").css(
          "background-image",
          'url("' + results.image + '")'
        );
        $("#page-cover").attr("src", results.image);
        $("#page-title-jp").text(results.title_jp);
        $("#page-title-en").text(results.title_en);
        $("#page-status").text(results.status);
        $("#page-format").text(results.format);
        $("#page-score").text(results.scores + "%");
        $("#page-synopsis").html(results.synopsis);
        if (results.synopsis.length < 100) {
          $(".info-container").addClass("disable-page-synopsis");
          $(".info-container").css("height", "auto");
        }
        const genres = results.genres;
        genres.forEach(items => {
          const item = `
                      <span>${items}</span>
                    `;
          $("#genre-list").append(item);
        });

        const episodes = results.episodes;
        episodes.forEach(items => {
          const item = `
                    <li data-index='${items.number}'>
                       <span class='num'>${items.number}:</span>
                       <span class='title'>${items.title}</span>
                    </li>
                  `;
          $('#episode-list').append(item);
        });

        splitEpisode();
        
        // Comments
        var disqus_config = function() {
          this.page.url = window.location.href; // Replace PAGE_URL with your page's canonical URL variable
          this.page.identifier = id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };

      } else {
        console.log("No data found");
      }

      $(".loading-container").hide(500);
      $(".main-container").show();
    } catch (error) {
      console.log(error);
    }
  }
  //Find specified id base on parameter data
  function findSpecificItem(data, id) {
    return data.find(item => item.id === id);
  }

  $(".info-container").click(function() {
    $(this).css("height", "auto");
    $(this).addClass("disable-page-synopsis");
  });

  getDataById(path, id);

  function splitEpisode() {
    const itemsPerPage = 5;
    let currentPage = 1;

    function showPage(page) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      $('#episode-list li').hide()
        .slice(startIndex, endIndex)
        .show();

      const totalPages = Math.ceil($('#episode-list li').length / itemsPerPage);

      $('#prevBtn').prop('disabled', page <= 1);
      $('#nextBtn').prop('disabled', page >= totalPages);

      if (page <= 1) {
        $('#prevBtn').hide();
      } else {
        $('#prevBtn').show();
      }
      if (page >= totalPages) {
        $('#nextBtn').hide();
      } else {
        $('#nextBtn').show();
      }


    }

    showPage(currentPage);

    $('#prevBtn').click(function() {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });

    $('#nextBtn').click(function() {
      const totalPages = Math.ceil($('#episode-list li').length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });

    $('#searchEpisode').on('input', function() {
      const query = $(this).val().toLowerCase();

      $('#episode-list li').each(function() {
        const title = $(this).find('.num').text().toLowerCase();

        if (title.includes(query)) {
          $(this).show();
        } else {
          $(this).hide();
        }

      });

      // Reset pagination after search
      currentPage = 1;
      showPage(currentPage);
    });
  }
  
  function synopsis(synopsis){
    return synopsis.replace(/["']/g, '\\$&');
  }

});