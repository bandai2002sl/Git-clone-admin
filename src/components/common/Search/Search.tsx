import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PropsSearch } from "./interfaces";
import { SearchNormal } from "iconsax-react";
import clsx from "clsx";
import { newQueryPath } from "~/common/func/optionConvert";
import styles from "./Search.module.scss";
import useDebounce from "~/common/hooks/useDebounce";
import useQueryParams from "~/common/hooks/useQueryParams";

function Search({ placeholder = "Nhập từ khóa tìm kiếm" }: PropsSearch) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isReady, keyword: initKeyword } = useQueryParams();
  const [keyword, setKeyword] = useState(initKeyword || "");
  const debounce = useDebounce(keyword, 500);

  useEffect(() => {
    if (isReady) {
      replace(
        newQueryPath(pathname, searchParams, {
          keyword: debounce,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, isReady, pathname]);

  return (
    <div className={clsx(styles.container)}>
      <div className={styles.icon}>
        <SearchNormal />
      </div>
      <input
        placeholder={placeholder}
        autoFocus
        onChange={(e: any) => setKeyword(e.target.value)}
        value={keyword}
      />
    </div>
  );
}

export default Search;
