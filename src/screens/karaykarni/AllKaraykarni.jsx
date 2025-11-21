// AllKaraykarni.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
  RefreshControl,
  TextInput
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllKarykerni } from '../../redux/slices/MoreRepoSlice';
import { COLORS } from '../../theme/theme';
import HeaderCommon from '../../components/HeaderCommon';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllKaraykarni = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth || {});
  const route = useRoute();
  const memberId = route?.params?.memberId;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    if (!memberId || !token) {
      setLoading(false);
      return;
    }
    fetchMembers();
  }, [dispatch, memberId, token]);

  useEffect(() => {
    // Filter members based on search query
    if (searchQuery.trim() === '') {
      setFilteredMembers(members);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = members.filter(member =>
        member.name?.toLowerCase().includes(query) ||
        member.designation?.toLowerCase().includes(query) ||
        member.email?.toLowerCase().includes(query) ||
        member.mobile?.includes(query)
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllKarykerni({ token, id: memberId }));
      console.log('API Response:', res);

      if (res.payload?.status_code === 200 && res.payload?.data) {
        const membersData = Array.isArray(res.payload.data) ? res.payload.data : [res.payload.data];
        setMembers(membersData);
        setFilteredMembers(membersData);
      } else {
        setMembers([]);
        setFilteredMembers([]);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      Alert.alert('Error', 'Failed to load members data');
      setMembers([]);
      setFilteredMembers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMembers();
  };

  const handleCall = (mobile) => {
    Linking.openURL(`tel:${mobile}`).catch(err =>
      Alert.alert('Error', 'Could not make a call')
    );
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(err =>
      Alert.alert('Error', 'Could not open email')
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const MemberCard = ({ member }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: member.image }}
          style={styles.memberImage}
        />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.name}</Text>
          <View style={[styles.designationBadge,
          member.designation?.toLowerCase().includes('president') && styles.presidentBadge,
          member.designation?.toLowerCase().includes('secretary') && styles.secretaryBadge,
          member.designation?.toLowerCase().includes('treasurer') && styles.treasurerBadge
          ]}>
            <Text style={styles.designationText}>
              {member.designation || 'Member'}
            </Text>
          </View>
        </View>
      </View>

      {member.description && (
        <Text style={styles.description}>{member.description}</Text>
      )}

      <View style={styles.contactInfo}>
        {member.email && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email:</Text>
            <Text style={styles.contactValue}>{member.email}</Text>
          </View>
        )}
        {member.mobile && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Mobile:</Text>
            <Text style={styles.contactValue}>{member.mobile}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionButtons}>
        {member.mobile && (
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={() => handleCall(member.mobile)}
          >
            <Icon name="phone" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
        )}
        {member.email && (
          <TouchableOpacity
            style={[styles.actionButton, styles.emailButton]}
            onPress={() => handleEmail(member.email)}
          >
            <Icon name="email" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Email</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderCommon headername={"All Members"} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading Members...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCommon headername={"All Members"} />
      <View style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        >
          <View style={styles.content}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Icon name="search" size={20} color={COLORS.placeholder} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name, designation, email..."
                  placeholderTextColor={COLORS.placeholder}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                    <Icon name="close" size={18} color={COLORS.placeholder} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {members.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="group" size={64} color={COLORS.placeholder} />
                <Text style={styles.emptyText}>No members found</Text>
                <Text style={styles.emptySubtext}>
                  {memberId ? `No data available for member ID: ${memberId}` : 'No member ID provided'}
                </Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchMembers}>
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.headerInfo}>
                  <Text style={styles.memberCount}>
                    {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </Text>
                  {searchQuery && filteredMembers.length === 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearSearchButton}>
                      <Text style={styles.clearSearchText}>Clear Search</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {filteredMembers.length === 0 && searchQuery ? (
                  <View style={styles.noResultsContainer}>
                    <Icon name="search-off" size={48} color={COLORS.placeholder} />
                    <Text style={styles.noResultsText}>No members found</Text>
                    <Text style={styles.noResultsSubtext}>
                      Try adjusting your search terms
                    </Text>
                    <TouchableOpacity onPress={clearSearch} style={styles.clearSearchButton}>
                      <Text style={styles.clearSearchText}>Clear Search</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>

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
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.dark,
  },
  clearButton: {
    padding: 4,
  },
  headerInfo: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  memberCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 4,
  },
  memberId: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  clearSearchButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  clearSearchText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  designationBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  presidentBadge: {
    backgroundColor: COLORS.redcolor,
  },
  secretaryBadge: {
    backgroundColor: COLORS.green,
  },
  treasurerBadge: {
    backgroundColor: COLORS.yellow,
  },
  designationText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
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
    alignItems: 'center',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  callButton: {
    backgroundColor: COLORS.green,
  },
  emailButton: {
    backgroundColor: COLORS.blue,
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.dark,
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
    marginBottom: 20,
  },
  noResultsContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: COLORS.dark,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: COLORS.placeholder,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AllKaraykarni;