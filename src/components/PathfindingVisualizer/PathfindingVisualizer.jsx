import React, { useState, useEffect } from 'react';
import Node from '../Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra';
import { astar } from '../../algorithms/astar';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [stats, setStats] = useState({ pathLength: 0, visitedNodes: 0 });

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row, col) => {
    if (isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (isVisualizing || !mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const clearBoard = () => {
    if (isVisualizing) return;
    setStats({ pathLength: 0, visitedNodes: 0 });
    for (const row of grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
        if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
      }
    }
    const newGrid = getInitialGrid();
    setGrid(newGrid);
  };

  const clearPath = () => {
    if (isVisualizing) return;
    setStats({ pathLength: 0, visitedNodes: 0 });
    for (const row of grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
        if (nodeClassName === 'node node-visited' || nodeClassName === 'node node-shortest-path') {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
      }
    }
    const newGrid = grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        node.isVisited = false;
        node.distance = Infinity;
        node.previousNode = null;
      }
    }
    setGrid(newGrid);
  };

  const visualizeAlgorithm = (algorithm) => {
    if (isVisualizing) return;
    setIsVisualizing(true);
    clearPath();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;

    switch (algorithm) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case 'astar':
        visitedNodesInOrder = astar(grid, startNode, finishNode);
        break;
      default:
        setIsVisualizing(false);
        return;
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    setStats({
      pathLength: nodesInShortestPathOrder.length > 0 ? nodesInShortestPathOrder.length : 'Unreachable',
      visitedNodes: visitedNodesInOrder.length,
    });
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(visitedNodesInOrder, nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
    const totalDuration = 10 * visitedNodesInOrder.length + 50 * nodesInShortestPathOrder.length;
    setTimeout(() => setIsVisualizing(false), totalDuration);
  };

  return (
    <>
      <div className="controls">
        <button onClick={() => visualizeAlgorithm('dijkstra')} disabled={isVisualizing}>
          Visualize Dijkstra
        </button>
        <button onClick={() => visualizeAlgorithm('astar')} disabled={isVisualizing}>
          Visualize A* Search
        </button>
        <button onClick={clearBoard} disabled={isVisualizing}>
          Clear Board
        </button>
        <button onClick={clearPath} disabled={isVisualizing}>
          Clear Path
        </button>
      </div>
      
      {stats.visitedNodes > 0 && (
        <div className="stats">
          <p><strong>Path Length:</strong> {stats.pathLength}</p>
          <p><strong>Visited Nodes:</strong> {stats.visitedNodes}</p>
        </div>
      )}


      

      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((node, nodeIndex) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIndex}
                  col={col}
                  row={row}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col, row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity, isVisited: false, isWall: false, previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};
export default PathfindingVisualizer;