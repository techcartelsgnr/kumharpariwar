import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/theme';
import HeaderCommon from '../../components/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import { getKarykerni } from '../../redux/slices/MoreRepoSlice';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Karykarni = () => {
  const [karyakariniData, setKaryakariniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector(state => state.auth);

  const fetchData = async () => {
    try {
      const res = await dispatch(getKarykerni({ token }));
      console.log('res', res);

      if (res.payload?.status_code === 200) {
        setKaryakariniData(res.payload.data || []);
      } else {
        setKaryakariniData([]);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleMemberPress = (id) => {
    navigation.navigate('AllKaraykarniScreen', { memberId: id });
  };

  const MemberCard = ({ member }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleMemberPress(member.id)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: member.image }}
          style={styles.memberImage}
          // defaultSource={require('../../assets/placeholder-avatar.png')}
        />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberDesignation}>{member.description || 'Member'}</Text>
          
          <View style={styles.locationContainer}>
            {member.state && (
              <View style={styles.locationItem}>
                <Icon name="location-on" size={14} color={COLORS.primary} />
                <Text style={styles.locationText}>{member.state}</Text>
              </View>
            )}
            {member.district && (
              <View style={styles.locationItem}>
                <Icon name="place" size={14} color={COLORS.blue} />
                <Text style={styles.locationText}>{member.district}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <Icon name="arrow-forward-ios" size={16} color={COLORS.placeholder} />
        </View>
      </View>

      {member.name && (
        <Text style={styles.description}>{member.name}</Text>
      )}

      {/* Contact Information */}
      {/* <View style={styles.contactContainer}>
        {member.mobile && (
          <View style={styles.contactItem}>
            <Icon name="phone" size={14} color={COLORS.green} />
            <Text style={styles.contactText}>{member.mobile}</Text>
          </View>
        )}
        {member.email && (
          <View style={styles.contactItem}>
            <Icon name="email" size={14} color={COLORS.blue} />
            <Text style={styles.contactText}>{member.email}</Text>
          </View>
        )}
      </View> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
      <HeaderCommon headername={"कार्यकारिणी"} />
      
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading members...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header Stats */}
            {/* <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{karyakariniData.length}</Text>
                <Text style={styles.statLabel}>Total Members</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {karyakariniData.filter(m => m.designation?.toLowerCase().includes('president')).length}
                </Text>
                <Text style={styles.statLabel}>Presidents</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {new Set(karyakariniData.map(m => m.state)).size}
                </Text>
                <Text style={styles.statLabel}>States</Text>
              </View>
            </View> */}

            <View style={styles.content}>
              {karyakariniData.length > 0 ? (
                karyakariniData.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Icon name="group" size={64} color={COLORS.placeholder} />
                  <Text style={styles.emptyText}>No members found</Text>
                  <Text style={styles.emptySubtext}>
                    There are no committee members to display at the moment.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.placeholder,
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e9ecef',
    marginHorizontal: 8,
  },
  content: {
    padding: 16,
    paddingTop: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 15,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  memberDesignation: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 8,
    backgroundColor: 'rgba(93, 59, 241, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  locationText: {
    fontSize: 12,
    color: COLORS.body,
    marginLeft: 4,
    fontWeight: '500',
  },
  arrowContainer: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.body,
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  contactText: {
    fontSize: 12,
    color: COLORS.dark,
    marginLeft: 6,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: COLORS.dark,
    fontSize: 16,
    marginTop: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.dark,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.placeholder,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Karykarni;