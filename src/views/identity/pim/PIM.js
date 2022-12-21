import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { cellBooleanFormatter, cellDateFormatter, CellTip } from 'src/components/tables'


const ListPIM = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const columns = [
    {
      name: 'principalId',
      selector: (row) => row['principalId'],
      sortable: true,
      exportSelector: 'principalId',
    },
    {
      name: 'roleDefinitionId',
      selector: (row) => row['roleDefinitionId'],
      sortable: true,
      exportSelector: 'roleDefinitionId',
    },
    {
      name: 'accountEnabled',
      selector: (row) => row['accountEnabled'],
      sortable: true,
      exportSelector: 'accountEnabled',
    },
    {
      name: 'displayName',
      selector: (row) => row['displayName'],
      sortable: true,
      exportSelector: 'displayName',
    },
    {
      name: 'userPrincipalName',
      selector: (row) => row['userPrincipalName'],
      sortable: true,
      exportSelector: 'userPrincipalName',
    },
    {
      name: 'principalId',
      selector: (row) => row['principalId'],
      sortable: true,
      exportSelector: 'principalId',
    },
    {
      name: 'status',
      selector: (row) => row['status'],
      sortable: true,
      exportSelector: 'status',
    },
    {
      name: 'startDateTime',
      selector: (row) => row['startDateTime'],
      sortable: true,
      exportSelector: 'startDateTime',
    },
    {
      name: 'expiration',
      selector: (row) => row['expiration'],
      sortable: true,
      exportSelector: 'expiration',
    },
  ]

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="List PIM"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-PIM`,
        path: '/api/ListPIM',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default ListPIM
