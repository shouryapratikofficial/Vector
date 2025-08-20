
export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);

    startNode.distance = 0; // g-cost
    startNode.h_cost = calculateHeuristic(startNode, finishNode); // h-cost
    startNode.f_cost = startNode.distance + startNode.h_cost;   // f-cost

    while (!!unvisitedNodes.length) {
        sortNodesByFCost(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

function sortNodesByFCost(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.f_cost - nodeB.f_cost);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.h_cost = calculateHeuristic(neighbor, finishNode);
        neighbor.f_cost = neighbor.distance + neighbor.h_cost;
        neighbor.previousNode = node;
    }
}

function calculateHeuristic(node, finishNode) {
    // Manhattan distance
    return Math.abs(node.col - finishNode.col) + Math.abs(node.row - finishNode.row);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.h_cost = Infinity;
            node.f_cost = Infinity;
            node.isVisited = false;
            node.previousNode = null;
            nodes.push(node);
        }
    }
    return nodes;
}