import { Tab, TabProps } from '@grafana/ui';
import { DashboardModel, PanelModel } from 'app/features/dashboard/state';

import { usePanelCombinedRules } from './hooks/usePanelCombinedRules';

interface Props extends Omit<TabProps, 'counter' | 'ref'> {
  panel: PanelModel;
  dashboard: DashboardModel;
}

// it will load rule count from backend
export const PanelAlertTab = ({ panel, dashboard, ...otherProps }: Props) => {
  const { rules, loading } = usePanelCombinedRules({ panelId: panel.id, dashboardUID: dashboard.uid });
  return <Tab {...otherProps} counter={loading ? null : rules.length} />;
};
