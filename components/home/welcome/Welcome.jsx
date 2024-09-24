import { useState } from 'react'
import { 
  View, 
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const JobTypes = ["Full-time", "Part-time", "Contractor"]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState("Full-time")

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Pallav</Text>
        <Text style={styles.welcomeMessage}>Find Jobs</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {setSearchTerm(text)}}
            placeholder="Search for Jobs"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image 
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
        </TouchableOpacity>
      </View>

      {/* <ScrollView 
        style={styles.tabsContainer}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.small }}
        showsHorizontalScrollIndicator={false}
      >
        {JobTypes.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.tab(activeJobType, item)}
            onPress={() => { 
              setActiveJobType(item)
              router.push(`/search/${item}`)
            }}
          >
            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <View style={styles.tabsContainer}>
        <FlatList
          data={JobTypes}
          horizontal
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => { 
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        >   
        </FlatList>
      </View>
    </View>
  )
}

export default Welcome