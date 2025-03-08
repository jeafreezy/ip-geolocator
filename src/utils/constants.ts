// Maximum zoom level allowed
export const MAX_ZOOM = 23;

// Minimum zoom level allowed
export const MIN_ZOOM = 2;

// Default map center
export const MAP_CENTER = [0, 0];

// Default zoom level for detectd IP address
export const IP_ZOOM = 12;

// The Ip API URL
export const IP_API_URL = "https://api.techniknews.net/ipgeo/";

// The app limit
export const USAGE_LIMIT = 50;

// The local storage key
export const LOCAL_STORAGE_KEY = "ipInfoArray";

// The steps for the guided tour of the application
export const TOUR_STEPS = [
  {
    selector: "#search-input",
    content: "Type in an IP address to get information about it.",
  },

  {
    selector: "#geolocator",
    content: "Click to geolocate your current IP address.",
  },

  {
    selector: "#zoom-in",
    content: "Click to zoom in to the map.",
  },
  {
    selector: "#zoom-out",
    content: "Click to zoom out of the map.",
  },
  {
    selector: "#usage-tracker",
    content:
      "This shows the number of IP addresses you have searched for. You can clear the storage when you reach the limit.",
  },
  {
    selector: "#help-tour-button",
    content: "Visit here to restart the tour.",
  },
];
