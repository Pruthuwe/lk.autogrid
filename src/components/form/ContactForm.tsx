import React, { useState } from "react";
import { submitContactForm } from "../../services/emailService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: null, text: "" });

    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setSubmitMessage({
          type: "success",
          text: response.message || "Form submitted successfully! We will contact you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          number: "",
          message: "",
        });
        // Clear message after 5 seconds
        setTimeout(() => {
          setSubmitMessage({ type: null, text: "" });
        }, 5000);
      } else {
        setSubmitMessage({
          type: "error",
          text: response.message || "Failed to submit form. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Comment Form Start */}
      <div className="te-comment-respond mt-0">
        <form
          action="#"
          method="post"
          className="te-comment-form"
          onSubmit={handleSubmit}
        >
          <h3>Contact Us</h3>
          <div className="row gx-4">
            <div className="col-xl-6">
              <div className="te-contacts-name">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="te-contacts-name">
                <input
                  name="number"
                  type="tel"
                  placeholder="Your Phone Number *"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className="te-contacts-email">
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className="te-contacts-message">
                <textarea
                  name="message"
                  cols={20}
                  rows={3}
                  placeholder="Write your Message here *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-12">
              {submitMessage.type && (
                <div
                  className={`mb-3 p-3 ${
                    submitMessage.type === "success"
                      ? "text-white bg-success"
                      : "text-white bg-danger"
                  }`}
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  {submitMessage.text}
                </div>
              )}
              <button
                className="te-theme-btn style-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND NOW"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Comment Form End */}
    </>
  );
};

export default ContactForm;
