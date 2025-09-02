// src/App.tsx
import React, { useEffect } from "react";

export default function App(): JSX.Element {
  const email = "info@oddeeconsultancy.co.uk";
  const phone = "+447365155414";
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${email}`;

  useEffect(() => {
    document.title =
      "Oddee Consulting | UK Engineering Consultancy for Energy Efficiency & Net-Zero";
  }, []);

  return (
    <div className="oddee">
      {/* your <style> … HEADER … HERO … SERVICES … APPROACH … FAQ … CONTACT … FOOTER */}
      {/* ensure ALL buttons are “Contact Us” → #contact */}
    </div>
  );
}
