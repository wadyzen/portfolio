import { useState } from "react";
import { useTranslation } from "react-i18next";

import github from "../assets/img/github-brands.svg";
import whatsapp from "../assets/img/whatsapp.svg";
import linkedin from "../assets/img/linkedin.svg";
import mail from "../assets/img/mail.svg";

function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("https://getform.io/f/boloodja", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section id="contact">
      <h2 className="subtitle">{t("contact.title")}</h2>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>{t("contact.headline")}</h3>
          <p>{t("contact.description")}</p>

          <h4>{t("contact.stayInTouch")}</h4>
          <a id="email-link" href={`mailto:${t("contact.email")}`}>
            <img src={mail} alt="email" />
            {t("contact.email")}
          </a>

          <div>
            <a
              href="https://wa.me/212780284816/"
              target="_blank"
              rel="noreferrer"
              className="link-circle"
            >
              <img src={whatsapp} alt="Whatsapp" />
            </a>
            <a
              href="https://www.linkedin.com/in/wadie-zaanoune/"
              target="_blank"
              rel="noreferrer"
              className="link-circle"
            >
              <img src={linkedin} alt="Linkedin" />
            </a>

            <a
              href="https://github.com/wadyzen"
              target="_blank"
              rel="noreferrer"
              className="link-circle"
            >
              <img src={github} alt="Github" />
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="contact-thankyou">
            <h4>{t("contact.thankYouTitle")}</h4>
            <p>{t("contact.thankYouMessage")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>{t("contact.form.nameLabel")}</label>
            <input
              type="text"
              name="name"
              placeholder={t("contact.form.namePlaceholder")}
              required
            />
            <label>{t("contact.form.emailLabel")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("contact.form.emailPlaceholder")}
              required
            />
            <label>{t("contact.form.messageLabel")}</label>
            <textarea
              name="message"
              rows="4"
              placeholder={t("contact.form.messagePlaceholder")}
              required
            ></textarea>
            <button type="submit" className="submit-button">
              <span>{t("contact.form.submit")}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;
