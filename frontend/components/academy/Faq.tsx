"use client";

import { useState } from "react";
import { faqItems } from "@/lib/faqData";
import SectionTitle from "@/lib/sectionTitle";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section fix section-padding">
      <div className="container">
        <div className="faq-wrapper">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6 slideUp" data-delay=".4">
              <div className="faq-image">
                <img src="/img/faq/safety-gear.jpeg" alt="faq-img" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-start">
              <div className="faq-content w-100">
                <SectionTitle>
                  <SectionTitle.SubTitle>See Our Faqs</SectionTitle.SubTitle>
                  <SectionTitle.Title>Frequently Asked Questions</SectionTitle.Title>
                </SectionTitle>
                <div className="faq-accordion mt-4 mt-md-0">
                  <div className="accordion" id="accordion">
                    {faqItems.map((item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div
                          className="accordion-item mb-3 slideUp"
                          data-delay={`${0.3 + index * 0.2}`}
                          key={item.question}
                        >
                          <h5 className="accordion-header">
                            <button
                              className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                              type="button"
                              onClick={() => setOpenIndex(isOpen ? null : index)}
                              aria-expanded={isOpen}
                            >
                              {item.question}
                            </button>
                          </h5>
                          <div className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
                            <div className="accordion-body">{item.answer}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
