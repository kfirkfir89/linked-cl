import { useCallback, useState } from "react";

const useLinkInput = () => {  
  const [linkUrl, setLinkUrl] = useState<string>('');

  const handleLinkChange = useCallback((link: string) => {
    console.log('link:', link)
    setLinkUrl(() => link);
  }, [linkUrl]);
  
  return { linkUrl, handleLinkChange };
}

export default useLinkInput;
