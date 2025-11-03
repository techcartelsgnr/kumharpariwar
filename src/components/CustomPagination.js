import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (page) => {
    setCurrentPage(page);
    onPageChange && onPageChange(page);
  };

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => currentPage > 1 && handleChange(currentPage - 1)}
      >
        <Text style={styles.navText}>Prev</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {getPageNumbers().map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePage,
            ]}
            onPress={() => handleChange(page)}
          >
            <Text
              style={[
                styles.pageText,
                currentPage === page && styles.activePageText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => currentPage < totalPages && handleChange(currentPage + 1)}
      >
        <Text style={styles.navText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
    justifyContent: 'center',
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
  },
  pageText: {
    color: '#007AFF',
  },
  activePage: {
    backgroundColor: '#007AFF',
  },
  activePageText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Pagination;
