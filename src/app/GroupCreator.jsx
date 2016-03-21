import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import {fetchQuerysetsIfNotFetched, saveQueryFromState} from 'groups/GroupActions';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import GroupFilters from 'groups/GroupFilters';
import Button from 'components/Button';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';

@connect(state => state.groups)
@Radium
export default class GroupCreator extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // only the first time
  componentWillMount() {
    // redirect user to /login if they're not logged in
    //   TODO: refactor: pass in a function that calculates auth state
    if (window.requireLogin && !this.props.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }

    this.props.dispatch(fetchQuerysetsIfNotFetched());
  }

  saveGroup() {
    // all the code triggered here needs to be moved to a xenia package
    const randomId = Math.floor(Math.random() * 99999);
    this.props.dispatch(saveQueryFromState(`Group ${randomId}`, 'Sample group description'));
  }

  render() {

    return (

      <Page>

        <ContentHeader title={ window.L.t('Group Creator') } />

        <p>There are 106 active users on Politics, with between 0 and 10000 comments, between 50% and 100% comments accepted.</p>

        <div style={styles.base}>
          <GroupFilters userOnly={true}/>

          <div style={styles.rightPanel}>
            <Button onClick={this.saveGroup.bind(this)} category="primary" style={{float: 'right'}}>
              Save Group <FaFloopyO style={styles.saveIcon} />

            </Button>
            <div style={styles.userList}>
              <UserList disabled={true} userSelected={()=>{}} users={this.props.users} />
            </div>
          </div>

        </div>

      </Page>
    );
  }
}
const styles = {
  base: {
    display: 'flex',
    minHeight: 250
  },
  rightPanel: {
    flex: 1
  },
  userList: {
    marginTop: 5,
    height: '100%'
  },
  saveIcon: {
    width: 25,
    height: 25
  }
};
