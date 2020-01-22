import React, { useState, useEffect } from 'react';
import './styles.css';

export default ({ onSubmit }) => {
  const [disabled, setDisabled] = useState(false);
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setLatitude(+latitude.toFixed(7));
      setLongitude(+longitude.toFixed(7));
    });
  }, []); //eslint-disable-line

  const handleInputStateOnChange = (setter, { target }) => {
    setter(target.value);
    target.setCustomValidity('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await onSubmit({ github_username, techs, latitude, longitude });
    setGithubUsername('');
    setTechs('');
    setDisabled(false);
  };

  const _isValidInput = (val) => /[-.\d]/g.test(val);
  const _trimCoordinate = (val) => `${val}`.replace(/(-?\d*\.?\d{0,7}).*/, '$1');

  const _validateCoordinate = (val, type) => {
    const hasValidPattern = /^-?\d{0,3}(\.\d*)?$/.test(val);
    const hasValidValueType =
      `${val}`.length > 1 ? Math.abs(val) <= (type === 'latitude' ? 90 : 180) : true;
    return hasValidPattern && hasValidValueType;
  };

  const handleCoordinateInput = (e, oldValue) => {
    const input = e.nativeEvent.data;
    const { value, name } = e.target;
    const newValue = !input
      ? value.length > 0
        ? value
        : ''
      : _isValidInput(input) && _validateCoordinate(value, name)
      ? value
      : oldValue;

    e.target.value = _trimCoordinate(newValue);
  };

  const handleOnFocus = ({ target }) => target.classList.add('focused');

  const handleOnInvalid = ({ target }) => {
    const { innerText: label } = target.labels[0] || {};
    const message = label ? `O campo "${label}" é obrigatório` : 'Este campo é obrigatório';
    target.setCustomValidity(message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={disabled}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            required
            id="github_username"
            name="github_username"
            value={github_username}
            onFocus={handleOnFocus}
            onInvalidCapture={handleOnInvalid}
            onChange={(e) => handleInputStateOnChange(setGithubUsername, e)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            required
            id="techs"
            name="techs"
            value={techs}
            onFocus={handleOnFocus}
            onInvalidCapture={handleOnInvalid}
            onChange={(e) => handleInputStateOnChange(setTechs, e)}
          />
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              required
              id="latitude"
              name="latitude"
              value={latitude}
              onFocus={handleOnFocus}
              onInputCapture={(e) => handleCoordinateInput(e, latitude)}
              onInvalidCapture={handleOnInvalid}
              onChange={(e) => handleInputStateOnChange(setLatitude, e)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              required
              id="longitude"
              name="longitude"
              value={longitude}
              onFocus={handleOnFocus}
              onInputCapture={(e) => handleCoordinateInput(e, longitude)}
              onInvalidCapture={handleOnInvalid}
              onChange={(e) => handleInputStateOnChange(setLongitude, e)}
            />
          </div>
        </div>
        <button type="submit" disabled={disabled}>
          {!disabled ? 'Salvar' : 'Enviando...'}
        </button>
      </fieldset>
    </form>
  );
};
