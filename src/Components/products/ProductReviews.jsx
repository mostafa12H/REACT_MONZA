import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductReviews = ({
  comments,
  handleCommentSubmit,
  rating,
  setRating,
  newComment,
  setNewComment,
}) => {
  const { t } = useTranslation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </>
    );
  };

  return (
    <div className="mt-12 p-8  bg-white rounded-lg shadow-lg border border-gray-200">
      <h4 className="text-2xl font-semibold mb-4 text-gray-900">
        {t('product_reviews')}
      </h4>
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((review, index) => (
            <li key={index} className="border-b pb-2">
              <div className="flex items-center mb-1">
                <p className="text-gray-700 font-semibold mr-2">
                  {review.reviewerName}
                </p>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">{t('no_reviews')}</p>
      )}

      <form onSubmit={handleCommentSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 mb-2">
            {t('rating')}:
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} {t('star', { count: r })}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder={t('add_comment')}
          rows="4"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full"
        >
          {t('add_comment')}
        </button>
      </form>
    </div>
  );
};

export default ProductReviews;
