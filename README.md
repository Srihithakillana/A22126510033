Overview:
This project is a simple Express.js server that fetches numbers from multiple external APIs and calculates a moving average while maintaining a sliding window of the most recent numbers.

Features:

  1. Fetches numbers from predefined APIs (primes, Fibonacci, even, and random).
  
  2. Maintains a sliding window of the last 10 unique numbers.
  
  3. Computes and returns the average of the numbers in the window.
  
  4. Handles errors, timeouts, and duplicate values.
  
Tech Stack

  Node.js
  
  Express.js
  
  Axios

API Endpoints
  
  GET /numbers/:numberid
  Retrieves numbers from an external API and updates the moving average.

Path Parameter:

  numberid: Specifies the API to fetch numbers from. Allowed values are "p", "f", "e", and "r".

Response Format Example:
{ "windowPrevState": [10, 15, 20],
"windowCurrState": [10, 15, 20, 30],
"numbers": [30],
"avg": 18.75
}

Setup & Installation

1.Clone the repository:
  git clone [https://github.com/](https://github.com/Srihithakillana/A22126510033.git)

2.Install dependencies:
  npm install

3.Run the server:
  node index.js
  The server will start on http://localhost:9876

4.Environment Variables
  Modify ACCESS_TOKEN in index.js if authentication is required for API access.
