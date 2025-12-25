function callApi(path) {
  fetch(`http://${window.location.hostname}:8000${path}`)
    .then(res => res.json())
    .then(data => alert(JSON.stringify(data)));
}

export default function App() {
  return (
    <div>
      <h1>Microservices Dashboard</h1>

      <button onClick={() => callApi("/assets")}>
        Asset Search
      </button>

      <button onClick={() => callApi("/email")}>
        Email Service
      </button>

      <button onClick={() => callApi("/payment")}>
        Payment Service
      </button>
    </div>
  );
}
