import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import {
  CellBoolean,
  CellBadge,
  cellBooleanFormatter,
  cellBadgeFormatter,
} from 'src/components/tables'

const columns = [
  {
    name: 'Tenant',
    selector: (row) => row['Tenant'],
    sortable: true,
    wrap: true,
    exportSelector: 'Tenant',
  },
  {
    name: 'ATPEnabled',
    selector: (row) => row['ATPEnabled'],
    sortable: true,
    cell: cellBooleanFormatter(),
    exportSelector: 'ATPEnabled',
  },
  {
    name: 'HasAADP1',
    selector: (row) => row['HasAADP1'],
    sortable: true,
    cell: cellBooleanFormatter(),
    exportSelector: 'HasAADP1',
  },
  {
    name: 'HasAADP2',
    selector: (row) => row['HasAADP2'],
    sortable: true,
    cell: cellBooleanFormatter(),
    exportSelector: 'HasAADP2',
  },
  {
    name: 'AdminMFAV2',
    selector: (row) => row['AdminMFAV2'],
    sortable: true,
    cell: (row, index, column) => {
      const cell = column.selector(row)
      if (cell > 0) {
        return <cellBadge color="warning" label={cell}/>
      } else if ((cell = 0)) {
        return <CellBoolean cell={true} />
      }
    },
    exportSelector: 'AdminMFAV2',
  },
  {
    name: 'MFARegistrationV2',
    selector: (row) => row['MFARegistrationV2'],
    sortable: true,
    exportSelector: 'MFARegistrationV2',
  },
  {
    name: 'GlobalAdminCount',
    selector: (row) => row['GlobalAdminCount'],
    sortable: true,
    exportSelector: 'GlobalAdminCount',
  },
  {
    name: 'BlockLegacyAuthentication',
    selector: (row) => row['BlockLegacyAuthentication'],
    sortable: true,
    exportSelector: 'BlockLegacyAuthentication',
  },
  {
    name: 'PasswordHashSync',
    selector: (row) => row['PasswordHashSync'],
    sortable: true,
    exportSelector: 'PasswordHashSync',
  },
  {
    name: 'SigninRiskPolicy',
    selector: (row) => row['SigninRiskPolicy'],
    sortable: true,
    exportSelector: 'SigninRiskPolicy',
  },
  {
    name: 'UserRiskPolicy',
    selector: (row) => row['UserRiskPolicy'],
    sortable: true,
    exportSelector: 'UserRiskPolicy',
  },
  {
    name: 'PWAgePolicyNew',
    selector: (row) => row['PWAgePolicyNew'],
    sortable: true,
    exportSelector: 'PWAgePolicyNew',
  },
  {
    name: 'SelfServicePasswordReset',
    selector: (row) => row['SelfServicePasswordReset'],
    sortable: true,
    cell: (row, index, column) => {
      const cell = column.selector(row)
      if (cell === 'Off') {
        return <CellBadge label="Off All Users" color="warning" />
      } else if (cell === 'On') {
        return <CellBadge label="On All Users" color="success" />
      } else if (cell === 'Specific Users') {
        return <CellBadge label="Specific Users" color="info" />
      }
      return <CellBadge label="No Data" color="info" />
    },
    exportSelector: 'SelfServicePasswordReset',
  },
  {
    name: 'enableBannedPassworCheckOnPremise',
    selector: (row) => row['enableBannedPassworCheckOnPremise'],
    sortable: true,
    cell: cellBooleanFormatter(),
    exportSelector: 'enableBannedPassworCheckOnPremise',
  },
  {
    name: 'accessPackages',
    selector: (row) => row['accessPackages'],
    sortable: true,
    exportSelector: 'accessPackages',
  },
  {
    name: 'SecureDefaultState',
    selector: (row) => row['SecureDefaultState'],
    sortable: true,
    cell: cellBooleanFormatter({ reverse: true }),
    exportSelector: 'SecureDefaultState',
  },
  {
    name: 'AdminSessionbyCA',
    selector: (row) => row['AdminSessionbyCA'],
    sortable: true,
    exportSelector: 'AdminSessionbyCA',
  },
]

const CISframework = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="CIS Standards Report"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-CISstandards`,
        path: '/api/CISstandard',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default CISframework
