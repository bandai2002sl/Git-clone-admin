import {
	parseURLSearchParams,
	stringifyURLSearchParams,
} from '../func/optionConvert';
import {useEffect, useMemo, useRef, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {Params} from 'next/dist/shared/lib/router/utils/route-matcher';

const useQueryParams = () => {
	const searchParams = useSearchParams();
	const {replace} = useRouter();
	const pathname = usePathname();

	const hasInitQueryRef = useRef<boolean>(false);
	const [initQuery, setInitQuery] = useState<Params>({});
	const [isReady, setIsReady] = useState<boolean>(false);

	const query = useMemo(
		() => parseURLSearchParams(searchParams),
		[searchParams]
	);

	const page = useMemo(
		() => (searchParams.get('page') ? Number(searchParams.get('page')) : 1),
		[searchParams]
	);

	const keyword = useMemo(
		() => (searchParams.get('keyword') ? searchParams.get('keyword') : ''),
		[searchParams]
	);

	useEffect(() => {
		if (!hasInitQueryRef.current) {
			const queryParsed = parseURLSearchParams(searchParams);
			if (!queryParsed['pageSize']) {
				setInitQuery(queryParsed);
				hasInitQueryRef.current = true;
				setIsReady(true);
			} else {
				replace(
					`${pathname}${stringifyURLSearchParams({
						...queryParsed,
					})}`
				);
			}
		}
	}, [pathname, replace, searchParams]);

	return {
		isReady,
		query,
		initQuery,
		page,
		keyword,
	};
};

export default useQueryParams;
