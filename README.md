# SortFlix
- GUI that sorts movies by ratings and user preference

- Metacritic is a movie aggregation site, which sorts movies into an overall rating based on weighted averages assigned to several movie critics. Problems within metacritic exist such as that movie ratings are only sorted by overall aggregate ratings; users cannot sort movies by an individual critic rating used to calculate overall rating. Additionally, metacritic does not allow individual users to assign their own preference weightings to movie critics. 
Our project aims to fix this by creating SortFlix, an application that allows users to sort ratings from multiple critics they can choose from, and assign weights to those critics. (For example if a user wanted to only include Rotten Tomatoes and IMDB ratings, they can assign Rotten Tomatoes a weight of .6 and IMDB a weight of .4).

- To support sorting movies based on different rating sources, we will implement and compare two sorting algorithms from scratch:
- **Merge Sort**: A stable divide-and-conquer sorting algorithm with consistent time complexity of O(n log n), regardless of input order. It is ideal when stability is needed (i.e., preserving the order of movies with equal scores).
- **Quick Sort**: A fast and efficient in-place sorting algorithm that typically performs better in practice due to lower constant factors and cache efficiency. However, it can degrade to O(n²) in the worst case, which we mitigate by using randomized pivot selection.
We will apply both sorting algorithms to the same dataset and compare their performance and correctness when sorting by different criteria.

# Features

- Filter by release year, runtime, and genre
- Sort using custom weights for IMDB and Rotten Tomatoes scores
- Choose between Quick Sort and Merge Sort
- Animated UI built with React and Tailwind CSS
- Backend powered by Node.js and SQLite

# Technologies used

- **Frontend:** React, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express.js, SQLite
- **Data:** 100k movie dataset (CSV)

# Project structure
<pre><code>SortFlix/
├── README.md # Project document
├── FrontEnd/
│   ├── src/
│   │   ├── components/                # Reusable UI and logic components
│   │   │   ├── Header.jsx             # Top navigation/header
│   │   │   ├── DropdownSort.jsx       # Dropdown to choose sort criteria
│   │   │   ├── MovieCard.jsx          # Displays individual movie information
│   │   │   ├── MovieGrid.jsx          # Grid layout for rendering movie cards
│   │   │   ├── Pagination.jsx         # Handles movie pagination
│   │   │   ├── ScoreWeightSelector.jsx# UI for selecting critic weight (e.g. IMDB, RT)
│   │   │   ├── SidebarFilters.jsx     # Sidebar filters: genre, year, runtime
│   │   │   ├── SortAlgorithmSelector.jsx # Toggle between Merge Sort and Quick Sort
│   │   │   └── sort.js                # Contains custom implementation of sorting algorithms
│   |   ├── App.jsx # Root React component
│   |   ├── App.css # App-level styling
│   |   ├── index.css # Global styles (e.g. Tailwind base)
│   |   └── main.jsx # React app entry point
│   ├── index.html # Main HTML file used by Vite
│   ├── package.json # Frontend dependencies and scripts
│   ├── vite.config.js # Vite build configuration
│   ├── tailwind.config.js # TailwindCSS configuration
│   ├── postcss.config.cjs # PostCSS configuration
│   ├── eslint.config.js # ESLint configuration (optional)
│   └── package-lock.json # Dependency lock file
├── BackEnd/ # Node.js + SQLite backend
│   ├── import.js # Script to import CSV data into SQLite
│   ├── server.js # Express server
│   └── movies.db # SQLite database
│   └── 100k.csv # CSV dataset from Kaggle
</code></pre>

# How to Run this website

# Prerequisites

- **Node.js** (v16 or newer recommended)
- **npm** (comes with Node.js)
- [Optional] SQLite CLI for inspecting `movies.db`

1. Clone the repository

```bash
git clone https://github.com/your-username/SortFlix.git
cd SortFlix
```

2. Set up the Backend
```bash
cd BackEnd
npm install
```
(Optional) If you don't have movies.db yet, generate it:
```bash
node import.js
```
Start the backend server:
```bash
node server.js
```
And the server will run at: http://localhost:3000 and API endpoint: GET http://localhost:3000/api/movies
3. Set up the Frontend
``` bash
cd ../FrontEnd
npm install
npm run dev
```
And frontend will run at: http://localhost:5173. Make sure to run both of them at the same time. 

**And that's it, enjoy your movie**
