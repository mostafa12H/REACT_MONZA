import React from "react";
import { useTranslation } from 'react-i18next';

const SortOptions = ({ sortBy, sortOrder, onSortChange }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const [field, order] = e.target.value.split("-");
    onSortChange(field, order);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">{t('sort_by')}:</span>
      <select
        className="border rounded-lg py-2 px-3"
        value={`${sortBy}-${sortOrder}`}
        onChange={handleChange}
      >
        <option value="price-asc">{t('price_asc')}</option>
        <option value="price-desc">{t('price_desc')}</option>
        <option value="rating-asc">{t('rating_asc')}</option>
        <option value="rating-desc">{t('rating_desc')}</option>
        <option value="title-asc">{t('title_asc')}</option>
        <option value="title-desc">{t('title_desc')}</option>
      </select>
    </div>
  );
};

export default SortOptions;
