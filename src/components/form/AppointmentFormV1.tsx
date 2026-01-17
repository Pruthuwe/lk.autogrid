import React, { useState } from "react";
import LatestServiceV1Data from "../../jsonData/latestService/LatestServiceV1Data.json";

const AppointmentFormV1 = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* Appointment Area Start */}
      <div
        className="appointment-area style-1"
        style={{ backgroundImage: 'url("../../images/section-bg/appointment-bg.jpg")' }}
      >
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {/* Comment Form Start */}
              <div className="te-comment-respond style-2 mt-0">
                <h2 className="title text-white">Get A Quote</h2>
                <form
                  action="#"
                  method="post"
                  className="te-comment-form"
                  onSubmit={handleSubmit}
                >
                  <div className="row gx-4">
                    <div className="col-xl-6">
                      <div className="te-contacts-name">
                        <select
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled selected>
                            Vehicle Type *
                          </option>
                          {vehicleTypes.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="te-contacts-name">
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled selected>
                            Vehicle Brand *
                          </option>
                          {vehicleBrands.map((brand, index) => (
                            <option key={index} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="te-contacts-name">
                        <input
                          name="vehicleModel"
                          type="text"
                          placeholder="Vehicle Model"
                          value={formData.vehicleModel}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
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
                      <div className="te-contacts-email">
                        <input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
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
                      <div className="te-contacts-name">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Service *</option>
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
                    <div className="col-xl-12">
                      <div className="te-contacts-message">
                        <textarea
                          name="message"
                          cols={20}
                          rows={3}
                          placeholder="Write your Message here"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="te-theme-btn" type="submit">
                        SEND NOW
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* Comment Form End */}
            </div>
          </div>
        </div>
      </div>
      {/* Appointment Area End */}
    </>
  );
};

export default AppointmentFormV1;