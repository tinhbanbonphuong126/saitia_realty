$(function () {
    function loadMapGoogleAPI() {
        google.maps.event.addDomListener(window, 'load', function () {
            function createMap($map) {
                var markerObj;
                var mapObj;
                var lng = $map.lng;
                var lat = $map.lat;
                var latlng = new google.maps.LatLng(lat, lng);

                var mapOptions = {
                    zoom: 16,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scaleControl: true
                };
                mapObj = new google.maps.Map(document.getElementById($map.getId), mapOptions);

                markerObj = new google.maps.Marker({
                    position: latlng,
                    map: mapObj
                });

                // マーカークリックイベントを追加
                google.maps.event.addListener(markerObj, 'click', function () {
                    // info Windowを作成
                    var infoWindow = new google.maps.InfoWindow();
                    infoWindow.setContent($map.setContent);
                    infoWindow.open(mapObj, markerObj);
                })
            }

            var $map = {
                lng: 133.77955,
                lat: 34.231096,
                getId: 'googleMap',
                setContent: "本　社    〒765-0011　香川県善通寺市上吉田町8-5-19　TEL0877-63-1933  FAX 0877-63-1944"
            };

            createMap($map);

        });
    }

    loadMapGoogleAPI();
});