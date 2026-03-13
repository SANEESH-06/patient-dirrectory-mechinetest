# Next.js Frontend Assignment

A comprehensive single-page web application built with Next.js (App Router), TypeScript, and TailwindCSS to view and manage patient records.

## Features Added

* **Local API Implementation:** Created an internal Route Handler (`app/api/data/route.ts`) to serve records from `data.json` with support for server-side search, filtering, sorting, and pagination.
* **Dual View Architecture:** Implemented both required views:
   * **Card-based View:** A grid of beautiful, responsive cards displaying patient summaries, avatars, and contact information.
   * **Row-based Table View:** A clean data table layout for dense information viewing.
* **Advanced Data Handling:**
   * Dynamic Search with debouncing for optimal performance.
   * Multi-select Filtering (by Medical Issue).
   * Sorting capabilities (Ascending/Descending by ID, Name, or Age).
   * Robust Pagination matching the backend API logic.
* **Modern UI/UX:** 
   * Fully responsive across desktop, tablet, and mobile browsers.
   * Smooth animations and transitions using Tailwind CSS.
   * Graceful fallback UI states (empty results, loading spinners, error states).
   * Auto-generated avatars (via `ui-avatars.com`) for missing profile pictures.
* **Clean Code Structure:** 
   * Separation of concerns: API logic, presentation components, state management wrapper.
   * Strict TypeScript typing (e.g., `Patient` interface).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Decisions

- **Component Structure:** `DataViewer` acts as the smart container managing state and fetching data from the API. It passes data to dumb presentation components (`CardView`, `RowView`, `Pagination`, `FilterBar`).
- **Data Fetching:** Handled via a robust `useEffect` and `fetch` pattern with proper loading and error states, ensuring a snappy client-side feel backed by a lightweight server route.
- **Styling:** Vanilla TailwindCSS for rapid, consistent styling without heavy UI library dependencies. Used Lucide-React for clean SVG iconography.
