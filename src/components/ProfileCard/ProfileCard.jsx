import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({
  name,
  speciality,
  experience,
  ratings,
  image,
  about,
  phone,
  email,
  className = '',
  ...rest
}) => {
  const initials = name ? name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'DR';

  return (
    <div className={`profile-card ${className}`} {...rest}>
      <div className="profile-card__header">
        <div className="profile-card__avatar">
          {image ? (
            <img src={image} alt={name} className="profile-card__avatar-img" />
          ) : (
            <div className="profile-card__avatar-placeholder">{initials}</div>
          )}
        </div>
        <div className="profile-card__info">
          <h3 className="profile-card__name">{name}</h3>
          <p className="profile-card__speciality">{speciality}</p>
          <div className="profile-card__meta">
            {experience && (
              <span className="profile-card__meta-item">
                <span aria-hidden="true">&#9881;</span> {experience} years exp.
              </span>
            )}
            {ratings && (
              <span className="profile-card__meta-item">
                <span aria-hidden="true">&#9733;</span> {ratings}
              </span>
            )}
          </div>
          {about && <p className="profile-card__about">{about}</p>}
        </div>
      </div>
      <div className="profile-card__contact">
        {phone && (
          <a href={`tel:${phone}`} className="profile-card__contact-item">
            <span aria-hidden="true">&#9742;</span> {phone}
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="profile-card__contact-item">
            <span aria-hidden="true">&#9993;</span> {email}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
