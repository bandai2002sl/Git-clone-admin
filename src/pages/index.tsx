import { Fragment, ReactElement, useState } from "react";

import BaseLayout from "~/components/layout/BaseLayout";
import Button from "~/components/common/Button";
import Dialog from "~/components/common/Dialog";
import Head from "next/head";
import Pagination from "~/components/common/Pagination";
import Table from "~/components/common/Table";
import i18n from "~/locale/i18n";
import { setStateLogin } from "~/redux/reducer/auth";
import { store } from "~/redux/store";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Home.home")}</title>
      </Head>
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
