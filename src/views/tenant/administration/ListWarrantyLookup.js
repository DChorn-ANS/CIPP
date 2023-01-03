import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'

const columns = [
  {
    name: 'Serial',
    selector: (row) => row['Serial'],
    sortable: true,
    cell: (row) => CellTip(row['Serial']),
    wrap: true,
    exportSelector: 'Serial',
  },
  {
    name: 'Product name',
    selector: (row) => row['Warranty Product name'],
    sortable: true,
    cell: (row) => CellTip(row['Warranty Product name']),
    exportSelector: 'Warranty Product name',
  },
  {
    name: 'Start Date',
    selector: (row) => row['StartDate'],
    sortable: true,
    exportSelector: 'StartDate',
  },
  {
    name: 'End Date',
    selector: (row) => row['EndDate'],
    sortable: true,
    exportSelector: 'EndDate',
  },
  {
    name: 'Warranty Status',
    selector: (row) => row['Warranty Status'],
    sortable: true,
    exportSelector: 'Warranty Status',
  },
]

const WarrantyList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="Device Warranty Report"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DeviceWarrantyReport`,
        path: '/api/ListWarrantyLookup',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default WarrantyList
