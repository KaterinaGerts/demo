import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Deflogo from './logo.png';
import poster from './poster.png';
import './Player.css';

const Player = () => {
  const [searchParams] = useSearchParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [targetButtons, setTargetButtons] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [logo, setLogo] = useState(Deflogo);
  const [styles, setStyles] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const PROJECT_ID =
    'gAAAAABmz4MJp2NfzIEwitZOEJ8aNvBkrZZx2LNQocW_-safI55oCkyk9vMKUmeErpvU4qbrDJNARCOIJ_1urN2wEnwoP98gzQ==';

    useLayoutEffect(() => {
      const fetchDetails = async () => {
        try {
         
          const response = await axios.get(
            `https://api.persicom.ru/projects/${PROJECT_ID}/details`
         
          );
  
          // const response = await axios.get(
          //   `https://api.persicom.ru/projects/${params.encrypted_id}/details`
          // );
  
         
          document.title = response.data.project_name || 'Default Project Name';
          document.description = response.data.description || '12345'
        } catch (error) {
          console.error('Error fetching project details:', error);
          
        }
      };
  
      fetchDetails();
    }, []);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setShowPopup(true);
        const params = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });

        const response = await axios.post(
          `https://api.persicom.ru/projects/${PROJECT_ID}/generate_custom_video`,
          params
        );

        // const response = await axios.post(
        //   `https://api.persicom.ru/projects/${params.encrypted_id}/generate_custom_video`,
        //   params
        // );

        setVideoUrl(response.data.video_url);
        setTargetButtons(response.data.target_buttons);
        setProjectName(response.data.project_name);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStyles(response.data.styles);
        setPosterUrl(response.data.poster_url);
        document.title = response.data.project_name || 'Default Project Name';
        setLogo(response.data.logo_url || Deflogo);

        setShowPopup(false);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setShowPopup(false);
      }
    };

    fetchProjectDetails();
  }, [searchParams]);

  useEffect(() => {
    if (styles && styles?.background) {
      if (styles.background?.backgroundColor) {
        document.body.style.background = styles.background.backgroundColor;
      } else if (styles.background?.backgroundImage) {
        document.body.style.background = styles.background.backgroundImage;
      }
    }
    return () => {
      document.body.style.background = '';
    };
  }, [styles]);

  const memoizedTargetButtons = useMemo(() => {
    return targetButtons.map((button, index) => {
      const isProtocolPresent = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(button.link);
      const link = isProtocolPresent ? button.link : `https://${button.link}`;

      return (
        <a
          key={index}
          style={{ ...styles?.button }}
          className="target-button"
          href={link}
          rel="noreferrer"
          target="_blank"
        >
          {button.name}
        </a>
      );
    });
  }, [targetButtons, styles]);

  return (
    <div className="player-wrapper">
      <header className="header">
        <img className="logo" src={logo} alt="Логотип ПЕРСИКОММ" />
        <div className="title-wrapper">
          <h1 className="header-title">{title}</h1>
          <p>{description}</p>
        </div>
      </header>
      <div className="player-content">
        <video
          src={videoUrl}
          className="video-player"
          controls
          poster={posterUrl || poster}
        ></video>
      </div>
      <div className="button-group">{memoizedTargetButtons}</div>
      {showPopup && (
        <div className="popup">
          <div className="popup_inner">
            <p>Подождите минутку, записываем для вас приветственное видео!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
