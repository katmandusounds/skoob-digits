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
    { name: 'TikTok', action: 'Use Sound', logo: 'https://ik.imagekit.io/yello93/tiktok-plain-1.svg?updatedAt=1728938955703', link: 'https://vm.tiktok.com/ZGdd9HGkW/' },
    { name: 'Spotify', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/spotify-logo.svg?updatedAt=1728938955296', link: 'https://api.ffm.to/sl/e/ps/vxe14zv?cd=eyJ1YSI6eyJ1YSI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjguMC4wLjAgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXIiOnsibmFtZSI6IkNocm9tZSIsInZlcnNpb24iOiIxMjguMC4wLjAiLCJtYWpvciI6IjEyOCJ9LCJlbmdpbmUiOnsibmFtZSI6IkJsaW5rIiwidmVyc2lvbiI6IjEyOC4wLjAuMCJ9LCJvcyI6eyJuYW1lIjoiTWFjIE9TIiwidmVyc2lvbiI6IjEwLjE1LjcifSwiZGV2aWNlIjp7InZlbmRvciI6IkFwcGxlIiwibW9kZWwiOiJNYWNpbnRvc2gifSwiY3B1Ijp7fX0sImNsaWVudCI6eyJyaWQiOiJjMzQ0ODI3ZC0xNWU0LTQ5YzktOWY5Mi00M2JiODNkMmVjODMiLCJzaWQiOiJlOWM3YjJlNC1hYmIxLTQ2MTYtYTBhNC00NmMxZmEyYjExODciLCJpcCI6IjkyLjQwLjEzMi45MCIsInJlZiI6Imh0dHBzOi8vdG9vLmZtLyIsImhvc3QiOiJ0b28uZm0iLCJsYW5nIjoiZW4tR0IiLCJpcENvdW50cnkiOiJHQiJ9LCJpc1dlYnBTdXBwb3J0ZWQiOnRydWUsImlzRnJvbUVVIjpmYWxzZSwiY291bnRyeUNvZGUiOiJHQiIsImlzQm90IjpmYWxzZSwidXNlQWZmIjoib3JpZ2luIiwidmlkIjoiMjI0MjU1MzgtNzI3NS00YThiLTllYjAtMWNhMWI1NDVmOTBmIiwiaWQiOiI2NzM2ODE0NzMzMDAwMDA5MDBmMDYyOWYiLCJwcnYiOmZhbHNlLCJpc1ByZVIiOnRydWUsInR6byI6bnVsbCwiY2giOm51bGwsImFuIjpudWxsLCJkZXN0VXJsIjoiaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemU_Y2xpZW50X2lkPTY2ZDNjZGI0NDgwNzRhMGQ4OGU5YjA4YmFhZjJmM2Q3JnJlc3BvbnNlX3R5cGU9Y29kZSZyZWRpcmVjdF91cmk9aHR0cHMlM0ElMkYlMkZhcGkuZmZtLnRvJTJGd2ViaG9vayUyRnNwb3RpZnklMkZhdXRob3JpemUmc2NvcGU9dXNlci1yZWFkLXByaXZhdGUlMjB1c2VyLXJlYWQtYmlydGhkYXRlJTIwdXNlci1yZWFkLWVtYWlsJTIwdXNlci1saWJyYXJ5LW1vZGlmeSUyMHVzZXItbGlicmFyeS1yZWFkJTIwdXNlci1yZWFkLXJlY2VudGx5LXBsYXllZCUyMHVzZXItZm9sbG93LXJlYWQlMjB1c2VyLWZvbGxvdy1tb2RpZnklMjB1c2VyLXRvcC1yZWFkJTIwcGxheWxpc3QtbW9kaWZ5LXB1YmxpYyUyMHBsYXlsaXN0LXJlYWQtcHJpdmF0ZSUyMHBsYXlsaXN0LW1vZGlmeS1wcml2YXRlJnN0YXRlPWV5SmtZa3hwYm10SlpDSTZJalkzTXpZNE1UUTNNek13TURBd01Ea3dNR1l3TmpJNVppSXNJbUZqZEdsdmJsUjVjR1VpT201MWJHd3NJbU4wWVNJNklsQnlaUzFUWVhabElpd2lkWE5sY2tOdmRXNTBjbmtpT2lKSFFpSXNJbk5vYjNKMFNXUWlPaUoyZUdVeE5IcDJJaXdpWkc5dFlXbHVJam9pYUhSMGNITTZMeTkwYjI4dVptMGlMQ0p6WlhKMmFXTmxUbUZ0WlNJNkluTndiM1JwWm5raUxDSndjbTlrZFdOMElqb2ljMjFoY25Sc2FXNXJJaXdpY21Wa2FYSmxZM1JWY21raU9pSm9kSFJ3Y3pvdkwzUnZieTVtYlM5MmVHVXhOSHAyTDNCeVpYTmhkbVZqWVd4c1ltRmpheUlzSW1aaGJHeGlZV05yVlhKc0lqcHVkV3hzTENKcGMxQnlaVkpsYkdWaGMyVWlPblJ5ZFdVc0ltbHpSblYwZFhKbFVtVnNaV0Z6WlNJNmRISjFaU3dpWVhKMGFYTjBTV1FpT2lJMk1UZ3hNbVJoWmpJMU1EQXdNR1UyTnpkaFptVTNaaklpTENKaGNuUnBjM1JQZDI1bGNpSTZJalZsWlRaaVkyVmlNekl3TURBd05qUXlNbVJrTTJFMk9DSXNJbUZqZEdsdmJrbGtJanB1ZFd4c0xDSnBjMFp5YjIxRlZTSTZabUZzYzJVc0lteHBibXRVZVhCbElqcHVkV3hzTENKMWMyVnlTVkFpT2lJNU1pNDBNQzR4TXpJdU9UQWlMQ0p5WlhkaGNtUlZjMlZ5U1dRaU9tNTFiR3dzSW5KbFptVnljbUZzU1dRaU9tNTFiR3dzSW5WMWFXUWlPaUl5TWpReU5UVXpPQzAzTWpjMUxUUmhPR0l0T1dWaU1DMHhZMkV4WWpVME5XWTVNR1lpZlE9PSIsInNydmMiOiJzcG90aWZ5IiwicHJvZHVjdCI6InNtYXJ0bGluayIsInNob3J0SWQiOiJ2eGUxNHp2IiwiaXNBdXRob3JpemF0aW9uUmVxdWlyZWQiOnRydWUsIm93bmVyIjoiNWVlNmJjZWIzMjAwMDA2NDIyZGQzYTY4IiwiYXIiOiI2MTgxMmRhZjI1MDAwMGU2NzdhZmU3ZjIiLCJpc1Nob3J0TGluayI6ZmFsc2V9' },
    { name: 'YouTube', action: 'Watch', logo: 'https://ik.imagekit.io/yello93/YouTube_Logo_2017.svg?updatedAt=1728938955619', link: 'https://youtu.be/dt_IV3BGqoo?si=J_M68mesavZmTc54' },
    { name: 'Apple Music', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/apple-music-3.svg?updatedAt=1728938955269', link: 'https://music.apple.com/gb/album/feelings-single/1772826037' },
    { name: 'SoundCloud', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/Soundcloud_logo.svg?updatedAt=1728938955377', link: 'https://soundcloud.com/brisky-sc/feelings' },
    { name: 'Amazon Music', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/Amazon_music_logo.svg.png?updatedAt=1728938955740', link: 'https://music.amazon.co.uk/tracks/B0DJHGJN9J?marketplaceId=A1F83G8C2ARO7P&musicTerritory=GB&ref=dm_sh_Srt2QRK6FeRKD9fIrCR7LdrXW' },
    { name: 'Deezer', action: 'Listen', logo: 'https://ik.imagekit.io/yello93/Deezer_logo_2007.svg?updatedAt=1728938955530', link: 'https://www.deezer.com/en/album/652380711' },
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
