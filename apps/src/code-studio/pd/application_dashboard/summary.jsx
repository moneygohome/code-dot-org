/**
 * Application Dashboard summary view.
 * Route: /summary
 */
import React, {PropTypes} from 'react';
import SummaryTable from './summary_table';
import RegionalPartnerDropdown from './regional_partner_dropdown';
import Spinner from '../components/spinner';
import {AllPartnersFilter} from './constants';
import $ from 'jquery';

export default class Summary extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      regionalPartnerName: PropTypes.string.isRequired,
      regionalPartners: PropTypes.array,
      isWorkshopAdmin: PropTypes.bool
    })
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    applications: null,
    regionalPartnerName: this.props.route.regionalPartnerName,
    regionalPartnerFilter: null
  };

  constructor(props) {
    super(props);
    this.handleRegionalPartnerChange = this.handleRegionalPartnerChange.bind(this);
  }

  componentWillMount() {
    $.ajax({
      method: 'GET',
      url: '/api/v1/pd/applications',
      dataType: 'json'
    })
    .done(data => {
      this.setState({
        loading: false,
        applications: data
      });
    });
  }

  handleRegionalPartnerChange = (selected) => {
    const regionalPartnerFilter = selected ? selected.value : null;
    const regionalPartnerName = selected ? selected.label : this.props.route.regionalPartnerName;
    this.setState({regionalPartnerName, regionalPartnerFilter});
    $.ajax({
      method: 'GET',
      url: `/api/v1/pd/applications?regional_partner_filter=${regionalPartnerFilter ? regionalPartnerFilter : AllPartnersFilter}`,
      dataType: 'json'
    })
    .done(data => {
      this.setState({
        loading: false,
        applications: data
      });
    });
  };

  render() {
    if (this.state.loading) {
      return <Spinner/>;
    }
    return (
      <div>
        {this.props.route.isWorkshopAdmin &&
          <RegionalPartnerDropdown
            onChange={this.handleRegionalPartnerChange}
            regionalPartnerFilter={this.state.regionalPartnerFilter}
            regionalPartners={this.props.route.regionalPartners}
            isWorkshopAdmin={this.props.route.isWorkshopAdmin}
          />
        }
        <h1>{this.state.regionalPartnerName}</h1>
        <div className="row">
          <SummaryTable
            caption="CS Fundamentals Facilitators"
            data={this.state.applications["csf_facilitators"]}
            path="csf_facilitators"
          />
          <SummaryTable
            caption="CS Discoveries Facilitators"
            data={this.state.applications["csd_facilitators"]}
            path="csd_facilitators"
          />
          <SummaryTable
            caption="CS Principles Facilitators"
            data={this.state.applications["csp_facilitators"]}
            path="csp_facilitators"
          />
        </div>
      </div>
    );
  }
}
