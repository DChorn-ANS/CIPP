import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'

const columns = [
  {
    name: 'Tenant',
    selector: (row) => row['Tenant'],
    sortable: true,
    cell: (row) => CellTip(row['Tenant']),
    wrap: true,
    exportSelector: 'Tenant',
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
        columns,
      }}
    />
  )
}

export default LicenseList
