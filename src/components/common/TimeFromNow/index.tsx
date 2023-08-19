'use client';

import {useEffect, useMemo, useState} from 'react';

import {formatTimeAgo} from '~/common/func/fancyTimeFormat';

function TimeFromNow({date}: {date: string | number}) {
	const timestamp = useMemo(() => {
		return new Date(date).getTime();
	}, [date]);

	const [formattedTime, setFormattedTime] = useState('');

	useEffect(() => {
		if (formattedTime == '') {
			const timeAgo = formatTimeAgo(timestamp);
			setFormattedTime(timeAgo);
		} else {
			let id = setInterval(() => {
				const timeAgo = formatTimeAgo(timestamp);
				setFormattedTime(timeAgo);
			}, 60000);

			return () => {
				clearInterval(id);
			};
		}
	}, [formattedTime, timestamp]);

	return <span>{formattedTime}</span>;
}

export default TimeFromNow;
