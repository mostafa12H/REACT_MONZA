import React, { useState } from 'react';
import img1 from '../assets/help.jpg';
import { useTranslation } from 'react-i18next';

const faqData = [
  {
    topic: 'orders',
    questions: [
      {
        question: 'how_do_i_place_an_order',
        answer: 'place_an_order_answer',
      },
      {
        question: 'can_i_modify_my_order_after_placing_it',
        answer: 'modify_order_answer',
      },
    ],
  },
  {
    topic: 'shipping',
    questions: [
      {
        question: 'shipping_options',
        answer: 'shipping_options_answer',
      },
      {
        question: 'track_my_shipment',
        answer: 'track_my_shipment_answer',
      },
    ],
  },
  {
    topic: 'returns',
    questions: [
      {
        question: 'return_policy',
        answer: 'return_policy_answer',
      },
      {
        question: 'how_to_return_item',
        answer: 'return_item_answer',
      },
    ],
  },
  {
    topic: 'account_management',
    questions: [
      {
        question: 'create_an_account',
        answer: 'create_an_account_answer',
      },
      {
        question: 'reset_password',
        answer: 'reset_password_answer',
      },
    ],
  },
  {
    topic: 'payment',
    questions: [
      {
        question: 'accepted_payment_methods',
        answer: 'accepted_payment_methods_answer',
      },
      {
        question: 'use_multiple_payment_methods',
        answer: 'use_multiple_payment_methods_answer',
      },
    ],
  },
];

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div 
        className="w-full h-64 bg-cover bg-center" 
        style={{ backgroundImage: `url(${img1})` }}
      >
      </div>

      <div  dir="auto" className="max-w-4xl mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg mt-5 mb-5 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {t('get_help')}
        </h1>
        {faqData.map((section, index) => (
          <div key={index} className="mb-6">
            <h2
              className="cursor-pointer bg-gray-200 text-gray-800 p-6 rounded-lg text-xl font-semibold flex justify-between items-center shadow-md hover:bg-gray-300 transition-colors"
              onClick={() => handleToggle(index)}
            >
              {t(section.topic)}
              <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
            </h2>
            {openIndex === index && (
              <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-sm mt-4">
                {section.questions.map((q, qIndex) => (
                  <div key={qIndex} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {t(q.question)}
                    </h3>
                    <p className="text-gray-700 mt-1">
                      {t(q.answer)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
