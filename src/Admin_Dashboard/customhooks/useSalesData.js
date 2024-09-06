import { useState, useEffect } from "react";

export const useSalesData = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [salesOverTimeData, setSalesOverTimeData] = useState([]);
  const [productCategoryDistributionData, setProductCategoryDistributionData] =
    useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/carts");
        const data = await res.json();
        processSalesData(data.carts);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, selectedUserId]);

  const processSalesData = (carts) => {
    const filteredCarts = carts
      .filter((cart) => {
        const matchesDate =
          !selectedDate ||
          new Date(cart.date).toLocaleDateString() === selectedDate;
        const matchesUser =
          !selectedUserId || cart.userId === parseInt(selectedUserId, 10);
        return matchesDate && matchesUser;
      })
      .slice(0, 10);

    const salesOverTime = {};
    const productCategoryDistribution = {};

    filteredCarts.forEach((cart) => {
      const date = new Date(cart.date).toLocaleDateString();
      salesOverTime[date] = (salesOverTime[date] || 0) + cart.total;
      cart.products.forEach((product) => {
        const category = product.title;
        productCategoryDistribution[category] =
          (productCategoryDistribution[category] || 0) + product.quantity;
      });
    });

    setSales(filteredCarts);

    setSalesOverTimeData(
      Object.entries(salesOverTime).map(([date, total]) => ({
        date,
        sales: total,
      }))
    );

    setProductCategoryDistributionData(
      Object.entries(productCategoryDistribution).map(
        ([category, quantity]) => ({
          name: category,
          value: quantity,
          color: generateRandomColor(),
        })
      )
    );
  };

  return {
    loading,
    sales,
    salesOverTimeData,
    productCategoryDistributionData,
    selectedDate,
    setSelectedDate,
    selectedUserId,
    setSelectedUserId,
  };
};

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
