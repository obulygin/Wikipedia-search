$(document).ready(function() {

  $('.container').css('justify-content', 'center');
  $('.searchButton').on('click', function() {
    searchResults();
  });
  $('#search').on('keypress', function(event) {
    if (event.which === 13) {
      searchResults();
    }
  });

});

var searchResults = function() {
  var search = $('#search').val();
  $.ajax({
    type: 'GET',
    url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&redirects=resolve&limit=15&search=' + search,
    async: false,
    dataType: 'jsonp',
    success: function(data) {

      if (data[1].length == 0 && search.length > 0) {
        alert('Nothing found');
        $('#search').val('');
      }

      $('.searchResults').empty();

      for (var i = 0; i < data[1].length; i++) {
        $('.searchResults').append('<a target="_blank" class="resultLink" href="' + data[3][i] + '"><div class="result thumbnail"><p>' + data[1][i] + '</p><p>' + data[2][i] + '</p></div></a>');
      }

      if ($('.result').length > 0) {
        $('.container').css('justify-content', '');
      } else {
        $('.container').css('justify-content', 'center');
      }

    }
  })
}