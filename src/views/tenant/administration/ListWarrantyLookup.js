import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CCollapse,
  CForm,
  CRow,
} from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { Field, Form, FormSpy } from 'react-final-form'
import { RFFCFormCheck, RFFCFormInput, RFFCFormSelect } from 'src/components/forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CippTable } from 'src/components/tables'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CippPage } from 'src/components/layout/CippPage'
import { useLazyGenericGetRequestQuery } from 'src/store/api/app'
import { OnChange } from 'react-final-form-listeners'
import { queryString } from 'src/helpers'
import { cellGenericFormatter } from 'src/components/tables/CellGenericFormat'

const GraphExplorer = () => {
  let navigate = useNavigate()
  const tenant = useSelector((state) => state.app.currentTenant)
  let query = useQuery()
  const serialnumber = query.get('serialnumber')
  const SearchNow = query.get('SearchNow')
  const [visibleA, setVisibleA] = useState(true)
  const handleSubmit = async (values) => {
    setVisibleA(false)

    const shippedValues = {
      tenantFilter: tenant.defaultDomainName,
      SearchNow: true,
      serialnumber: encodeURIComponent(values.serialnumber),
    }
    var queryString = Object.keys(shippedValues)
      .map((key) => key + '=' + shippedValues[key])
      .join('&')

    navigate(`?${queryString}`)
  }
  const [ListWarrantyLookup, graphrequest] = useLazyGenericGetRequestQuery()
  const QueryColumns = { set: false, data: [] }

  if (graphrequest.isSuccess) {
    if (graphrequest.data.length === 0) {
      graphrequest.data = [{ data: 'No Data Found' }]
    }

    //set columns

    const flatObj = Object.keys(graphrequest.data[0]).flat(100)
    flatObj.map((value) =>
      QueryColumns.data.push({
        name: value,
        selector: (row) => row[`${value.toString()}`],
        sortable: true,
        exportSelector: value,
        cell: cellGenericFormatter(),
      }),
    )
    QueryColumns.set = true
  }

  useEffect(() => {
    ListWarrantyLookup({
      path: 'api/ListWarrantyLookup',
      params: {
        tenantFilter: tenant.defaultDomainName,
        serialnumber: serialnumber,
      },
    })
  }, [serialnumber, ListWarrantyLookup, tenant.defaultDomainName, query])

  const WhenFieldChanges = ({ field, set }) => (
    <Field name={set} subscription={{}}>
      {(
        // No subscription. We only use Field to get to the change function
        { input: { onChange } },
      ) => (
        <FormSpy subscription={{}}>
          {({ form }) => (
            <OnChange name={field}>
              {(value) => {
                let template = value
                onChange(template)
              }}
            </OnChange>
          )}
        </FormSpy>
      )}
    </Field>
  )

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="options-card">
            <CCardHeader>
              <CCardTitle className="d-flex justify-content-between">
                Report Settings
                <CButton size="sm" variant="ghost" onClick={() => setVisibleA(!visibleA)}>
                  <FontAwesomeIcon icon={visibleA ? faChevronDown : faChevronRight} />
                </CButton>
              </CCardTitle>
            </CCardHeader>
            <CCollapse visible={visibleA}>
              <CCardBody>
                <Form
                  initialValues={{
                    tenantFilter: tenant.defaultDomainName,
                    serialnumber: serialnumber,
                  }}
                  onSubmit={handleSubmit}
                  render={({ handleSubmit, submitting, values }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <CRow>
                          <CCol>
                            <RFFCFormInput
                              type="text"
                              name="serialnumber"
                              label="Enter Serial Number for Lookup"
                              placeholder="Enter the serial number you'd like to run."
                            />
                          </CCol>
                          <WhenFieldChanges field="reportTemplate" set="serialnumber" />
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CButton type="submit" disabled={submitting}>
                              <FontAwesomeIcon className="me-2" icon={faSearch} />
                              Query
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )
                  }}
                />
              </CCardBody>
            </CCollapse>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <CippPage title="Report Results" tenantSelector={false}>
        {!SearchNow && <span>Execute a search to get started.</span>}
        {graphrequest.isSuccess && QueryColumns.set && SearchNow && (
          <CCard className="content-card">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle>Results</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CippTable
                reportName="GraphExplorer"
                dynamicColumns={false}
                columns={QueryColumns.data}
                data={graphrequest.data}
                isFetching={graphrequest.isFetching}
              />
            </CCardBody>
          </CCard>
        )}
      </CippPage>
    </>
  )
}

export default GraphExplorer
