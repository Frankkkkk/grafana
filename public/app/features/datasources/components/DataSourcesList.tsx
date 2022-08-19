import { css } from '@emotion/css';
import React from 'react';
import { useSelector } from 'react-redux';

import { DataSourceSettings } from '@grafana/data';
import { Card, Tag, useStyles } from '@grafana/ui';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import PageLoader from 'app/core/components/PageLoader/PageLoader';
import { contextSrv } from 'app/core/core';
import { Button } from 'app/gui/Button/Button';
import { ButtonSize, ButtonVariant, ButtonVibe } from 'app/gui/Button/types';
import Inline from 'app/gui/Inline/Inline';
import Stack from 'app/gui/Stack/Stack';
import { StoreState, AccessControlAction } from 'app/types';

import GuiCard from '../../../gui/Card/Card';
import { getDataSources, getDataSourcesCount, useDataSourcesRoutes, useLoadDataSources } from '../state';

import { DataSourcesListHeader } from './DataSourcesListHeader';

export function DataSourcesList() {
  useLoadDataSources();

  const dataSources = useSelector((state: StoreState) => getDataSources(state.dataSources));
  const dataSourcesCount = useSelector(({ dataSources }: StoreState) => getDataSourcesCount(dataSources));
  const hasFetched = useSelector(({ dataSources }: StoreState) => dataSources.hasFetched);
  const hasCreateRights = contextSrv.hasPermission(AccessControlAction.DataSourcesCreate);

  return (
    <DataSourcesListView
      dataSources={dataSources}
      dataSourcesCount={dataSourcesCount}
      isLoading={!hasFetched}
      hasCreateRights={hasCreateRights}
    />
  );
}

export type ViewProps = {
  dataSources: DataSourceSettings[];
  dataSourcesCount: number;
  isLoading: boolean;
  hasCreateRights: boolean;
};

export function DataSourcesListView({ dataSources, dataSourcesCount, isLoading, hasCreateRights }: ViewProps) {
  const styles = useStyles(getStyles);
  const dataSourcesRoutes = useDataSourcesRoutes();

  if (isLoading) {
    return <PageLoader />;
  }

  if (dataSourcesCount === 0) {
    return (
      <EmptyListCTA
        buttonDisabled={!hasCreateRights}
        title="No data sources defined"
        buttonIcon="database"
        buttonLink={dataSourcesRoutes.New}
        buttonTitle="Add data source"
        proTip="You can also define data sources through configuration files."
        proTipLink="http://docs.grafana.org/administration/provisioning/#datasources?utm_source=grafana_ds_list"
        proTipLinkTitle="Learn more"
        proTipTarget="_blank"
      />
    );
  }

  return (
    <>
      <Stack gap="medium">
        <Stack gap="medium">
          <Button variant={ButtonVariant.Solid} vibe={ButtonVibe.Primary} size={ButtonSize.Standard}>
            Solid / Primary / Standard
          </Button>

          <Button variant={ButtonVariant.Solid} vibe={ButtonVibe.Neutral} size={ButtonSize.Standard}>
            Solid / Secondary / Standard
          </Button>

          <Button variant={ButtonVariant.Solid} vibe={ButtonVibe.Success} size={ButtonSize.Standard}>
            Solid / Success / Standard
          </Button>

          <Button variant={ButtonVariant.Solid} vibe={ButtonVibe.Critical} size={ButtonSize.Standard}>
            Solid / Critical / Standard
          </Button>
        </Stack>

        <Inline gap="medium">
          <Button variant={ButtonVariant.Outline} vibe={ButtonVibe.Primary} size={ButtonSize.Standard}>
            Outline / Primary / Standard
          </Button>

          <Button variant={ButtonVariant.Outline} vibe={ButtonVibe.Neutral} size={ButtonSize.Standard}>
            Outline / Secondary / Standard
          </Button>
          <Button variant={ButtonVariant.Outline} vibe={ButtonVibe.Success} size={ButtonSize.Standard}>
            Outline / Success / Standard
          </Button>
          <Button variant={ButtonVariant.Outline} vibe={ButtonVibe.Critical} size={ButtonSize.Standard}>
            Outline / Critical / Standard
          </Button>
        </Inline>
      </Stack>

      <Stack gap="medium">
        {dataSources.map((datasource) => (
          <GuiCard key={datasource.uid} title={datasource.name} description={datasource.typeName} />
        ))}
      </Stack>

      <div style={{ marginTop: 32, marginBottom: 32 }}>
        <hr />
      </div>

      {/* List Header */}
      <DataSourcesListHeader />

      {/* List */}
      <ul className={styles.list}>
        {dataSources.map((dataSource) => {
          return (
            <li key={dataSource.uid}>
              <Card href={dataSourcesRoutes.Edit.replace(/:uid/gi, dataSource.uid)}>
                <Card.Heading>{dataSource.name}</Card.Heading>
                <Card.Figure>
                  <img src={dataSource.typeLogoUrl} alt="" height="40px" width="40px" className={styles.logo} />
                </Card.Figure>
                <Card.Meta>
                  {[
                    dataSource.typeName,
                    dataSource.url,
                    dataSource.isDefault && <Tag key="default-tag" name={'default'} colorIndex={1} />,
                  ]}
                </Card.Meta>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const getStyles = () => {
  return {
    list: css({
      listStyle: 'none',
      display: 'grid',
      // gap: '8px', Add back when legacy support for old Card interface is dropped
    }),
    logo: css({
      objectFit: 'contain',
    }),
  };
};
