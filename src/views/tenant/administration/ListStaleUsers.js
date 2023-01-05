import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'

const columns = [
  {
    name: 'User',
    selector: (row) => row['DisplayName'],
    sortable: true,
    cell: (row) => CellTip(row['DisplayName']),
    exportSelector: 'User',
  },
  {
    name: 'UPN',
    selector: (row) => row['UPN'],
    sortable: true,
    cell: (row) => CellTip(row['UPN']),
    exportSelector: 'UPN',
  },
  {
    name: 'lastSignInDate',
    selector: (row) => row['lastSignInDate'],
    sortable: true,
    exportSelector: 'lastSignInDate',
  },
  {
    name: 'Outlook Activity',
    selector: (row) => row['OutlookActivity'],
    sortable: true,
    exportSelector: 'OutlookActivity',
  },
  {
    name: 'Emails Sent',
    selector: (row) => row['EmailsSent'],
    sortable: true,
    exportSelector: 'EmailsSent',
  },
  {
    name: 'Onedrive Activity',
    selector: (row) => row['OnedriveActivity'],
    sortable: true,
    exportSelector: 'OnedriveActivity',
  },
  {
    name: 'ODViewedFileCount',
    selector: (row) => row['ODViewedFileCount'],
    sortable: true,
    exportSelector: 'ODViewedFileCount',
  },
  {
    name: 'Sharepoint Activity',
    selector: (row) => row['SharepointActivity'],
    sortable: true,
    exportSelector: 'SharepointActivity',
  },
  {
    name: 'SPViewedFileCount',
    selector: (row) => row['SPViewedFileCount'],
    sortable: true,
    exportSelector: 'SPViewedFileCount',
  },
  {
    name: 'Teams Activity',
    selector: (row) => row['TeamsActivity'],
    sortable: true,
    exportSelector: 'TeamsActivity',
  },
  {
    name: 'Message Count',
    selector: (row) => row['MessageCount'],
    sortable: true,
    exportSelector: 'MessageCount',
  },
]

const StaleUsersList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="Stale Users Report"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-StaleUsers`,
        path: '/api/ListStaleUsers',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default StaleUsersList
