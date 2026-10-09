import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { spacing } from '../constants/dimensions';
import { colors } from '../constants/colors';
import { fontFamily } from '../constants/fonts';
import { iconSize, fontSize } from '../constants/dimensions';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import { smartwatch } from '../data/smartwatch'; 
import { headphones } from '../data/headphone';

const HomeScreen = () => {
  const [data, setData] = useState(smartwatch); // ✅ initially smartwatch
  const [selectedCategory, setSelectedCategory] = useState("Smart Watch");

  const handleUpdateCategory = (newCategory) => {
    if (newCategory === "Smart Watch") {
      setData(smartwatch);
    } else if (newCategory === "Headphone") {
      setData(headphones);
    }
    setSelectedCategory(newCategory);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.headline}>Find your suitable watch Now...</Text>

            {/* Search Bar */}
            <View style={styles.mainInputContainer}>
              <View style={styles.inputWrapper}>
                <Image source={require('../assets/Search.png')} style={styles.logo} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Search Product"
                  placeholderTextColor={colors.placeholder}
                />
              </View>

              <View style={styles.categoryContainer}>
                <Image source={require('../assets/category.png')} style={styles.logo} />
              </View>
            </View>

            {/* Category List */}
            <Category 
              selectedCategory={selectedCategory} 
              handleUpdateCategory={handleUpdateCategory} 
            />
          </>
        }
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: spacing.md,
  },
  headline: {
    fontSize: fontSize.xxl,
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    fontWeight: 'bold',
  },
  mainInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.placeholder,
    borderRadius: 44,
    paddingHorizontal: spacing.md,
  },
  logo: {
    height: iconSize.md,
    width: iconSize.md,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
  },
  categoryContainer: {
    padding: spacing.sm,
  },
});
