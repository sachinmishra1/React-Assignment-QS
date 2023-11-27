
const fetchData = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    return data;
  };
  
  const api = {
    getData: fetchData,
  };
  
  export default api;
  