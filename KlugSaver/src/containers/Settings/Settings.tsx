import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeType } from '../../constants/common';
import { CloudBackup, IThemeConstants } from '../../typings';
import { withTheme } from '../ThemeProvider/withTheme';
import { BackupStrategy } from './Components/BackupStrategy';
import DropboxModal from './Components/DropboxModal';
import { SyncingButtons } from './Components/SyncingButtons';
import { ThemePicker } from './Components/ThemePicker';

interface ISettingsProps {
  dropboxToken?: string;
  saveDropboxToken: (token: string) => void;
  saveDropboxArchive: () => void;
  restoreDropboxArchive: () => void;
  saveBackupStrategy: (cloudBackup: CloudBackup) => void;
  cloudBackup: CloudBackup;
  changeTheme: (theme: ThemeType) => void; // Redux
  setTheme: (theme: IThemeConstants) => void; // Theme Provider
  theme: IThemeConstants;
}

interface ISettingsState {
  dropboxModalOpen: boolean;
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {

  constructor(props: ISettingsProps) {
    super(props);

    this.state = {
      dropboxModalOpen: false
    };
  }

  render() {
    const { dropboxToken, saveDropboxToken, cloudBackup, theme } = this.props;
    const isDropboxLinked = !!dropboxToken;

    return <View style={styles(theme).root}>
      <BackupStrategy
        cloudBackup={cloudBackup}
        saveBackupStrategy={this.saveBackupStrategy}
      />
      <SyncingButtons
        cloudBackup={cloudBackup}
        isDropboxLinked={isDropboxLinked}
        openDropboxModal={this.openDropboxModal}
        saveArchive={this.saveArchive}
        restoreArchive={this.restoreArchive}
      />
      <DropboxModal
        dropboxModalOpen={this.state.dropboxModalOpen}
        closeDropboxModal={this.closeDropboxModal}
        saveDropboxToken={saveDropboxToken}
      />
      <ThemePicker
        theme={theme}
        changeTheme={this.changeTheme}
      />
    </View>;
  }

  private openDropboxModal = () => {
    this.setState({ dropboxModalOpen: true });
  };

  private closeDropboxModal = () => {
    this.setState({ dropboxModalOpen: false });
  }

  private saveArchive = () => {
    this.props.saveDropboxArchive();
  }

  private restoreArchive = () => {
    this.props.restoreDropboxArchive();
  }

  private saveBackupStrategy = (cloudBackup: CloudBackup) => () => {
    this.props.saveBackupStrategy(cloudBackup);
  }

  private changeTheme = (theme: ThemeType) => {
    const { setTheme, changeTheme } = this.props;

    // setTheme(theme === ThemeType.Light ? lightTheme : darkTheme);
    changeTheme(theme);
  }
}

const styles = (theme: IThemeConstants) => StyleSheet.create({
  root: {
    flex: 1
  },

});

export default withTheme(Settings);
