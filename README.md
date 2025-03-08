# IP Geolocator

This application allows users to input their IP address and view its location on a map.

## Features

1. Users can input their IP address.
2. The application uses the IP address to query this API: https://api.techniknews.net/ipgeo/<ip-address>, e.g., https://api.techniknews.net/ipgeo/142.250.67.4.
3. The first result is shown on the map.
4. Users can geolocate themselves.
5. Site tour to onboard the users.
6. Caching of results to improve performance and reduce API calls.

## Setup

### Prerequisites

- Node.js (version 20.13.1 or higher)
- pnpm (version 9.8.0 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/jeafreezy/ip-geolocator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ip-geolocator
   ```
3. Install the dependencies:
   ```sh
   pnpm install
   ```

### Running the Application

1. Start the development server:
   ```sh
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:5173/`.

### Formatting

To format the code using Prettier, run:

```sh
pnpm format
```

### Building for Production

To create a production build, run:

```sh
pnpm build
```

This will create an optimized build of the application in the `dist` directory.

## License

This project is licensed under the MIT License.
