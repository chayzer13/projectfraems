import React from 'react';
import '../style/footer.css';
import Inst from '../img/inst.svg';
import Wht from '../img/wht.svg';

const Footer = () => {
  const contactDetails = [
    {
      title: 'Phone',
      content: '+7 (499) 350-66-04',
    },
    {
      title: 'Address',
      content: 'Dubininskaya Ulitsa, 96, Moscow, Russia, 115093',
    },
    {
      title: 'Working Hours',
      content: '24 hours a day',
      className: 'working-hours',
    },
  ];

  const socialIcons = [
    { src: Inst, alt: 'Instagram', className: '' },
    { src: Wht, alt: 'WhatsApp', className: 'wht' },
  ];

  return (
    <footer>
      <div className="contact">
        <h1>Contact</h1>
        <div className="conts">
          {contactDetails.map((detail, index) => (
            <div key={index} className={detail.className || detail.title.toLowerCase().replace(/ /g, '-')}>
              <p>{detail.title}</p>
              <h2>{detail.content}</h2>
            </div>
          ))}

          <div className="socials">
            <p className="socials-title">Socials</p>
            <div className="imgsocial">
              {socialIcons.map((icon, index) => (
                <img
                  key={index}
                  src={icon.src}
                  alt={icon.alt}
                  className={icon.className}
                  style={{ width: '38px', height: '38px' }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="IThub College Location"
            className="map-iframe"
            src="https://www.google.com/maps?q=IThub+college+Dubininskaya+Ulitsa+96,+Moscow,+Russia,+115093&hl=en&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;