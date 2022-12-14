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
  {
    name: 'ATPEnabled',
    selector: (row) => row['ATPEnabled'],
    sortable: true,
    cell: (row) => CellTip(row['ATPEnabled']),
    exportSelector: 'ATPEnabled',
  },
  {
    name: 'HasAADP1',
    selector: (row) => row['HasAADP1'],
    sortable: true,
    cell: (row) => CellTip(row['HasAADP1']),
    exportSelector: 'HasAADP1',
  },
  {
    name: 'HasAADP2',
    selector: (row) => row['HasAADP2'],
    sortable: true,
    cell: (row) => CellTip(row['HasAADP2']),
    exportSelector: 'HasAADP2',
  },
  {
    name: 'AdminMFAV2',
    selector: (row) => row['AdminMFAV2'],
    sortable: true,
    cell: (row) => CellTip(row['AdminMFAV2']),
    exportSelector: 'AdminMFAV2',
  },
  {
    name: 'MFARegistrationV2',
    selector: (row) => row['MFARegistrationV2'],
    sortable: true,
    cell: (row) => CellTip(row['MFARegistrationV2']),
    exportSelector: 'MFARegistrationV2',
  },
  {
    name: 'GlobalAdminCount',
    selector: (row) => row['GlobalAdminCount'],
    sortable: true,
    cell: (row) => CellTip(row['GlobalAdminCount']),
    exportSelector: 'GlobalAdminCount',
  },
  {
    name: 'BlockLegacyAuthentication',
    selector: (row) => row['BlockLegacyAuthentication'],
    sortable: true,
    cell: (row) => CellTip(row['BlockLegacyAuthentication']),
    exportSelector: 'BlockLegacyAuthentication',
  },
  {
    name: 'PasswordHashSync',
    selector: (row) => row['PasswordHashSync'],
    sortable: true,
    cell: (row) => CellTip(row['PasswordHashSync']),
    exportSelector: 'PasswordHashSync',
  },
  {
    name: 'SigninRiskPolicy',
    selector: (row) => row['SigninRiskPolicy'],
    sortable: true,
    cell: (row) => CellTip(row['SigninRiskPolicy']),
    exportSelector: 'SigninRiskPolicy',
  },
  {
    name: 'UserRiskPolicy',
    selector: (row) => row['UserRiskPolicy'],
    sortable: true,
    cell: (row) => CellTip(row['UserRiskPolicy']),
    exportSelector: 'UserRiskPolicy',
  },
  {
    name: 'PWAgePolicyNew',
    selector: (row) => row['PWAgePolicyNew'],
    sortable: true,
    cell: (row) => CellTip(row['PWAgePolicyNew']),
    exportSelector: 'PWAgePolicyNew',
  },
  {
    name: 'SelfServicePasswordReset',
    selector: (row) => row['SelfServicePasswordReset'],
    sortable: true,
    cell: (row) => CellTip(row['SelfServicePasswordReset']),
    exportSelector: 'SelfServicePasswordReset',
  },
  {
    name: 'enableBannedPassworCheckOnPremise',
    selector: (row) => row['enableBannedPassworCheckOnPremise'],
    sortable: true,
    cell: (row) => CellTip(row['enableBannedPassworCheckOnPremise']),
    exportSelector: 'enableBannedPassworCheckOnPremise',
  },
  {
    name: 'accessPackages',
    selector: (row) => row['accessPackages'],
    sortable: true,
    cell: (row) => CellTip(row['accessPackages']),
    exportSelector: 'accessPackages',
  },
  {
    name: 'SecureDefaultState',
    selector: (row) => row['SecureDefaultState'],
    sortable: true,
    cell: (row) => CellTip(row['SecureDefaultState']),
    exportSelector: 'SecureDefaultState',
  },
  {
    name: 'AdminSessionbyCA',
    selector: (row) => row['AdminSessionbyCA'],
    sortable: true,
    cell: (row) => CellTip(row['AdminSessionbyCA']),
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
