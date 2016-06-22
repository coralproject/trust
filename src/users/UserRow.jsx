import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import ListItem from 'components/lists/ListItem';

@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    setAsActive: React.PropTypes.func,
    activeIndex: React.PropTypes.number,
    disabled: React.PropTypes.bool
  }
  static defaultProps = {
    active: true,
    breakdown: 'all',
    specificBreakdown: 'all'
  }

  handleClick() {
    if (!this.props.disabled) {
      this.props.setAsActive(this.props.activeIndex);
      this.props.onClick(this.props.user);
    }
  }
  userChangedFilter(filterName) {
    const f = this.props.filters[filterName];
    const maxDifferent = f.userMax !== f.max && f.userMax < f.max;
    const minDifferent = f.userMin !== f.min && f.userMin > f.min;
    return {
      either: maxDifferent || minDifferent,
      both: !(maxDifferent && minDifferent)
    };
  }

  getNonDefaultFilters() {
    const { breakdown, specificBreakdown, user } = this.props;

    return this.props.filters.filterList.map((filterName, i) => {
      if (this.userChangedFilter(filterName).either) {
        if (this.props.filters[filterName].field === 'SystemFlagged') {
          return (
            <p key={i} style={styles.stat}>
              {`${this.props.user.statistics.comments.all.SystemFlagged.count} flagged by system`}
            </p>
          );
        }

        let dimension = _.template(this.props.filters[filterName].template)({ dimension: `${breakdown}.${specificBreakdown}` });
        dimension = _.get(user, dimension);
        let stat;
        switch (this.props.filters[filterName].type) {
        case 'dateRange':
        case 'intDateProximity':
          stat = '';
          // stat = `${this.props.user.statistics.comments.all.all[this.props.filters[filterName].field]} ${this.props.filters[filterName].name}`;
          // <DateRangeClause {...this.props.filters[filterName]}/>;
          break;
        case 'percentRange':
          stat = `${Math.floor(dimension * 100)}% ${this.props.filters[filterName].name}`;
          // <PercentClause {...this.props.filters[filterName]}/>;
          break;
        default:
          let num = parseInt(dimension, 10);
          if (isNaN(num)) {
            num = parseFloat(dimension).toFixed(2);
          }
          if (isNaN(num)) {
            return;
          }
          // truncating to 2 decimals
          stat = `${num} ${this.props.filters[filterName].name}`;
          // <IntClause {...this.props.filters[filterName]}/>;
        }

        return (
          <p key={i} style={styles.stat}>
            {stat}
          </p>
        );
      }
    });
  }

  render() {
    let {active, disabled, breakdown, specificBreakdown} = this.props;
    specificBreakdown = specificBreakdown || 'all';
    if (specificBreakdown === 'all') breakdown = 'all';

    const {user} = this.props;

    let dimension = user.statistics.comments[breakdown][specificBreakdown];

    return (
      <ListItem
        active={active}
        style={[styles.base, disabled && styles.disabled, this.props.style]}
        onClick={this.handleClick.bind(this)}
        >
        <div style={styles.flex}>
          <div>
            <span style={styles.link} onClick={this.props.onClick}>{user.name}</span>
            {this.getNonDefaultFilters()}
          </div>
        </div>
      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer',
    overflow: 'hidden'
    // height: 100
  },
  stat: {
    fontSize: 12
  },
  flex: {
    display: 'flex'
  },
  disabled: {
    cursor: 'auto'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  },
  avatar: {
    height: 50,
    marginRight: 10
  },
  link: {
    textDecoration: 'none',
    color: '#000'
  }
};
