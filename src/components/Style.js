import {StyleSheet, Dimensions, Platform} from 'react-native';
import {COLORS} from '../theme/theme';
import {screenHeight, screenWidth} from '../utils/constent';
import { RFValue } from 'react-native-responsive-fontsize';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // header main home
  headerbox: {
    height: Platform.OS === 'android' ? screenHeight * 8 :  screenHeight * 10,
    backgroundColor: COLORS.blue,
    elevation: 0,
    paddingHorizontal: screenWidth * 5,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // borderBottomLeftRadius: 20,
  },
  // headerAlign: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  headerAlign: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  headerTopText: {
    color: '#fefefe',
    fontFamily: 'Baloo2-Bold',
    fontSize: RFValue(9),
  },
  headerText: {
    color: '#fefefe',
    paddingLeft: screenWidth,
    fontFamily: 'Baloo2-Bold',
    fontSize: RFValue(9),
  },
  HederIcon: {
    color: COLORS.lightyellow,
    fontSize: 20,
  },
  HederShareIcon: {
    color: COLORS.lightyellow,
    fontSize: 19,
  },
  HederWhatsappIcon: {
    color: COLORS.lightyellow,
    fontSize: 19,
  },
  HederNotificationIcon: {
    color: COLORS.lightyellow,
    fontSize: 20,
  },
  //   Slider
  sliderContainer: {
    height: 180,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    elevation: 4,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    resizeMode: 'stretch',
  },
  // HomePage Css
  registerBox: {
    backgroundColor: COLORS.darkblue,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  registerTopBox: {
    padding: 20,
  },
  registerText: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 34,
    textAlign: 'center',
    fontFamily: 'ProtestRiot-Regular',
  },
  // Header Common
  headercommonbox: {
    height: Platform.OS === 'android' ? screenHeight * 10 :  screenHeight * 6,
    backgroundColor: COLORS.blue,
    elevation: 0,
    paddingBottom:Platform.OS === 'android' ? screenHeight * 2 : screenHeight * 2,
    paddingHorizontal: screenWidth * 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
  },
  headercommonAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headercommonText: {
    color: '#fefefe',
    paddingLeft: 10,
    fontFamily: 'Baloo2-Bold',
    fontSize: RFValue(12),
    flexWrap: 'wrap',
  },
  headercommonIcon: {
    color: '#fefefe',
    fontSize: RFValue(18),
  },
  // Registration Form Css
  RegFormText: {
    color: COLORS.dark,
    fontFamily: 'Hind-Bold',
    fontSize: 14,
  },
  regForMargin: {
    marginTop: 10,
  },
  SDDateTimeBox: {
    borderWidth: 1,
    // backgroundColor: '#f1f5f9',
    borderColor: COLORS.gray,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  SDDateTimeText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  SDformIcon: {
    color: COLORS.dark,
    fontSize: 20,
    marginRight: 5,
  },
  addressTextarea: {
    borderColor: '#e1e1e3',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
    height: 100,
    textAlignVertical: 'top',
    color: COLORS.dark,
    fontFamily: 'Baloo2-Bold',
  },
  SDDateTimeBoxDropdown: {
    color: COLORS.dark,
    zIndex: 100,
    borderWidth: 1,
    // backgroundColor: '#f1f5f9',
    borderColor: COLORS.gray,
  },
  rFormDropdown: {
    width: '100%',
    borderWidth: 1,
    zIndex: 1000,
    borderColor: COLORS.gray,

    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    fontFamily: 'Baloo2-Bold',
  },
  SDDateTimeText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 14,
    color: COLORS.dark,
    textTransform: 'capitalize',
  },
  rFormicon: {
    fontSize: 20,
    paddingRight: 5,
  },

  // Refferal
  gradient: {
    flex: 1,
    position: 'relative',
  },
  WPDHeader: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  WPDMainIcon: {
    color: COLORS.white,
    fontSize: 22,
  },
  ReferralHeading: {
    fontSize: 22,
    lineHeight: 32,
    fontFamily: 'OleoScript-Regular',
    letterSpacing: 1,
    color: COLORS.white,
    marginHorizontal: 15,
    textAlign: 'center',
    marginTop: 0,
  },
  formHeader: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  refferalTotalBox: {},
  ReferralTotalText: {
    fontSize: 28,
    fontFamily: 'Hind-Bold',
    color: COLORS.white,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  ReferralTotalDesc: {
    fontSize: 12,
    fontFamily: 'Hind-Bold',
    color: COLORS.white,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  refferalTopBanner: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  referralBannerImage: {
    height: 179,
    width: 350,
    resizeMode: 'cover',
  },
  ReferralTopMessage: {
    fontSize: 13,
    fontFamily: 'Hind-Bold',
    color: COLORS.white,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  referralBottom: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff', // Changed to a solid color for visibility
    padding: 20,
    borderRadius: 5,
  },
  referralWorkBox: {
    backgroundColor: COLORS.instacolor,
    alignSelf: 'center',
    position: 'absolute',
    top: -18,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ReferralWorkText: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: 'Hind-Bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  referralImage: {
    height: 50,
    width: 50,
  },
  referBtmSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referBtmLeft: {
    width: width * 0.12,
  },
  referBtmRight: {
    flexDirection: 'column',
    width: width * 0.72,
    paddingLeft: 10,
  },
  referBtmRightHeading: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Hind-Bold',
    color: COLORS.redcolor,
    textTransform: 'capitalize',
  },
  referBtmRightContent: {
    fontSize: 11,
    lineHeight: 18,
    fontFamily: 'Hind-Bold',
    color: COLORS.dark,
  },
  referralBorder: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginVertical: 15,
  },
  referralLinkMain: {},
  referralLinkMainHeading: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Hind-Bold',
    color: COLORS.redcolor,
    textTransform: 'capitalize',
  },
  referralLinkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginTop: 10,
    height: 40,
  },
  referralLinkBoxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  referralLinkIcon: {
    color: COLORS.blue,
    fontSize: 22,
    marginRight: 5,
  },
  referralLinkText: {
    fontSize: 13,
    lineHeight: 32,
    fontFamily: 'Hind-Bold',
    color: COLORS.blue,
    textTransform: 'uppercase',
  },
  referralLinkBoxRight: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 15,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referralCopyLinkText: {
    fontSize: 13,

    fontFamily: 'Hind-Bold',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  referredListBtn: {
    backgroundColor: COLORS.darkblue,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Hind-Bold',
    marginTop: 20,
  },
  // referral list
  MDBox: {
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 15,
  },
  WPDMainIcon1: {
    color: COLORS.blue,
    fontSize: 22,
  },
  ReferralListHeading: {
    fontSize: 22,
    lineHeight: 32,
    fontFamily: 'Hind-Bold',
    color: COLORS.blue,
  },
  Mdetailsheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RLFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RLFirstLeft: {
    flexDirection: 'column',
  },
  MDVector: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  MDheaderText: {
    fontFamily: 'Hind-Bold',
    fontSize: 13,
    color: COLORS.dark,
  },
  MDheaderEmail: {
    fontFamily: 'Hind-Bold',
    fontSize: 11,
    color: COLORS.dark,
  },
  MDheaderEarning: {
    fontFamily: 'Hind-Bold',
    fontSize: 13,
    color: COLORS.green,
    paddingRight: 10,
  },
  MDcontent: {
    fontFamily: 'Hind-Bold',
    fontSize: 11,
    color: COLORS.white,
  },
  MDIcon: {
    fontSize: 18,
    color: COLORS.orange,
  },
  memberDetailsBox: {
    backgroundColor: COLORS.white,
    marginTop: 10,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  RLBtmBox: {
    flexDirection: 'column',
    width: '30%',
    alignItems: 'center',
    backgroundColor: COLORS.borderclr,
    paddingVertical: 10,
    borderRadius: 10,
  },

  memberDetailsRightText: {
    fontFamily: 'Hind-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.darkgreen,
  },
  // GALLERY
  leadsDetailsImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 0,
  },
  leadsDetailsImagesMain: {
    width: 102,
    height: 102,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 25,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Hind-Bold',
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 20,
    paddingBottom: 20,
  },
});
export {styles};
