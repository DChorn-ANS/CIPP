import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'

const columns = [
  {
    name: 'Customer Name',
    selector: (row) => row['customername'],
    sortable: true,
    cell: (row) => CellTip(row['customername']),
    wrap: true,
    exportSelector: 'customername',
  },
  {
    name: 'ID',
    selector: (row) => row['customerid'],
    sortable: true,
    cell: (row) => CellTip(row['customerid']),
    wrap: true,
    exportSelector: 'customerid',
  },
]

const LicenseList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="Licenses Report"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-licenses`,
        path: '/api/NCListClients',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default LicenseList
