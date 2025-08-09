document.addEventListener("DOMContentLoaded", () => {
  const companyList = document.getElementById("company-list");
  const chartSection = document.getElementById("chart-section");
  const chartCanvas = document.getElementById("stock-chart").getContext("2d");
  const statusMessage = document.getElementById("status-message");
  const predictionResult = document.getElementById("prediction-result");

  const BASE_URL = "https://stock-backend-bi6l.onrender.com";
  let stockChart = null;

  async function fetchCompanies() {
    try {
      const response = await fetch(`${BASE_URL}/companies`);
      if (!response.ok) throw new Error("Failed to load company list.");
      const companies = await response.json();

      companyList.innerHTML = "";
      companies.forEach(company => {
        const wrapper = document.createElement("div");
        wrapper.className = "company-wrapper";

        const button = document.createElement("button");
        button.textContent = company.name;
        button.className = "company-button";
        button.onclick = () => handleCompanyClick(company.ticker, company.name);

        wrapper.appendChild(button);
        companyList.appendChild(wrapper);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCompanyClick(ticker, name) {
    chartSection.classList.remove("hidden");
    statusMessage.textContent = `Loading data for ${name}...`;
    predictionResult.textContent = "";

    try {
      const stockRes = await fetch(`${BASE_URL}/stock/${ticker}`);
      if (!stockRes.ok) throw new Error("Failed to fetch stock data");
      const stockData = await stockRes.json();

      const predictRes = await fetch(`${BASE_URL}/predict/${ticker}`);
      if (!predictRes.ok) throw new Error("Prediction failed");
      const predictData = await predictRes.json();

      renderChart(stockData.dates, stockData.prices, name);
      predictionResult.textContent = `Predicted closing price for tomorrow: $${predictData.predicted_price}`;
      statusMessage.textContent = `Showing data for ${name}`;
    } catch (error) {
      console.error(error);
      statusMessage.textContent = `Error: ${error.message}`;
      if (stockChart) stockChart.destroy();
    }
  }

  function renderChart(labels, prices, companyName) {
    if (stockChart) stockChart.destroy();

    stockChart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: `${companyName} Closing Price`,
          data: prices,
          borderColor: "#2d89ef",
          backgroundColor: "rgba(45, 137, 239, 0.1)",
          tension: 0.3,
          pointRadius: 0,
          fill: true
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: "easeOutQuart"
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
              color: "#ccc"
            },
            ticks: { color: "#ccc" },
            grid: { display: false }
          },
          y: {
            title: {
              display: true,
              text: "Price (USD)",
              color: "#ccc"
            },
            ticks: { color: "#ccc" },
            grid: { color: "#333" }
          }
        },
        plugins: {
          legend: {
            labels: { color: "#ccc" }
          }
        }
      }
    });
  }

  fetchCompanies();
});
