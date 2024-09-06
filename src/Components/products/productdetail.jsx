import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import { addItemToCart } from "../../features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(5);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setComments(data.reviews || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }

    const newReview = {
      rating,
      comment: newComment,
      date: new Date().toISOString(),
      reviewerName: user.username,
    };
    setComments([...comments, newReview]);
    setNewComment("");
    setRating(5);
  };

  const addToCart = () => {
    if (!product) return;

    dispatch(addItemToCart({ ...product, quantity: 1 })); // Pass full product data
    alert(`${product.title} ${t('add_to_cart')}!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (!product) {
    return <div>{t('product_not_found')}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImages product={product} openModal={openModal} />
        <ProductInfo product={product} addToCart={addToCart} />
      </div>

      <ProductReviews
        comments={comments}
        handleCommentSubmit={handleCommentSubmit}
        rating={rating}
        setRating={setRating}
        newComment={newComment}
        setNewComment={setNewComment}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="w-1/3 h-auto mx-auto mt-20 bg-white rounded-lg p-4 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <img src={selectedImage} alt="Selected" className="w-full h-auto" />
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
        >
          {t('close')}
        </button>
      </Modal>
    </div>
  );
};

export default ProductDetails;
