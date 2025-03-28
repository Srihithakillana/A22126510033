//import packages
import express from "express";
import axios from "axios";
//create server
const app = express();
//port num
const PORT = 9876;
//window size
const WINDOW_SIZE = 10;
//accesstoken from auth
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTU0Mzg2LCJpYXQiOjE3NDMxNTQwODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJkMmFhZmRlLWZmNTctNGEyNy1hMjA3LWVmMzg4ZTY3YTQyMSIsInN1YiI6ImtpbGxhbmFzcmloaXRoYS4yMi5jc2VAYW5pdHMuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQW5pdHMiLCJjbGllbnRJRCI6IjJkMmFhZmRlLWZmNTctNGEyNy1hMjA3LWVmMzg4ZTY3YTQyMSIsImNsaWVudFNlY3JldCI6ImdOdWdqVFZDSURoR3lqQ3YiLCJvd25lck5hbWUiOiJTcmloaXRoYSBLaWxsYW5hIiwib3duZXJFbWFpbCI6ImtpbGxhbmFzcmloaXRoYS4yMi5jc2VAYW5pdHMuZWR1LmluIiwicm9sbE5vIjoiQTIyMTI2NTEwMDMzIn0.ttJjuNZbLcvXILGD9grCUEnwhgAPBXqhrZotRszS2a4"; 
//test server apis
const API_URLS = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibo",
    "e": "http://20.244.56.144/test/even",
    "r": "http://20.244.56.144/test/rand"
};
//declare the array
let numberWindow = []; 
//fetch the numbers from the test server API
const fetchNumbers = async (id) => {
    try {
        const response = await axios.get(API_URLS[id], {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
            //timeout provided not to exceed
            timeout: 500
        });
        //return the numbers fetched
        return response.data.numbers || [];  
    } catch (error) {
        console.log(`Error fetching numbers: ${error.message}`);
        return [];  
    }
};
//get method for the retreival
app.get("/numbers/:numberid", async (req, res) => {
    const { numberid } = req.params;
    if (!API_URLS[numberid]) {
        return res.status(400).json({ error: "Invalid number ID" });
    }
    const newNumbers = await fetchNumbers(numberid);
      const windowPrevState = [...numberWindow];
    newNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            if (numberWindow.length >= WINDOW_SIZE) {
                numberWindow.shift();  // remove the oldest number
            }
            numberWindow.push(num);
        }
    });

    const avg = numberWindow.length > 0
        ? (numberWindow.reduce((sum, num) => sum + num, 0) / numberWindow.length).toFixed(2)
        : 0;
//return in the provided format
    res.json({
        windowPrevState,
        windowCurrState: numberWindow,
        numbers: newNumbers,
        //calculate the average
        avg: parseFloat(avg)
    });
});
//server listens to port 9876
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
