import React, { useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name || '');
  const [editSpeciality, setEditSpeciality] = useState(speciality || '');
  const [editExperience, setEditExperience] = useState(experience ? String(experience) : '');
  const [editAbout, setEditAbout] = useState(about || '');
  const [editPhone, setEditPhone] = useState(phone || '');
  const [editEmail, setEditEmail] = useState(email || '');

  const handleSave = () => {
    // Save edits back to state/props via controlled values
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(name || '');
    setEditSpeciality(speciality || '');
    setEditExperience(experience ? String(experience) : '');
    setEditAbout(about || '');
    setEditPhone(phone || '');
    setEditEmail(email || '');
    setIsEditing(false);
  };

  const initials = name ? name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'DR';

  if (isEditing) {
    return (
      <div className={`profile-card ${className} profile-card--editing`} {...rest}>
        <div className="profile-card__header">
          <div className="profile-card__avatar">
            {image ? (
              <img src={image} alt={editName} className="profile-card__avatar-img" />
            ) : (
              <div className="profile-card__avatar-placeholder">{editName.charAt(0)}</div>
            )}
          </div>
          <div className="profile-card__info">
            <div className="profile-edit-field">
              <label>Name</label>
              <input
                className="profile-edit-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
            <div className="profile-edit-field">
              <label>Speciality</label>
              <input
                className="profile-edit-input"
                value={editSpeciality}
                onChange={(e) => setEditSpeciality(e.target.value)}
                required
              />
            </div>
            <div className="profile-edit-field">
              <label>Experience (years)</label>
              <input
                className="profile-edit-input"
                type="number"
                value={editExperience}
                onChange={(e) => setEditExperience(e.target.value)}
              />
            </div>
            <div className="profile-edit-field">
              <label>About</label>
              <textarea
                className="profile-edit-input"
                value={editAbout}
                onChange={(e) => setEditAbout(e.target.value)}
                rows="3"
              />
            </div>
            <div className="profile-edit-field">
              <label>Phone</label>
              <input
                className="profile-edit-input"
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </div>
            <div className="profile-edit-field">
              <label>Email</label>
              <input
                className="profile-edit-input"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="profile-card__actions">
          <button className="profile-btn profile-btn--save" onClick={handleSave}>
            Save
          </button>
          <button className="profile-btn profile-btn--cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

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
        <button className="profile-btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
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
