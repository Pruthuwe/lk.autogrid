import React, { useState } from "react";
import LatestServiceV1Data from "../../jsonData/latestService/LatestServiceV1Data.json";
import { submitQuoteForm } from "../../services/emailService";

type QuoteFormModalProps = {
  onSuccess?: () => void;
};

const QuoteFormModal = ({ onSuccess }: QuoteFormModalProps) => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    brand: "",
    vehicleModel: "",
    name: "",
    email: "",
    number: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const vehicleTypes = ["Car", "SUV", "Van", "Truck", "Motorcycle", "Other"];
  const vehicleBrands = [
    "Nissan",
    "Toyota",
    "Honda",
    "Kia",
    "Suzuki",
    "Hyundai",
    "Other",
  ];

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
      const response = await submitQuoteForm(formData);
      
      if (response.success) {
        setSubmitMessage({
          type: "success",
          text: response.message || "Form submitted successfully! We will contact you soon.",
        });
        // Reset form
        setFormData({
          vehicleType: "",
          brand: "",
          vehicleModel: "",
          name: "",
          email: "",
          number: "",
          service: "",
          message: "",
        });
        // Call onSuccess callback if provided (e.g., to close modal)
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000); // Close modal after 2 seconds on success
        } else {
          // Clear message after 5 seconds if no callback
          setTimeout(() => {
            setSubmitMessage({ type: null, text: "" });
          }, 5000);
        }
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
    <div className="te-quote-form-modal">
      <form
        action="#"
        method="post"
        className="te-quote-form"
        onSubmit={handleSubmit}
      >
        {/* Vehicle Information Section */}
        <div className="te-quote-form-section">
          <h4 className="te-quote-form-section-title">
            <i className="fa-solid fa-car"></i> Vehicle Information
          </h4>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="te-quote-form-group">
                <label htmlFor="vehicleType">Vehicle Type *</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                  className="te-quote-form-control"
                >
                  <option value="">Select Vehicle Type</option>
                  {vehicleTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="te-quote-form-group">
                <label htmlFor="brand">Vehicle Brand *</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="te-quote-form-control"
                >
                  <option value="">Select Brand</option>
                  {vehicleBrands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="te-quote-form-group">
                <label htmlFor="vehicleModel">Vehicle Model</label>
                <input
                  id="vehicleModel"
                  name="vehicleModel"
                  type="text"
                  placeholder="e.g., Corolla, Civic"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  className="te-quote-form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="te-quote-form-group">
                <label htmlFor="service">Service Needed *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="te-quote-form-control"
                >
                  <option value="">Select Service</option>
                  {LatestServiceV1Data.map((service) => (
                    <option
                      key={service.id}
                      value={
                        service.title === "Many More Automobile Services"
                          ? "Other"
                          : service.title
                      }
                    >
                      {service.title === "Many More Automobile Services"
                        ? "Other"
                        : service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="te-quote-form-section">
          <h4 className="te-quote-form-section-title">
            <i className="fa-solid fa-user"></i> Contact Information
          </h4>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="te-quote-form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="te-quote-form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="te-quote-form-group">
                <label htmlFor="number">Phone Number *</label>
                <input
                  id="number"
                  name="number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="te-quote-form-control"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="te-quote-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email (optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="te-quote-form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Message Section */}
        <div className="te-quote-form-section">
          <div className="te-quote-form-group">
            <label htmlFor="message">Additional Message</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Tell us more about your requirements (optional)"
              value={formData.message}
              onChange={handleChange}
              className="te-quote-form-control"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="te-quote-form-submit">
          {submitMessage.type && (
            <div
              className={`te-quote-form-message ${
                submitMessage.type === "success"
                  ? "te-quote-form-message-success"
                  : "te-quote-form-message-error"
              }`}
            >
              <i
                className={`fa-solid ${
                  submitMessage.type === "success"
                    ? "fa-circle-check"
                    : "fa-circle-exclamation"
                }`}
              ></i>
              {submitMessage.text}
            </div>
          )}
          <button
            className="te-theme-btn style-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Sending...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i> Submit Quote Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteFormModal;

