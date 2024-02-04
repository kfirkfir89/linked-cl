import { useCallback, useState } from "react";

const useLinkInput = () => {  
  const [linkUrl, setLinkUrl] = useState<string>('');

  const handleLinkChange = useCallback((link: string) => {
    setLinkUrl(link);
  }, []);
  
  return { linkUrl, handleLinkChange };
}

export default useLinkInput;
