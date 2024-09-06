const calculateTimeLeft = () => {
  const storedData = JSON.parse(localStorage.getItem("siteData"));
  let endDate = new Date("2024-09-25T23:59:59");

  if (storedData && storedData.timer && storedData.timer.endDate) {
    endDate = new Date(storedData.timer.endDate); 
  }

  const now = new Date();
  const timeLeft = endDate - now;


  if (timeLeft <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};


export default calculateTimeLeft;
