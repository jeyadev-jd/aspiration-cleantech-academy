const ContactMap = () => {
    return (
        <div className="map-section">
            <div className="map-items">
                <div className="googpemap">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.653051654579!2d80.2121219!3d13.121152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52652acebc6f07%3A0xff898e901cf0413d!2sAspiration%20Cleantech%20Ventures%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1771655946796!5m2!1sen!2sin"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactMap;
