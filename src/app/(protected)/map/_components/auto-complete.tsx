"use client";

import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function GoogleAutoComplete() {
  return (
    <div className="w-72">
      <GooglePlacesAutocomplete apiKey="AIzaSyAyvwjrS2Q6IJeq_QEB-oBgNF5wFFNef3w" />
    </div>
  );
}
