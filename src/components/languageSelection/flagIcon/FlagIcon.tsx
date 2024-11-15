import { useState } from 'react';

export const FlagIcon = ({ lang }: { lang: string }) => {
	const [imgLoaded, setImgLoaded] = useState(true);
	if (!imgLoaded) return <span className="text-sm uppercase leading-none">{lang}</span>;

	return (
		<img
			width={24}
			alt={lang}
			src={`/images/flags/${lang}.png`}
			onLoad={() => setImgLoaded(true)}
			onError={() => setImgLoaded(false)}
		/>
	);
};
