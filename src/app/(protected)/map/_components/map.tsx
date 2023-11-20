"use client";

import { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Loader } from "@googlemaps/js-api-loader";
import { SingleValue } from "react-select";
import { Option } from "react-google-places-autocomplete/build/types";

export default function Map() {
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [from, setFrom] = useState<SingleValue<Option> | null>(null);
  const [to, setTo] = useState<SingleValue<Option> | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
      version: "weekly",
      libraries: ["places", "maps", "routes"],
    });

    loader
      .importLibrary("routes")
      .then((routes) => {
        directionsServiceRef.current = new routes.DirectionsService();
        directionsRendererRef.current = new routes.DirectionsRenderer();
        setIsMapsLoaded(true);
      })
      .catch((e) => {
        // do something
      });
  }, []);

  useEffect(() => {
    //load map when script is loaded
    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 4,
    };
    google.maps.importLibrary("maps").then((maps) => {
      const { Map } = maps as google.maps.MapsLibrary;
      mapRef.current = new Map(document.getElementById("map")!, mapOptions);
      directionsRendererRef.current!.setMap(mapRef.current);
    });
  }, [isMapsLoaded]);

  useEffect(() => {
    if (
      !isMapsLoaded ||
      !from ||
      !to ||
      !mapRef.current ||
      !directionsServiceRef.current ||
      !directionsRendererRef.current
    )
      return;

    const request = {
      origin: { placeId: from.value.place_id },
      destination: { placeId: to.value.place_id },
      travelMode: google.maps.TravelMode.TRANSIT,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRendererRef.current!.setDirections(result);
      }
    });
  }, [isMapsLoaded, from, to]);

  return (
    <div className="h-screen pt-20 pb-20">
      {isMapsLoaded ? (
        <div className="w-full h-full max-w-4xl mx-auto flex flex-col gap-4 px-4">
          <div className="flex justify-between flex-wrap">
            <div className="w-56">
              <label htmlFor="from-select">From</label>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: from,
                  onChange: (value) => {
                    setFrom(value);
                  },
                  inputId: "from-select",
                }}
              />
            </div>
            <div className="w-56">
              <label htmlFor="to-select">To</label>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: to,
                  onChange: (value) => {
                    setTo(value);
                  },
                  inputId: "to-select",
                }}
              />
            </div>
          </div>
          <div id="map" className="flex-1"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
