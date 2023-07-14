import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { config } from '@grafana/runtime';
import { Page } from 'app/core/components/Page/Page';

import DataSourceTabPage from '../components/DataSourceTabPage';
import { EditDataSource } from '../components/EditDataSource';
import { EditDataSourceActions } from '../components/EditDataSourceActions';
import { useDataSourceSettingsNav } from '../hooks/useDataSourceSettingsNav';

export function EditDataSourcePage() {
  const { uid } = useParams<{ uid: string }>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageId = params.get('page');
  const dataSourcePageHeader = config.featureToggles.dataSourcePageHeader;
  const { navId, pageNav } = useDataSourceSettingsNav();

  if (dataSourcePageHeader) {
    return <DataSourceTabPage uid={uid} pageId={pageId} navId="connections-datasources" />;
  }

  return (
    <Page navId={navId} pageNav={pageNav} actions={<EditDataSourceActions uid={uid} />}>
      <Page.Contents>
        <EditDataSource uid={uid} pageId={pageId} />
      </Page.Contents>
    </Page>
  );
}
