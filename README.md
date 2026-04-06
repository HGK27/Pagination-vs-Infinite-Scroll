# 📄 React Pagination & Infinite Scroll

A demo project showcasing two different data-fetching and rendering strategies — **classic pagination** and **infinite scroll** — built with React 19, TypeScript, TanStack Query, and virtualization.

---

## 🚀 Tech Stack

| Package                       | Version | Purpose                                       |
| ----------------------------- | ------- | --------------------------------------------- |
| `react`                       | ^19.2.4 | UI library                                    |
| `typescript`                  | -       | Type safety                                   |
| `@tanstack/react-query`       | ^5.96.2 | Server state, caching, loading/error handling |
| `axios`                       | ^1.14.0 | HTTP client                                   |
| `react-router-dom`            | -       | Client-side routing                           |
| `react-window`                | ^1.x    | List virtualization                           |
| `react-intersection-observer` | ^10.0.3 | Infinite scroll trigger                       |
| `sass`                        | ^1.99.0 | Styling (SCSS modules)                        |
| `@faker-js/faker`             | ^10.4.0 | Fake data generation                          |
| `json-server`                 | ^0.17.4 | Mock REST API                                 |

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Generate fake data

```bash
node generate.js
```

This creates a `db.json` file with 50,000 users and posts using Faker.js.

### 3. Start the mock API

```bash
npx json-server --watch db.json --port 3001
```

Available endpoints:

```
GET /posts?_page=1&_limit=10
GET /users
```

> `X-Total-Count` header is returned automatically by json-server and is used for pagination calculations.

### 4. Start the dev server

```bash
npm run dev
```

---

## 📄 Pages

### `/` — Pagination

- Fetches a fixed number of posts per page
- Previous page data is kept visible during transitions via `keepPreviousData`
- Page state is managed locally with `useState`
- Total page count derived with `useMemo`

### `/infinite` — Infinite Scroll

- Loads more posts as the user scrolls down
- Scroll position is detected using `react-intersection-observer`
- All loaded posts are virtualized with `react-window` — only visible rows are rendered in the DOM
- Prevents memory issues with large datasets

---

## 🗒️ Notes

- Use `react-window@1` for stable TypeScript support.

---

## 📜 License

MIT
