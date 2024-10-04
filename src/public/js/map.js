(function() { 
  window.onload = function() {
    // console.log(Store)
    Store = []
    if(Store.length > 0) {
      kinhdo = Store.kdStore;
      vido = Store.vdStore;
      console.log(kinhdo,vido)
    }
    else{
      kinhdo = 9.915305180107284;
      vido = 105.14689066544706;
    }
    // Create MapOptions object with required properties
    var options = {
      zoom: 15,
      center: new google.maps.LatLng(kinhdo, vido),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the map  
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Get modal element and close button
    var modal = document.getElementById("locationModal");
    var span = document.getElementsByClassName("close")[0];

    // Add click event listener to map to show modal and add markers
    google.maps.event.addListener(map, 'click', function(event) {
      var lat = event.latLng.lat(); // Get latitude
      var lng = event.latLng.lng(); // Get longitude

      // Show the modal
      modal.style.display = "block";

      // Populate modal fields with latitude and longitude
      document.getElementById('latitude').value = lat;
      document.getElementById('longitude').value = lng;

      // Pan to the clicked location
      map.panTo(event.latLng);

      // Add marker at clicked location
      addMarker(event.latLng);
    });

    // Function to add a marker at the clicked location
    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
    }

    // Close modal on close button click
    span.onclick = function() {
      modal.style.display = "none";
    };

    // Close modal when clicking outside the modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    document.getElementById('searchButton').onclick = function() {
      if(Array.isArray(arrStore) && arrStore.length > 0) {
        var searchTerm = document.getElementById('search').value.toLowerCase();
        console.log("Searching for:", searchTerm); // In ra giá trị tìm kiếm
        
        // Tìm cửa hàng
        var foundStore = arrStore.find(store => store.tenCH.toLowerCase().includes(searchTerm));
        console.log("Found Store:", foundStore); // In ra cửa hàng tìm thấy
    
        if (foundStore) {
            var location = new google.maps.LatLng(foundStore.vido, foundStore.kinhdo);
            map.panTo(location);
            addMarker(location);
        } else {
            alert('Cửa hàng không tìm thấy');
        }
      }
      
    };

    // Save location data to database
    document.getElementById('saveLocation').onclick = function() {
      modal.style.display = "none";
    };

    console.log(arrStore)

    // Add markers to the map
    for (let i = 0; i < arrStore.length; i++) {
      
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(arrStore[i].kinhdo, arrStore[i].vido), 
        map: map,
        title: arrStore[i].tenCH
      });
      
      (function(i, marker) {
      
        google.maps.event.addListener(marker, 'click', function() {

          var infowindow = new google.maps.InfoWindow({
            content: '<div style="float: left;"><img style="width: 100px; height: 100px;" src="../../images/' + arrStore[i].hinhAnhCH + '"></div>'
              + '<div style="float: right; margin-left: 10px; line-height: 20px">'
              + '<div>' + 'Tên: ' + arrStore[i].tenCH + '</div>' 
              + '<div>' + 'Địa Chỉ: ' + arrStore[i].diaChiCH + '</div>' 
              + '<div>' + 'Kinh độ: ' + arrStore[i].kinhdo + '</div>'
              + '<div>' + 'Vi độ: ' + arrStore[i].vido + '</div>'
              + '<div>' + 'Mô tả: ' + arrStore[i].moTaCH + '</div>' 
              + '</div>' 
              + '<div> <a href="/map/' + arrStore[i].maCH + '">Thống kê</a> </div>'
          });

          infowindow.open(map, marker);

        });

      })(i, marker);
      
    }

  };
  
})();
