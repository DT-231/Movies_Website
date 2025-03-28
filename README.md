# Movie App PinkPlix

This is a React-based movie streaming application that allows users to browse, search, and watch movies. The app is built with modern technologies like Vite, React Router, TailwindCSS, and integrates with a third-party API for fetching movie data.

## Features

- Browse movies by genre, country, and category.
- Search for movies using a search bar with debounce functionality.
- View detailed information about movies, including trailers and episodes.
- Watch movies with a custom video player that supports HLS streaming.
- Responsive design for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, React Router, TailwindCSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Video Streaming**: HLS.js, React Player
- **Icons**: FontAwesome
- **Build Tool**: Vite

## API Integration

This application uses the **kkphim** API to fetch movie data. Below are the key endpoints used:

### Endpoints

1. **Get Genres**
   - **URL**: `https://phimapi.com/the-loai`
   - **Description**: Fetches a list of movie genres.

2. **Get Countries**
   - **URL**: `https://phimapi.com/quoc-gia`
   - **Description**: Fetches a list of countries for movies.

3. **Search Movies**
   - **URL**: `https://phimapi.com/v1/api/tim-kiem?keyword={value}&limit=10`
   - **Description**: Searches for movies based on a keyword.

4. **Get Movie Details**
   - **URL**: `https://phimapi.com/phim/{slug}`
   - **Description**: Fetches detailed information about a specific movie.

5. **Get Movies by Genre**
   - **URL**: `https://phimapi.com/v1/api/the-loai/{genre}?page={page}&limit={limit}`
   - **Description**: Fetches movies of a specific genre.

6. **Get Movies by Country**
   - **URL**: `https://phimapi.com/v1/api/quoc-gia/{country}?page={page}&limit={limit}`
   - **Description**: Fetches movies from a specific country.

7. **Get New Movies**
   - **URL**: `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v2?page={page}&limit={limit}`
   - **Description**: Fetches newly updated movies.

8. **Get Anime**
   - **URL**: `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page={page}&limit={limit}`
   - **Description**: Fetches a list of anime movies.

9. **Get Movies by Type**
   - **URL**: `https://phimapi.com/v1/api/danh-sach/{type}?page={page}&limit={limit}`
   - **Description**: Fetches movies by type (e.g., `phim-le`, `phim-bo`).

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/movie-app.git
   cd movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

## Folder Structure

- **src**: Contains the source code for the application.
  - **Components**: Reusable UI components.
  - **Pages**: Page-level components for routing.
  - **Service**: API service functions.
  - **Utils**: Utility functions.
  - **Layouts**: Layout components like Header and Footer.
  - **Common**: Shared components like buttons and dropdowns.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.
