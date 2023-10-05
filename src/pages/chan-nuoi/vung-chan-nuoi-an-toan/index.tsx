import { Fragment, ReactElement } from "react";

import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";

export default function Page() {
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("animalHusbandry.safeFarmingArea")}</title>
      </Head>
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
