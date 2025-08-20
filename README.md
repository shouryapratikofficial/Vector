# Pathfinding Algorithm Visualizer

An interactive web application built with React and Vite that visualizes classic pathfinding algorithms like Dijkstra's and A* Search on a dynamic grid.

**Live Demo:** https://vector-gamma.vercel.app/

![Pathfinding Visualizer Demo](https://github.com/user-attachments/assets/0853939f-a61d-43c9-9e41-970e6e4d9cb5)


---

## 📜 Description

This project provides a hands-on way to understand how different graph traversal algorithms work. Users can interact with a grid to create obstacles ("walls") and then visualize how an algorithm explores the grid to find the shortest path between a start and finish node. It's a powerful educational tool for seeing the efficiency and logic of these fundamental computer science algorithms in action.

---

## ✨ Features

-   **Interactive Grid:** Click and drag to draw walls and create custom mazes.
-   **Real-time Visualization:** Watch the algorithms explore nodes and draw the shortest path with smooth animations.
-   **Multiple Algorithms:** Implements both Dijkstra's algorithm and the A* Search algorithm.
-   **Performance Comparison:** A statistics panel displays the number of nodes visited and the final path length, clearly showing the efficiency difference between algorithms.
-   **Responsive UI:** A clean and simple interface with controls to run visualizations and clear the board.

---

## 🧠 Algorithms Implemented

-   **Dijkstra's Algorithm:** A classic algorithm that guarantees the shortest path by exploring in all directions equally. It's great for understanding the fundamentals of graph traversal.
-   **A\* Search:** A "smarter" and more efficient algorithm that uses a heuristic (an educated guess) to prioritize its search in the direction of the goal node.

---

## 🛠️ Technologies Used

-   **Frontend:** React.js, Vite
-   **Languages:** JavaScript, HTML, CSS
-   **Deployment:** Vercel / Netlify

---

## 🚀 Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/pathfinding-visualizer.git](https://github.com/your-username/pathfinding-visualizer.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd pathfinding-visualizer
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).
