import { Fragment, memo, useEffect, useMemo } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import clsx from "clsx";
import i18n from "~/locale/i18n";
import { newQueryPath } from "~/common/func/optionConvert";
import style from "./Pagination.module.scss";
import useQueryParams from "~/common/hooks/useQueryParams";

function Pagination({
  total,
  onSetPage,
  pageSize,
  currentPage,
  disableArrow,
  isShowBtn = true,
  dependencies = [],
}: {
  total: number;
  pageSize: number;
  currentPage: number;
  onSetPage?: (any: any) => void;
  isShowBtn?: boolean;
  disableArrow?: boolean;
  dependencies?: Array<any>;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isReady } = useQueryParams();

  const items = useMemo(() => {
    const items: React.ReactNode[] = [];
    const max = Math.ceil(total / pageSize);
    for (let i = 1; i <= max; i++) {
      if (
        i === currentPage - 1 ||
        i === currentPage + 1 ||
        i === currentPage ||
        i === 1 ||
        i === max
      ) {
        items.push(
          <li
            key={i}
            className={clsx([
              style.item,
              { [style.active]: currentPage === i },
            ])}
            onClick={() => {
              if (!!onSetPage) {
                onSetPage(i);
              } else {
                replace(
                  newQueryPath(pathname, searchParams, {
                    page: i,
                  })
                );
              }
            }}
          >
            {i}
          </li>
        );
      }

      if (
        (i === currentPage - 2 && currentPage >= 4) ||
        (i === currentPage + 2 && i < max)
      ) {
        items.push(
          <li
            key={i}
            className={clsx([
              style.item,
              { [style.active]: currentPage === i },
            ])}
          >
            ...
          </li>
        );
      }
    }
    return items;
  }, [
    total,
    pageSize,
    currentPage,
    onSetPage,
    replace,
    pathname,
    searchParams,
  ]);

  const handlePrev = () => {
    if (currentPage > 1) {
      if (!!onSetPage) {
        onSetPage((prev: any) => prev - 1);
      } else {
        replace(
          newQueryPath(pathname, searchParams, {
            page: currentPage - 1,
          })
        );
      }
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(total / pageSize)) {
      if (!!onSetPage) {
        onSetPage((prev: any) => prev + 1);
      } else {
        replace(
          newQueryPath(pathname, searchParams, {
            page: currentPage + 1,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!!onSetPage) {
      onSetPage(() => 1);
    } else {
      if (isReady) {
        replace(
          newQueryPath(pathname, searchParams, {
            page: 1,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return (
    <div className={style.main}>
      {!!total && total != 0 ? (
        <Fragment>
          <div className={style.text}>
            {i18n.t("Home.display")} <b>1 - {pageSize}</b>{" "}
            {i18n.t("Home.inTotal")} <b>{total}</b>
          </div>
          <div className={style.page}>
            {total > pageSize ? (
              <Fragment>
                {!disableArrow && isShowBtn && currentPage > 1 && (
                  <button
                    className={clsx([style.btn, style.left])}
                    onClick={handlePrev}
                  >
                    <IoChevronBackOutline />
                  </button>
                )}
                <ul className={style.list}>{items}</ul>
                {!disableArrow &&
                  isShowBtn &&
                  currentPage < Math.ceil(total / pageSize) && (
                    <button
                      className={clsx([style.btn, style.right])}
                      onClick={handleNext}
                    >
                      <IoChevronForwardOutline />
                    </button>
                  )}
              </Fragment>
            ) : null}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}

export default memo(Pagination);
