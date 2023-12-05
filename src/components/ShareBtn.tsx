import { useState } from 'react';
import shareicon from '../images/shareIcon.svg';

function ShareBtn() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ copyToClipboard }
      >
        <img src={ shareicon } alt="Share" />
      </button>

      {copied && <p>✅ Link copied!</p>}

    </div>

  );
}

export default ShareBtn;
