import React, { useState, useEffect } from 'react';
import PreSaveButton from './PreSaveButton';
import ColorThief from 'colorthief';

const PreSavePage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isReleased, setIsReleased] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const songTitle = "Digits";
  const albumArtUrl = "https://ik.imagekit.io/vv1coyjgq/skoob%20digits%20large%20svg.png?updatedAt=1731696387092";
  const releaseDate = new Date('2024-10-18T00:00:00');

  const platforms = [
    { name: 'TikTok', action: 'Use Sound', logo: 'https://ik.imagekit.io/yello93/tiktok-plain-1.svg?updatedAt=1728938955703', link: 'https://www.tiktok.com/music/Digits-7437764764077901825?is_from_webapp=1&sender_device=pc' },
    { name: 'Spotify', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/spotify-logo.svg?updatedAt=1728938955296', link: 'https://open.spotify.com/track/2ehQ1UVWU25ScvzRroWGa2?si=193f5fe8c6cf4041' },
    { name: 'YouTube', action: 'Watch', logo: 'https://ik.imagekit.io/yello93/YouTube_Logo_2017.svg?updatedAt=1728938955619', link: 'https://www.youtube.com/watch?v=z5KlgBpW_fU&ab_channel=Skoob-Topic' },
    { name: 'Apple Music', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/apple-music-3.svg?updatedAt=1728938955269', link: 'https://music.apple.com/gb/album/digits/1780903590?i=1780903591' },
    { name: 'SoundCloud', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/Soundcloud_logo.svg?updatedAt=1728938955377', link: 'https://soundcloud.com/skoob56522/digits' },
    { name: 'Amazon Music', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/Amazon_music_logo.svg.png?updatedAt=1728938955740', link: 'https://music.amazon.co.uk/albums/B0DN9QFBR8?marketplaceId=A1F83G8C2ARO7P&musicTerritory=GB&ref=dm_sh_fahf74cZ5nbM5SJ03TCuxwgky&trackAsin=B0DN9QBDRK' },
    { name: 'Deezer', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/Deezer_logo_2007.svg?updatedAt=1728938955530', link: 'https://deezer.page.link/96kUBp1rjiyFRnrA7' },
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = releaseDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsReleased(true);
        setTimeLeft(null);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [releaseDate]);

  useEffect(() => {
    const img = new Image();
    const colorThief = new ColorThief();

    img.crossOrigin = 'Anonymous';
    img.src = albumArtUrl;

    img.onload = () => {
      const palette = colorThief.getPalette(img, 7);
      const dominantColor = palette[2];

      const gradientStyle = {
        background: `linear-gradient(135deg, rgba(${dominantColor.join(
          ','
        )}, 1.7), rgba(1, 0, 0, 0.9))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

      setBackgroundStyle(gradientStyle);
    };
  }, [albumArtUrl]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 relative overflow-hidden" style={backgroundStyle}>
      <div className="w-[72%] max-w-[280px] z-10">
        <img src={albumArtUrl} alt="Album Art" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
      </div>

      <div className="text-center z-10 mt-4">
        <h1 className="text-2xl font-bold text-white">{songTitle}</h1>
        {!isReleased && timeLeft && (
          <p className="text-yellow-400 font-bold mt-2">{timeLeft}</p>
        )}
        <button
          onClick={handleModalOpen}
          className="w-[72%] max-w-[280px] bg-blue-600 text-white py-2 px-4 mt-8 rounded shadow hover:bg-blue-400"
        >
          Subscribe
        </button>
        <p className="text-sm mt-4 text-white">Choose your preferred music service</p>
      </div>

      <div className="w-[72%] max-w-[280px] z-10">
        {platforms.map((platform) => {
          const action =
            platform.name === 'TikTok' ? 'Use Sound' :
            platform.name === 'YouTube' ? 'Listen' :
            isReleased ? 'Listen' : platform.action;

          return (
            <PreSaveButton
              key={platform.name}
              platform={platform.name}
              action={action}
              logo={platform.logo}
              link={platform.link}
            />
          );
        })}
      </div>

      <div className="text-xs text-gray-300 mt-4 text-center z-10">
        <a href="https://www.wadizthismusic.com" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://ik.imagekit.io/yello93/wadiz%20this%20with%20stroket.png?updatedAt=1728942887027" 
            alt="Company Logo" 
            className="mx-auto mb-4 h-12 w-auto transition duration-300 ease-in-out"
            onMouseOver={e => e.currentTarget.src = "https://ik.imagekit.io/yello93/wadiz%20this%20yellow%20stroke.png?updatedAt=1728944115158"}
            onMouseOut={e => e.currentTarget.src = "https://ik.imagekit.io/yello93/wadiz%20this%20with%20stroket.png?updatedAt=1728942887027"}
          />
        </a>
        <p style={{ fontSize: '9px' }}>By using this service you agree to our Privacy Policy and Terms Of Use.</p>
        <a href="mailto:info@wadizthismusic.com" className="text-gray-300 hover:text-gray-100" style={{ fontSize: '9px' }}>Report a Problem</a>
      </div>

      {/* Modal for Mailchimp Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <div id="mc_embed_shell">
              <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
              <div id="mc_embed_signup">
                <form action="https://wadizthismusic.us16.list-manage.com/subscribe/post?u=9bbd52bf8a2eb99c035c20225&amp;id=9bebefc8ca&amp;f_id=00601ee1f0" method="post" target="_blank">
                  <h2 className="text-lg font-bold mb-4">Subscribe</h2>
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL">Email Address</label>
                    <input type="email" name="EMAIL" id="mce-EMAIL" className="required email w-full border border-gray-300 p-2 mt-1 rounded shadow-sm focus:ring-blue-500" />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-FNAME">First Name</label>
                    <input type="text" name="FNAME" id="mce-FNAME" className="text w-full border border-gray-300 p-2 mt-1 rounded shadow-sm" />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-LNAME">Last Name</label>
                    <input type="text" name="LNAME" id="mce-LNAME" className="text w-full border border-gray-300 p-2 mt-1 rounded shadow-sm" />
                  </div>
                  <div className="clear foot">
                    <input type="submit" value="Subscribe" name="subscribe" className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded shadow hover:bg-blue-500" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreSavePage;
