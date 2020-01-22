import React from 'react';
import './styles.css';

export default ({ data }) => {
  const { github_username, name, avatar_url, bio, techs } = data;
  const newLineToBr = (text) => text && text.replace(/\n/g, '<br />');

  return (
    <li className="dev-item">
      <header>
        <img src={avatar_url} alt={`${name}'s avatar`} />
        <div className="user-info">
          <strong>{name || github_username}</strong>
          <span>{techs.join(', ')}</span>
        </div>
      </header>
      <p dangerouslySetInnerHTML={{ __html: newLineToBr(bio) }} />
      <footer>
        <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${github_username}`}>
          Acessar Perfil no Github
        </a>
      </footer>
    </li>
  );
};
