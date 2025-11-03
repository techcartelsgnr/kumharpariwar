import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../theme/theme';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const formstyles = StyleSheet.create({
  FormsContainer: {
    flex: 1,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Formsheader: {
    flex: 1,
  },
  FormsheaderImage: {
    height: 90,
    resizeMode: 'contain',
  },
  Formsfooter: {},
  loginPageHeaderImage: {
    height: 200,
    width: 200,
  },
  registerPageHeaderImage: {
    height: 200,
    width: 200,
  },
  forgotPageHeaderImage: {
    height: '100%',
    width: '100%',
  },

  // Register Page Css
  container: {
    flex: 1,
    backgroundColor: '#42b96d',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderBottomLeftRadius: 80,
  },
  headerregister: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderBottomLeftRadius: 80,
  },
  headerForgot: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  loginBtn: {
    flex: 1,
  },
  headerImage: {
    height: 100,
    resizeMode: 'contain',
  },
  RegisterTopText: {
    // fontFamily: 'Ubuntu-Bold',
    fontFamily: 'Baloo2-Medium',
    fontSize: 32,
    marginTop: 10,
    color: COLORS.white,
  },
  RegisterTopText1: {
    // fontFamily: 'Ubuntu-Bold',
    fontFamily: 'Hind-Bold',
    fontSize: 32,
    marginTop: 5,
    color: COLORS.dark,
  },
  formText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: COLORS.dark,
  },
  formIcon: {
    color: COLORS.dark,
    fontSize: 22,
    marginRight: 5,
  },
  loginBottomHeading: {
    fontFamily: 'Hind-Bold',
    textAlign: 'center',
    color: COLORS.dark,
    fontSize: 16,
  },
  loginBottomCompanyName: {
    color: COLORS.blue,
    fontFamily: 'OleoScript-Bold',
    fontSize: 25,
  },
  // OTP Screen
  timeOtpBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rtimesText: {
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
    color: COLORS.dark,
  },
  resendOtpText: {
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
    color: COLORS.darkblue,
  },
});
export {formstyles};
