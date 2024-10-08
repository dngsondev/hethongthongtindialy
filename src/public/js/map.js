(function() { 
  window.onload = function() {
    // Kinh độ và vĩ độ mặc định
    var kinhdo = 9.915305180107284; 
    var vido = 105.14689066544706; 

    // Tạo MapOptions
    var options = {
      zoom: 15,
      center: new google.maps.LatLng(kinhdo, vido),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Tạo bản đồ
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Lấy modal và nút đóng
    var modal = document.getElementById("locationModal");
    var span = document.getElementsByClassName("close")[0];

    // Hàm thêm marker vào bản đồ
    function addMarker(location, storeInfo, open) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: storeInfo ? storeInfo.tenCH : 'Marker'
      });
    
      // Tạo InfoWindow một lần để tái sử dụng
      var infowindow = new google.maps.InfoWindow();
    
      // Hàm để hiển thị InfoWindow với nội dung từ storeInfo
      function showInfoWindow() {
        var contentString = `
          <div>
            <div style="float: left;">
              <img style="width: 100px; height: 100px;" src="../../images/${storeInfo.hinhAnhCH}" alt="${storeInfo.tenCH}">
            </div>
            <div style="float: right; margin-left: 10px; line-height: 20px">
              <div>Tên: ${storeInfo.tenCH}</div>
              <div>Địa Chỉ: ${storeInfo.diaChiCH}</div>
              <div>Kinh độ: ${storeInfo.kinhdo}</div>
              <div>Vĩ độ: ${storeInfo.vido}</div>
              <div>Mô tả: ${storeInfo.moTaCH}</div>
            </div>
          </div>
          <div class="row" style="display: flex; justify-content: center; gap: 45px; padding-top: 10px;">
            <a href="/statistical">Thống kê</a>
            <button style="padding: 10px 12px; background-color: blue; color: white; border: none; border-radius: 2px; cursor: pointer;">
              <a href="" style="text-decoration: none; color: white;">Chỉnh sửa</a>
            </button>
            <button style="padding: 10px 12px; background-color: red; color: white; border: none; border-radius: 2px; cursor: pointer;">
              <a href="" style="text-decoration: none; color: white;">Xoá</a>
            </button>
          </div>
        `;

        // Đặt nội dung và mở InfoWindow
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      }
    
      // Nếu open === true, mở InfoWindow ngay lập tức
      if (open) {
        showInfoWindow();
      }
    
      // Thêm sự kiện 'click' để mở InfoWindow khi người dùng nhấp vào marker
      google.maps.event.addListener(marker, 'click', showInfoWindow);
    }

    // document.getElementById('thongke').onclick = function() {
    //   location.replace('./statistical');
    // };
    // document.addEventListener("DOMContentLoaded", function() {
    //   document.getElementById('#thongke').addEventListener("click", function() {
    //     location.replace('./statistical');
    //   })
    // })

    // Thêm sự kiện click vào bản đồ
    google.maps.event.addListener(map, 'click', function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      // Hiển thị modal và điền thông tin
      modal.style.display = "block";
      document.getElementById('latitude').value = lat;
      document.getElementById('longitude').value = lng;

      // Di chuyển bản đồ tới vị trí click và thêm marker
      map.panTo(event.latLng);
      addMarker(event.latLng, null, false); // Thêm marker tại vị trí mới
    });

    // Đóng modal khi nhấn nút đóng
    span.onclick = function() {
      modal.style.display = "none";
    };

    // Đóng modal khi click ra ngoài
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    // Tìm kiếm cửa hàng
    // Lắng nghe sự kiện click vào nút tìm kiếm
    document.getElementById('searchButton').onclick = function() {
      searchStore();
    };

    // Lắng nghe sự kiện nhấn phím trong ô input tìm kiếm
    document.getElementById('search').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        searchStore();
      }
    });

    // Hàm tìm kiếm cửa hàng
    function searchStore() {
      if (Array.isArray(arrStore) && arrStore.length > 0) {
        var searchTerm = document.getElementById('search').value.toLowerCase();
        // console.log(searchTerm);

        // Tìm kiếm dựa trên maCH hoặc tenCH
        var CH = arrStore.find(store => 
          store.maCH.toLowerCase() === searchTerm || 
          store.tenCH.toLowerCase() === searchTerm
        );

        if (CH) {
          console.log("Tọa độ tìm thấy:", CH.kinhdo, CH.vido);
          updateMapLocation(CH.kinhdo, CH.vido, CH);
        } else {
          alert('Cửa hàng không tìm thấy');
        }
      }
    }


    // Cập nhật vị trí bản đồ
    function updateMapLocation(lat, lng, storeInfo) {
      var newLocation = new google.maps.LatLng(lat, lng);
      map.panTo(newLocation);
      addMarker(newLocation, storeInfo, true); // Thêm marker với thông tin cửa hàng và mở InfoWindow
    }

    // Thêm các marker ban đầu cho các cửa hàng
    for (let i = 0; i < arrStore.length; i++) {
      addMarker(new google.maps.LatLng(arrStore[i].kinhdo, arrStore[i].vido), arrStore[i], false);
    }

    // Lưu dữ liệu vị trí (thực hiện logic lưu trong thực tế)
    document.getElementById('saveLocation').onclick = function() {
      modal.style.display = "none";
    };

    console.log(arrStore); // Xem danh sách các cửa hàng


  };
})();
