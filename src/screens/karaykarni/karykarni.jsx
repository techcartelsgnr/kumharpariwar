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
        />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.name}</Text>
        </View>
      </View>

      {member.description ? (
        <Text style={styles.description}>{member.description}</Text>
      ) : null}

      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Email:</Text>
          <Text style={styles.contactValue}>{member.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Mobile:</Text>
          <Text style={styles.contactValue}>{member.mobile}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <HeaderCommon headername={"Karyakarini"} />

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
          <View style={styles.content}>
            {karyakariniData.length > 0 ? (
              karyakariniData.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No members found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
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
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.body,
    lineHeight: 20,
    marginBottom: 15,
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 14,
    color: COLORS.placeholder,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '400',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.dark,
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.placeholder,
    fontSize: 16,
  },
});

export default Karykarni;
