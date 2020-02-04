import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  CommunityGuide,
} from '../../components';
import config from '../../config';

import css from './CommunityGuidePage.css';

const CommunityGuidePageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'CommunityGuidePage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidePage.tosTabTitle' }),
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidePage.cgTabTitle' }),
      selected: true,
      linkProps: {
        name: 'CommunityGuidePage',
      },
    },
		   {
      text:'Fees Explained', 
      selected: false,
      linkProps: {
        name: 'FeesExplained',
      },
    },
	
	{
      text:'Cancellation Policy',
      selected: false,
      linkProps: {
        name: 'CancellationPolicy',
      },
    }

  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'CommunityGuide.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="CommunityGuidePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="CommunityGuidePage.heading" />
            </h1>
            <CommunityGuide />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

CommunityGuidePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const CommunityGuidePage = compose(
  connect(mapStateToProps),
  injectIntl
)(CommunityGuidePageComponent);

export default CommunityGuidePage;
