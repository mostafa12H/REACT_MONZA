import React from "react";
import { useTranslation } from "react-i18next";

const Newsletter = () => {
  const { t } = useTranslation();

  return (
    <div dir="auto" className="bg-gray-800 w-3/6 text-white p-4 rounded-lg shadow-lg mx-auto">
      <h3 className="text-lg font-semibold mb-2">{t('newsletter')}</h3>
      <p className="mb-3 text-sm">
        {t('newsletter_description')}
      </p>
      <div
        className="newsletter-form"
        dangerouslySetInnerHTML={{
          __html: `
            <div id="mc_embed_signup">
              <form
                action="https://gmail.us17.list-manage.com/subscribe/post?u=e8a1f8eec4dff0eba12dc3f37&amp;id=045d3defe2&amp;f_id=00c249e2f0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
              >
                <div id="mc_embed_signup_scroll">
                  <div class="indicates-required text-xs mb-2">
                    <span class="text-red-500">*</span> ${t('indicates_required')}
                  </div>
                  <div class="mc-field-group mb-3">
                    <label for="mce-EMAIL" class="block text-xs font-medium">${t('email_address')}
                      <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="EMAIL"
                      class="required email w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      id="mce-EMAIL"
                      required
                    />
                  </div>
                  <div class="mc-field-group mb-3">
                    <label for="mce-FNAME" class="block text-xs font-medium">${t('first_name')}</label>
                    <input
                      type="text"
                      name="FNAME"
                      class="text w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      id="mce-FNAME"
                    />
                  </div>
                  <div id="mce-responses" class="clear foot">
                    <div class="response" id="mce-error-response" style="display: none;"></div>
                    <div class="response" id="mce-success-response" style="display: none;"></div>
                  </div>
                  <div
                    aria-hidden="true"
                    style="position: absolute; left: -5000px;"
                  >
                    <input
                      type="text"
                      name="b_e8a1f8eec4dff0eba12dc3f37_045d3defe2"
                      tabindex="-1"
                      value=""
                    />
                  </div>
                  <div class="optionalParent">
                    <div class="clear foot">
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        class="button bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                        value="${t('subscribe')}"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          `,
        }}
      />
    </div>
  );
};

export default Newsletter;
