import React, { useState } from "react";
import './App.css';


const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/read-excel"); // Backend URL
      if (!response.ok) {
        throw new Error("Veriler alınamadı!");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={fetchData} style={{ marginBottom: "20px" }}>
        Verileri Getir
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.length > 0 && (
        <table border="1" style={{ margin: "0 auto", width: "50%" }}>
          <thead>
            <tr>
              <th>İSİM</th>
              <th>YAŞ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
