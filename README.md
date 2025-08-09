The Site is Live on https://stock-frontend-th01.onrender.com/  (Check it Out)

📈 Stock Dashboard — Project Summary
This is a full-stack web app that visualizes stock data and predicts next-day prices using a clean, responsive interface. My goal was to build something that feels fast, intuitive, and visually sharp—without relying on heavy frameworks or overcomplicated design.

🛠️ Development Approach
I started by setting up a FastAPI backend that exposes three REST endpoints:

/companies returns a list of stock tickers and names

/stock/{ticker} fetches historical price data

/predict/{ticker} returns a next-day price prediction using a simple AI model

For data, I used yfinance to pull real-time stock info. It’s lightweight, reliable, and perfect for quick prototyping.

On the frontend, I built a single-page app using HTML, CSS, and vanilla JavaScript. The UI is minimal and responsive:

A scrollable list of company buttons is dynamically generated

When a company is selected, a Chart.js line graph displays its recent closing prices

Below the chart, the predicted price for the next day is shown

🚀 Deployment & Extras
The app is deployed on Render, with separate services for backend and frontend. It’s fast, mobile-friendly, and ready for future upgrades like technical indicators, volume metrics, or Dockerization.

This project reflects my focus on clean architecture, responsive design, and blending technical depth with visual clarity.
