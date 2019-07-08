import React, { Component } from "react";

const icons = [];
const cplors = [
  "#EF9A9A",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#81C784",
  "#FFF176",
  "#FFB74D",
  "#E0E0E0",
  "#A1887F",
  "#BA68C8"
];

class App extends Component {
  componentDidMount() {
    const { cars } = this.props;
    let lastPos = cars[1].records[cars[1].records.length - 1];
    this.map = new window.google.maps.Map(document.getElementById("map"), {
      center: lastPos,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }]
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }]
        }
      ],

      zoom: 16
    });
    console.log(this.props.btnBounds.current);
    this.map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(
      this.props.btnBounds.current
    );
    this.markers = cars.map(car => {
      return new window.google.maps.Marker({
        position: car.records[car.records.length - 1],
        clickable: true,
        icon:
          "data:image/png;base64,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",
        // icon:"data:image/png;base64,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",
        map: this.map
      });
    });
    this.markers.forEach((marker, id) => {
      let infoWindow = new window.google.maps.InfoWindow();
      let contentString = `<label style="color: black; background: white">${
        cars[id].plate
      }</label>`;
      infoWindow.setContent(contentString);
      marker.addListener("click", function() {
        infoWindow.open(this.map, marker);
        console.log(infoWindow);
      });
    });
    this.polys = cars.map(car => {
      return new window.google.maps.Polyline({
        path: car.records,
        map: this.map
      });
    });
  }
  componentDidUpdate() {
    const { cars } = this.props;
    let bounds = new window.google.maps.LatLngBounds();
    cars.map((car, id) => {
      let marker = this.markers[id];
      let poly = this.polys[id];
      marker.setPosition(car.records[car.records.length - 1]);
      poly.setPath(car.records);
      if (!car.active) {
        marker.setVisible(false);
        poly.setVisible(false);
      } else {
        marker.setVisible(true);
        poly.setVisible(true);
      }
      if (marker.getVisible() && poly.getVisible()) {
        poly.getPath().forEach(el => {
          bounds.extend(el);
        });
      }
    });
    if (this.props.bounds) {
      this.map.fitBounds(bounds);
    }
  }

  render() {
    return <div style={{ width: "100%", height: "100%" }} id={"map"} />;
  }
}

export default App;
